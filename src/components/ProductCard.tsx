import React from 'react';
import { Plus, Minus } from 'lucide-react';
import type{ Medicine } from '../types';
import { MedicalIcon } from './MedicalIcon';

interface ProductCardProps {
  medicine: Medicine;
  quantityInCart: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  onOpenDetails: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  medicine,
  quantityInCart,
  onAddToCart,
  onRemoveFromCart,
  onOpenDetails,
}) => {
  return (
    <div
      id={`med-card-${medicine.id}`}
      className="bg-white rounded-[20px] border-[1.5px] border-maroon-mid pt-3.5 px-3.5 pb-5 flex flex-col justify-between hover:border-maroon transition-all duration-300 relative group shadow-[0_4px_12px_rgba(128,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(128,0,0,0.08)]"
    >
      {/* Rx Prescription Required Icon Badge */}
      {medicine.requiresRx && (
        <span
          id={`rx-badge-${medicine.id}`}
          className="absolute top-3 right-3 bg-maroon text-white font-extrabold text-[9px] px-2 py-0.5 rounded-md flex items-center space-x-1 uppercase tracking-wider z-10 shadow-xs"
          title="Requires doctor prescription"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>Rx</span>
        </span>
      )}

      {/* Product Image Stage (Custom stylized graphic model) */}
      <div 
        onClick={onOpenDetails}
        className="w-full h-28 bg-maroon-light rounded-[14px] flex items-center justify-center p-3 relative overflow-hidden mb-2 cursor-pointer group-hover:scale-102 transition-transform"
      >
        <MedicalIcon type={medicine.imageType} size="lg" />
        
        {/* Soft background branding design to match "not generic look" */}
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-mid/20 to-transparent pointer-events-none" />
      </div>

      {/* Main product identifiers */}
      <div className="flex-1 mt-0.5">
        <button
          id={`title-btn-${medicine.id}`}
          onClick={onOpenDetails}
          className="block w-full text-left focus:outline-hidden"
        >
          <h4 className="text-xs font-extrabold text-neutral-900 group-hover:text-maroon transition-colors leading-snug line-clamp-2">
            {medicine.name}
          </h4>
        </button>

        {/* Packing Pill Badge Container */}
        <span className="inline-block bg-maroon-light border border-maroon-mid text-[10px] font-bold text-maroon px-2 py-0.5 rounded-full mt-1.5">
          {medicine.packaging}
        </span>

        {/* Company identifier */}
        <p className="text-[10px] text-neutral-500 font-semibold truncate mt-1">
          {medicine.manufacturer}
        </p>
      </div>

      {/* Pricing and Cart Stepper Grid */}
      <div className="mt-3 pt-2.5 border-t border-maroon-mid/40 flex items-center justify-between">
        <div className="min-w-0 flex-1 mr-1">
          <div className="flex items-baseline space-x-1 flex-wrap">
            <span className="text-sm font-black text-maroon leading-none">
              ₹{medicine.price.toFixed(2)}
            </span>
            {medicine.originalPrice && (
              <span className="text-[10px] text-neutral-400 line-through font-bold leading-none">
                ₹{medicine.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-[8px] text-emerald-700 font-extrabold uppercase tracking-wide leading-normal mt-0.5">Taxes Incl.</p>
        </div>

        {/* Cart trigger/stepper widget */}
        <div className="shrink-0">
          {quantityInCart === 0 ? (
            <button
              id={`add-btn-${medicine.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className="py-1.5 px-2.5 bg-white text-maroon border-[1.5px] border-maroon hover:bg-maroon-light active:scale-95 text-[11px] font-black rounded-lg transition-all flex items-center space-x-1 shadow-2xs"
            >
              <Plus className="w-3 h-3 shrink-0 text-maroon" />
              <span>ADD</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1 bg-maroon text-white rounded-lg p-1.5 shadow-sm border border-maroon">
              <button
                id={`decrement-btn-${medicine.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFromCart();
                }}
                className="p-0.5 rounded-sm hover:bg-white/15 active:scale-90 text-white"
                title="Decrease quantity"
              >
                <Minus className="w-3 h-3 text-white" />
              </button>
              <span className="text-[11px] font-black min-w-[12px] text-center">
                {quantityInCart}
              </span>
              <button
                id={`increment-btn-${medicine.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
                className="p-0.5 rounded-sm hover:bg-white/15 active:scale-90 text-white"
                title="Increase quantity"
              >
                <Plus className="w-3 h-3 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
