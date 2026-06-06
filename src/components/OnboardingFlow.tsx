import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pill, Microscope, ShieldCheck, ArrowRight, Zap, DoorOpen, Sparkles } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface OnboardingSlide {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  badgeText: string;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: OnboardingSlide[] = [
    {
      badgeText: "Lightning Quick Logistics",
      title: "Same-Hour medicine dispatch",
      subtitle: "Direct From Local Hubs",
      description: "Get critical prescription products and wellness supplements delivered in sterilized container vaults flatly under 60 minutes.",
      icon: (
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-rose-100 rounded-full scale-110 opacity-60 animate-ping duration-3000" />
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-50 to-rose-200 rounded-full shadow-inner" />
          <div className="relative p-6 bg-white rounded-3xl shadow-md border border-rose-100">
            <Pill className="w-12 h-12 text-maroon animate-bounce" />
          </div>
          <div className="absolute top-1 right-1 bg-neutral-900 text-white rounded-full p-1.5 shadow-md">
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
        </div>
      ),
      accentColor: "from-rose-500 to-rose-700",
    },
    {
      badgeText: "Home Diagnostics Suite",
      title: "At-Home lab inspections",
      subtitle: "Certified Clinical Experts",
      description: "Schedule trusted medical technicians for painless biological collection right at your living room. Diagnostics results updated within hours.",
      icon: (
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-orange-100 rounded-full scale-110 opacity-60 animate-ping duration-3000" />
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-50 to-amber-200 rounded-full shadow-inner" />
          <div className="relative p-6 bg-white rounded-3xl shadow-md border border-orange-100">
            <Microscope className="w-12 h-12 text-rose-950 animate-soft-pulse" />
          </div>
          <div className="absolute bottom-1 right-1 bg-rose-900 text-white rounded-full p-1.5 shadow-md">
            <Sparkles className="w-4 h-4 text-rose-200" />
          </div>
        </div>
      ),
      accentColor: "from-rose-900 to-amber-950",
    },
    {
      badgeText: "Privacy Secure Infrastructure",
      title: "Digital smart prescriptions",
      subtitle: "HIPAA Compliant Protection",
      description: "Securely upload clinical orders & organize electronic certificates safely encrypted with smart biometric keys.",
      icon: (
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-100 rounded-full scale-110 opacity-60 animate-ping duration-3000" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-blue-200 rounded-full shadow-inner" />
          <div className="relative p-6 bg-white rounded-3xl shadow-md border border-emerald-100">
            <ShieldCheck className="w-12 h-12 text-emerald-800" />
          </div>
          <div className="absolute top-2 left-2 bg-neutral-900 text-white rounded-full p-1.5 shadow-md">
            <DoorOpen className="w-4 h-4 text-emerald-300" />
          </div>
        </div>
      ),
      accentColor: "from-emerald-800 to-slate-900",
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-7 bg-white select-none h-full relative overflow-hidden">
      
      {/* Upper Utility Header block: Skip button */}
      <div className="flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center space-x-1">
          <span className="font-serif text-lg font-black text-neutral-900">Linkk</span>
          <span className="w-1 h-1 bg-maroon rounded-full" />
        </div>
        
        {currentSlide < slides.length - 1 && (
          <button
            type="button"
            id="onboarding-skip-btn"
            onClick={handleSkip}
            className="text-xs font-black text-rose-950/70 hover:text-maroon border border-neutral-100 bg-neutral-50 px-3 py-1.5 rounded-full transition-all active:scale-95"
          >
            Skip info
          </button>
        )}
      </div>

      {/* Main slides sequence */}
      <div className="my-auto flex flex-col items-center justify-center py-6 min-h-[380px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -22 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            {/* Slide Graphic icon */}
            <div className="mb-8 select-none">
              {slides[currentSlide].icon}
            </div>

            {/* Slide Badge label */}
            <div className="mb-3 px-3 py-1 bg-neutral-100 rounded-full border border-neutral-200/50">
              <span className="text-[10px] text-neutral-600 font-extrabold uppercase tracking-widest leading-none">
                {slides[currentSlide].badgeText}
              </span>
            </div>

            {/* Main Title heading statements */}
            <h1 className="text-2xl font-serif font-black text-neutral-900 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <h2 className="text-xs font-sans font-extrabold text-maroon mt-1 leading-normal uppercase tracking-wider">
              {slides[currentSlide].subtitle}
            </h2>

            {/* Description script */}
            <p className="text-xs text-neutral-500 font-semibold leading-relaxed max-w-[280px] mt-4">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer controls: page indicators and Proceed buttons */}
      <div className="flex flex-col space-y-5 shrink-0 pt-2 z-10">
        
        {/* Animated indicator dots */}
        <div className="flex justify-center items-center space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              id={`onboarding-indicator-${idx}`}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx 
                  ? 'w-5 bg-maroon' 
                  : 'w-2 bg-neutral-200 hover:bg-neutral-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Primary Screen Navigation Buttons row */}
        <div className="flex items-center space-x-3 w-full">
          {currentSlide > 0 && (
            <button
              type="button"
              id="onboarding-prev-btn"
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              className="py-4 px-5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-extrabold text-xs rounded-2xl transition-all active:scale-98 border border-neutral-200 flex items-center justify-center space-x-1 shrink-0"
            >
              <span>Back</span>
            </button>
          )}
          
          <button
            type="button"
            id="onboarding-next-btn"
            onClick={handleNext}
            className="flex-1 py-4 bg-maroon text-white hover:bg-neutral-900 font-extrabold text-xs rounded-2xl shadow-md transition-all active:scale-98 flex items-center justify-center space-x-2"
          >
            <span>
              {currentSlide === slides.length - 1 ? "Get Started" : "Next Screen"}
            </span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </button>
        </div>

        {/* Compliant Secure HIPAA footnote */}
        <p className="text-center text-[9px] font-black text-neutral-400 uppercase tracking-widest">
          🔒 Encrypted clinical standards approved
        </p>
      </div>

    </div>
  );
};
