/**
 * Sanitiseur HTML minimal — retire les vecteurs XSS courants (scripts, gestionnaires
 * d'évènements, liens javascript:, iframes) sans dépendance externe.
 * Le contenu des articles est rédigé uniquement par le personnel éditorial (Auteur,
 * Superviseur, Admin), mais on sanitise quand même : un compte compromis ne doit
 * jamais pouvoir injecter du code exécutable dans une page publique.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';

  let clean = html;

  // Retire les balises dangereuses entièrement (avec leur contenu)
  clean = clean.replace(/<(script|style|iframe|object|embed|form)[^>]*>[\s\S]*?<\/\1>/gi, '');
  clean = clean.replace(/<(script|style|iframe|object|embed|form)[^>]*\/?>/gi, '');

  // Retire les attributs on* (onclick, onerror, onload, ...)
  clean = clean.replace(/\son\w+\s*=\s*"[^"]*"/gi, '');
  clean = clean.replace(/\son\w+\s*=\s*'[^']*'/gi, '');
  clean = clean.replace(/\son\w+\s*=\s*[^\s>]+/gi, '');

  // Neutralise les liens javascript: et data: dans href/src
  clean = clean.replace(/(href|src)\s*=\s*"javascript:[^"]*"/gi, '$1="#"');
  clean = clean.replace(/(href|src)\s*=\s*'javascript:[^']*'/gi, "$1='#'");
  clean = clean.replace(/(href|src)\s*=\s*"data:text\/html[^"]*"/gi, '$1="#"');

  return clean;
}
