import React from 'react';
import { Home, Pill, CalendarRange, User, FileText } from 'lucide-react';

interface BottomNavigationProps {
  currentTab: 'home' | 'medicines' | 'labs' | 'prescriptions' | 'profile';
  onChangeTab: (tab: 'home' | 'medicines' | 'labs' | 'prescriptions' | 'profile') => void;
  bookingCount: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onChangeTab,
  bookingCount,
}) => {
  const tabs: { id: 'home' | 'medicines' | 'labs' | 'prescriptions' | 'profile'; icon: any; label: string; badge?: number }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'medicines', icon: Pill, label: 'Medicines' },
    { id: 'labs', icon: CalendarRange, label: 'Lab Tests', badge: bookingCount > 0 ? bookingCount : undefined },
    { id: 'prescriptions', icon: FileText, label: 'Prescriptions' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="absolute bottom-6 inset-x-0 z-50 px-4 flex justify-center pointer-events-none">
      {/* Replicating the exact floating capsule dock layout from referenced images */}
      <nav
        id="floating-navigation-dock"
        className="bg-white/85 backdrop-blur-md rounded-[24px] shadow-[0_10px_30px_rgba(128,0,0,0.08)] border-[1.5px] border-maroon-mid p-2.5 flex items-center justify-between space-x-1 w-full max-w-sm pointer-events-auto hover:border-maroon/40 transition-colors"
      >
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              id={`nav-tab-${tab.id}`}
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className="relative flex-1 flex flex-col items-center justify-center focus:outline-hidden group min-w-0"
              aria-label={`Navigate to ${tab.label}`}
            >
              {/* Active Circle Indicator OR clean hover orbits */}
              {isActive ? (
                <div className="w-11 h-11 bg-maroon rounded-full flex items-center justify-center text-white shadow-md transform -translate-y-1 transition-all duration-300">
                  <Icon className="w-5 h-5 animate-soft-pulse" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-maroon/60 hover:text-maroon hover:bg-maroon-light transition-all">
                  <Icon className="w-5 h-5" />
                </div>
              )}

              {/* Little interactive dot or label description */}
              {isActive && (
                <span className="absolute -bottom-1 text-[8px] font-black uppercase text-maroon tracking-wider whitespace-nowrap">
                  {tab.label}
                </span>
              )}

              {/* Dynamic Badge Count (e.g. for scheduled lab appointments) */}
              {tab.badge !== undefined && (
                <span className="absolute top-1 right-1 bg-amber-400 text-maroon text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
