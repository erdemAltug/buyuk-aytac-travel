import Hero from '@/components/Hero';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import PopularTours from '@/components/PopularTours';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedDestinations />
      <PopularTours />
    </main>
  );
}
