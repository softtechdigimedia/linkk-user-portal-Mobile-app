import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Sparkles, Upload, ArrowRight, Activity } from 'lucide-react';

interface PromoCarouselProps {
  onPromoClick: (promoCode: string) => void;
  onUploadPrescription: () => void;
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({ onPromoClick, onUploadPrescription }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      id: 'promo-1',
      badge: 'Limited Time Offer',
      title: 'Enjoy free delivery on orders',
      subtitle: 'above',
      priceHighlight: '₹499',
      ctaText: 'ORDER NOW',
      action: () => onPromoClick('FREEDEL499'),
      themeClass: 'bg-maroon text-white border-none',
      vector: (
        <div className="relative flex items-center justify-center w-28 h-28 bg-white/15 rounded-full border border-white/10 flex-shrink-0 animate-soft-pulse overflow-hidden">
          <Truck className="w-12 h-12 text-white" />
          <div className="absolute top-1 right-2 bg-amber-400 text-[8px] font-black uppercase text-maroon px-1.5 py-0.5 rounded-sm rotate-12">
            FREE
          </div>
          <div className="absolute bottom-2 flex space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>
        </div>
      )
    },
    {
      id: 'promo-2',
      badge: 'Diagnostic Special',
      title: 'Full Body Checkup & Lab tests',
      subtitle: 'staggering discount of',
      priceHighlight: 'FLAT 50%',
      ctaText: 'BOOK TEST',
      action: () => onPromoClick('HEAL50'),
      themeClass: 'bg-maroon-light border-[1.5px] border-maroon-mid text-maroon',
      vector: (
        <div className="relative flex items-center justify-center w-28 h-28 bg-white rounded-full border border-maroon-mid flex-shrink-0">
          <Activity className="w-12 h-12 text-maroon animate-pulse" />
          <div className="absolute top-2 left-1 bg-maroon text-white text-[8px] px-1.5 py-0.5 rounded">
            NABL
          </div>
        </div>
      )
    },
    {
      id: 'promo-3',
      badge: 'Quick Pharmacy Checkout',
      title: 'Short of time? Upload prescription',
      subtitle: 'we will do everything',
      priceHighlight: 'FOR YOU',
      ctaText: 'UPLOAD NOW',
      action: onUploadPrescription,
      themeClass: 'bg-maroon text-white border-none',
      vector: (
        <div className="relative flex items-center justify-center w-28 h-28 bg-white/15 rounded-full border border-white/10 flex-shrink-0">
          <Upload className="w-12 h-12 text-white" />
          <div className="absolute right-1 bottom-2 bg-amber-400 text-maroon text-[8px] font-bold px-1.5 py-0.5 rounded-full">
            Fast
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 py-2 bg-white relative">
      <div id="promo-carousel-root" className="relative overflow-hidden rounded-[20px] border-[1.5px] border-maroon-mid shadow-xs">
        <AnimatePresence mode="wait">
          {banners.map((item, index) => {
            if (index !== currentIndex) return null;
            const isDark = item.themeClass.includes('bg-maroon');
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`p-5 flex items-center justify-between min-h-[160px] ${item.themeClass}`}
              >
                {/* Promo Text Layout */}
                <div className="flex-1 pr-2">
                  <span className={`inline-flex items-center text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 ${
                    isDark ? 'text-maroon bg-white' : 'text-white bg-maroon'
                  }`}>
                    <Sparkles className="w-2.5 h-2.5 mr-1" />
                    {item.badge}
                  </span>
                  
                  <h3 className={`text-[17px] font-extrabold leading-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    {item.title}
                  </h3>
                  
                  <div className="flex items-baseline space-x-1.5 my-1.5">
                    <span className={`text-[11px] font-medium ${isDark ? 'text-white/70' : 'text-neutral-500'}`}>{item.subtitle}</span>
                    <span className={`text-2xl font-black tracking-tight ${isDark ? 'text-amber-300' : 'text-maroon'}`}>{item.priceHighlight}</span>
                  </div>

                  <button
                    id={`promo-cta-btn-${item.id}`}
                    onClick={item.action}
                    className={`mt-2.5 px-5 py-2 font-extrabold text-[12px] tracking-widest rounded-lg active:scale-95 transition-all shadow-xs flex items-center space-x-1.5 ${
                      isDark 
                        ? 'bg-white text-maroon hover:bg-neutral-50' 
                        : 'bg-maroon text-white hover:bg-red-900'
                    }`}
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Animated graphic representation */}
                <div className="pl-2 shrink-0">
                  {item.vector}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Indicator dots for sliding */}
        <div className="absolute right-4 bottom-3 flex space-x-1.5">
          {banners.map((_, index) => (
            <button
              id={`slide-dot-${index}`}
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex ? 'bg-maroon w-6' : 'bg-maroon-mid'
              }`}
              aria-label={`Slide target ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
