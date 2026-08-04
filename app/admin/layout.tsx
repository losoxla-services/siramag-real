import { getCurrentStaff, ROLE_LABELS } from '@/lib/admin/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '@/components/admin/LogoutButton';

const NAV_ALL = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/articles', label: 'Articles' },
];
const NAV_SUPERVISOR = [
  { href: '/admin/validation', label: 'Validation' },
  { href: '/admin/commentaires', label: 'Commentaires' },
];
const NAV_ADMIN = [
  { href: '/admin/categories', label: 'Catégories' },
  { href: '/admin/sira-tv', label: 'SIRA TV' },
  { href: '/admin/podcasts', label: 'Podcasts' },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/messages', label: 'Messages' },
  { href: '/admin/publicites', label: 'Publicités' },
  { href: '/admin/media', label: 'Médiathèque' },
  { href: '/admin/newsletter', label: 'Newsletter' },
  { href: '/admin/utilisateurs', label: 'Utilisateurs' },
  { href: '/admin/statistiques', label: 'Statistiques' },
  { href: '/admin/journaux', label: 'Journaux' },
  { href: '/admin/parametres', label: 'Paramètres' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Protection réelle : exécutée côté serveur (Node.js), sans les restrictions
  // techniques d'un middleware Edge. La page de connexion vit maintenant hors de
  // ce layout (/connexion), donc ici on peut exiger une session sans ambiguïté.
  const staff = await getCurrentStaff();
  if (!staff) redirect('/connexion');

  const nav = [
    ...NAV_ALL,
    ...(staff.role === 'superviseur' || staff.role === 'admin' ? NAV_SUPERVISOR : []),
    ...(staff.role === 'admin' ? NAV_ADMIN : []),
  ];

  return (
    <div className="min-h-screen flex bg-sira-gray/40">
      <aside className="w-60 shrink-0 bg-white border-r border-sira-gray-mid/60 flex flex-col">
        <div className="p-5 border-b border-sira-gray-mid/60">
          <p className="font-display font-bold text-sira-dark">SIRA MAG</p>
          <p className="text-xs text-sira-gray-text">Panel éditorial</p>
        </div>
        <nav className="flex-1 py-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-5 py-2.5 text-sm text-sira-gray-dark hover:bg-sira-gray hover:text-sira-orange transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-sira-gray-mid/60">
          <p className="text-xs text-sira-gray-text mb-1">{staff.nom || 'Sans nom'}</p>
          <p className="text-xs font-semibold text-sira-orange mb-3">{ROLE_LABELS[staff.role]}</p>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-8 overflow-x-auto">{children}</main>
    </div>
  );
}
