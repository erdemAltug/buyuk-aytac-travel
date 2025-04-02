import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import PopularTours from '@/components/PopularTours';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <FeaturedDestinations />
        <PopularTours />
      </main>
      <Footer />
    </div>
  );
}
