export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  subItems?: NavSubItem[];
  featured?: {
    image: string;
    title: string;
    href: string;
  };
}

export const navigation: NavItem[] = [
  {
    label: "Accueil",
    href: "/",
  },
  {
    label: "Actu'Elles",
    href: "/actu-elles",
    subItems: [
      { label: "Politique & Institutions", href: "/actu-elles/politique-institutions" },
      { label: "Société & Droits", href: "/actu-elles/societe-droits" },
      { label: "Économie & Business", href: "/actu-elles/economie-business" },
      { label: "Culture & Tourisme", href: "/actu-elles/culture-tourisme" },
    ],
    featured: {
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Femmes entrepreneures : les tendances 2024",
      href: "/actu-elles/politique-institutions/article-1",
    },
  },
  {
    label: "Just'Elles & Impact",
    href: "/just-elles-impact",
    subItems: [
      { label: "SIRA Lab", href: "/just-elles-impact/sira-lab" },
      { label: "À l'Écoute", href: "/just-elles-impact/a-l-ecoute" },
      { label: "Combattre les Violences", href: "/just-elles-impact/combattre-les-violences" },
    ],
    featured: {
      image: "https://images.pexels.com/photos/7551442/pexels-photo-7551442.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Droits des femmes : où en sommes-nous ?",
      href: "/just-elles-impact/sira-lab/article-1",
    },
  },
  {
    label: "SIRA TV & Hub Audio",
    href: "/sira-tv-hub-audio",
    subItems: [
      { label: "SIRA MAG (Le Talk-Show)", href: "/sira-tv-hub-audio/talk-show" },
      { label: "SIRA Podcast", href: "/sira-tv-hub-audio/podcast" },
      { label: "Les Fortes Têtes", href: "/sira-tv-hub-audio/les-fortes-tetes" },
      { label: "Traces & Repères", href: "/sira-tv-hub-audio/traces-reperes" },
    ],
    featured: {
      image: "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Entrepreneuriat féminin : quels défis en 2024 ?",
      href: "/sira-tv-hub-audio/talk-show",
    },
  },
  {
    label: "Succès & Inspiration",
    href: "/succes-inspiration",
    subItems: [
      { label: "Success Story", href: "/succes-inspiration/success-story" },
      { label: "HeForShe / Hommes Alliés", href: "/succes-inspiration/heforshe" },
    ],
    featured: {
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Awa Sylla : de vendeuse à cheffe d'entreprise",
      href: "/succes-inspiration/success-story/awa-sylla",
    },
  },
  {
    label: "Coin Parents & Enfance",
    href: "/coin-parents-enfance",
    subItems: [
      { label: "Santé Mentale & Bien-être", href: "/coin-parents-enfance/sante-mentale" },
      { label: "Éducation & Épanouissement", href: "/coin-parents-enfance/education-epanouissement" },
      { label: "Espace Jeunes", href: "/coin-parents-enfance/espace-jeunes" },
    ],
    featured: {
      image: "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "5 habitudes pour des enfants épanouis et confiants",
      href: "/coin-parents-enfance/education-epanouissement/article-1",
    },
  },
  {
    label: "Mode de Vie",
    href: "/mode-de-vie",
    subItems: [
      { label: "Bien-être & Sport", href: "/mode-de-vie/bien-etre-sport" },
      { label: "Les Saveurs de Sira", href: "/mode-de-vie/saveurs-de-sira" },
      { label: "Tradi-Astuces", href: "/mode-de-vie/tradi-astuces" },
      { label: "Fashion Style & Beauté", href: "/mode-de-vie/fashion-style-beaute" },
    ],
    featured: {
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Tiéboudienne revisité : recette saine et gourmande",
      href: "/mode-de-vie/saveurs-de-sira/article-1",
    },
  },
  {
    label: "SIRA Community",
    href: "/sira-community",
    subItems: [
      { label: "Vos Contributions", href: "/sira-community/contributions" },
      { label: "Interactivité Réseaux", href: "/sira-community/interactivite-reseaux" },
      { label: "SIRA Leaders (Le Forum)", href: "/sira-community/sira-leaders" },
    ],
    featured: {
      image: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Rejoignez la communauté #SiraMag",
      href: "/sira-community",
    },
  },
];

export const footerLinks = {
  rubriques: [
    { label: "Accueil", href: "/" },
    { label: "Actu'Elles", href: "/actu-elles" },
    { label: "Just'Elles & Impact", href: "/just-elles-impact" },
    { label: "SIRA TV & Hub Audio", href: "/sira-tv-hub-audio" },
    { label: "Succès & Inspiration", href: "/succes-inspiration" },
    { label: "Coin Parents & Enfance", href: "/coin-parents-enfance" },
    { label: "Mode de Vie", href: "/mode-de-vie" },
    { label: "SIRA Community", href: "/sira-community" },
  ],
  liensUtiles: [
    { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
    { label: "Nous contacter", href: "/contact" },
    { label: "Nos Services", href: "/nos-services" },
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
    { label: "FAQ", href: "/faq" },
    { label: "Publicité", href: "/publicite" },
  ],
};
