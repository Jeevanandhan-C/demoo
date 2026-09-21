import React, { useState } from 'react';
import { Sprout, CheckCircle2, XCircle, HeartHandshake, Award, Droplets, Leaf } from 'lucide-react';
import { FARM_CONFIG } from '../data/farmData';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'comparison'>('mission');

  const pillars = [
    {
      icon: <Leaf className="w-5 h-5 text-[#C68B59]" />,
      title: 'Reviving Ancient Wisdom',
      desc: 'Formulations inspired by Vrikshayurveda, combining botanical decoctions with native farm compost.',
    },
    {
      icon: <Droplets className="w-5 h-5 text-[#C68B59]" />,
      title: 'Precision Micro-Hydration',
      desc: 'Sub-surface solar drip feeding root zones directly, preventing weed infestation and conserving 65% water.',
    },
    {
      icon: <Award className="w-5 h-5 text-[#C68B59]" />,
      title: '100% Non-GMO Seeds',
      desc: 'Preserving native open-pollinated seed varieties naturally adapted to local heat and rainfall cycles.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#C68B59]" />,
      title: 'Fair Agrarian Wages',
      desc: 'Empowering 40+ local farming families with dignified livelihoods, fair profit shares, and clean working conditions.',
    },
  ];

  const comparisonData = [
    {
      factor: 'Soil Enrichment',
      conventional: 'Synthetic NPK salts, chemical potash, depletes soil organic carbon to <0.5%',
      ulavan: 'Natural Jeevamrutham, composted cow manure & vermiculture; organic carbon > 2.8%',
    },
    {
      factor: 'Pest Management',
      conventional: 'Organophosphates, synthetic insecticides toxic to bees, birds, and humans',
      ulavan: 'Herbal Agniastra, fermented neem extracts, marigold trap crops & beneficial spiders',
    },
    {
      factor: 'Harvest Freshness',
      conventional: 'Stored in cold godowns for weeks, artificially waxed and ethylene-gas ripened',
      ulavan: 'Hand-plucked at 5:00 AM, delivered fresh within 12–24 hours of harvest',
    },
    {
      factor: 'Seed Lineage',
      conventional: 'Terminator hybrid seeds engineered for single-season use requiring patented inputs',
      ulavan: 'Heirloom open-pollinated seeds saved generation after generation by native farmers',
    },
    {
      factor: 'Taste & Nutrition',
      conventional: 'Water-bloated, bland cellular structure with lingering chemical traces',
      ulavan: 'Dense minerals, intense natural fragrance, crisp crunch, and vibrant natural color',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative ambient color blending */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#C68B59]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#C68B59]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59]/40 text-xs font-accent font-semibold mb-3 shadow-xs">
            <Sprout className="w-3.5 h-3.5 text-[#40916C]" />
            <span>Our Roots & Agricultural Ethos</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A2421] tracking-tight">
            Farming as an Act of{' '}
            <span className="text-[#C68B59]">
              Stewardship
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-[#1A2421]/75 mt-4 leading-relaxed">
            Founded in {FARM_CONFIG.foundedYear}, {FARM_CONFIG.shopName} began with a humble vow: to restore degraded land 
            back into a fertile, living sanctuary where food is grown as medicine for both body and soil.
          </p>

          {/* Interactive Toggle for Story vs Live Comparison */}
          <div className="flex items-center p-1 bg-[#FAF8F5] border border-[#C68B59]/25 rounded-xl mt-8 shadow-xs">
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-heading font-semibold transition-all cursor-pointer ${
                activeTab === 'mission'
                  ? 'bg-[#1B4332] text-white border border-[#C68B59] shadow-sm'
                  : 'text-[#1A2421]/70 hover:text-[#1A2421]'
              }`}
            >
              Our Heritage & Philosophy
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-heading font-semibold transition-all cursor-pointer ${
                activeTab === 'comparison'
                  ? 'bg-[#1B4332] text-white border border-[#C68B59] shadow-sm'
                  : 'text-[#1A2421]/70 hover:text-[#1A2421]'
              }`}
            >
              The Organic Difference
            </button>
          </div>
        </div>

        {activeTab === 'mission' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: HD Agricultural Images Collage (Equalized Height) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4 h-full">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="flex-1 rounded-2xl overflow-hidden shadow-md border border-[#C68B59]/20 bg-[#FAF8F5] min-h-[220px]">
                  <img
                    src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&auto=format&fit=crop"
                    alt="Farmer inspecting organic harvest at Ulavan Organic Farm"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="p-4 rounded-xl bg-[#1B4332] border border-[#C68B59]/40 text-white shadow-sm shrink-0">
                  <span className="font-heading font-bold text-xl block text-[#40916C]">12+ Years</span>
                  <span className="text-xs font-accent text-[#FAF8F5]/85">Unbroken Chemical-Free Soil Regeneration</span>
                </div>
              </div>

              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#C68B59]/30 text-[#1A2421] shadow-sm shrink-0">
                  <span className="font-heading font-bold text-xl text-[#1B4332] block">180 Acres</span>
                  <span className="text-xs font-accent text-[#C68B59] font-bold">Biodiverse Agroforestry Habitat</span>
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden shadow-md border border-[#C68B59]/20 bg-[#FAF8F5] min-h-[220px]">
                  <img
                    src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=800&auto=format&fit=crop"
                    alt="Rich composted organic soil in hands at Ulavan Organic Farm"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Key Pillars (Equalized Height) */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A2421] leading-tight">
                  Why Ulavan Is More Than Just A Label
                </h3>
                <p className="font-body text-base text-[#1A2421]/80 leading-relaxed mt-3">
                  "Ulavan" translates to the farmer, the tiller, the custodian of the land. 
                  Unlike commercial monoculture, our farming thrives on companion plants, beneficial wildlife, 
                  and hand-tended soil. When you enjoy produce from our farm, you taste food grown the way 
                  nature intended—wholesome, rich in micronutrients, and vibrant.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
                {pillars.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FAF8F5] border border-[#C68B59]/20 hover:border-[#C68B59] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-xs mb-2.5 border border-[#C68B59]/20">
                        {item.icon}
                      </div>
                      <h4 className="font-heading font-bold text-sm text-[#1A2421]">
                        {item.title}
                      </h4>
                      <p className="font-body text-xs text-[#1A2421]/75 mt-1 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote / Certification Callout */}
              <div className="p-4 pt-6 sm:pt-7 rounded-xl bg-[#1B4332] border-l-4 border-[#40916C] text-white shrink-0 mt-auto">
                <p className="font-heading italic text-sm text-white">
                  "Treat the soil with reverence, and every grain harvested will nourish your family with life, strength, and longevity."
                </p>
                <span className="text-xs font-accent text-[#FAF8F5] font-bold block mt-1">
                  — The Ulavan Founding Farmers Collective
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Comparison Table / Cards */
          <div className="bg-[#FAF8F5] rounded-2xl border border-[#C68B59]/25 p-4 sm:p-8 shadow-sm">
            <div className="text-center mb-6">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1A2421]">
                Detailed Comparison: Conventional vs. Ulavan Organic
              </h3>
              <p className="font-body text-sm text-[#1A2421]/70 mt-1">
                Transparent farming practices verified by laboratory soil and leaf tissue tests.
              </p>
            </div>

            <div className="divide-y divide-[#C68B59]/15">
              {comparisonData.map((item, index) => (
                <div
                  key={index}
                  className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  <div className="md:col-span-3 font-heading font-bold text-sm text-[#1A2421]">
                    {item.factor}
                  </div>
                  <div className="md:col-span-4 p-3 rounded-xl bg-red-50/80 border border-red-200/60 flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-accent uppercase font-bold text-red-700 block mb-0.5">
                        Conventional Farming
                      </span>
                      <span className="font-body text-xs text-[#1A2421]/80 leading-relaxed">
                        {item.conventional}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 p-3 rounded-xl bg-[#1B4332] border border-[#C68B59]/40 flex items-start gap-2.5 shadow-xs text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#40916C] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-accent uppercase font-bold text-[#40916C] block mb-0.5">
                        Ulavan Organic Farm
                      </span>
                      <span className="font-body text-xs text-[#FAF8F5] font-medium leading-relaxed">
                        {item.ulavan}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
