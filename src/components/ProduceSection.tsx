import React, { useState } from 'react';
import { Sprout, ShoppingBag, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { PRODUCE_ITEMS } from '../data/farmData';
import { ProduceItem } from '../types';

interface ProduceSectionProps {
  onSelectItem: (item: ProduceItem) => void;
  onOrderBoxClick: () => void;
}

export const ProduceSection: React.FC<ProduceSectionProps> = ({ onSelectItem, onOrderBoxClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<{ [id: string]: boolean }>({});

  const categories = [
    { id: 'all', label: 'All Fresh Harvest' },
    { id: 'vegetables', label: 'Native Greens & Veggies' },
    { id: 'grains', label: 'Heirloom Grains & Rice' },
    { id: 'oils', label: 'Wood Cold-Pressed Oils' },
    { id: 'fruits', label: 'Orchard Ripened Fruits' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? PRODUCE_ITEMS
    : PRODUCE_ITEMS.filter((item) => item.category === selectedCategory);

  const handleQuickAdd = (e: React.MouseEvent, item: ProduceItem) => {
    e.stopPropagation();
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    onSelectItem(item);

    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <section id="harvest" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-[#FAF8F5] border border-[#C68B59]/40 text-xs font-accent font-semibold mb-3 shadow-xs">
              <Sprout className="w-3.5 h-3.5 text-[#40916C]" />
              <span>Certified 100% Organic Harvest</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A2421] tracking-tight">
              Straight From Our{' '}
              <span className="text-[#C68B59]">
                Living Soil
              </span>
            </h2>
            <p className="font-body text-base text-[#1A2421]/75 mt-2">
              Harvested at dawn and dispatched unpolished, unadulterated, and free from any post-harvest waxes or chemical preservatives.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={onOrderBoxClick}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#C68B59] text-[#1B4332] bg-[#FAF8F5] hover:bg-[#1B4332] hover:text-white hover:border-[#1B4332] font-heading font-semibold text-sm transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Build Custom Harvest Crate</span>
              <ArrowUpRight className="w-4 h-4 text-[#C68B59] group-hover:text-white shrink-0" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B4332] text-white border border-[#C68B59] shadow-sm'
                    : 'bg-[#FAF8F5] text-[#1A2421]/80 hover:bg-[#C68B59]/10 border border-[#C68B59]/20'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid: Responsive for 1280px (4 cols), 768px (2 cols), 425px (1 col) */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const isJustAdded = addedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group flex flex-col bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#C68B59]/20 hover:border-[#C68B59] hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image Container with HD photo & Tag */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop';
                    }}
                  />

                  {/* Harvest Tag */}
                  <div className="absolute top-3 left-3 bg-[#1B4332]/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#C68B59]/40 text-[11px] font-accent font-bold text-[#FAF8F5] shadow-xs">
                    {item.tag}
                  </div>

                  {/* Seasonal Pluck Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-accent text-white bg-[#1B4332]/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-[#C68B59]/30">
                    <span>{item.harvestSeason}</span>
                    <span className="text-[#40916C] font-bold">100% Clean</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#1A2421] group-hover:text-[#C68B59] transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="font-body text-xs text-[#1A2421]/75 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-accent text-[#1B4332] font-semibold bg-[#C68B59]/10 border border-[#C68B59]/20 px-2 py-1 rounded-md">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#C68B59]" />
                      <span className="truncate">{item.nutritionalHighlight}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#1A2421]/10 flex items-center justify-between gap-3">
                    <div className="flex flex-col min-w-0">
                      <span className="font-heading font-extrabold text-lg sm:text-xl text-[#1B4332] leading-none">
                        {item.price}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-accent text-[#1A2421]/65 mt-0.5 leading-tight truncate">
                        {item.unit}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(e, item)}
                      className={`px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-heading font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-all cursor-pointer shadow-xs ${
                        isJustAdded
                          ? 'bg-[#C68B59] text-white'
                          : 'bg-[#1B4332] text-white border border-[#C68B59] hover:bg-[#C68B59]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#FAF8F5] shrink-0" />
                          <span className="whitespace-nowrap">Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-[#FAF8F5] shrink-0" />
                          <span className="whitespace-nowrap">Add to Crate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
