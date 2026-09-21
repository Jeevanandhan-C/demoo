import React from 'react';
import { ArrowRight, ShieldCheck, SunMedium, CalendarCheck, Sprout, Crown } from 'lucide-react';
import { HERO_STATS, FARM_CONFIG } from '../data/farmData';

interface HeroSectionProps {
  onExploreHarvest: () => void;
  onExplorePremium?: () => void;
  onBookTour?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreHarvest, onExplorePremium, onBookTour }) => {
  const handlePremiumClick = () => {
    if (onExplorePremium) {
      onExplorePremium();
    } else if (onBookTour) {
      onBookTour();
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#FAF8F5]"
    >
      {/* Ambient background glows with natural palette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1280px] h-[550px] pointer-events-none opacity-40">
        <div className="absolute top-12 left-10 w-96 h-96 rounded-full bg-[#C68B59]/15 blur-3xl" />
        <div className="absolute top-24 right-10 w-96 h-96 rounded-full bg-[#C68B59]/10 blur-3xl" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Narrative & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Trust Pill with Sprout */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] border border-[#C68B59]/40 text-xs font-accent font-semibold text-[#FAF8F5] shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#40916C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#40916C]"></span>
              </span>
              <span>100% Certified Chemical-Free & Regenerative Soil</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A2421] tracking-tight leading-[1.12]">
              Nurtured by Nature,{' '}
              <span className="text-[#C68B59]">
                Harvested with Integrity
              </span>
            </h1>

            {/* Description */}
            <p className="font-body text-base sm:text-lg text-[#1A2421]/80 max-w-2xl leading-relaxed">
              Welcome to <strong className="text-[#1A2421] font-bold">{FARM_CONFIG.shopName}</strong>. 
              We revive ancient Vrikshayurveda farming practices across 180 sun-drenched acres in Tamil Nadu. 
              Delivering hand-picked heirloom grains, cold-pressed oils, and crisp morning greens directly to your dining table.
            </p>

            {/* CTAs */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 w-full sm:w-auto pt-2">
              <button
                onClick={onExploreHarvest}
                id="hero-cta-harvest"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1B4332] text-white border border-[#C68B59] hover:bg-[#C68B59] font-heading font-semibold text-base shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <span>Explore Today's Harvest</span>
                <ArrowRight className="w-5 h-5 text-[#40916C]" />
              </button>

              <button
                onClick={handlePremiumClick}
                id="hero-cta-tour"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-[#C68B59] text-[#1B4332] bg-white hover:bg-[#1B4332] hover:text-white hover:border-[#1B4332] font-heading font-semibold text-base transition-all active:scale-98 cursor-pointer shadow-xs"
              >
                <Crown className="w-4 h-4 text-[#C68B59]" />
                <span>Explore Imperial Reserve</span>
              </button>
            </div>

            {/* Quick Micro Indicators */}
            <div className="pt-2 grid grid-cols-2 xs:grid-cols-3 gap-3 text-xs font-accent text-[#1A2421]/75 w-full">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C68B59] shrink-0" />
                <span>Zero Pesticides</span>
              </div>
              <div className="flex items-center gap-1.5">
                <SunMedium className="w-4 h-4 text-[#C68B59] shrink-0" />
                <span>Solar-Powered Drip</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 xs:col-span-1">
                <CalendarCheck className="w-4 h-4 text-[#C68B59] shrink-0" />
                <span>Morning Dawn Pluck</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero HD Image with Depth Framing & Floating Badges */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Outer Decorative Border */}
            <div className="relative p-2.5 rounded-3xl bg-gradient-to-b from-[#C68B59]/30 via-[#1B4332]/20 to-[#C68B59]/30 shadow-2xl border border-[#C68B59]/30">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] bg-[#1B4332]/10">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
                  alt="Ulavan Organic Farm agricultural fields in golden morning sunlight"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Subtle Image Gradient Tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/80 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Caption on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-accent uppercase tracking-widest text-[#FAF8F5] font-bold">
                    Vellore Heritage Plots
                  </span>
                  <p className="font-heading font-semibold text-base sm:text-lg drop-shadow-sm">
                    Multi-tier companion crops thriving without synthetic inputs.
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Fresh Pluck Indicator */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white border border-[#C68B59]/30 rounded-2xl p-3 shadow-xl flex items-center gap-3 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-[#1B4332] flex items-center justify-center text-[#FAF8F5] border border-[#C68B59]/30">
                  <Sprout className="w-5 h-5 text-[#40916C]" />
                </div>
                <div>
                  <div className="text-[11px] font-accent text-[#C68B59] font-bold uppercase tracking-wider">
                    Today's Dispatch
                  </div>
                  <div className="font-heading font-bold text-xs sm:text-sm text-[#1A2421]">
                    Morning Pluck Ready
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Heirloom Preservation */}
              <div className="hidden xs:flex absolute -bottom-5 -left-2 sm:-left-6 bg-[#1B4332] border border-[#C68B59]/40 text-white rounded-2xl p-3 shadow-xl items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1A2421] border border-[#C68B59]/30 flex items-center justify-center text-[#40916C]">
                  <ShieldCheck className="w-5 h-5 text-[#40916C]" />
                </div>
                <div>
                  <div className="font-heading font-bold text-xs text-white">
                    Jaivik Bharat & NPOP
                  </div>
                  <div className="text-[11px] font-accent text-[#FAF8F5]">
                    100% Accredited Organic
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Bottom Stats Strip */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-[#1A2421]/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {HERO_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col p-4 rounded-2xl bg-white border border-[#C68B59]/20 shadow-xs hover:border-[#C68B59] hover:shadow-md transition-all"
            >
              <span className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1B4332]">
                {stat.value}
              </span>
              <span className="font-heading font-bold text-sm text-[#1A2421] mt-1">
                {stat.label}
              </span>
              <span className="font-accent text-xs text-[#C68B59] font-semibold mt-0.5">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
