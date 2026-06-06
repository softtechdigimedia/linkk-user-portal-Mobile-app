import React, { useRef } from 'react';
import { Pill, Activity, ChevronRight, ChevronLeft,  HeartPulse } from 'lucide-react';
import { CATEGORY_METADATA } from '../data';
import { MedicalIcon } from './MedicalIcon';

interface CategorySliderProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onBrowseTypeChange: (type: 'medicine' | 'lab') => void;
  activeBrowseType: 'medicine' | 'lab';
}

export const CategorySlider: React.FC<CategorySliderProps> = ({
  selectedCategory,
  onSelectCategory,
  onBrowseTypeChange,
  activeBrowseType,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-4 bg-white">
      {/* 1. Large Browse Action Pill Buttons - styled as high contrast bento boxes */}
      <div className="px-4 grid grid-cols-2 gap-3 mb-6">
        <button
          id="browse-medicine-toggle"
          onClick={() => onBrowseTypeChange('medicine')}
          className={`py-3.5 px-4 rounded-[20px] text-sm font-extrabold flex items-center justify-center space-x-2 border-[1.5px] transition-all duration-300 ${
            activeBrowseType === 'medicine'
              ? 'bg-maroon text-white border-maroon shadow-md relative scale-102'
              : 'bg-white text-maroon border-maroon-mid hover:bg-maroon-light'
          }`}
        >
          <Pill className="w-4 h-4 shrink-0" />
          <span>Browse Medicine</span>
        </button>

        <button
          id="browse-labtest-toggle"
          onClick={() => onBrowseTypeChange('lab')}
          className={`py-3.5 px-4 rounded-[20px] text-sm font-extrabold flex items-center justify-center space-x-2 border-[1.5px] transition-all duration-300 ${
            activeBrowseType === 'lab'
              ? 'bg-maroon text-white border-maroon shadow-md relative scale-102'
              : 'bg-white text-maroon border-maroon-mid hover:bg-maroon-light'
          }`}
        >
          <Activity className="w-4 h-4 shrink-0" />
          <span>Browse Lab Test</span>
        </button>
      </div>

      {/* 2. Shop by Category Header */}
      <div className="px-4 flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[18px] font-extrabold text-neutral-900 tracking-tight flex items-center space-x-1.5">
            <HeartPulse className="w-5 h-5 text-maroon" />
            <span>Shop by Category</span>
          </h2>
          <p className="text-[11px] text-neutral-500 font-semibold">Browse verified medicinal supplies</p>
        </div>
        <button
          id="view-all-categories"
          onClick={() => onSelectCategory('All Medicines')}
          className="px-3.5 py-1.5 rounded-full bg-maroon-light hover:bg-maroon-mid/30 text-maroon text-xs font-bold flex items-center space-x-1 transition-colors border border-maroon-mid"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3. Horizontal scrolling category row - replicated from slide images */}
      <div className="relative group/carousel">
        {/* Left Arrow Trigger */}
        <button
          onClick={scrollLeft}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-xs border border-maroon-mid text-maroon shadow-md hover:bg-maroon hover:text-white transition-all active:scale-90 cursor-pointer"
          title="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Arrow Trigger */}
        <button
          onClick={scrollRight}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-xs border border-maroon-mid text-maroon shadow-md hover:bg-maroon hover:text-white transition-all active:scale-90 cursor-pointer"
          title="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div 
          ref={sliderRef}
          className="flex overflow-x-auto px-4 py-2 space-x-4 scrollbar-none snap-x scroll-smooth"
        >
          {CATEGORY_METADATA.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            
            // Determine stylized vector icons to render under cards
            let illustration: React.ReactNode;
            switch (cat.name) {
              case 'All Medicines':
                illustration = <MedicalIcon type="pill-bottle" size="md" />;
                break;
              case 'Bone Joint & Muscle Care':
                illustration = <MedicalIcon type="box" size="md" />;
                break;
              case 'Baby Care':
                illustration = <MedicalIcon type="syrup-bottle" size="md" />;
                break;
              case 'Health Devices':
                illustration = <MedicalIcon type="box" size="md" />;
                break;
              case 'Syrups & Liquids':
                illustration = <MedicalIcon type="sachet" size="md" />;
                break;
              default:
                illustration = <MedicalIcon type="pill-bottle" size="md" />;
            }

            return (
              <button
                id={`cat-card-${cat.name.replace(/\s+/g, '-').toLowerCase()}`}
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`flex-none w-[150px] snap-start rounded-[20px] p-3.5 flex flex-col items-center justify-between text-center border-[1.5px] transition-all duration-300 ${
                  isSelected
                    ? 'bg-maroon-light border-maroon shadow-sm scale-102 font-extrabold'
                    : 'bg-white border-maroon-mid hover:border-maroon/60 hover:bg-neutral-50'
                }`}
              >
                {/* Product composite inside gradient */}
                <div className="w-full h-24 rounded-[14px] bg-gradient-to-b from-maroon-light to-white flex items-center justify-center p-1 relative overflow-hidden mb-3 shadow-[0_2px_8px_rgba(128,0,0,0.02)]">
                  {illustration}
                  
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-maroon animate-ping" />
                  )}
                </div>

                {/* Category label - styled specifically in maroon foreground */}
                <div className="w-full">
                  <span className={`block text-xs leading-tight ${isSelected ? 'text-maroon font-black' : 'text-neutral-800 font-semibold'}`}>
                    {cat.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
