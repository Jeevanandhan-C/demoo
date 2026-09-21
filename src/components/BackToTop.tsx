import React, { useState, useEffect } from 'react';
import { ArrowUp, Sprout } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 0) {
        const progress = (scrollTop / scrollHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      if (scrollTop > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Circular progress math
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="relative group flex items-center">
        {/* Unique Floating Tooltip on Hover */}
        <div
          className={`absolute right-full mr-3 whitespace-nowrap px-3.5 py-1.5 rounded-xl bg-[#1B4332] text-[#FAF8F5] text-xs font-accent font-bold shadow-xl border border-[#C68B59]/40 pointer-events-none transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Sprout className="w-3.5 h-3.5 text-[#40916C]" />
            <span>Top ({Math.round(scrollProgress)}%)</span>
          </div>
          {/* Arrow pointing right */}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#1B4332] rotate-45 border-t border-r border-[#C68B59]/40" />
        </div>

        {/* Unique Organic Circular Button with Scroll Progress Ring */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          id="floating-back-to-top"
          aria-label="Scroll back to top of page"
          className="relative w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-2xl hover:shadow-2xl active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none border border-[#C68B59]/30"
        >
          {/* SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 52 52">
            {/* Background Track */}
            <circle
              cx="26"
              cy="26"
              r={radius}
              className="text-[#1A2421]/10"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Filled Progress Track */}
            <circle
              cx="26"
              cy="26"
              r={radius}
              className="text-[#C68B59] transition-all duration-150"
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Inner Button Core */}
          <div className="w-10 h-10 rounded-full bg-[#1B4332] border border-[#C68B59]/40 flex items-center justify-center text-[#FAF8F5] shadow-inner group-hover:bg-[#C68B59] group-hover:text-white group-hover:scale-105 transition-all">
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </div>

          {/* Gentle Green Pulse Dot */}
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#40916C] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#40916C] border border-white" />
          </span>
        </button>
      </div>
    </div>
  );
};
