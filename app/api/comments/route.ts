import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { article_id, nom, contenu, site_web } = await request.json();

  // Piège à robots : un champ caché que seuls les bots remplissent
  if (site_web) return NextResponse.json({ ok: true });

  if (!article_id || !nom || !contenu) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
  }
  const supabase = createClient();
  const { error } = await supabase.from('comments').insert({
    article_id,
    nom: String(nom).slice(0, 100),
    contenu: String(contenu).slice(0, 2000),
    statut: 'en_attente',
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
