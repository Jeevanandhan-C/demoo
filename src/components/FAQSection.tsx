import React, { useState, useMemo } from 'react';
import { HelpCircle, ChevronDown, Sparkles, MessageCircle, Phone, Search, ShieldCheck, Check, Layers } from 'lucide-react';
import { FAQS, FARM_CONFIG } from '../data/farmData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(FAQS.map((f) => f.category)));
    return ['All', ...cats];
  }, []);

  // Filtered FAQs based on category & search
  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleExpandAll = () => {
    setOpenIndex(-1); // or toggle
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Ambient luxury glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#C68B59]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#C68B59]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59]/40 text-xs font-accent font-semibold mb-3 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#40916C]" />
            <span>Transparency & Knowledge Vault</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A2421] tracking-tight">
            Frequently Asked{' '}
            <span className="text-[#C68B59]">
              Questions
            </span>
          </h2>

          <p className="font-body text-base sm:text-lg text-[#1A2421]/75 mt-3 leading-relaxed">
            Everything you need to know about our heirloom farming practices, dawn harvest logistics, 
            lab verification, and the Imperial Reserve Harvest Club.
          </p>
        </div>

        {/* 2-Column Balanced Equalized Height Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Interactive Categories & Agricultural Concierge (5 cols - Equalized Height) */}
          <div className="lg:col-span-5 flex flex-col h-full space-y-4 sm:space-y-5">
            {/* Search Input */}
            <div className="relative shrink-0">
              <input
                type="text"
                placeholder="Search queries (e.g. cold-pressed, delivery, lab test)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FAF8F5] border border-[#C68B59]/25 text-sm text-[#1A2421] placeholder-[#1A2421]/45 focus:outline-none focus:ring-2 focus:ring-[#C68B59]/50 transition-all shadow-xs"
              />
              <Search className="w-5 h-5 text-[#C68B59] absolute left-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-accent text-[#1A2421]/60 hover:text-[#1A2421]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="bg-[#FAF8F5] rounded-3xl p-5 sm:p-6 border border-[#C68B59]/20 shadow-sm space-y-3 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#1A2421]">
                  Filter by Category
                </span>
                <span className="text-xs font-accent text-[#C68B59] font-semibold">
                  {filteredFaqs.length} Available
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {categories.map((cat) => {
                  const isCatSelected = selectedCategory === cat;
                  const count = cat === 'All' ? FAQS.length : FAQS.filter((f) => f.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-accent font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isCatSelected
                          ? 'bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59] shadow-sm'
                          : 'bg-white text-[#1A2421]/80 border border-[#C68B59]/20 hover:border-[#1B4332]/50 hover:bg-white'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isCatSelected ? 'bg-[#40916C] text-[#1A2421] font-bold' : 'bg-[#FAF8F5] text-[#1A2421]/60'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Agricultural Concierge Card (Fills Full Remaining Height) */}
            <div className="bg-[#1B4332] rounded-3xl p-6 sm:p-7 border border-[#C68B59]/40 text-white shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between mt-auto">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#40916C]/15 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-2 text-[#FAF8F5] text-xs font-accent font-bold mb-2">
                  <Sparkles className="w-4 h-4 text-[#40916C]" />
                  <span>Need Personalized Guidance?</span>
                </div>

                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  Talk with our Chief Agriculturist
                </h3>
                
                <p className="font-body text-xs sm:text-sm text-[#FAF8F5]/80 leading-relaxed mb-4">
                  Have specific queries regarding diabetic diets, ancient grains, cold-pressed oil sedimentation, or seasonal farm availability? We respond within minutes.
                </p>

                <div className="space-y-2 py-3 border-y border-[#C68B59]/40 mb-4">
                  <div className="flex items-center gap-2 text-xs font-accent text-[#FAF8F5]/90">
                    <Check className="w-3.5 h-3.5 text-[#40916C] shrink-0" />
                    <span>Personalized harvest box & family dietary sizing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-accent text-[#FAF8F5]/90">
                    <Check className="w-3.5 h-3.5 text-[#40916C] shrink-0" />
                    <span>Unadulterated ancestral grains & pure oil queries</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/919443218920?text=Hello%20Ulavan%20Farm,%20I%20have%20a%20specific%20question%20about%20your%20produce%20and%20practices`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#40916C] hover:bg-[#C68B59] text-[#1A2421] font-heading font-bold text-xs active:scale-98 transition-all shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Concierge</span>
                  </a>
                  <a
                    href={`tel:${FARM_CONFIG.phone}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#C68B59]/40 border border-[#40916C]/30 text-white font-heading font-semibold text-xs hover:bg-[#C68B59] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#40916C]" />
                    <span>{FARM_CONFIG.phone}</span>
                  </a>
                </div>

                <div className="mt-4 pt-4 border-t border-[#C68B59]/30 flex items-center justify-between text-[11px] font-accent text-[#FAF8F5]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#40916C] shrink-0" />
                    <span>Direct farm desk • No automated bots</span>
                  </div>
                  <span className="text-[#FAF8F5]/60 text-[10px]">Avg response 10m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Accordion Items (7 cols - Equalized Height) */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-3.5">
            {filteredFaqs.length === 0 ? (
              <div className="bg-[#FAF8F5] rounded-3xl p-10 border border-[#C68B59]/20 text-center space-y-3 h-full flex flex-col items-center justify-center my-auto">
                <HelpCircle className="w-10 h-10 text-[#C68B59] mx-auto" />
                <h4 className="font-heading font-bold text-lg text-[#1A2421]">No Matching Questions</h4>
                <p className="font-body text-xs sm:text-sm text-[#1A2421]/70 max-w-sm mx-auto">
                  We could not find answers matching "{searchQuery}". Feel free to message our farm directly on WhatsApp for an immediate response.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1B4332] text-white font-heading font-semibold text-xs cursor-pointer hover:bg-[#C68B59] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  const formattedNum = String(idx + 1).padStart(2, '0');

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                        isOpen
                          ? 'bg-[#FAF8F5] border-[#C68B59] shadow-lg ring-1 ring-[#C68B59]/30'
                          : 'bg-white border-[#C68B59]/20 hover:border-[#1B4332]/40 shadow-xs hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(idx)}
                        aria-expanded={isOpen}
                        className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer group"
                      >
                        <div className="flex items-start gap-3.5">
                          <span className={`font-heading font-extrabold text-sm sm:text-base shrink-0 pt-0.5 transition-colors ${
                            isOpen ? 'text-[#C68B59]' : 'text-[#1A2421]/40 group-hover:text-[#C68B59]'
                          }`}>
                            {formattedNum}
                          </span>
                          <div>
                            <span className="inline-block text-[10px] font-accent uppercase tracking-wider text-[#C68B59] font-bold mb-1">
                              {faq.category}
                            </span>
                            <h3 className={`font-heading font-bold text-sm sm:text-base transition-colors leading-snug ${
                              isOpen ? 'text-[#1A2421]' : 'text-[#1A2421] group-hover:text-[#C68B59]'
                            }`}>
                              {faq.question}
                            </h3>
                          </div>
                        </div>

                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#1B4332] text-white rotate-180'
                            : 'bg-[#FAF8F5] text-[#1A2421] group-hover:bg-[#C68B59]/15 group-hover:text-[#1B4332]'
                        }`}>
                          <ChevronDown className="w-4 h-4 transition-transform" />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm font-body text-[#1A2421]/85 leading-relaxed border-t border-[#C68B59]/15 animate-in fade-in duration-200">
                          <p className="pl-7 sm:pl-8">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {filteredFaqs.length <= 3 && (
                  <div className="mt-auto p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#C68B59]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-accent uppercase tracking-wider text-[#C68B59] font-bold block mb-0.5">
                        Extended Knowledge Archive
                      </span>
                      <h4 className="font-heading font-bold text-sm text-[#1A2421]">
                        Looking for more answers across other categories?
                      </h4>
                      <p className="font-body text-xs text-[#1A2421]/70 mt-1">
                        Explore all {FAQS.length} verified answers regarding dawn harvests, non-GMO heirloom seeds, and laboratory tests.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setSearchQuery('');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#1B4332] text-white hover:bg-[#C68B59] font-heading font-semibold text-xs whitespace-nowrap transition-all shadow-xs cursor-pointer shrink-0"
                    >
                      View All {FAQS.length} Questions
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
