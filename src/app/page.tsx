
import FeatureHighlights from '@/components/landing/feature-highlights';
import Footer from '@/components/landing/footer';
import HeroSection from '@/components/landing/hero-section';
import SmartMatch from '@/components/landing/smart-match';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <FeatureHighlights />
        <section id="smart-match" className="py-12 sm:py-24">
           <SmartMatch />
        </section>
        <Separator className="my-12" />
      </main>
      <Footer />
    </div>
  );
}
