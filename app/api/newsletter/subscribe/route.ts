import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Adresse email invalide' }, { status: 400 });
  }

  const supabase = createClient();
  const { error } = await supabase.from('newsletter_subscribers').insert({ email: email.toLowerCase().trim() });

  if (error && error.code !== '23505') {
    // 23505 = déjà inscrit — on l'ignore silencieusement
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
