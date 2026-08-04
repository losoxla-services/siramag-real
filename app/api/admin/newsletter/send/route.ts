import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Clé RESEND_API_KEY absente. Ajoute-la dans les variables d'environnement." },
      { status: 500 }
    );
  }

  const { campaignId } = await request.json();
  if (!campaignId) return NextResponse.json({ error: 'campaignId manquant' }, { status: 400 });

  const { data: campaign } = await supabase.from('newsletter_campaigns').select('*').eq('id', campaignId).single();
  if (!campaign) return NextResponse.json({ error: 'Campagne introuvable' }, { status: 404 });
  if (campaign.statut === 'envoyée') {
    return NextResponse.json({ error: 'Cette campagne a déjà été envoyée' }, { status: 400 });
  }

  const { data: subscribers } = await supabase.from('newsletter_subscribers').select('email');
  const emails = (subscribers ?? []).map((s) => s.email);
  if (emails.length === 0) {
    return NextResponse.json({ error: 'Aucun abonné à qui envoyer' }, { status: 400 });
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || 'SIRA MAG <onboarding@resend.dev>';

  // Resend limite les envois "batch" à 100 destinataires par lot
  const batches: string[][] = [];
  for (let i = 0; i < emails.length; i += 100) batches.push(emails.slice(i, i + 100));

  let sentCount = 0;
  for (const batch of batches) {
    const res = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(
        batch.map((to) => ({
          from: fromAddress,
          to,
          subject: campaign.sujet,
          html: campaign.contenu_html,
        }))
      ),
    });
    if (res.ok) sentCount += batch.length;
  }

  await supabase
    .from('newsletter_campaigns')
    .update({ statut: 'envoyée', envoye_le: new Date().toISOString() })
    .eq('id', campaignId);

  await supabase.from('activity_log').insert({
    user_id: user.id,
    action: `a envoyé la newsletter à ${sentCount} abonné(s)`,
    cible: campaign.sujet,
  });

  return NextResponse.json({ ok: true, sentCount, total: emails.length });
}
