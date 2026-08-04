'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/connexion');
        router.refresh();
      }}
      className="text-xs text-sira-gray-text hover:text-sira-orange transition-colors"
    >
      Se déconnecter
    </button>
  );
}
