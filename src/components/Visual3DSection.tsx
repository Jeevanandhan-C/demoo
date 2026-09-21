import React, { useState, useRef } from 'react';
import { Box, Sparkles, Layers, RotateCw, Compass, CheckCircle2 } from 'lucide-react';
import { THREE_D_ITEMS } from '../data/farmData';

export const Visual3DSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(THREE_D_ITEMS[0]);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    setIsInteracting(true);
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation limits (-14 to +14 deg)
    const rotateY = ((x - centerX) / centerX) * 14;
    const rotateX = -((y - centerY) / centerY) * 14;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsInteracting(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section id="visual-3d" className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#C68B59]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#C68B59]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59]/40 text-xs font-accent font-semibold mb-3 shadow-xs">
            <Box className="w-3.5 h-3.5 text-[#40916C]" />
            <span>Interactive Multi-Layer Soil Ecology</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A2421] tracking-tight">
            Explore Soil Depth in{' '}
            <span className="text-[#C68B59]">
              Visual Dimensions
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-[#1A2421]/75 mt-3 leading-relaxed">
            Hover or touch the 3D showcase below to explore our multi-layered agricultural design:
            from subterranean living soil to pollinator canopies and solar micro-irrigation.
          </p>

          {/* Layer Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 p-1.5 bg-white border border-[#C68B59]/20 rounded-2xl shadow-xs">
            {THREE_D_ITEMS.map((item) => {
              const active = selectedItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    active
                      ? 'bg-[#1B4332] text-white border border-[#C68B59] shadow-sm'
                      : 'text-[#1A2421]/80 hover:bg-[#C68B59]/10 hover:text-[#1A2421]'
                  }`}
                >
                  <Layers className={`w-3.5 h-3.5 ${active ? 'text-[#40916C]' : 'text-[#C68B59]'}`} />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* 3D Interactive Stage Canvas */}
          <div className="lg:col-span-7 flex justify-center perspective-1000">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isInteracting ? 'none' : 'transform 0.5s ease-out',
              }}
              className="relative w-full max-w-[540px] aspect-[4/3] sm:aspect-[16/11] rounded-3xl p-3 sm:p-4 bg-gradient-to-br from-[#1B4332]/20 via-[#C68B59]/25 to-[#1B4332]/30 shadow-2xl transform-style-3d cursor-grab active:cursor-grabbing border border-[#C68B59]/30 select-none"
            >
              {/* Main 3D Card Face */}
              <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner bg-[#1B4332] transform-style-3d">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover transform scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop';
                  }}
                />

                {/* Color Blending Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 via-[#1B4332]/30 to-transparent" />

                {/* Floating 3D Badge 1 - Top Left (Pop-out Z: 40px) */}
                <div
                  style={{ transform: 'translateZ(40px)' }}
                  className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C68B59]/30 shadow-lg flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#C68B59]" />
                  <span className="text-xs font-accent font-bold text-[#1A2421]">
                    {selectedItem.tag}
                  </span>
                </div>

                {/* Interactive Tilt Hint - Top Right (Pop-out Z: 35px) */}
                <div
                  style={{ transform: 'translateZ(35px)' }}
                  className="absolute top-4 right-4 hidden sm:flex items-center gap-1.5 bg-[#1B4332]/85 border border-[#C68B59]/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-[#FAF8F5] font-accent"
                >
                  <RotateCw className="w-3 h-3 text-[#40916C] animate-spin" />
                  <span>3D Tilt Active</span>
                </div>

                {/* Floating Bottom Card Layer (Pop-out Z: 50px) */}
                <div
                  style={{ transform: 'translateZ(50px)' }}
                  className="absolute bottom-4 left-4 right-4 bg-[#FAF8F5]/95 backdrop-blur-md p-4 rounded-xl border border-[#C68B59]/30 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-accent uppercase tracking-wider text-[#C68B59] font-bold">
                        {selectedItem.depth}
                      </span>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-[#1A2421]">
                        {selectedItem.title}
                      </h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#1B4332] border border-[#C68B59]/40 text-[#40916C] flex items-center justify-center">
                      <Compass className="w-4 h-4 text-[#40916C]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Depth Accent Orb (Pop-out Z: 65px) */}
              <div
                style={{ transform: 'translateZ(65px)' }}
                className="hidden sm:flex absolute -bottom-3 -right-3 bg-[#1B4332] border border-[#C68B59] text-[#FAF8F5] text-xs font-heading font-bold py-2 px-3.5 rounded-xl shadow-xl items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#40916C]" />
                <span>Microbial Purity</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Explanatory Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block px-3 py-1 rounded-md bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59]/40 text-xs font-accent font-bold">
              Layer Inspection
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A2421]">
              {selectedItem.title}
            </h3>
            <p className="font-body text-base text-[#1A2421]/80 leading-relaxed">
              {selectedItem.description}
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {selectedItem.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-[#C68B59]/20 shadow-xs"
                >
                  <span className="text-xs font-accent text-[#C68B59] font-bold block uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <span className="font-heading font-extrabold text-xl sm:text-2xl text-[#1B4332] mt-1 block">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Interactive Selector Pills */}
            <div className="pt-2 border-t border-[#1A2421]/10 flex items-center gap-3 text-xs text-[#1A2421]/70">
              <span className="font-accent font-semibold text-[#1A2421]">Switch View:</span>
              <div className="flex gap-2">
                {THREE_D_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-7 h-7 rounded-full text-xs font-heading font-bold transition-all cursor-pointer ${
                      selectedItem.id === item.id
                        ? 'bg-[#1B4332] text-white border border-[#C68B59] scale-110'
                        : 'bg-white border border-[#C68B59]/30 text-[#1A2421] hover:bg-[#C68B59]/10'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
