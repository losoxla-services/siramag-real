import { createClient } from '@/lib/supabase/server';

export async function getSubcategoriesForForm() {
  const supabase = createClient();
  const { data } = await supabase
    .from('categories')
    .select('id, nom, ordre, parent:parent_id(nom, ordre)')
    .not('parent_id', 'is', null)
    .order('ordre');

  return (data ?? [])
    .map((c: any) => ({ id: c.id, nom: c.nom, parentNom: c.parent?.nom ?? '' }))
    .sort((a, b) => a.parentNom.localeCompare(b.parentNom));
}
