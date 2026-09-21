import React from 'react';
import { X, Sparkles, Check, ShoppingBag, ShieldCheck, Calendar } from 'lucide-react';
import { ProduceItem } from '../types';

interface ProduceDetailModalProps {
  item: ProduceItem | null;
  onClose: () => void;
  onOrder: (item: ProduceItem) => void;
}

export const ProduceDetailModal: React.FC<ProduceDetailModalProps> = ({ item, onClose, onOrder }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#C68B59]/30 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#1A2421] hover:bg-[#1B4332] hover:text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF8F5]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[11px] font-accent uppercase font-bold text-[#40916C]">
              {item.category}
            </span>
            <h3 className="font-heading font-bold text-xl text-white">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-heading font-extrabold text-2xl text-[#1B4332]">
                {item.price}
              </span>
              <span className="text-xs font-accent text-[#1A2421]/70 ml-1">
                {item.unit}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-accent font-bold text-[#FAF8F5] bg-[#1B4332] border border-[#C68B59]/40 px-3 py-1 rounded-full">
              <Check className="w-3.5 h-3.5 text-[#40916C]" />
              <span>In Stock for Dawn Pluck</span>
            </div>
          </div>

          <p className="font-body text-sm text-[#1A2421]/80 leading-relaxed">
            {item.description}
          </p>

          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#C68B59]/20 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-accent text-[#C68B59] font-bold">
              <Sparkles className="w-4 h-4 text-[#C68B59]" />
              <span>Nutritional Highlight</span>
            </div>
            <p className="text-xs font-body text-[#1A2421]/85">
              {item.nutritionalHighlight}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-accent text-[#1A2421]/75">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C68B59]" />
              <span>{item.harvestSeason}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C68B59]" />
              <span>0% Toxic Chemicals</span>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                onOrder(item);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-[#1B4332] text-white border border-[#C68B59] font-heading font-bold text-sm shadow-md hover:bg-[#C68B59] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Reserve in Harvest Crate</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-xl border border-[#1B4332] text-[#1B4332] font-heading font-semibold text-sm hover:bg-[#FAF8F5] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
