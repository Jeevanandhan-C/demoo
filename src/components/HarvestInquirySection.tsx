import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageCircle, Sparkles, Crown } from 'lucide-react';
import { FARM_CONFIG } from '../data/farmData';
import { ProduceItem, PremiumPlan, FarmTourPackage } from '../types';

interface HarvestInquirySectionProps {
  selectedProduceItem?: ProduceItem | null;
  selectedPremiumPlan?: PremiumPlan | null;
  selectedTourPackage?: FarmTourPackage | null;
}

export const HarvestInquirySection: React.FC<HarvestInquirySectionProps> = ({
  selectedProduceItem,
  selectedPremiumPlan,
  selectedTourPackage,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Vellore',
    interest: selectedProduceItem
      ? `Produce: ${selectedProduceItem.name}`
      : selectedPremiumPlan
      ? `Imperial Reserve: ${selectedPremiumPlan.title}`
      : selectedTourPackage
      ? `Tour: ${selectedTourPackage.title}`
      : 'Weekly Imperial Harvest Reserve Box',
    deliveryDay: 'Saturday Dawn Pluck',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update interest if prop changes
  React.useEffect(() => {
    if (selectedProduceItem) {
      setFormData((prev) => ({
        ...prev,
        interest: `Produce: ${selectedProduceItem.name} (${selectedProduceItem.price})`,
      }));
    } else if (selectedPremiumPlan) {
      setFormData((prev) => ({
        ...prev,
        interest: `Imperial Reserve: ${selectedPremiumPlan.title} (${selectedPremiumPlan.price})`,
      }));
    } else if (selectedTourPackage) {
      setFormData((prev) => ({
        ...prev,
        interest: `Tour: ${selectedTourPackage.title} (${selectedTourPackage.price})`,
      }));
    }
  }, [selectedProduceItem, selectedPremiumPlan, selectedTourPackage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      city: 'Vellore',
      interest: 'Weekly Imperial Harvest Reserve Box',
      deliveryDay: 'Saturday Dawn Pluck',
      notes: '',
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Ambient leaf green glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#C68B59]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59]/40 text-xs font-accent font-semibold mb-3 shadow-xs">
            <Mail className="w-3.5 h-3.5 text-[#40916C]" />
            <span>Direct Farm Desks & Harvest Reservations</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A2421] tracking-tight">
            Order Fresh Harvest or{' '}
            <span className="text-[#C68B59]">
              Reserve Your Share
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-[#1A2421]/75 mt-3 leading-relaxed">
            Reserve your weekly organic crate, heirloom grains, wood-pressed oils, or customized family harvest allocation.
            Our farm coordinator confirms every dispatch personally.
          </p>
        </div>

        {/* Main 2-Column Grid: Form & Contact Info (Equal Height) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Direct Harvest Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#C68B59]/25 shadow-xl flex flex-col justify-between h-full">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4 my-auto">
                <div className="w-16 h-16 rounded-full bg-[#1B4332] text-[#40916C] border border-[#C68B59] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8 text-[#40916C]" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#1A2421]">
                  Harvest Reservation Received!
                </h3>
                <p className="font-body text-sm text-[#1A2421]/80 max-w-md mx-auto">
                  Thank you, <strong className="text-[#1A2421]">{formData.fullName}</strong>. We have logged your request for <strong className="text-[#C68B59]">{formData.interest}</strong>. Our farm coordinator will WhatsApp/call you shortly at <strong>{formData.phone}</strong>.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={`https://wa.me/919443218920?text=Hello%20Ulavan%20Farm,%20I%20just%20placed%20an%20inquiry%20for%20${encodeURIComponent(formData.interest)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59] font-heading font-semibold text-xs shadow-md hover:bg-[#C68B59] hover:text-white transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-[#40916C]" />
                    <span>Instant WhatsApp Verification</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl border border-[#1B4332] text-[#1B4332] font-heading font-semibold text-xs hover:bg-[#1B4332] hover:text-white transition-all cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1A2421]/10 pb-3 mb-2">
                    <span className="font-heading font-bold text-base sm:text-lg text-[#1A2421]">
                      Direct Harvest Order & Inquiries
                    </span>
                    <span className="text-[11px] font-accent text-[#C68B59] font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C68B59]" />
                      Farm-Direct Freshness
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold text-[#1A2421] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Senthil Kumar"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#C68B59]/25 text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#C68B59]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-semibold text-[#1A2421] mb-1">
                        Mobile / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#C68B59]/25 text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#C68B59]/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold text-[#1A2421] mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. senthil@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#C68B59]/25 text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#C68B59]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-semibold text-[#1A2421] mb-1">
                        Delivery Region / City
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#C68B59]/25 text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#C68B59]/40"
                      >
                        <option value="Vellore">Vellore City & Suburbs</option>
                        <option value="Ranipet">Ranipet & Walajapet</option>
                        <option value="Chennai">Chennai Metro (Weekly Express)</option>
                        <option value="Bangalore">Bangalore (Special Route)</option>
                        <option value="Other">Other Tamil Nadu District</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-semibold text-[#1A2421] mb-1">
                      Select Produce Box, Premium Reserve, or Custom Order
                    </label>
                    <input
                      type="text"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#C68B59]/25 text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#C68B59]/40"
                      placeholder="e.g. Imperial Harvest Reserve Box, Cold-pressed oils"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold text-[#1A2421] mb-1">
                        Preferred Dispatch Window
                      </label>
                      <select
                        value={formData.deliveryDay}
                        onChange={(e) => setFormData({ ...formData, deliveryDay: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#C68B59]/25 text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#C68B59]/40"
                      >
                        <option value="Saturday Dawn Pluck">Saturday Morning Pluck (Standard)</option>
                        <option value="Tuesday Dawn Pluck">Tuesday Morning Pluck</option>
                        <option value="Thursday Dawn Pluck">Thursday Morning Pluck</option>
                        <option value="Weekend Farm Pickup">Direct Farm Pickup (Weekend)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-semibold text-[#1A2421] mb-1">
                        Packaging Preference
                      </label>
                      <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#C68B59]/25 text-xs text-[#1A2421] flex items-center gap-2">
                        <Crown className="w-4 h-4 text-[#C68B59]" />
                        <span>Zero-plastic breathable jute & wooden crates</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-semibold text-[#1A2421] mb-1">
                      Special Dietary Requests or Delivery Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Low sodium need, diabetic focus, specific greens preference..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#C68B59]/25 text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#C68B59]/40"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="submit-harvest-inquiry"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#1B4332] hover:bg-[#C68B59] text-white font-heading font-bold text-sm shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Send className="w-4 h-4 text-[#40916C]" />
                  <span>Submit Harvest Order Reservation</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact Details & Farm Timings (5 cols - Equal Height) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C68B59]/25 shadow-lg flex-1 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1A2421] mb-5">
                  Visit Our Agricultural Sanctuary
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#1B4332] border border-[#C68B59]/40 text-[#FAF8F5] flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="w-4 h-4 text-[#40916C]" />
                    </div>
                    <div>
                      <span className="text-xs font-accent uppercase text-[#C68B59] font-bold">
                        Farm Coordinates
                      </span>
                      <p className="font-heading text-sm text-[#1A2421] font-semibold">
                        {FARM_CONFIG.location}
                      </p>
                      <span className="text-xs font-body text-[#1A2421]/70">
                        Survey No. 42/3, Palar River Agro Corridor
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#1B4332] border border-[#C68B59]/40 text-[#FAF8F5] flex items-center justify-center shrink-0 shadow-xs">
                      <Phone className="w-4 h-4 text-[#40916C]" />
                    </div>
                    <div>
                      <span className="text-xs font-accent uppercase text-[#C68B59] font-bold">
                        Direct Farm Desks
                      </span>
                      <p className="font-heading text-sm text-[#1A2421] font-semibold">
                        <a href={`tel:${FARM_CONFIG.phone}`} className="hover:underline hover:text-[#C68B59]">
                          {FARM_CONFIG.phone}
                        </a>
                      </p>
                      <span className="text-xs font-body text-[#1A2421]/70">
                        WhatsApp & Voice Calls Available
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#1B4332] border border-[#C68B59]/40 text-[#FAF8F5] flex items-center justify-center shrink-0 shadow-xs">
                      <Clock className="w-4 h-4 text-[#40916C]" />
                    </div>
                    <div>
                      <span className="text-xs font-accent uppercase text-[#C68B59] font-bold">
                        Harvest & Visitor Hours
                      </span>
                      <p className="font-heading text-sm text-[#1A2421] font-semibold">
                        {FARM_CONFIG.operatingHours}
                      </p>
                      <span className="text-xs font-body text-[#1A2421]/70">
                        Early morning visits recommended for birds & dew pluck
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Farm Guarantees */}
                <div className="mt-6 pt-5 border-t border-[#C68B59]/15 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-accent text-[#1A2421]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C68B59] shrink-0" />
                    <span>Harvested at dawn on dispatch day • Never cold-frozen</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-accent text-[#1A2421]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C68B59] shrink-0" />
                    <span>Zero chemical waxes, artificial gas ripening, or preservatives</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-accent text-[#1A2421]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C68B59] shrink-0" />
                    <span>Eco-crate delivery & direct-from-soil harvest verification</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-5 rounded-2xl bg-[#1B4332] border border-[#C68B59]/40 text-white flex items-center justify-between mt-auto">
                <div>
                  <span className="text-xs font-accent text-[#40916C] font-bold uppercase">
                    Have Quick Inquiries?
                  </span>
                  <p className="font-heading font-bold text-sm text-white">
                    Chat with our Agri-Advisor
                  </p>
                </div>
                <a
                  href={`https://wa.me/919443218920?text=Hello%20Ulavan%20Organic%20Farm,%20I%20would%20like%20to%20know%20more%20about%20produce%20and%20harvest%20crates`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#C68B59] hover:bg-[#C68B59] text-white text-xs font-heading font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#FAF8F5]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
