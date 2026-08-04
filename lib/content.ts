import { createClient } from "@/lib/supabase/server";

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  subcategorySlug?: string;
  authorId: string;
  publishedAt: string;
  readingTime: number;
  image: string;
  tags: string[];
  featured?: boolean;
  type?: "article" | "video" | "podcast";
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  host: string;
  duration: string;
  episode: number;
  category: string;
  categorySlug: string;
  image: string;
  date: string;
  audioUrl: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  categorySlug: string;
  image: string;
  date: string;
  views: string;
  videoUrl: string;
}

// ---------- Catégories (résout parent + sous-catégorie à partir des slugs) ----------

async function resolveCategory(categorySlug: string, subcategorySlug?: string) {
  const supabase = createClient();
  const { data: parent } = await supabase
    .from("categories")
    .select("id, nom, slug")
    .eq("slug", categorySlug)
    .is("parent_id", null)
    .single();

  if (!parent) return { parent: null as any, sub: null as any };
  if (!subcategorySlug) return { parent, sub: null as any };

  const { data: sub } = await supabase
    .from("categories")
    .select("id, nom, slug")
    .eq("slug", subcategorySlug)
    .eq("parent_id", parent.id)
    .single();

  return { parent, sub: sub ?? null };
}

// ---------- Mappage ligne base de données -> interface Article ----------

function mapArticleRow(row: any): Article {
  const sub = row.categorie as { id: string; nom: string; slug: string; parent: { nom: string; slug: string } | null } | null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.titre,
    excerpt: row.extrait ?? "",
    content: row.contenu,
    category: sub?.parent?.nom ?? sub?.nom ?? "",
    categorySlug: sub?.parent?.slug ?? sub?.slug ?? "",
    subcategory: sub?.parent ? sub.nom : undefined,
    subcategorySlug: sub?.parent ? sub.slug : undefined,
    authorId: row.auteur_id ?? "",
    publishedAt: row.date_publication ?? row.created_at,
    readingTime: row.temps_lecture ?? 5,
    image: row.image_cover ?? "",
    tags: row.tags ?? [],
    featured: row.featured ?? false,
    type: "article",
  };
}

const ARTICLE_SELECT = `
  id, slug, titre, extrait, contenu, image_cover, tags, featured, temps_lecture,
  auteur_id, date_publication, created_at,
  categorie:categorie_id ( id, nom, slug, parent:parent_id ( id, nom, slug ) )
`;

export async function getAuthor(id: string): Promise<Author | undefined> {
  if (!id) return undefined;
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, nom_complet, role, bio, avatar_url")
    .eq("id", id)
    .single();
  if (!data) return undefined;
  return {
    id: data.id,
    name: data.nom_complet || "SIRA MAG",
    role: data.role === "admin" ? "Administratrice" : data.role === "superviseur" ? "Superviseure éditoriale" : "Journaliste",
    bio: data.bio ?? "",
    avatar: data.avatar_url ?? "",
  };
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("slug", slug)
    .eq("statut", "publié")
    .single();
  return data ? mapArticleRow(data) : undefined;
}

export async function getArticlesByCategory(categorySlug: string, limit = 12): Promise<Article[]> {
  const supabase = createClient();
  const { parent } = await resolveCategory(categorySlug);
  if (!parent) return [];

  const { data: subs } = await supabase.from("categories").select("id").eq("parent_id", parent.id);
  const ids = [parent.id, ...(subs ?? []).map((s) => s.id)];

  const { data } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("statut", "publié")
    .in("categorie_id", ids)
    .order("date_publication", { ascending: false })
    .limit(limit);
  return (data ?? []).map(mapArticleRow);
}

export async function getArticlesBySubCategory(
  categorySlug: string,
  subcategorySlug: string,
  limit = 24
): Promise<Article[]> {
  const { sub } = await resolveCategory(categorySlug, subcategorySlug);
  if (!sub) return [];
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("statut", "publié")
    .eq("categorie_id", sub.id)
    .order("date_publication", { ascending: false })
    .limit(limit);
  return (data ?? []).map(mapArticleRow);
}

export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("statut", "publié")
    .eq("featured", true)
    .order("date_publication", { ascending: false })
    .limit(limit);
  return (data ?? []).map(mapArticleRow);
}

export async function getLatestArticles(limit = 12): Promise<Article[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("statut", "publié")
    .order("date_publication", { ascending: false })
    .limit(limit);
  return (data ?? []).map(mapArticleRow);
}

export async function getRelatedArticles(article: Article, limit = 3): Promise<Article[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("statut", "publié")
    .neq("id", article.id)
    .order("date_publication", { ascending: false })
    .limit(limit * 3);
  const rows = (data ?? []).map(mapArticleRow);
  const related = rows.filter(
    (a) => a.categorySlug === article.categorySlug || a.tags.some((t) => article.tags.includes(t))
  );
  return (related.length > 0 ? related : rows).slice(0, limit);
}

export async function searchArticles(query: string): Promise<Article[]> {
  if (!query.trim()) return [];
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("statut", "publié")
    .or(`titre.ilike.%${query}%,extrait.ilike.%${query}%`)
    .order("date_publication", { ascending: false })
    .limit(30);
  return (data ?? []).map(mapArticleRow);
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const supabase = createClient();
  const { data } = await supabase.from("articles").select("slug").eq("statut", "publié");
  return (data ?? []).map((a) => a.slug);
}

// ---------- Podcasts ----------

export async function getPodcastEpisodes(subcategorySlug?: string, limit = 20): Promise<Podcast[]> {
  const supabase = createClient();
  let categorieId: string | null = null;
  if (subcategorySlug) {
    const { data } = await supabase.from("categories").select("id").eq("slug", subcategorySlug).not("parent_id", "is", null).single();
    categorieId = data?.id ?? null;
    if (!categorieId) return [];
  }
  let query = supabase
    .from("podcast_episodes")
    .select("id, titre, description, animatrice, duree, numero_episode, image_cover, audio_url, date_publication, categorie:categorie_id(nom, slug)")
    .eq("statut", "publié")
    .order("date_publication", { ascending: false })
    .limit(limit);
  if (categorieId) query = query.eq("categorie_id", categorieId);
  const { data } = await query;
  return (data ?? []).map((row: any) => ({
    id: row.id,
    title: row.titre,
    description: row.description ?? "",
    host: row.animatrice ?? "",
    duration: row.duree ?? "",
    episode: row.numero_episode ?? 0,
    category: row.categorie?.nom ?? "",
    categorySlug: row.categorie?.slug ?? "",
    image: row.image_cover ?? "",
    date: row.date_publication,
    audioUrl: row.audio_url,
  }));
}

// ---------- SIRA TV (vidéos) ----------

export async function getVideoEpisodes(subcategorySlug?: string, limit = 20): Promise<Video[]> {
  const supabase = createClient();
  let categorieId: string | null = null;
  if (subcategorySlug) {
    const { data } = await supabase.from("categories").select("id").eq("slug", subcategorySlug).not("parent_id", "is", null).single();
    categorieId = data?.id ?? null;
    if (!categorieId) return [];
  }
  let query = supabase
    .from("video_episodes")
    .select("id, titre, description, duree, vues, image_cover, video_url, date_publication, categorie:categorie_id(nom, slug)")
    .eq("statut", "publié")
    .order("date_publication", { ascending: false })
    .limit(limit);
  if (categorieId) query = query.eq("categorie_id", categorieId);
  const { data } = await query;
  return (data ?? []).map((row: any) => ({
    id: row.id,
    title: row.titre,
    description: row.description ?? "",
    duration: row.duree ?? "",
    category: row.categorie?.nom ?? "",
    categorySlug: row.categorie?.slug ?? "",
    image: row.image_cover ?? "",
    date: row.date_publication,
    views: String(row.vues ?? 0),
    videoUrl: row.video_url,
  }));
}

export async function getAllAuthors(): Promise<Author[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, nom_complet, role, bio, avatar_url")
    .in("role", ["journaliste", "superviseur", "admin"])
    .order("created_at");
  return (data ?? []).map((d) => ({
    id: d.id,
    name: d.nom_complet || "SIRA MAG",
    role: d.role === "admin" ? "Administratrice" : d.role === "superviseur" ? "Superviseure éditoriale" : "Journaliste",
    bio: d.bio ?? "",
    avatar: d.avatar_url ?? "",
  }));
}

export async function getArticlesByAuthor(authorId: string, limit = 12): Promise<Article[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("statut", "publié")
    .eq("auteur_id", authorId)
    .order("date_publication", { ascending: false })
    .limit(limit);
  return (data ?? []).map(mapArticleRow);
}

// ---------- Fil d'actualité (bandeau) ----------

export async function getBreakingNews(limit = 5): Promise<string[]> {
  const articles = await getLatestArticles(limit);
  return articles.map((a) => a.title);
}
