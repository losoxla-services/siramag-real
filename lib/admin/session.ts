import { createClient } from "@/lib/supabase/server";

export async function getCurrentStaff() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, nom_complet, role")
    .eq("id", user.id)
    .single();

  return profile ? { id: user.id, nom: profile.nom_complet, role: profile.role } : null;
}

export const ROLE_LABELS: Record<string, string> = {
  admin: "Administrateur Général",
  superviseur: "Superviseur",
  journaliste: "Auteur",
  contributeur: "Contributeur",
  lecteur: "Lecteur",
};
