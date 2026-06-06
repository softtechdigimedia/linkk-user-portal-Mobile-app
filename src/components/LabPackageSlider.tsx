import React, { useRef } from 'react';
import { ShieldCheck, Clock, Map, ChevronRight, ChevronLeft, FlaskConical, AlertCircle } from 'lucide-react';
import { LAB_PACKAGES_DATA } from '../data';
import { MedicalIcon } from './MedicalIcon';
import type{ LabPackage } from '../types';

interface LabPackageSliderProps {
  onBookLabTest: (labPackage: LabPackage) => void;
  cartPackages: string[];
}

export const LabPackageSlider: React.FC<LabPackageSliderProps> = ({
  onBookLabTest,
  cartPackages,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };
  return (
    <div className="py-4 bg-white">
      {/* 1. Header Section */}
      <div className="px-4 flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[18px] font-extrabold text-neutral-900 tracking-tight flex items-center space-x-1.5">
            <FlaskConical className="w-5 h-5 text-maroon" />
            <span>Recommended Lab Packages</span>
          </h2>
          <p className="text-[11px] text-neutral-500 font-semibold">NABL Accredited diagnostic collection</p>
        </div>
        <button
          id="view-all-labs-btn"
          onClick={() => onBookLabTest(LAB_PACKAGES_DATA[0])}
          className="px-3.5 py-1.5 rounded-full bg-maroon-light hover:bg-maroon-mid/30 text-maroon text-xs font-bold flex items-center space-x-1 transition-colors border border-maroon-mid"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Home Sample Collection Hero Banner - Matches bento theme card-large */}
      <div className="mx-4 mb-6 p-5 bg-maroon text-white rounded-[20px] shadow-sm relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />

        <h3 className="text-lg font-black text-white mb-2">
          Home Sample Collection
        </h3>
        
        <p className="text-xs text-white/80 font-medium leading-relaxed mb-4">
          Book diagnostic tests with home sample collection. Get ultra-accurate results and certified digital reports delivered to your email inbox.
        </p>

        {/* Triple Benefit Bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
          <div className="flex items-center space-x-2 text-[12px] font-bold text-white">
            <div className="p-1 px-2 rounded-md bg-white/15 text-white">
              <Map className="w-3.5 h-3.5" />
            </div>
            <span>Home Collection</span>
          </div>

          <div className="flex items-center space-x-2 text-[12px] font-bold text-white">
            <div className="p-1 px-2 rounded-md bg-white/15 text-white">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span>Quick Results</span>
          </div>

          <div className="flex items-center space-x-2 text-[12px] font-bold text-white">
            <div className="p-1 px-2 rounded-md bg-white/15 text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span>NABL Accredited</span>
          </div>
        </div>

        {/* Call to action */}
        <button
          id="book-test-hero-btn"
          onClick={() => onBookLabTest(LAB_PACKAGES_DATA[0])}
          className="w-full py-3 bg-white text-maroon hover:bg-neutral-100 active:scale-98 font-extrabold text-xs uppercase tracking-widest rounded-lg transition-all shadow-xs"
        >
          Book Appointment Now
        </button>
      </div>

      {/* 3. Slider Grid of packages - Matches image 6 */}
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
        {LAB_PACKAGES_DATA.map((pkg) => {
          const isAdded = cartPackages.includes(pkg.id);
          
          let illustrationType: 'blood' | 'diabetes' | 'thyroid' | 'cholesterol' = 'blood';
          if (pkg.id === 'lab-2') illustrationType = 'diabetes';
          if (pkg.id === 'lab-3') illustrationType = 'thyroid';
          if (pkg.id === 'lab-4') illustrationType = 'cholesterol';

          return (
            <div
              id={`lab-package-${pkg.id}`}
              key={pkg.id}
              className="flex-none w-[260px] snap-start bg-white rounded-[20px] border-[1.5px] border-maroon-mid p-4 hover:border-maroon transition-all duration-300 flex flex-col justify-between shadow-[0_4px_12px_rgba(128,0,0,0.02)]"
            >
              <div>
                {/* Visual Circle & Icon type */}
                <div className="w-full h-28 bg-maroon-light rounded-[14px] flex items-center justify-center p-2 relative overflow-hidden mb-3">
                  <MedicalIcon type={illustrationType} size="lg" />
                </div>

                {/* Package details */}
                <h4 className="text-sm font-black text-neutral-900 leading-snug line-clamp-1">
                  {pkg.name}
                </h4>

                <p className="text-[11px] text-neutral-500 font-semibold line-clamp-2 mt-1.5 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Info tags list */}
                <div className="flex flex-wrap gap-1 mt-3">
                  <span className="bg-maroon-light text-maroon text-[9px] font-extrabold px-2 py-0.5 rounded-md border border-maroon-mid/60">
                    {pkg.duration}
                  </span>
                  {pkg.requiresFasting && (
                    <span className="bg-amber-50 text-amber-950 text-[9px] font-extrabold px-2 py-0.5 rounded-md border border-amber-150 flex items-center space-x-0.5">
                      <AlertCircle className="w-2.5 h-2.5 shrink-0 text-amber-800" />
                      <span>Fasting Required</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Price and Action Button footer */}
              <div className="mt-4 pt-3 border-t border-maroon-mid/40 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-base font-black text-maroon">₹{pkg.price}</span>
                    <span className="text-[10px] text-neutral-400 line-through font-bold">₹{pkg.originalPrice}</span>
                  </div>
                  <span className="text-[9px] text-emerald-800 font-extrabold uppercase tracking-wide">Free Doctor Consult</span>
                </div>

                <button
                  id={`pkg-book-btn-${pkg.id}`}
                  onClick={() => onBookLabTest(pkg)}
                  className={`px-4 py-2.5 text-xs font-black rounded-lg transition-all ${
                    isAdded
                      ? 'bg-emerald-100 text-emerald-950 border border-emerald-200 cursor-not-allowed'
                      : 'bg-maroon hover:bg-neutral-900 active:scale-95 text-white shadow-xs'
                  }`}
                  disabled={isAdded}
                >
                  {isAdded ? 'Scheduled' : 'Book Test'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};
