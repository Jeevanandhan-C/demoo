import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Sprout, ShoppingBag, ArrowRight } from 'lucide-react';
import { NAV_LINKS, FARM_CONFIG } from '../data/farmData';

interface NavbarProps {
  onOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="main-sticky-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#C68B59]/20 py-3'
          : 'bg-[#FAF8F5]/70 backdrop-blur-xs py-4 sm:py-5 border-b border-[#1A2421]/10'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2.5 group shrink-0"
            id="brand-logo-link"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] border border-[#C68B59]/40 flex items-center justify-center text-[#FAF8F5] shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <Sprout className="w-5 h-5 text-[#40916C]" />
            </div>
            <div className="flex flex-col shrink-0">
              <span className="font-heading font-bold text-lg sm:text-xl text-[#1A2421] tracking-tight leading-none group-hover:text-[#C68B59] transition-colors whitespace-nowrap">
                {FARM_CONFIG.shopName}
              </span>
              <span className="text-[11px] font-accent text-[#C68B59] font-semibold tracking-wide whitespace-nowrap hidden sm:block">
                100% Certified Agricultural Produce
              </span>
            </div>
          </a>

          {/* Desktop Navigation (>= 768px) - 4 clean, focused menus */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 xl:gap-4 shrink-0" id="desktop-nav">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-heading font-semibold transition-all rounded-xl relative whitespace-nowrap ${
                    isActive
                      ? 'text-[#1B4332] bg-[#C68B59]/15 font-bold shadow-xs'
                      : 'text-[#1A2421]/80 hover:text-[#1A2421] hover:bg-[#C68B59]/10'
                  }`}
                >
                  <span className="whitespace-nowrap">{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#C68B59] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions & CTA */}
          <div className="hidden md:flex items-center gap-2.5 xl:gap-3 shrink-0">
            <a
              href={`tel:${FARM_CONFIG.phone}`}
              className="hidden xl:flex items-center gap-1.5 text-xs font-accent font-semibold text-[#1A2421] hover:text-[#C68B59] transition-colors whitespace-nowrap"
              title="Direct Farm Call"
            >
              <Phone className="w-3.5 h-3.5 text-[#C68B59] shrink-0" />
              <span className="whitespace-nowrap">{FARM_CONFIG.phone}</span>
            </a>
            <button
              onClick={onOrderClick}
              id="header-order-cta"
              className="inline-flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-lg bg-[#1B4332] text-white border border-[#C68B59] text-xs xl:text-sm font-heading font-semibold shadow-xs hover:bg-[#C68B59] active:scale-98 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4 shrink-0 text-[#FAF8F5]" />
              <span className="whitespace-nowrap">Order Fresh</span>
            </button>
          </div>

          {/* Hamburger button for mobile (< 768px) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOrderClick}
              className="p-2 rounded-lg bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59]/40"
              aria-label="Order quick action"
            >
              <ShoppingBag className="w-5 h-5 text-[#40916C]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-hamburger-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg text-[#1A2421] hover:bg-[#C68B59]/20 active:scale-95 transition-all focus:outline-hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (< 768px) */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-[#FAF8F5] border-b border-[#C68B59]/25 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <div className="flex flex-col space-y-1 divide-y divide-[#C68B59]/20">
            <div className="pb-3 flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-accent font-medium transition-colors ${
                      isActive
                        ? 'bg-[#1B4332] text-[#FAF8F5] font-semibold'
                        : 'text-[#1A2421] hover:bg-[#C68B59]/15'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-[#40916C]' : 'text-[#1A2421]/60'}`} />
                  </a>
                );
              })}
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-[#1A2421]/80 px-2">
                <Phone className="w-4 h-4 text-[#C68B59]" />
                <span>Farm Helpline: </span>
                <a href={`tel:${FARM_CONFIG.phone}`} className="font-bold text-[#1A2421]">
                  {FARM_CONFIG.phone}
                </a>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOrderClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1B4332] text-white hover:bg-[#C68B59] border border-[#C68B59] font-heading font-bold text-sm shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-[#FAF8F5]" />
                <span>Explore Harvest & Order Box</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
