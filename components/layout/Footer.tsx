import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { footerLinks, navigation } from '@/lib/navigation';

export function Footer() {
  return (
    <footer className="bg-sira-black text-white mt-16">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="SIRA MAG - Accueil">
              <div className="relative h-14 w-48">
                <Image src="/Logo_Sirawebzine_png.png" alt="SIRA MAG" fill className="object-contain brightness-0 invert" />
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Le média panafricain qui célèbre les femmes, leurs luttes, leurs succès et leur impact.
              Donner aux femmes d'Afrique toute leur place.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Youtube, label: 'YouTube' },
                { Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-sira-orange transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-sira-orange-light">Rubriques</h3>
            <ul className="space-y-2">
              {footerLinks.rubriques.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-sira-orange-light">Liens utiles</h3>
            <ul className="space-y-2">
              {footerLinks.liensUtiles.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-sira-orange-light">Contact</h3>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-sira-orange" />
                <span>Dakar, Sénégal</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="h-4 w-4 shrink-0 text-sira-orange" />
                <a href="mailto:contact@siramag.com" className="hover:text-white transition-colors">contact@siramag.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="h-4 w-4 shrink-0 text-sira-orange" />
                <a href="tel:+22133000000" className="hover:text-white transition-colors">+221 33 000 00 00</a>
              </li>
            </ul>
            <form className="flex gap-2" action="/api/newsletter" method="POST">
              <input
                type="email"
                name="email"
                required
                placeholder="Votre email"
                aria-label="Adresse email pour la newsletter"
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sira-orange"
              />
              <button
                type="submit"
                className="bg-sira-orange hover:bg-sira-orange-dark text-white px-3 rounded-md transition-colors"
                aria-label="S'abonner"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} SIRA MAG. Tous droits réservés.
          </p>
          <div className="flex gap-4 text-xs text-white/50">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link href="/conditions-utilisation" className="hover:text-white transition-colors">Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
