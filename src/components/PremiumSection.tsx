import React, { useState } from 'react';
import { Crown, Sparkles, Check, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { PREMIUM_PLANS, FARM_CONFIG } from '../data/farmData';
import { PremiumPlan } from '../types';

interface PremiumSectionProps {
  onSelectPlan: (plan: PremiumPlan) => void;
}

export const PremiumSection: React.FC<PremiumSectionProps> = ({ onSelectPlan }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(PREMIUM_PLANS[0].id);

  return (
    <section id="premium" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle Luxury Agricultural Ambient Glows */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#C68B59]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-[#C68B59]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] border border-[#C68B59]/40 text-[#FAF8F5] text-xs font-accent font-bold mb-3 shadow-xs">
            <Crown className="w-3.5 h-3.5 text-[#40916C]" />
            <span>Exclusive Harvest Allocations • Limited Membership</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A2421] tracking-tight">
            The Ulavan{' '}
            <span className="text-[#C68B59]">
              Imperial Reserve
            </span>
          </h2>

          <p className="font-body text-base sm:text-lg text-[#1A2421]/80 mt-4 leading-relaxed">
            Curated heirloom harvests, first-dawn cold-pressed elixirs, and bespoke plastic-free hampers. 
            Direct from our private heritage plots to your dining table with guaranteed zero-chemical laboratory test certificates.
          </p>
        </div>

        {/* 3 Premium Reserve Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PREMIUM_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`group relative rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 border ${
                  plan.featured
                    ? 'bg-[#FAF8F5] border-[#1B4332] shadow-2xl ring-2 ring-[#C68B59]'
                    : 'bg-[#FAF8F5] border-[#C68B59]/20 hover:border-[#1B4332] shadow-md hover:shadow-xl'
                }`}
              >
                {/* Header Tag / Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-accent font-bold shadow-md flex items-center gap-1.5 ${
                    plan.featured
                      ? 'bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59]'
                      : 'bg-white text-[#1A2421] border border-[#C68B59]/30'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5 text-[#C68B59]" />
                    <span>{plan.badge}</span>
                  </span>
                </div>

                {/* Plan Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1B4332]/10">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 via-[#1B4332]/20 to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-accent uppercase tracking-wider text-[#40916C] font-bold">
                      {plan.cadence}
                    </span>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white line-clamp-1">
                      {plan.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    {/* Audience & Pricing Strip */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#C68B59]/20 shadow-xs">
                      <div className="text-[11px] font-accent text-[#1A2421]/70 mb-1">
                        Designed for: <strong className="text-[#1A2421] font-bold">{plan.bestFor}</strong>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1B4332]">
                          {plan.price}
                        </span>
                        <span className="text-xs font-accent text-[#C68B59] font-bold">
                          {plan.frequency}
                        </span>
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div>
                      <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#1A2421] block mb-2">
                        Allocated Inclusions:
                      </span>
                      <ul className="space-y-2.5">
                        {plan.includes.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs font-body text-[#1A2421]/85">
                            <Check className="w-4 h-4 text-[#C68B59] shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusive Bonus Box */}
                    <div className="p-3 rounded-xl bg-[#1B4332] border border-[#C68B59]/40 text-[#FAF8F5]">
                      <div className="flex items-center gap-1.5 text-[11px] font-accent font-bold text-[#40916C] mb-0.5">
                        <Crown className="w-3.5 h-3.5 text-[#40916C]" />
                        <span>Member Privilege Bonus:</span>
                      </div>
                      <p className="text-xs font-body text-white/90">
                        {plan.exclusiveBonus}
                      </p>
                    </div>
                  </div>

                  {/* Reserve Action Button */}
                  <div className="pt-2 border-t border-[#1A2421]/10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPlan(plan);
                      }}
                      className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-heading font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                        plan.featured || isSelected
                          ? 'bg-[#1B4332] text-white border border-[#C68B59] hover:bg-[#C68B59] active:scale-98'
                          : 'bg-white border-2 border-[#C68B59] text-[#1B4332] hover:bg-[#1B4332] hover:text-white'
                      }`}
                    >
                      <Crown className="w-4 h-4 text-[#40916C]" />
                      <span>Reserve Member Allocation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Private Agricultural Concierge Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#1B4332] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#C68B59]/40">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C68B59] border border-[#40916C]/40 text-[#FAF8F5] flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6 text-[#40916C]" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                Looking for Bespoke Institutional or Ayurvedic Nutrition Crates?
              </h4>
              <p className="font-body text-xs sm:text-sm text-white/80 mt-1 max-w-2xl leading-relaxed">
                We accommodate customized dietary requests, therapeutic herbs (Siru Keerai, Vallarai, Karpooravalli), 
                and specific unpolished millets directly managed by our resident agricultural experts.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`https://wa.me/919443218920?text=Hello%20Ulavan%20Farm,%20I%20am%20inquiring%20about%20the%20Ulavan%20Imperial%20Reserve%20Farm%20Club`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#40916C] hover:bg-[#C68B59] text-[#1A2421] font-heading font-bold text-xs shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Farm Concierge</span>
            </a>
            <a
              href={`tel:${FARM_CONFIG.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF8F5] font-heading font-bold text-xs border border-[#C68B59]/40 transition-colors"
            >
              <span>{FARM_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
