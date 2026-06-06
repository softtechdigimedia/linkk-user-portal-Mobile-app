import React from 'react';
import { MapPin, Bell, ShoppingCart } from 'lucide-react';
import type{ Address } from '../types';

interface HeaderProps {
  currentAddress: Address;
  onAddressClick: () => void;
  onNotificationClick: () => void;
  onCartClick: () => void;
  cartCount: number;
  unreadNotifCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentAddress,
  onAddressClick,
  onNotificationClick,
  onCartClick,
  cartCount,
  unreadNotifCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-maroon-mid px-4 py-3 flex items-center justify-between shadow-xs">
      {/* Location Pin selector on left - matches the visual shape from reference */}
      <button
        id="location-picker-btn"
        onClick={onAddressClick}
        className="flex items-center space-x-2.5 text-left group max-w-[70%]"
      >
        <div id="pin-icon-box" className="p-2.5 bg-maroon text-white rounded-[14px] shadow-xs shrink-0 flex items-center justify-center border border-maroon group-hover:bg-red-900 transition-colors">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="overflow-hidden">
          <span className="block text-[11px] uppercase font-bold tracking-wider text-maroon/80 leading-none">
            {currentAddress.label}
          </span>
          <span className="block text-[13px] font-extrabold text-neutral-900 truncate mt-0.5 group-hover:text-maroon transition-colors">
            {currentAddress.details}
          </span>
        </div>
      </button>

      {/* Action buttons on the right - bell and cart */}
      <div className="flex items-center space-x-2">
        {/* Notification Bell */}
        <button
          id="notif-bell-btn"
          onClick={onNotificationClick}
          className="relative p-2.5 rounded-full bg-maroon-light hover:bg-maroon-mid/30 text-maroon border border-maroon-mid transition-colors focus:ring-2 focus:ring-maroon"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5 text-maroon" />
          {unreadNotifCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-maroon text-white font-mono text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {unreadNotifCount}
            </span>
          )}
        </button>

        {/* Dynamic Shopping Cart */}
        <button
          id="cart-trigger-btn"
          onClick={onCartClick}
          className="relative p-2.5 rounded-full bg-maroon hover:bg-red-900 text-white border border-maroon transition-colors shadow-sm focus:ring-2 focus:ring-maroon"
          aria-label="View shopping cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-maroon font-mono text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
