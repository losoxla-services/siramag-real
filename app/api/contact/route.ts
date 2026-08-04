import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !subject || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Champs invalides' }, { status: 400 });
  }
  if (String(name).length > 100 || String(subject).length > 200 || String(message).length > 5000) {
    return NextResponse.json({ error: 'Champs trop longs' }, { status: 400 });
  }

  const supabase = createClient();
  const { error } = await supabase.from('contact_messages').insert({
    nom: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    sujet: String(subject).trim(),
    message: String(message).trim(),
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
