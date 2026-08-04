import { Hero } from '@/components/home/Hero';
import { ActuElles } from '@/components/home/ActuElles';
import { JustElles } from '@/components/home/JustElles';
import { SiraTV } from '@/components/home/SiraTV';
import { Podcasts } from '@/components/home/Podcasts';
import { SuccessStories } from '@/components/home/SuccessStories';
import { ModeDeVie } from '@/components/home/ModeDeVie';
import { Newsletter } from '@/components/home/Newsletter';
import { Community } from '@/components/home/Community';
import { Partners } from '@/components/home/Partners';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';

export default function Home() {
  return (
    <div className="space-y-10 md:space-y-14">
      <Hero />

      <section className="container mx-auto max-w-7xl px-4">
        <AdPlaceholder format="leaderboard" />
      </section>

      <ActuElles />
      <JustElles />

      <section className="container mx-auto max-w-7xl px-4">
        <AdPlaceholder format="billboard" />
      </section>

      <SiraTV />
      <Podcasts />
      <SuccessStories />

      <section className="container mx-auto max-w-7xl px-4">
        <AdPlaceholder format="leaderboard" />
      </section>

      <ModeDeVie />
      <Community />
      <Newsletter />
      <Partners />
    </div>
  );
}
