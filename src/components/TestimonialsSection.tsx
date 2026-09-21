import React, { useState, useEffect, useRef } from 'react';
import { Star, ShieldCheck, Heart, Award, FileCheck, CheckCircle2, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS, FARM_CONFIG } from '../data/farmData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [itemsPerView, setItemsPerView] = useState(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive itemsPerView
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1200) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - itemsPerView);

  // Auto slide when not hovered
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section id="community" className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#C68B59]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C68B59]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59]/40 text-xs font-accent font-semibold mb-3 shadow-sm">
              <Heart className="w-3.5 h-3.5 text-[#40916C]" />
              <span>Community Trust & Verified Purity</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A2421] tracking-tight">
              Loved by Doctors, Chefs &{' '}
              <span className="text-[#C68B59]">
                Conscious Families
              </span>
            </h2>
            <p className="font-body text-base sm:text-lg text-[#1A2421]/80 mt-3 leading-relaxed">
              Real testimonials from our harvest club members who rely on {FARM_CONFIG.shopName} for genuine, uncompromised living nutrition.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border-2 border-[#C68B59] bg-white text-[#1B4332] hover:bg-[#1B4332] hover:text-white hover:border-[#1B4332] transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full bg-[#1B4332] border-2 border-[#1B4332] text-white hover:bg-[#C68B59] transition-all flex items-center justify-center cursor-pointer shadow-md active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden mb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {TESTIMONIALS.map((item) => {
              const isHovered = hoveredId === item.id;
              return (
                <div
                  key={item.id}
                  style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                  className="px-3"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Card with dynamic color change on hover */}
                  <div
                    className={`h-full rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 cursor-pointer relative overflow-hidden border ${
                      isHovered
                        ? 'bg-[#1B4332] text-white border-[#C68B59] shadow-2xl scale-[1.02] ring-2 ring-[#40916C]/50'
                        : 'bg-white text-[#1A2421] border-[#C68B59]/20 shadow-md hover:shadow-xl'
                    }`}
                  >
                    {/* Decorative green ambient highlight when hovered */}
                    <div
                      className={`absolute -right-12 -top-12 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 ${
                        isHovered ? 'bg-[#40916C]/20 opacity-100' : 'opacity-0'
                      }`}
                    />

                    <div>
                      {/* Top bar: Stars & Quote Icon */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 transition-colors duration-300 ${
                                isHovered ? 'fill-[#40916C] text-[#40916C]' : 'fill-[#C68B59] text-[#C68B59]'
                              }`}
                            />
                          ))}
                        </div>
                        <Quote
                          className={`w-7 h-7 transition-colors duration-500 ${
                            isHovered ? 'text-[#40916C]' : 'text-[#C68B59]/40'
                          }`}
                        />
                      </div>

                      {/* Comment text with color change */}
                      <p
                        className={`font-body text-sm sm:text-base italic leading-relaxed transition-colors duration-300 ${
                          isHovered ? 'text-[#FAF8F5]' : 'text-[#1A2421]/85'
                        }`}
                      >
                        "{item.comment}"
                      </p>
                    </div>

                    {/* Author Footer */}
                    <div
                      className={`pt-6 mt-6 border-t flex items-center justify-between transition-colors duration-300 ${
                        isHovered ? 'border-[#C68B59]/50' : 'border-[#1A2421]/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className={`w-12 h-12 rounded-full object-cover border-2 transition-colors duration-300 ${
                            isHovered ? 'border-[#40916C]' : 'border-[#C68B59]/40'
                          }`}
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop';
                          }}
                        />
                        <div className="min-w-0">
                          <h3
                            className={`font-heading font-bold text-sm sm:text-base whitespace-nowrap transition-colors duration-300 ${
                              isHovered ? 'text-white' : 'text-[#1A2421]'
                            }`}
                          >
                            {item.name}
                          </h3>
                          <span
                            className={`text-xs font-accent block font-semibold whitespace-nowrap transition-colors duration-300 ${
                              isHovered ? 'text-[#40916C]' : 'text-[#C68B59]'
                            }`}
                          >
                            {item.role}
                          </span>
                          <span
                            className={`text-[11px] font-accent block whitespace-nowrap transition-colors duration-300 ${
                              isHovered ? 'text-[#FAF8F5]/70' : 'text-[#1A2421]/60'
                            }`}
                          >
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {item.verifiedPurchase && (
                        <div
                          className={`flex items-center gap-1 text-[11px] font-accent font-bold px-2.5 py-1 rounded-full transition-all duration-300 ${
                            isHovered
                              ? 'bg-[#40916C] text-[#1A2421]'
                              : 'bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59]/40'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentIndex === dotIdx
                  ? 'w-8 bg-[#C68B59]'
                  : 'w-2.5 bg-[#1A2421]/20 hover:bg-[#1A2421]/40'
              }`}
            />
          ))}
        </div>

        {/* Accredited Purity Trust Seal Strip */}
        <div className="bg-[#1B4332] border border-[#C68B59]/40 rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle green glow backdrops */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#40916C]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/3 w-60 h-60 bg-[#C68B59]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C68B59] text-xs font-accent font-semibold border border-[#40916C]/40 text-[#FAF8F5]">
                <FileCheck className="w-4 h-4 text-[#40916C]" />
                <span>Quarterly NABL Lab Certified</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Multi-Residue Chemical Screening: <span className="text-[#40916C]">0.00%</span>
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#FAF8F5]/80 leading-relaxed">
                We test soil, water, and harvested leaf tissues every quarter for over 210 banned synthetic pesticides, heavy metals, and chemical additives. All reports are open-source and verified.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {FARM_CONFIG.certifications.map((cert, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-accent bg-[#C68B59]/40 px-3 py-1 rounded-lg text-[#FAF8F5] border border-[#40916C]/30 font-semibold"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#C68B59]/30 border border-[#40916C]/25">
                <ShieldCheck className="w-6 h-6 text-[#40916C] mb-2" />
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-white block">
                  0.00%
                </span>
                <span className="text-xs font-accent text-[#FAF8F5] font-medium">
                  Organophosphates & Glyphosate
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#C68B59]/30 border border-[#40916C]/25">
                <Award className="w-6 h-6 text-[#40916C] mb-2" />
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-white block">
                  100%
                </span>
                <span className="text-xs font-accent text-[#FAF8F5] font-medium">
                  Non-GMO Open Pollinated Seeds
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#C68B59]/30 border border-[#40916C]/25">
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-white block">
                  1.2M L
                </span>
                <span className="text-xs font-accent text-[#FAF8F5]/80 font-medium">
                  Rainwater Recharged Annually
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#C68B59]/30 border border-[#40916C]/25">
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-white block">
                  2.8%
                </span>
                <span className="text-xs font-accent text-[#40916C] font-medium">
                  Soil Organic Carbon (vs 0.5% State)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
