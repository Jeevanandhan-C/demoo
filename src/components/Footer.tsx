import React, { useState } from 'react';
import { Sprout, ArrowUp, Mail, Phone, MapPin, Check, Send } from 'lucide-react';
import { FARM_CONFIG, NAV_LINKS } from '../data/farmData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#1B4332] text-white pt-16 pb-8 border-t border-[#C68B59]/40 relative overflow-hidden">
      {/* Ambient green glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#40916C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C68B59]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter Strip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#C68B59]/35 border border-[#40916C]/30 shadow-xl mb-12 sm:mb-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-accent font-bold text-[#40916C] uppercase tracking-wider">
              <Sprout className="w-4 h-4 text-[#40916C]" />
              <span>Weekly Harvest Gazette</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Receive Dawn Harvest Alerts & Seasonal Allocations
            </h3>
            <p className="font-body text-xs sm:text-sm text-white/75">
              Get notified every Monday when the seasonal harvest basket opens for reservations.
            </p>
          </div>

          <div className="md:col-span-6">
            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-[#1A2421] border border-[#40916C] flex items-center gap-2.5 text-[#FAF8F5] text-xs font-heading font-semibold">
                <Check className="w-4 h-4 text-[#40916C]" />
                <span>Subscribed! You will receive our next harvest newsletter.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col xs:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#1A2421] border border-[#40916C]/40 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#40916C]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#40916C] hover:bg-[#C68B59] text-[#1A2421] hover:text-white font-heading font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-all"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Main Footer Columns (Responsive: 1280px 4 cols, 768px 2 cols, 425px 1 col) */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-[#C68B59]/30">
          {/* Column 1: Brand & Ethos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#C68B59] border border-[#40916C]/40 flex items-center justify-center text-[#FAF8F5]">
                <Sprout className="w-5 h-5 text-[#40916C]" />
              </div>
              <span className="font-heading font-bold text-lg text-white">
                {FARM_CONFIG.shopName}
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-white/75 leading-relaxed">
              Pioneering regenerative natural farming in Tamil Nadu since {FARM_CONFIG.foundedYear}. 
              Restoring soil organic carbon, conserving heirloom non-hybrid seeds, and connecting families to authentic chemical-free food.
            </p>
            <div className="pt-1 text-xs font-accent text-[#FAF8F5] font-semibold">
              Registered with Jaivik Bharat & NPOP India.
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#40916C]">
              Explore Farm
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs sm:text-sm font-body text-white/80 hover:text-[#40916C] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Farm Harvest Categories */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#40916C]">
              Pure Harvests
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-body text-white/80">
              <li>Country Greens & Native Spinach</li>
              <li>Heirloom Mappillai Samba Rice</li>
              <li>Forbidden Black Kavuni Grains</li>
              <li>Wood-Pressed Marachekku Oils</li>
              <li>Sub-surface Agroforestry Guavas</li>
              <li>Imperial Reserve Harvest Club</li>
            </ul>
          </div>

          {/* Column 4: Location & Desks */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#40916C]">
              Agro Desks
            </h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#40916C] shrink-0 mt-0.5" />
                <span>{FARM_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#40916C] shrink-0" />
                <a href={`tel:${FARM_CONFIG.phone}`} className="hover:text-[#40916C]">
                  {FARM_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#40916C] shrink-0" />
                <a href={`mailto:${FARM_CONFIG.email}`} className="hover:text-[#40916C] truncate">
                  {FARM_CONFIG.email}
                </a>
              </div>
              <div className="pt-2 text-[11px] font-accent text-white/60">
                {FARM_CONFIG.operatingHours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-accent text-white/60">
          <div>
            © {new Date().getFullYear()} {FARM_CONFIG.shopName}. All rights reserved. 100% Certified Organic.
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-[#FAF8F5]/80">Crafted with living soil reverence</span>
            <button
              onClick={scrollToTop}
              id="scroll-to-top-button"
              className="p-2.5 rounded-xl bg-[#C68B59] border border-[#40916C]/40 hover:bg-[#40916C] hover:text-[#1A2421] text-[#FAF8F5] transition-all cursor-pointer flex items-center gap-1.5"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[11px] font-heading font-bold">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
