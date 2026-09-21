import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { Visual3DSection } from './components/Visual3DSection';
import { ProduceSection } from './components/ProduceSection';
import { ProcessSection } from './components/ProcessSection';
import { PremiumSection } from './components/PremiumSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { HarvestInquirySection } from './components/HarvestInquirySection';
import { Footer } from './components/Footer';
import { ProduceDetailModal } from './components/ProduceDetailModal';
import { BackToTop } from './components/BackToTop';
import { ProduceItem, PremiumPlan } from './types';

export default function App() {
  const [selectedProduce, setSelectedProduce] = useState<ProduceItem | null>(null);
  const [inquiryProduce, setInquiryProduce] = useState<ProduceItem | null>(null);
  const [inquiryPremiumPlan, setInquiryPremiumPlan] = useState<PremiumPlan | null>(null);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToHarvest = () => {
    const harvestSection = document.getElementById('harvest');
    if (harvestSection) {
      harvestSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToPremium = () => {
    const premiumSection = document.getElementById('premium');
    if (premiumSection) {
      premiumSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectProduce = (item: ProduceItem) => {
    setSelectedProduce(item);
  };

  const handleOrderProduceFromModal = (item: ProduceItem) => {
    setInquiryProduce(item);
    setInquiryPremiumPlan(null);
    scrollToContact();
  };

  const handleSelectPremiumPlan = (plan: PremiumPlan) => {
    setInquiryPremiumPlan(plan);
    setInquiryProduce(null);
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A2421] selection:bg-[#C68B59] selection:text-white flex flex-col font-nunito">
      {/* Sticky Header with responsive navbar & mobile hamburger */}
      <Navbar onOrderClick={scrollToContact} />

      {/* Main Agricultural Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection
          onExploreHarvest={scrollToHarvest}
          onExplorePremium={scrollToPremium}
          onBookTour={scrollToPremium}
        />

        {/* Section 2: About & Sustainable Roots */}
        <AboutSection />

        {/* Section 3: Interactive 3D Visual Depth Experience */}
        <Visual3DSection />

        {/* Section 4: Pure Farm Harvest Categories */}
        <ProduceSection
          onSelectItem={handleSelectProduce}
          onOrderBoxClick={scrollToContact}
        />

        {/* Section 5: Regenerative Farm-to-Table Process */}
        <ProcessSection />

        {/* Section 6: Premium Reserve & Heirloom Harvest Club */}
        <PremiumSection onSelectPlan={handleSelectPremiumPlan} />

        {/* Section 7: Community Voices & Certified Purity (with Carousel & Hover color transformation) */}
        <TestimonialsSection />

        {/* Section 8: Dedicated Premium FAQ Knowledge Vault */}
        <FAQSection />

        {/* Section 9: Seasonal Harvest Inquiry & Contact Desks */}
        <HarvestInquirySection
          selectedProduceItem={inquiryProduce}
          selectedPremiumPlan={inquiryPremiumPlan}
        />
      </main>

      {/* Modern Responsive Footer */}
      <Footer />

      {/* Interactive Produce Detail Modal */}
      <ProduceDetailModal
        item={selectedProduce}
        onClose={() => setSelectedProduce(null)}
        onOrder={handleOrderProduceFromModal}
      />

      {/* Unique Bottom-Right Back to Top Button with Circular Progress Track */}
      <BackToTop />
    </div>
  );
}
