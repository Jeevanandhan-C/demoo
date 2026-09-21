import React, { useState } from 'react';
import { Sprout, CheckCircle2, Clock, ShieldCheck, ArrowRight, Dna, Layers, Bug, Truck } from 'lucide-react';
import { PROCESS_STEPS } from '../data/farmData';
import { InteractiveCycleWheel } from './InteractiveCycleWheel';

// Specialized unique scientific indicators for each stage in the right container
const STAGE_SCIENTIFIC_DATA = [
  [
    { icon: Dna, label: 'Seed Lineage', value: '50+ Yrs Heirloom' },
    { icon: ShieldCheck, label: 'Priming Protocol', value: 'Panchagavya Infused' },
    { icon: CheckCircle2, label: 'Synthetic Residue', value: '0.00% Verified' },
  ],
  [
    { icon: Layers, label: 'Living Loam', value: '10x Earthworm Vitality' },
    { icon: ShieldCheck, label: 'Bio Inoculation', value: 'Fresh Jeevamrutham' },
    { icon: CheckCircle2, label: 'Chemical NPK', value: '0.00% Synthetics' },
  ],
  [
    { icon: Bug, label: 'Herbal Shield', value: 'Agniastra Decoction' },
    { icon: ShieldCheck, label: 'Insect Balance', value: 'Ladybirds Preserved' },
    { icon: CheckCircle2, label: 'Trap Crops', value: 'Companion Marigolds' },
  ],
  [
    { icon: Clock, label: 'Plucking Time', value: '5:00 AM Dawn Harvest' },
    { icon: Truck, label: 'Doorstep Speed', value: '< 12h Kitchen Table' },
    { icon: ShieldCheck, label: 'Zero Plastic', value: 'Banana-Leaf Packaging' },
  ],
];

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = PROCESS_STEPS[activeStepIndex];
  const currentIndicators = STAGE_SCIENTIFIC_DATA[activeStepIndex] || STAGE_SCIENTIFIC_DATA[0];

  return (
    <section id="process" className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#C68B59]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#C68B59]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59]/40 text-xs font-accent font-semibold mb-3 shadow-xs">
            <Sprout className="w-3.5 h-3.5 text-[#40916C]" />
            <span>Farm-to-Kitchen Closed Loop</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A2421] tracking-tight">
            The Regenerative{' '}
            <span className="text-[#C68B59]">
              Growth Cycle
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-[#1A2421]/75 mt-3 leading-relaxed">
            Every leaf and grain from Ulavan Organic Farm follows an uncompromised 4-stage biological protocol, 
            guaranteeing 0.00% synthetic residue from seed selection to your kitchen table.
          </p>
        </div>

        {/* TWO-CONTAINER BALANCED SECTION LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* CONTAINER 1 (LEFT SIDE): Interactive Biological Circle Wheel */}
          <div className="lg:col-span-5 flex flex-col">
            <InteractiveCycleWheel
              steps={PROCESS_STEPS}
              activeStepIndex={activeStepIndex}
              onSelectStep={setActiveStepIndex}
            />
          </div>

          {/* CONTAINER 2 (RIGHT SIDE): Professional, Unique Scientific & Protocol Deep-Dive */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-[#C68B59]/20 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Ambient green glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C68B59]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#C68B59]/15">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59]/40 font-heading font-bold text-xs">
                    Stage 0{currentStep.step} of 04
                  </span>
                  <span className="text-xs font-accent text-[#C68B59] font-bold">
                    Regenerative Protocol
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#C68B59]/25 text-xs font-accent text-[#1A2421] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#C68B59]" />
                  <span>Cadence: {currentStep.duration}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1A2421] tracking-tight">
                  {currentStep.title}
                </h3>
                <h4 className="font-heading font-semibold text-sm sm:text-base text-[#C68B59] mt-1">
                  {currentStep.subtitle}
                </h4>
                <p className="font-body text-sm sm:text-base text-[#1A2421]/80 leading-relaxed mt-2.5">
                  {currentStep.description}
                </p>
              </div>

              {/* Unique 3-Pillar Scientific Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {currentIndicators.map((ind, idx) => {
                  const Icon = ind.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#C68B59]/20 flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-1.5 text-[#C68B59] mb-1">
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-accent uppercase tracking-wider font-bold text-[#1A2421]/70">
                          {ind.label}
                        </span>
                      </div>
                      <span className="font-heading font-bold text-xs sm:text-[13px] text-[#1B4332] line-clamp-1">
                        {ind.value}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Biological Checkpoints */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-accent uppercase tracking-wider text-[#1A2421]/60 font-bold">
                  Verified Field Protocols:
                </div>
                {currentStep.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C68B59] shrink-0 mt-0.5" />
                    <span className="font-body text-xs sm:text-sm text-[#1A2421]/85 font-medium">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Field Photography Visual Strip */}
              <div className="relative rounded-2xl overflow-hidden aspect-[21/9] sm:aspect-[24/8] border border-[#C68B59]/25 shadow-sm">
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/85 via-[#1B4332]/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#40916C]" />
                    <span className="text-xs font-accent font-bold">
                      Zero Heavy Metals & 100% Bio-Active Soil
                    </span>
                  </div>
                  <span className="text-[10px] font-accent text-[#FAF8F5] font-bold bg-[#1B4332]/80 px-2 py-0.5 rounded border border-[#C68B59]/40 hidden sm:inline">
                    Lab Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Stepper Navigation & Action Bar */}
            <div className="pt-4 mt-5 border-t border-[#1A2421]/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-2 rounded-xl text-xs font-heading font-semibold border border-[#C68B59] text-[#1B4332] disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#FAF8F5] cursor-pointer transition-colors"
                >
                  Previous Stage
                </button>
                <button
                  disabled={activeStepIndex === PROCESS_STEPS.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(PROCESS_STEPS.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl text-xs font-heading font-semibold bg-[#1B4332] text-white border border-[#C68B59] disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#C68B59] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <a
                href="#order"
                className="text-xs font-accent font-bold text-[#1B4332] hover:text-[#C68B59] flex items-center gap-1 transition-colors"
              >
                <span>Reserve this harvest</span>
                <ArrowRight className="w-3 h-3 text-[#C68B59]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
