-- ============================================================
-- SIRA MAG — Schéma backend (aligné sur le frontend réel + cahier des charges)
-- À exécuter dans : Supabase Dashboard > SQL Editor > New query
-- ============================================================

create extension if not exists "pgcrypto";

-- ============================================================
-- CATÉGORIES (2 niveaux : rubrique + sous-rubrique, comme navigation.ts)
-- ============================================================
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  slug text not null,
  parent_id uuid references categories(id) on delete cascade,
  description text,
  ordre integer not null default 0,
  created_at timestamptz default now(),
  unique (parent_id, slug)
);

-- ============================================================
-- PROFILS & RÔLES (Auteur = journaliste, Superviseur, Administrateur Général = admin)
-- ============================================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nom_complet text,
  role text not null default 'lecteur' check (role in ('lecteur', 'contributeur', 'journaliste', 'superviseur', 'admin')),
  bio text,
  avatar_url text,
  created_at timestamptz default now()
);

create or replace function public.is_admin()
returns boolean as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$ language sql security definer stable;

create or replace function public.is_supervisor_or_admin()
returns boolean as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('superviseur', 'admin'));
$$ language sql security definer stable;

create or replace function public.is_staff()
returns boolean as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('journaliste', 'superviseur', 'admin'));
$$ language sql security definer stable;

-- Seul le tout premier compte devient admin automatiquement (lancement) ; les suivants sont lecteurs.
create or replace function public.handle_new_user()
returns trigger as $$
declare
  is_first boolean;
begin
  select count(*) = 0 into is_first from public.profiles;
  insert into public.profiles (id, nom_complet, role)
  values (new.id, new.raw_user_meta_data->>'nom_complet', case when is_first then 'admin' else 'lecteur' end);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- ARTICLES
-- ============================================================
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  slug text unique not null,
  extrait text,
  contenu text not null,
  image_cover text,
  categorie_id uuid references categories(id) on delete set null,
  auteur_id uuid references profiles(id) on delete set null,
  tags text[] default '{}',
  featured boolean not null default false,
  temps_lecture integer default 5,
  statut text not null default 'brouillon' check (statut in ('brouillon', 'soumis', 'publié')),
  date_publication timestamptz,
  created_at timestamptz default now()
);

create index if not exists idx_articles_statut on articles(statut);
create index if not exists idx_articles_categorie on articles(categorie_id);

-- ============================================================
-- PODCASTS (épisodes, rattachés à une émission = sous-catégorie)
-- ============================================================
create table if not exists podcast_episodes (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  description text,
  animatrice text,
  duree text,
  numero_episode integer,
  categorie_id uuid references categories(id) on delete set null,
  image_cover text,
  audio_url text not null,
  statut text not null default 'brouillon' check (statut in ('brouillon', 'publié')),
  date_publication timestamptz,
  created_at timestamptz default now()
);

-- ============================================================
-- SIRA TV (épisodes vidéo, rattachés à une émission = sous-catégorie)
-- ============================================================
create table if not exists video_episodes (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  description text,
  duree text,
  categorie_id uuid references categories(id) on delete set null,
  image_cover text,
  video_url text not null,
  vues integer not null default 0,
  statut text not null default 'brouillon' check (statut in ('brouillon', 'publié')),
  date_publication timestamptz,
  created_at timestamptz default now()
);

-- ============================================================
-- PAGES (CMS de pages libres : Qui sommes-nous, Nos Services, etc.)
-- ============================================================
create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  slug text unique not null,
  contenu text not null,
  statut text not null default 'brouillon' check (statut in ('brouillon', 'publié')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- PUBLICITÉS (emplacements réels : leaderboard, billboard, etc.)
-- ============================================================
create table if not exists ads (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  image_url text not null,
  lien_url text not null,
  emplacement text not null check (emplacement in ('leaderboard', 'billboard', 'sidebar', 'in-article')),
  actif boolean not null default true,
  date_debut date,
  date_fin date,
  impressions integer not null default 0,
  clics integer not null default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- COMMENTAIRES
-- ============================================================
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid references articles(id) on delete cascade,
  nom text not null,
  contenu text not null,
  statut text not null default 'en_attente' check (statut in ('en_attente', 'approuvé', 'rejeté')),
  created_at timestamptz default now()
);

-- ============================================================
-- NEWSLETTER
-- ============================================================
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

create table if not exists newsletter_campaigns (
  id uuid primary key default gen_random_uuid(),
  sujet text not null,
  contenu_html text not null,
  statut text not null default 'brouillon' check (statut in ('brouillon', 'envoyée')),
  envoye_le timestamptz,
  created_at timestamptz default now()
);

-- ============================================================
-- MESSAGES DE CONTACT
-- ============================================================
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  email text not null,
  sujet text not null,
  message text not null,
  lu boolean not null default false,
  created_at timestamptz default now()
);
alter table contact_messages enable row level security;
create policy "contact_messages_public_insert" on contact_messages for insert with check (true);
create policy "contact_messages_admin_manage" on contact_messages for all using (public.is_admin());

-- ============================================================
-- STATISTIQUES (vues de pages, pour le dashboard KPI)
-- ============================================================
create table if not exists page_views (
  id bigint generated always as identity primary key,
  chemin text not null,
  created_at timestamptz default now()
);

create index if not exists idx_page_views_created on page_views(created_at);

-- ============================================================
-- JOURNAUX D'ACTIVITÉ
-- ============================================================
create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  action text not null,
  cible text,
  created_at timestamptz default now()
);

-- ============================================================
-- PARAMÈTRES DU SITE
-- ============================================================
create table if not exists site_settings (
  id integer primary key default 1,
  youtube_channel_id text,
  constraint single_row check (id = 1)
);
insert into site_settings (id) values (1) on conflict (id) do nothing;

-- ============================================================
-- STOCKAGE DES MÉDIAS
-- ============================================================
insert into storage.buckets (id, name, public)
values ('sira-media', 'sira-media', true)
on conflict (id) do nothing;

create policy "sira_media_public_read" on storage.objects
  for select using (bucket_id = 'sira-media');
create policy "sira_media_staff_upload" on storage.objects
  for insert with check (bucket_id = 'sira-media' and public.is_staff());
create policy "sira_media_staff_update" on storage.objects
  for update using (bucket_id = 'sira-media' and public.is_staff());
create policy "sira_media_admin_delete" on storage.objects
  for delete using (bucket_id = 'sira-media' and public.is_admin());

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table categories enable row level security;
alter table profiles enable row level security;
alter table articles enable row level security;
alter table podcast_episodes enable row level security;
alter table video_episodes enable row level security;
alter table pages enable row level security;
alter table ads enable row level security;
alter table comments enable row level security;
alter table newsletter_subscribers enable row level security;
alter table newsletter_campaigns enable row level security;
alter table page_views enable row level security;
alter table activity_log enable row level security;
alter table site_settings enable row level security;

-- Catégories : lecture publique, gestion admin uniquement
create policy "categories_public_read" on categories for select using (true);
create policy "categories_admin_manage" on categories for all using (public.is_admin());

-- Profils : chacun lit/modifie le sien ; le personnel éditorial lit les autres (attribution auteur) ; admin gère tout
create policy "profiles_self_read" on profiles for select using (auth.uid() = id);
create policy "profiles_self_update" on profiles for update using (auth.uid() = id);
create policy "profiles_staff_read" on profiles for select using (public.is_staff());
create policy "profiles_public_author_read" on profiles for select using (role in ('journaliste', 'superviseur', 'admin'));
create policy "profiles_admin_manage" on profiles for all using (public.is_admin());

-- Articles : public = publié uniquement ; personnel éditorial voit tout
create policy "articles_public_read" on articles for select using (statut = 'publié');
create policy "articles_staff_read" on articles for select using (public.is_staff());
-- Un Auteur crée ses propres articles (brouillon/soumis) ; seul Superviseur/Admin publie directement
create policy "articles_staff_insert" on articles for insert with check (
  public.is_staff() and auteur_id = auth.uid()
  and (statut in ('brouillon', 'soumis') or public.is_supervisor_or_admin())
);
create policy "articles_staff_update" on articles for update using (
  public.is_staff() and (auteur_id = auth.uid() or public.is_supervisor_or_admin())
) with check (
  public.is_staff() and (auteur_id = auth.uid() or public.is_supervisor_or_admin())
  and (statut != 'publié' or public.is_supervisor_or_admin())
);
create policy "articles_admin_delete" on articles for delete using (public.is_admin());

-- Podcasts / SIRA TV : lecture publique si publié, gestion réservée à l'Administrateur Général
create policy "podcasts_public_read" on podcast_episodes for select using (statut = 'publié');
create policy "podcasts_admin_manage" on podcast_episodes for all using (public.is_admin());
create policy "videos_public_read" on video_episodes for select using (statut = 'publié');
create policy "videos_admin_manage" on video_episodes for all using (public.is_admin());

-- Pages libres : lecture publique si publiée, gestion admin
create policy "pages_public_read" on pages for select using (statut = 'publié');
create policy "pages_admin_manage" on pages for all using (public.is_admin());

-- Publicités : lecture publique des annonces actives, gestion admin
create policy "ads_public_read" on ads for select using (actif = true);
create policy "ads_admin_manage" on ads for all using (public.is_admin());

-- Commentaires : lecture publique des approuvés, écriture publique, modération Superviseur/Admin
create policy "comments_public_read" on comments for select using (statut = 'approuvé');
create policy "comments_public_insert" on comments for insert with check (true);
create policy "comments_supervisor_manage" on comments for all using (public.is_supervisor_or_admin());

-- Newsletter : écriture publique (inscription), lecture/gestion admin uniquement
create policy "newsletter_public_insert" on newsletter_subscribers for insert with check (true);
create policy "newsletter_admin_read" on newsletter_subscribers for select using (public.is_admin());
create policy "newsletter_campaigns_admin" on newsletter_campaigns for all using (public.is_admin());

-- Statistiques : écriture publique (tracking best-effort), lecture admin uniquement
create policy "page_views_public_insert" on page_views for insert with check (true);
create policy "page_views_admin_read" on page_views for select using (public.is_admin());

-- Journaux d'activité : écriture par le personnel, lecture admin uniquement
create policy "activity_log_staff_insert" on activity_log for insert with check (public.is_staff());
create policy "activity_log_admin_read" on activity_log for select using (public.is_admin());

-- Paramètres : lecture publique (le site en a besoin), modification admin uniquement
create policy "site_settings_public_read" on site_settings for select using (true);
create policy "site_settings_admin_update" on site_settings for update using (public.is_admin());

-- ============================================================
-- DONNÉES DE DÉPART — arborescence exacte du frontend (navigation.ts)
-- ============================================================
do $$
declare
  cat_id uuid;
begin
  -- Actu'Elles
  insert into categories (nom, slug, ordre) values ('Actu''Elles', 'actu-elles', 1)
    on conflict (parent_id, slug) do nothing returning id into cat_id;
  select id into cat_id from categories where slug = 'actu-elles' and parent_id is null;
  insert into categories (nom, slug, parent_id, ordre) values
    ('Politique & Institutions', 'politique-institutions', cat_id, 1),
    ('Société & Droits', 'societe-droits', cat_id, 2),
    ('Économie & Business', 'economie-business', cat_id, 3),
    ('Culture & Tourisme', 'culture-tourisme', cat_id, 4)
  on conflict (parent_id, slug) do nothing;

  -- Just'Elles & Impact
  insert into categories (nom, slug, ordre) values ('Just''Elles & Impact', 'just-elles-impact', 2)
    on conflict (parent_id, slug) do nothing;
  select id into cat_id from categories where slug = 'just-elles-impact' and parent_id is null;
  insert into categories (nom, slug, parent_id, ordre) values
    ('SIRA Lab', 'sira-lab', cat_id, 1),
    ('À l''Écoute', 'a-l-ecoute', cat_id, 2),
    ('Combattre les Violences', 'combattre-les-violences', cat_id, 3)
  on conflict (parent_id, slug) do nothing;

  -- SIRA TV & Hub Audio
  insert into categories (nom, slug, ordre) values ('SIRA TV & Hub Audio', 'sira-tv-hub-audio', 3)
    on conflict (parent_id, slug) do nothing;
  select id into cat_id from categories where slug = 'sira-tv-hub-audio' and parent_id is null;
  insert into categories (nom, slug, parent_id, ordre) values
    ('SIRA MAG (Le Talk-Show)', 'talk-show', cat_id, 1),
    ('SIRA Podcast', 'podcast', cat_id, 2),
    ('Les Fortes Têtes', 'les-fortes-tetes', cat_id, 3),
    ('Traces & Repères', 'traces-reperes', cat_id, 4)
  on conflict (parent_id, slug) do nothing;

  -- Succès & Inspiration
  insert into categories (nom, slug, ordre) values ('Succès & Inspiration', 'succes-inspiration', 4)
    on conflict (parent_id, slug) do nothing;
  select id into cat_id from categories where slug = 'succes-inspiration' and parent_id is null;
  insert into categories (nom, slug, parent_id, ordre) values
    ('Success Story', 'success-story', cat_id, 1),
    ('HeForShe / Hommes Alliés', 'heforshe', cat_id, 2)
  on conflict (parent_id, slug) do nothing;

  -- Coin Parents & Enfance
  insert into categories (nom, slug, ordre) values ('Coin Parents & Enfance', 'coin-parents-enfance', 5)
    on conflict (parent_id, slug) do nothing;
  select id into cat_id from categories where slug = 'coin-parents-enfance' and parent_id is null;
  insert into categories (nom, slug, parent_id, ordre) values
    ('Santé Mentale & Bien-être', 'sante-mentale', cat_id, 1),
    ('Éducation & Épanouissement', 'education-epanouissement', cat_id, 2),
    ('Espace Jeunes', 'espace-jeunes', cat_id, 3)
  on conflict (parent_id, slug) do nothing;

  -- Mode de Vie
  insert into categories (nom, slug, ordre) values ('Mode de Vie', 'mode-de-vie', 6)
    on conflict (parent_id, slug) do nothing;
  select id into cat_id from categories where slug = 'mode-de-vie' and parent_id is null;
  insert into categories (nom, slug, parent_id, ordre) values
    ('Bien-être & Sport', 'bien-etre-sport', cat_id, 1),
    ('Les Saveurs de Sira', 'saveurs-de-sira', cat_id, 2),
    ('Tradi-Astuces', 'tradi-astuces', cat_id, 3),
    ('Fashion Style & Beauté', 'fashion-style-beaute', cat_id, 4)
  on conflict (parent_id, slug) do nothing;

  -- SIRA Community
  insert into categories (nom, slug, ordre) values ('SIRA Community', 'sira-community', 7)
    on conflict (parent_id, slug) do nothing;
  select id into cat_id from categories where slug = 'sira-community' and parent_id is null;
  insert into categories (nom, slug, parent_id, ordre) values
    ('Vos Contributions', 'contributions', cat_id, 1),
    ('Interactivité Réseaux', 'interactivite-reseaux', cat_id, 2),
    ('SIRA Leaders (Le Forum)', 'sira-leaders', cat_id, 3)
  on conflict (parent_id, slug) do nothing;
end $$;
