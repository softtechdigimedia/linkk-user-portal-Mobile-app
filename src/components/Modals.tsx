import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, Check, ShoppingBag, Plus, Minus, Ticket, MapPin, 
  User, Calendar, Upload, AlertTriangle, CheckCircle,
   LogOut, MessageSquare, Send, FileText, ClipboardList
} from 'lucide-react';
import type{ Medicine, LabPackage, CartItem, Address, Notification, LabBooking } from '../types';
import { MedicalIcon } from './MedicalIcon';
import { TIME_SLOTS } from '../data';

// Generic Backdrop
const Backdrop: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => (
  <div 
    onClick={onClose}
    className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
  >
    <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md my-auto">
      {children}
    </div>
  </div>
);

// 1. Address Modal
interface AddressModalProps {
  onClose: () => void;
  addresses: Address[];
  currentAddress: Address;
  onSelectAddress: (address: Address) => void;
  onAddNewAddress: (address: Address) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  onClose,
  addresses,
  currentAddress,
  onSelectAddress,
  onAddNewAddress,
}) => {
  const [formName, setFormName] = useState('');
  const [formDetails, setFormDetails] = useState('');
  const [formLabel, setFormLabel] = useState('Home');
  const [formPhone, setFormPhone] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formDetails || !formPhone) return;
    onAddNewAddress({
      id: `addr-${Date.now()}`,
      label: formLabel,
      details: formDetails,
      receiverName: formName,
      phone: formPhone,
    });
    setFormName('');
    setFormDetails('');
    setFormPhone('');
    setShowForm(false);
  };

  return (
    <Backdrop onClose={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-[24px] border-[1.5px] border-maroon-mid shadow-xl overflow-hidden p-6 text-left"
      >
        <div className="flex items-center justify-between border-b border-maroon-mid/40 pb-3 mb-4">
          <h3 className="text-lg font-extrabold text-neutral-900 flex items-center space-x-2">
            <MapPin className="text-maroon w-5 h-5" />
            <span>Select Delivery Area</span>
          </h3>
          <button id="close-addr-modal" onClick={onClose} className="p-1 rounded-full hover:bg-maroon-light text-maroon">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showForm ? (
          <div className="space-y-3">
            {addresses.map((address) => {
              const isSelected = address.id === currentAddress.id;
              return (
                <button
                  id={`item-addr-${address.id}`}
                  key={address.id}
                  onClick={() => {
                    onSelectAddress(address);
                    onClose();
                  }}
                  className={`w-full p-4 rounded-[20px] border-[1.5px] text-left flex justify-between items-start transition-all ${
                    isSelected 
                      ? 'border-maroon bg-maroon-light' 
                      : 'border-maroon-mid hover:border-maroon/60 bg-white'
                  }`}
                >
                  <div className="max-w-[85%]">
                    <span className="inline-block bg-maroon text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full mb-1">
                      {address.label}
                    </span>
                    <p className="font-bold text-neutral-900 text-sm tracking-tight">{address.details}</p>
                    <p className="text-xs text-neutral-500 font-semibold mt-1">Recipient: {address.receiverName} · {address.phone}</p>
                  </div>
                  {isSelected && (
                    <div className="bg-maroon text-white p-1 rounded-full shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}

            <button
              id="show-address-form-btn"
              onClick={() => setShowForm(true)}
              className="w-full py-3 border-[1.5px] border-dashed border-maroon text-maroon hover:bg-maroon-light font-extrabold text-sm rounded-[20px] transition-colors"
            >
              + Add Alternate Delivery Address
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-black uppercase text-red-900 mb-1">Address Label</label>
              <div className="grid grid-cols-3 gap-2">
                {['Home', 'Office', 'Other'].map((lbl) => (
                  <button
                    type="button"
                    key={lbl}
                    onClick={() => setFormLabel(lbl)}
                    className={`py-2 text-xs font-bold rounded-xl border-2 transition-all ${
                      formLabel === lbl ? 'bg-red-950 text-white border-red-950' : 'bg-white border-rose-100 text-amber-950'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-red-900 mb-1">Full Delivery Details</label>
              <textarea
                value={formDetails}
                onChange={(e) => setFormDetails(e.target.value)}
                placeholder="House No, Apartment Block, Land mark, Sectors..."
                className="w-full p-3 rounded-xl border border-rose-200 text-sm"
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-black uppercase text-red-900 mb-1">Your Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Recipient Name"
                  className="w-full p-3 rounded-xl border border-rose-200 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-black uppercase text-red-900 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="+91..."
                  className="w-full p-3 rounded-xl border border-rose-200 text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 border border-rose-200 text-amber-950 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-red-950 text-white font-extrabold text-xs rounded-xl"
              >
                Save Location
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </Backdrop>
  );
};


// 2. Cart Modal
interface CartModalProps {
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (itemId: string, type: 'medicine' | 'lab', change: number) => void;
  couponApplied: string | null;
  onApplyCoupon: (code: string) => boolean;
  onCheckout: () => void;
  currentAddress: Address;
}

export const CartModal: React.FC<CartModalProps> = ({
  onClose,
  cartItems,
  onUpdateQty,
  couponApplied,
  onApplyCoupon,
  onCheckout,
  currentAddress,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const medSubtotal = cartItems
    .filter((item) => item.type === 'medicine')
    .reduce((sum, item) => sum + (item.medicine?.price || 0) * item.quantity, 0);

  const labSubtotal = cartItems
    .filter((item) => item.type === 'lab')
    .reduce((sum, item) => sum + (item.labTest?.price || 0) * item.quantity, 0);

  const rawTotal = medSubtotal + labSubtotal;
  
  // Calculate delivery fee: free if above ₹499
  const isFreeDelivery = rawTotal >= 499 || couponApplied === 'FREEDEL499';
  const deliveryFee = rawTotal > 0 && !isFreeDelivery ? 49.00 : 0.00;
  
  // Apply coupon discount codes
  let couponDiscount = 0;
  if (couponApplied === 'MAROON150' && rawTotal >= 599) {
    couponDiscount = 150;
  } else if (couponApplied === 'HEAL50' && labSubtotal > 0) {
    couponDiscount = Math.round(labSubtotal * 0.5);
  }

  const finalTotal = Math.max(0, rawTotal + deliveryFee - couponDiscount);

  const handleApplyCouponCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const validated = onApplyCoupon(couponInput.trim().toUpperCase());
    if (validated) {
      setCouponError('');
    } else {
      setCouponError('Invalid code or conditions not satisfied.');
    }
  };

  const containsRx = cartItems.some((item) => item.type === 'medicine' && item.medicine?.requiresRx);

  return (
    <Backdrop onClose={onClose}>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="bg-white rounded-3xl border-2 border-red-950/20 shadow-xl overflow-hidden text-left flex flex-col max-h-[85vh]"
      >
        {/* Modal Sticky Header */}
        <div className="p-5 border-b border-rose-100 flex items-center justify-between bg-white shrink-0">
          <h3 className="text-lg font-black text-amber-950 flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-red-950" />
            <span>Review Your Basket</span>
          </h3>
          <button id="close-cart-modal" onClick={onClose} className="p-1 rounded-full hover:bg-rose-50 text-rose-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Products List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-none">
          {cartItems.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <ShoppingBag className="w-8 h-8 text-red-900" />
              </div>
              <h4 className="font-extrabold text-amber-950 text-sm">Your basket is totally empty</h4>
              <p className="text-xs text-rose-900/60 mt-1 max-w-[200px] mx-auto">Add medicines or lab tests to generate healthy orders.</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-red-950 text-white font-black text-xs rounded-xl"
              >
                Go Shop Catalogs
              </button>
            </div>
          ) : (
            <>
              {/* Rx Warning */}
              {containsRx && (
                <div className="bg-red-50 border border-red-200/60 p-3 rounded-2xl flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-900 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-red-950 font-medium">
                    <span className="font-black">Prescription (Rx) Required:</span> This basket contains medicines requiring prescription upload at delivery or clinical verify.
                  </div>
                </div>
              )}

              {/* Items iteration */}
              <div id="cart-items-list" className="space-y-3">
                {cartItems.map((item) => {
                  const id = item.type === 'medicine' ? item.medicine!.id : item.labTest!.id;
                  const name = item.type === 'medicine' ? item.medicine!.name : item.labTest!.name;
                  const spec = item.type === 'medicine' ? item.medicine!.packaging : item.labTest!.duration;
                  const price = item.type === 'medicine' ? item.medicine!.price : item.labTest!.price;
                  const img = item.type === 'medicine' ? item.medicine!.imageType : 'test-tube';

                  return (
                    <div 
                      key={`${item.type}-${id}`} 
                      className="p-3.5 bg-rose-50/20 border border-rose-100 rounded-2xl flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3 max-w-[65%]">
                        <div className="shrink-0 bg-white p-1 rounded-xl border border-rose-100">
                          <MedicalIcon type={img} size="sm" />
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-black text-amber-950 leading-tight truncate">{name}</h4>
                          <span className="text-[10px] text-rose-900/60 font-semibold mt-1 block px-2 py-0.5 bg-rose-50 rounded border border-rose-100/50 w-fit">
                            {spec}
                          </span>
                        </div>
                      </div>

                      {/* Steppers & Qty */}
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-black text-red-950">
                          ₹{(price * item.quantity).toFixed(2)}
                        </span>
                        
                        <div className="flex items-center bg-white border border-rose-200 rounded-lg p-1 space-x-1.5 shadow-2xs">
                          <button
                            id={`qty-minus-${item.type}-${id}`}
                            onClick={() => onUpdateQty(id, item.type, -1)}
                            className="p-1 rounded hover:bg-neutral-50 text-red-900"
                            title="Decrease qty"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-[11px] font-black min-w-[12px] text-center">{item.quantity}</span>
                          <button
                            id={`qty-plus-${item.type}-${id}`}
                            onClick={() => onUpdateQty(id, item.type, 1)}
                            className="p-1 rounded hover:bg-neutral-50 text-red-900"
                            title="Increase qty"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Code Panel */}
              <div className="bg-rose-50/30 border border-rose-100 rounded-2xl p-4">
                <span className="text-[10px] uppercase font-black text-red-900 tracking-wider flex items-center mb-2">
                  <Ticket className="w-3.5 h-3.5 mr-1" /> Offers & Coupons
                </span>
                
                <form onSubmit={handleApplyCouponCode} className="flex space-x-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="E.g. MAROON150, HEAL50"
                    className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-rose-200 bg-white"
                  />
                  <button
                    id="apply-coupon-btn"
                    type="submit"
                    className="px-4 py-2 bg-red-950 hover:bg-red-900 text-white font-extrabold text-xs rounded-lg transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>

                {couponError && <p className="text-[10px] font-bold text-red-700 mt-1">{couponError}</p>}
                
                {couponApplied && (
                  <div className="mt-2.5 bg-emerald-50 text-emerald-950 text-[11px] font-bold p-2.5 rounded-lg border border-emerald-100 flex items-center justify-between">
                    <span>Applied Coupon Code Code: <span className="font-extrabold text-emerald-900 uppercase">{couponApplied}</span></span>
                    <span className="text-emerald-900">Active ✓</span>
                  </div>
                )}
              </div>

              {/* Price Details */}
              <div className="space-y-2 border-t border-rose-100 pt-4 text-xs font-medium text-amber-950">
                <h5 className="font-extrabold uppercase text-[10px] tracking-wider text-red-950 mb-2">Payment Bill Summary</h5>
                <div className="flex justify-between">
                  <span className="text-rose-900/80">Medicines Subtotal</span>
                  <span>₹{medSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rose-900/80">Lab Diagnostic Subtotal</span>
                  <span>₹{labSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rose-900/80">Standard Delivery Fees</span>
                  <span className={isFreeDelivery ? 'text-emerald-700 font-bold' : ''}>
                    {isFreeDelivery ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon Price Deductions</span>
                    <span>- ₹{couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-red-950 pt-2 border-t border-rose-50">
                  <span>To Be Paid Value</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Address delivery preview */}
              <div className="p-3 bg-rose-50/20 border border-rose-100 rounded-2xl flex items-center justify-between text-xs mt-2">
                <div className="max-w-[75%]">
                  <span className="block font-black text-rose-900">SHIP TO AREA:</span>
                  <p className="font-bold text-amber-950 truncate">{currentAddress.details}</p>
                </div>
                <MapPin className="w-4 h-4 text-red-950 shrink-0" />
              </div>
            </>
          )}
        </div>

        {/* Checkout Button Bar */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-rose-50/30 border-t border-rose-100 shrink-0">
            <button
              id="confirm-checkout-btn"
              onClick={onCheckout}
              className="w-full py-4 bg-red-950 text-white hover:bg-red-900 active:scale-98 font-extrabold text-sm tracking-widest rounded-2xl shadow-md transition-all uppercase flex items-center justify-center space-x-1"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirm & Checkout (₹{finalTotal.toFixed(2)})</span>
            </button>
          </div>
        )}
      </motion.div>
    </Backdrop>
  );
};


// 3. Book Lab Test Modal
interface BookLabTestModalProps {
  onClose: () => void;
  labPackage: LabPackage;
  onConfirmBooking: (booking: Omit<LabBooking, 'id' | 'status'>) => void;
  currentAddress: Address;
}

export const BookLabTestModal: React.FC<BookLabTestModalProps> = ({
  onClose,
  labPackage,
  onConfirmBooking,
  currentAddress,
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledSlot, setScheduledSlot] = useState(TIME_SLOTS[1]);
  const [checkedTerms, setCheckedTerms] = useState(true);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientAge || !scheduledDate || !checkedTerms) return;
    
    onConfirmBooking({
      labTestId: labPackage.id,
      labTestName: labPackage.name,
      patientName,
      patientAge: parseInt(patientAge),
      patientGender,
      scheduledDate,
      scheduledTimeSlot: scheduledSlot,
      collectionAddress: currentAddress.details,
    });
    onClose();
  };

  return (
    <Backdrop onClose={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl border-2 border-red-950/20 shadow-xl overflow-hidden p-6 text-left"
      >
        <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-4">
          <h3 className="text-lg font-black text-amber-950 flex items-center space-x-2">
            <Calendar className="text-red-950 w-5 h-5 animate-pulse" />
            <span>Schedule Diagnostics</span>
          </h3>
          <button id="close-booking-modal" onClick={onClose} className="p-1 rounded-full hover:bg-rose-50 text-rose-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Package Indicator */}
        <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl mb-4">
          <span className="text-[10px] uppercase font-black text-red-900 tracking-wider">Diagnostic Profile</span>
          <h4 className="text-sm font-black text-amber-950">{labPackage.name}</h4>
          <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-rose-100/50 text-xs">
            <span className="text-rose-900/80">Home sample collected</span>
            <span className="font-extrabold text-red-950">₹{labPackage.price}</span>
          </div>
        </div>

        <form onSubmit={handleSubmitBooking} className="space-y-4">
          {/* Patient Details */}
          <div>
            <label className="block text-[11px] font-black uppercase text-red-950 mb-1">Patient Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-rose-800" />
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="E.g. Ayush Sharma"
                className="w-full bg-white text-sm font-semibold p-3 pl-10 rounded-xl border border-rose-200"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-black uppercase text-red-950 mb-1">Patient Age</label>
              <input
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="Age in yrs"
                className="w-full bg-white text-sm font-semibold p-3 rounded-xl border border-rose-200"
                min={1}
                max={120}
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-red-950 mb-1">Gender</label>
              <select
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value as any)}
                className="w-full bg-white text-sm font-semibold p-3 rounded-xl border border-rose-200 focus:outline-hidden"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Date & Time slots */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-black uppercase text-red-950 mb-1">Select Date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-white text-sm font-semibold p-3 rounded-xl border border-rose-200 text-amber-950"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-red-950 mb-1">Preferred Time Slot</label>
              <select
                value={scheduledSlot}
                onChange={(e) => setScheduledSlot(e.target.value)}
                className="w-full bg-white text-sm font-semibold p-3 rounded-xl border border-rose-200 focus:outline-hidden text-amber-950"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start space-x-2.5 cursor-pointer mt-1">
            <input
              type="checkbox"
              checked={checkedTerms}
              onChange={(e) => setCheckedTerms(e.target.checked)}
              className="mt-1 accent-red-950"
              required
            />
            <span className="text-[10px] text-rose-900/80 font-semibold leading-relaxed">
              I agree that the phlebotomist will arrive during my selection slot. Patient wishes to undergo tests under clinical safety regulations.
            </span>
          </label>

          <div className="flex space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-rose-200 text-amber-950 hover:bg-rose-50 font-extrabold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!checkedTerms}
              className="flex-1 py-3 bg-red-950 hover:bg-red-900 active:scale-95 text-white font-black text-xs rounded-xl disabled:opacity-60"
            >
              Confirm Diagnostics
            </button>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
};


// 4. Product Details Modal
interface ProductDetailsModalProps {
  onClose: () => void;
  medicine: Medicine;
  onAddToCart: () => void;
  quantityInCart: number;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  onClose,
  medicine,
  onAddToCart,
  quantityInCart,
}) => {
  return (
    <Backdrop onClose={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl border-2 border-red-950/20 shadow-xl overflow-hidden p-6 text-left relative flex flex-col max-h-[85vh]"
      >
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-4 shrink-0">
          <span className="inline-flex items-center text-[10px] font-black uppercase text-red-950 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">
            Clinical Specifications
          </span>
          <button id="close-details-modal" onClick={onClose} className="p-1 rounded-full hover:bg-rose-50 text-rose-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable details */}
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-none pr-1">
          {/* Main Title section with custom visual */}
          <div className="flex space-x-4 items-center">
            <div className="bg-rose-50/50 p-2.5 rounded-2xl border border-rose-100/60 shrink-0">
              <MedicalIcon type={medicine.imageType} size="lg" />
            </div>
            <div>
              <h4 className="text-[17px] font-black text-amber-950">{medicine.name}</h4>
              <p className="text-xs text-rose-900/60 italic font-semibold">{medicine.genericName}</p>
              <span className="inline-block bg-red-100 text-red-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded mt-2 uppercase tracking-wide">
                {medicine.packaging}
              </span>
            </div>
          </div>

          {/* Rx Warning Notification */}
          {medicine.requiresRx && (
            <div className="bg-red-50 border border-red-100 p-3 rounded-2xl">
              <span className="text-xs font-black text-red-950 flex items-center space-x-1 uppercase mb-1">
                <AlertTriangle className="w-4 h-4 mr-1 text-red-900" />
                <span>Doctor Prescript Required</span>
              </span>
              <p className="text-[10px] text-red-900/80 font-bold leading-relaxed">
                {medicine.prescriptionAlert || 'You must submit / show a verified medical prescription statement when picking up or upon courier deliveries.'}
              </p>
            </div>
          )}

          {/* Description */}
          <div>
            <h5 className="text-[11px] uppercase font-black text-red-950 tracking-wider">Clinical Description</h5>
            <p className="text-xs font-medium text-amber-950 mt-1.5 leading-relaxed bg-rose-50/10 p-3 rounded-2xl border border-rose-100/50">
              {medicine.description}
            </p>
          </div>

          {/* Dosage */}
          <div>
            <h5 className="text-[11px] uppercase font-black text-red-950 tracking-wider">Symptom / Dosage Recommendations</h5>
            <p className="text-xs mt-1.5 leading-relaxed text-amber-950 bg-rose-50/20 p-3 rounded-2xl border border-rose-100/60">
              {medicine.dosage}
            </p>
          </div>

          {/* Manufacturer detail lines */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-rose-900/70 py-2 border-y border-rose-100/50">
            <div>
              <span className="block text-[8px] uppercase tracking-wide opacity-60">MANUFACTURED BY</span>
              <span className="font-extrabold text-amber-950">{medicine.manufacturer}</span>
            </div>
            <div>
              <span className="block text-[8px] uppercase tracking-wide opacity-60">PRICE INDEX</span>
              <span className="font-extrabold text-red-950">₹{medicine.price} (Inclusive of taxes)</span>
            </div>
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="pt-4 border-t border-rose-50 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] text-rose-900/60 font-semibold uppercase">Total Price</span>
            <p className="text-lg font-black text-red-950">₹{medicine.price}</p>
          </div>
          
          <button
            id={`details-modal-add-${medicine.id}`}
            onClick={() => {
              onAddToCart();
              onClose();
            }}
            className="px-6 py-3 bg-red-950 hover:bg-red-900 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xs"
          >
            {quantityInCart > 0 ? `In Basket (${quantityInCart}) · Add More` : 'Add to basket'}
          </button>
        </div>
      </motion.div>
    </Backdrop>
  );
};


// 5. Prescription Upload Modal
interface PrescriptionUploadModalProps {
  onClose: () => void;
  onSubmit: (note: string) => void;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [note, setNote] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSimulatedUpload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUploaded(true);
    }, 1500);
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploaded) return;
    onSubmit(note || "Simulated prescription statement");
    onClose();
  };

  return (
    <Backdrop onClose={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl border-2 border-red-950/20 shadow-xl overflow-hidden p-6 text-left"
      >
        <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-4">
          <h3 className="text-lg font-black text-amber-950 flex items-center space-x-2">
            <Upload className="text-red-950 w-5 h-5 animate-bounce" />
            <span>Upload Doctor Prescription</span>
          </h3>
          <button id="close-upload-modal" onClick={onClose} className="p-1 rounded-full hover:bg-rose-50 text-rose-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleConfirmSubmit} className="space-y-4">
          <p className="text-xs text-rose-900/85 font-medium leading-relaxed">
            Upload a clear photo of your handwritten physician prescription. Our digital pharmacists will verify it to prepare your medicinal dosage correctly.
          </p>

          {/* DND Drag space mockup */}
          <div 
            onClick={handleSimulatedUpload}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              uploaded 
                ? 'border-emerald-500 bg-emerald-50/20' 
                : 'border-red-900 hover:bg-rose-50 bg-white'
            }`}
          >
            {loading ? (
              <div className="space-y-2">
                <div className="w-10 h-10 border-2 border-red-950 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-rose-900 font-extrabold animate-pulse">Verifying file security...</p>
              </div>
            ) : uploaded ? (
              <div className="space-y-1">
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-xs text-emerald-950 font-black">PRESCRIPTION_SCAN.PDF (940 KB)</p>
                <p className="text-[10px] text-emerald-700 font-bold">Successfully uploaded & authenticated ✓</p>
              </div>
            ) : (
              <div className="space-y-1">
                <Upload className="w-8 h-8 text-amber-950 mx-auto opacity-70 mb-1" />
                <p className="text-xs text-amber-950 font-extrabold">Tap to Upload Photo or PDFs</p>
                <p className="text-[10px] text-rose-900/50">Supports: JPEG, PNG, PDF formats up to 10MB</p>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-black uppercase text-red-950 mb-1 font-mono">Special instructions for pharmacists (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="E.g. substitute syrup for capsules if available, deliver soon..."
              className="w-full bg-white p-3 border border-rose-200 rounded-xl text-sm"
              rows={2}
            />
          </div>

          <div className="flex space-x-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-rose-200 text-amber-950 hover:bg-rose-50 font-extrabold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!uploaded}
              className="flex-1 py-3 bg-red-950 hover:bg-red-900 active:scale-95 text-white font-black text-xs rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Use This Prescription
            </button>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
};


// 6. Notifications Selector Panel
interface NotificationsModalProps {
  onClose: () => void;
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  onClose,
  notifications,
  onMarkRead,
  onClearAll,
}) => {
  return (
    <Backdrop onClose={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl border-2 border-red-950/20 shadow-xl overflow-hidden p-6 text-left relative flex flex-col max-h-[80vh]"
      >
        <div className="flex items-center justify-between border-b border-rose-100 pb-3 mb-4 shrink-0">
          <h3 className="text-lg font-black text-amber-950 flex space-x-2 items-center">
            <CheckCircle className="text-red-950 w-5 h-5" />
            <span>Your Alerts ({notifications.filter(n => !n.read).length})</span>
          </h3>
          <div className="flex items-center space-x-2">
            {notifications.length > 0 && (
              <button
                id="clear-all-notifs"
                onClick={onClearAll}
                className="text-[10px] uppercase font-black text-rose-800 hover:text-red-900 underline"
              >
                Clear All
              </button>
            )}
            <button id="close-notif-modal" onClick={onClose} className="p-1 rounded-full hover:bg-rose-50 text-rose-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3.5 scrollbar-none">
          {notifications.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-xs text-rose-900/60 font-semibold">No notifications or updates right now.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                id={`notif-card-${notif.id}`}
                key={notif.id}
                onClick={() => onMarkRead(notif.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  notif.read 
                    ? 'bg-white border-rose-50 opacity-60' 
                    : 'bg-rose-50/20 border-rose-150 shadow-2xs hover:border-red-950'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="inline-block px-2 py-0.5 text-[8px] font-black uppercase text-red-950 bg-rose-100 rounded">
                    {notif.type}
                  </span>
                  <span className="text-[10px] text-rose-900/40 font-bold">{notif.time}</span>
                </div>
                <h4 className="text-xs font-black text-amber-950 mt-1.5">{notif.title}</h4>
                <p className="text-[11px] text-rose-900/80 font-medium leading-relaxed mt-1">{notif.message}</p>
                
                {!notif.read && (
                  <div className="text-[9px] text-red-950 font-black mt-2 text-right">
                    ✓ Tap to read
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </motion.div>
    </Backdrop>
  );
};


// 7. My Orders Modal
interface MyOrdersModalProps {
  onClose: () => void;
  orders: {
    id: string;
    date: string;
    total: number;
    items: string[];
    status: 'Delivered' | 'In Transit' | 'Processing' | 'Cancelled';
    type: 'medicine' | 'lab';
  }[];
}

export const MyOrdersModal: React.FC<MyOrdersModalProps> = ({ onClose, orders }) => {
  return (
    <Backdrop onClose={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-[24px] border-[1.5px] border-maroon-mid shadow-xl overflow-hidden p-6 text-left relative flex flex-col max-h-[80vh]"
      >
        <div className="flex items-center justify-between border-b border-maroon-mid/40 pb-3 mb-4 shrink-0">
          <h3 className="text-lg font-extrabold text-neutral-900 flex items-center space-x-2">
            <ClipboardList className="text-maroon w-5 h-5 animate-soft-pulse" />
            <span>Order History ({orders.length})</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-maroon-light text-maroon">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-none">
          {orders.length === 0 ? (
            <div className="py-12 text-center">
              <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto mb-2" />
              <p className="text-xs text-neutral-500 font-semibold">You haven't placed any orders yet.</p>
            </div>
          ) : (
            orders.map((o) => (
              <div key={o.id} className="p-4 bg-white border border-maroon-mid rounded-[16px] relative overflow-hidden animate-fade-in">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-black text-neutral-400 font-mono">#{o.id}</span>
                    <p className="text-[10px] text-neutral-500 font-bold">{o.date}</p>
                  </div>
                  <span className={`text-[9px] font-extrabold px-2.0 py-0.5 rounded-full uppercase ${
                    o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                    o.status === 'In Transit' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                    o.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    'bg-neutral-100 text-neutral-500'
                  }`}>
                    {o.status}
                  </span>
                </div>

                <div className="space-y-1 my-3">
                  {o.items.map((item, idx) => (
                    <div key={idx} className="text-xs font-bold text-neutral-800 flex justify-between">
                      <span className="truncate max-w-[80%]">{item}</span>
                      <span className="text-neutral-400">Qty: 1</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-dashed border-maroon-mid/40 flex justify-between items-center text-xs">
                  <span className="text-[9.5px] uppercase font-black tracking-wider text-neutral-400">
                    Type: <span className="text-maroon font-extrabold">{o.type === 'medicine' ? '💊 Medicine' : '🔬 Diagnostics'}</span>
                  </span>
                  <span className="font-extrabold text-maroon text-sm">₹{o.total.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </Backdrop>
  );
};


// 8. Help / Ticket Creator Support Modal
interface HelpSupportModalProps {
  onClose: () => void;
  onSubmitTicket: (category: string, message: string) => void;
}

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ onClose, onSubmitTicket }) => {
  const [category, setCategory] = useState('Delivery Delay');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const ticketId = `KM-TK-${Math.floor(10000 + Math.random() * 90000)}`;
    setCreatedTicketId(ticketId);
    onSubmitTicket(category, message);
    setIsSuccess(true);
  };

  return (
    <Backdrop onClose={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-[24px] border-[1.5px] border-maroon-mid shadow-xl overflow-hidden p-6 text-left"
      >
        <div className="flex items-center justify-between border-b border-maroon-mid/40 pb-3 mb-4">
          <h3 className="text-lg font-extrabold text-neutral-900 flex items-center space-x-2">
            <MessageSquare className="text-maroon w-5 h-5 animate-pulse" />
            <span>Create Ticket & Support</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-maroon-light text-maroon">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-black uppercase text-neutral-500 mb-1.5">Select Concern Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-[12px] border-[1.5px] border-maroon-mid text-sm bg-white text-neutral-800 font-semibold focus:border-maroon focus:outline-hidden"
              >
                <option value="Delivery Delay">⏰ Medicine Delivery Delay</option>
                <option value="Diagnostics Feedback">🔬 Lab Companion / Phlebotomist Inquiry</option>
                <option value="Incorrect Products">📦 Wrong items inside the package</option>
                <option value="Refunding Issues">💳 Payment check or refund request</option>
                <option value="Other Assistance">💬 Direct GP clinical inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-neutral-500 mb-1.5">Explain Your Problem</label>
              <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type details so that our dispatch pharmacist support crew can assist you quickly..."
                className="w-full p-3.5 rounded-[14px] border-[1.5px] border-maroon-mid text-sm focus:border-maroon focus:outline-hidden text-neutral-800 placeholder:text-neutral-400 font-medium"
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-maroon text-white hover:bg-neutral-900 font-extrabold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Ticket Support Request</span>
            </button>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-xs border border-emerald-200 animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-neutral-900">Support Ticket Raised</h4>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Your ticket has been sent to the on-call medical coordinator. Your ticket ID is <span className="font-mono font-black text-maroon bg-maroon-light px-1.5 py-0.5 rounded">{createdTicketId}</span>.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-maroon text-white font-extrabold text-xs uppercase tracking-wide rounded-lg hover:bg-neutral-950"
            >
              Got it
            </button>
          </div>
        )}
      </motion.div>
    </Backdrop>
  );
};


// 9. Policies Modal
interface PoliciesModalProps {
  onClose: () => void;
}

export const PoliciesModal: React.FC<PoliciesModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'refund' | 'nabl'>('privacy');

  return (
    <Backdrop onClose={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-[24px] border-[1.5px] border-maroon-mid shadow-xl overflow-hidden p-6 text-left relative flex flex-col max-h-[80vh]"
      >
        <div className="flex items-center justify-between border-b border-maroon-mid/40 pb-3 mb-4 shrink-0">
          <h3 className="text-lg font-extrabold text-neutral-900 flex items-center space-x-2">
            <FileText className="text-maroon w-5 h-5 animate-pulse" />
            <span>Linkk<span className="text-rose-600 font-black font-sans">.</span> Policies & Standards</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-maroon-light text-maroon">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex space-x-1 border-b border-maroon-mid/45 pb-2.5 mb-4 shrink-0 justify-between">
          {[
            { id: 'privacy', label: '🛡️ Privacy' },
            { id: 'refund', label: '💳 Refunds' },
            { id: 'nabl', label: '🔬 Clinical' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                activeTab === t.id 
                  ? 'bg-maroon text-white font-extrabold shadow-sm' 
                  : 'bg-white text-neutral-500 hover:text-maroon hover:bg-neutral-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto space-y-3.5 scrollbar-none text-neutral-600 text-xs leading-relaxed font-semibold">
          {activeTab === 'privacy' && (
            <div className="animate-fade-in">
              <p className="font-extrabold text-neutral-900 mb-1 text-sm">Medical Records Data Security Guidelines:</p>
              <p className="mb-2 text-neutral-500 font-medium">Your uploaded prescriptions, diagnostics reports, and personal address logs are fully encrypted on cloud databases with secure HIPAA medical alignment.</p>
              <p className="font-extrabold text-neutral-900 mb-1 text-sm">Sharing Policies:</p>
              <p className="text-neutral-500 font-medium">We do not lease or license your clinical datasets to commercial medical conglomerates. Only certified clinical phlebotomists and licensed dispatch drug pharmacists receive essential verification files.</p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="animate-fade-in">
              <p className="font-extrabold text-neutral-900 mb-1 text-sm">Instant Cancellation Guidelines:</p>
              <p className="mb-2 text-neutral-500 font-medium">You can cancel any medical orders or diagnostic home collection sessions free of charge anytime prior to courier dispatch or sample drawing visits.</p>
              <p className="font-extrabold text-neutral-900 mb-1 text-sm font-medium">Refund Turnaround Duration:</p>
              <p className="text-neutral-500 font-medium">Refund values will return to your native bank account or checkout visa card sources within 2-4 standard working days under full financial coverage.</p>
            </div>
          )}

          {activeTab === 'nabl' && (
            <div className="animate-fade-in">
              <p className="font-extrabold text-neutral-900 mb-1 text-sm">NABL Accredited Diagnostics Partners:</p>
              <p className="mb-2 text-neutral-500 font-medium">All physical sample collections booked on this digital app are cataloged in high-fidelity, ISO-certified clinical laboratories globally verified by diagnostic councils.</p>
              <p className="font-extrabold text-neutral-900 mb-1 text-sm">Drug Dispense Standard verification:</p>
              <p className="text-neutral-500 font-medium">Specialty class medicines or critical pharmaceutical supplies marked with Rx badge cannot be verified or checked out without providing digital doctor prescription files.</p>
            </div>
          )}
        </div>
      </motion.div>
    </Backdrop>
  );
};


// 10. Delete Account Modal (Dangerous action double-check)
interface DeleteAccountModalProps {
  onClose: () => void;
  onConfirmDelete: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ onClose, onConfirmDelete }) => {
  const [confirmInput, setConfirmInput] = useState('');

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmInput.toUpperCase() === 'DELETE') {
      onConfirmDelete();
    }
  };

  return (
    <Backdrop onClose={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-[24px] border-[1.5px] border-red-500 shadow-xl overflow-hidden p-6 text-left"
      >
        <div className="flex items-center justify-between border-b border-red-100 pb-3 mb-4">
          <h3 className="text-lg font-extrabold text-red-600 flex items-center space-x-2">
            <AlertTriangle className="text-red-500 w-5 h-5 animate-pulse" />
            <span>Permanently Delete Account?</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-neutral-500 text-xs leading-relaxed mb-4 font-semibold">
          Warning: Doing this will wipe clean your saved locations, diagnostic report catalogs, order tracking statistics, and profile parameters. This action is **unrecoverable**.
        </p>

        <form onSubmit={handleDelete} className="space-y-4">
          <div>
            <label className="block text-[11px] font-black uppercase text-red-600 mb-1.5">Type "DELETE" to confirm:</label>
            <input 
              type="text" 
              value={confirmInput} 
              onChange={(e) => setConfirmInput(e.target.value)}
              placeholder="DELETE"
              className="w-full p-3 rounded-xl border-2 border-red-200 text-sm font-extrabold text-red-700 tracking-wide uppercase placeholder:text-red-200 focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-400"
              required
            />
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-neutral-200 text-neutral-800 font-bold text-xs rounded-xl hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={confirmInput.toUpperCase() !== 'DELETE'}
              className="flex-1 py-3 bg-red-600 text-white hover:bg-red-700 active:scale-95 font-extrabold text-xs rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Yes, Purge My Account
            </button>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
};


// 11. Logout Modal (Fast confirm)
interface LogoutModalProps {
  onClose: () => void;
  onConfirmLogout: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ onClose, onConfirmLogout }) => {
  return (
    <Backdrop onClose={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-[24px] border-[1.5px] border-maroon-mid shadow-xl overflow-hidden p-6 text-left"
      >
        <div className="flex items-center justify-between border-b border-maroon-mid/40 pb-3 mb-4">
          <h3 className="text-lg font-extrabold text-neutral-900 flex items-center space-x-2">
            <LogOut className="text-maroon w-5 h-5 animate-soft-pulse" />
            <span>Sign Out Confirmation</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-maroon-light text-maroon">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-neutral-500 text-xs leading-relaxed mb-5 font-semibold">
          You will need to re-verify your phone code verification to log back in next time. Do you wish to proceed?
        </p>

        <div className="flex space-x-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-maroon-mid text-maroon font-bold text-xs rounded-xl hover:bg-neutral-50"
          >
            Stay Signed In
          </button>
          <button
            onClick={onConfirmLogout}
            className="flex-1 py-3 bg-maroon text-white hover:bg-neutral-950 active:scale-95 font-extrabold text-xs rounded-xl transition-all"
          >
            Confirm Logout
          </button>
        </div>
      </motion.div>
    </Backdrop>
  );
};
