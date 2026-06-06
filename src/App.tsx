import  { useState, useEffect } from 'react';
import { 
   Signal, Upload, HeartPulse, 
  Trash2,  FileCheck, ArrowRight, CheckCircle2, Calendar, ArrowLeft, Pill, ClipboardCheck, Microscope, AlertTriangle,
  User, LogOut,ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data and types imports
import { 
  MEDICINES_DATA, 
  LAB_PACKAGES_DATA, 
  INITIAL_ADDRESSES, 
  INITIAL_NOTIFICATIONS, 
  CATEGORY_METADATA 
} from './data';
import type{ Medicine, LabPackage, CartItem, Address, Notification, LabBooking } from './types';

// Custom components
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { PromoCarousel } from './components/PromoCarousel';
import { CategorySlider } from './components/CategorySlider';
import { ProductCard } from './components/ProductCard';
import { LabPackageSlider } from './components/LabPackageSlider';
import { BottomNavigation } from './components/BottomNavigation';
import { AuthFlow } from './components/AuthFlow';
import { OnboardingFlow } from './components/OnboardingFlow';

// Modals
import { 
  AddressModal, 
  CartModal, 
  BookLabTestModal, 
  ProductDetailsModal, 
  PrescriptionUploadModal, 
  NotificationsModal,
  MyOrdersModal,
  HelpSupportModal,
  PoliciesModal,
  DeleteAccountModal,
  LogoutModal
} from './components/Modals';

export default function App() {
  // Navigation tabs state
  const [currentTab, setCurrentTab] = useState<'home' | 'medicines' | 'labs' | 'prescriptions' | 'profile'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Medicines');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // App system clock
  const [timeStr, setTimeStr] = useState('09:41');
  console.log(timeStr);

  // Core Data States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [currentAddress, setCurrentAddress] = useState<Address>(INITIAL_ADDRESSES[0]);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [bookings, setBookings] = useState<LabBooking[]>([]);
  const [prescriptions, setPrescriptions] = useState<{ id: string; fileName: string; note: string; date: string }[]>([]);

  // Modal Open States
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedMedicineForDetails, setSelectedMedicineForDetails] = useState<Medicine | null>(null);
  const [selectedLabPackageForBooking, setSelectedLabPackageForBooking] = useState<LabPackage | null>(null);
  
  // Custom Profile-centric Modal States
  const [isMyOrdersModalOpen, setIsMyOrdersModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isPoliciesModalOpen, setIsPoliciesModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(() => {
    return localStorage.getItem('linkk_onboarding_completed') === 'true';
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('linkk_is_logged_in') === 'true';
  });
  const [userPhone, setUserPhone] = useState<string>(() => {
    return localStorage.getItem('linkk_user_phone') || '9999999991';
  });

  // Hardcoded & Dynamic past orders matching premium clinical fidelity
  const [orders, setOrders] = useState<{
    id: string;
    date: string;
    total: number;
    items: string[];
    status: 'Delivered' | 'In Transit' | 'Processing' | 'Cancelled';
    type: 'medicine' | 'lab';
  }[]>([
    {
      id: 'MAR-4829',
      date: '04 Jun 2026',
      total: 349.00,
      items: ['Amoxicillin Oral Capsule 500mg', 'Paracetamol 650mg Chewable'],
      status: 'Delivered',
      type: 'medicine'
    },
    {
      id: 'MAR-8273',
      date: '02 Jun 2026',
      total: 1290.00,
      items: ['Complete Blood Count (CBC) & Sugar Screen'],
      status: 'Delivered',
      type: 'lab'
    }
  ]);

  // Checkout and Coupons
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [justCheckedOutOrder, setJustCheckedOutOrder] = useState<{
    orderId: string;
    totalAmount: number;
    items: string[];
    requiresPrescription: boolean;
  } | null>(null);

  // Tick the dynamic clock of status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      setTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll body container back to top on tab transition
  useEffect(() => {
    const container = document.getElementById('scrollable-body-container');
    if (container) {
      container.scrollTop = 0;
    }
  }, [currentTab]);

  // Filter medicines by categories & search terms
  const filteredMedicines = MEDICINES_DATA.filter((med) => {
    const matchesCategory = selectedCategory === 'All Medicines' || med.category === selectedCategory;
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (med.genericName && med.genericName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          med.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });



  // Add/Remove Cart Operations
  const handleAddToCart = (medicine: Medicine) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.type === 'medicine' && item.medicine?.id === medicine.id);
      if (existing) {
        return prevCart.map((item) => 
          item.type === 'medicine' && item.medicine?.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { type: 'medicine', medicine, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (medicine: Medicine) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.type === 'medicine' && item.medicine?.id === medicine.id);
      if (!existing) return prevCart;
      if (existing.quantity === 1) {
        return prevCart.filter((item) => !(item.type === 'medicine' && item.medicine?.id === medicine.id));
      }
      return prevCart.map((item) => 
        item.type === 'medicine' && item.medicine?.id === medicine.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const handleUpdateQty = (itemId: string, type: 'medicine' | 'lab', change: number) => {
    setCart((prevCart) => {
      const updated = prevCart.map((item) => {
        const match = type === 'medicine' 
          ? (item.type === 'medicine' && item.medicine?.id === itemId)
          : (item.type === 'lab' && item.labTest?.id === itemId);

        if (match) {
          const newQty = item.quantity + change;
          return newQty <= 0 ? null : { ...item, quantity: newQty };
        }
        return item;
      });
      return updated.filter(Boolean) as CartItem[];
    });
  };

  // Coupons Manager
  const handleApplyCoupon = (code: string): boolean => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'MAROON150') {
      const subtotal = cart.reduce((sum, item) => sum + (item.medicine?.price || item.labTest?.price || 0) * item.quantity, 0);
      if (subtotal >= 599) {
        setCouponApplied('MAROON150');
        // trigger system notification
        addSystemNotification('Coupon Applied Successfully', 'Discount of ₹150 was successfully deducted from your bill.', 'promo');
        return true;
      }
    } else if (formatted === 'HEAL50') {
      const hasLab = cart.some((item) => item.type === 'lab');
      if (hasLab) {
        setCouponApplied('HEAL50');
        addSystemNotification('Lab Diagnostic Code Activated', 'Flat 50% discount applied to your health packages pricing.', 'promo');
        return true;
      }
    } else if (formatted === 'FREEDEL499') {
      setCouponApplied('FREEDEL499');
      addSystemNotification('Delivery Waived', 'Standard courier delivery charge waived on your checkouts.', 'promo');
      return true;
    }
    return false;
  };

  const addSystemNotification = (title: string, message: string, type: 'order' | 'lab' | 'promo' | 'general' = 'general') => {
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      read: false,
      type
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Place order checkout operation
  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const medSubtotal = cart.filter(i => i.type === 'medicine').reduce((s, i) => s + (i.medicine?.price || 0) * i.quantity, 0);
    const labSubtotal = cart.filter(i => i.type === 'lab').reduce((s, i) => s + (i.labTest?.price || 0) * i.quantity, 0);
    const rawTotal = medSubtotal + labSubtotal;
    const isFree = rawTotal >= 499 || couponApplied === 'FREEDEL499';
    const delivery = rawTotal > 0 && !isFree ? 49.00 : 0.00;
    
    let discount = 0;
    if (couponApplied === 'MAROON150' && rawTotal >= 599) discount = 150;
    else if (couponApplied === 'HEAL50') discount = Math.round(labSubtotal * 0.5);

    const paidVal = Math.max(0, rawTotal + delivery - discount);
    const containsRx = cart.some(i => i.type === 'medicine' && i.medicine?.requiresRx);

    const checkOutData = {
      orderId: `MAR-${Math.floor(1000 + Math.random() * 9000)}`,
      totalAmount: paidVal,
      items: cart.map(i => i.type === 'medicine' ? `${i.medicine?.name} (x${i.quantity})` : `${i.labTest?.name} (x${i.quantity})`),
      requiresPrescription: containsRx
    };

    // Prepend new order record to profile order list history
    const newOrderRecord = {
      id: checkOutData.orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      total: paidVal,
      items: cart.map(i => i.type === 'medicine' ? `${i.medicine?.name} (x${i.quantity})` : `${i.labTest?.name} (x${i.quantity})`),
      status: 'Processing' as const,
      type: cart.some(i => i.type === 'lab') ? ('lab' as const) : ('medicine' as const)
    };
    setOrders((prev) => [newOrderRecord, ...prev]);

    setCart([]);
    setCouponApplied(null);
    setIsCartModalOpen(false);
    setJustCheckedOutOrder(checkOutData);

    // Add order alerts
    addSystemNotification(
      'Order Received Successfully!',
      `Your order ${checkOutData.orderId} of ₹${paidVal} has been scheduled for delivery to ${currentAddress.label}.`,
      'order'
    );
  };

  // Add a new lab test collection appointment
  const handleConfirmLabBooking = (data: Omit<LabBooking, 'id' | 'status'>) => {
    const newBooking: LabBooking = {
      id: `lab-${Date.now()}`,
      status: 'Scheduled',
      ...data
    };
    setBookings((prev) => [newBooking, ...prev]);

    const newBookingRecord = {
      id: `MAR-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      total: 699.00, // standard lab diagnostic cost
      items: [`Home Sample Collection: ${data.labTestName} (Patient: ${data.patientName})`],
      status: 'In Transit' as const,
      type: 'lab' as const
    };
    setOrders((prev) => [newBookingRecord, ...prev]);

    addSystemNotification(
      'Diagnostic Booked ✓',
      `Home Sample Collection for ${newBooking.patientName} scheduled for ${newBooking.scheduledDate} (${newBooking.scheduledTimeSlot}).`,
      'lab'
    );
  };

  // Add prescription files
  const handlePrescriptionSubmit = (note: string) => {
    const p = {
      id: `pres-${Date.now()}`,
      fileName: 'PRESCRIPTION_SCAN.PDF',
      note,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setPrescriptions((prev) => [p, ...prev]);
    addSystemNotification(
      'Prescription Uploaded',
      'Our digital clinical pharmacists have received your JPG/PDF uploader and are verifying.',
      'general'
    );
  };

  // Notification action handlers
  const handleMarkNotifRead = (id: string) => {
    setNotifications((prev) => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
  };

  return (
    <div className="h-full w-full bg-[#f7f7f7] text-neutral-800 font-sans flex flex-col items-center justify-center overflow-hidden py-0 md:py-4 selection:bg-maroon-light relative">
      
      {/* Dynamic Back-drop for desktop frames to describe app intent beautifully */}
      <div className="absolute inset-0 bg-radial-at-t from-[#fdf2f2] via-neutral-100/50 to-neutral-50/20 pointer-events-none" />

      {/* Title block for desktop browser layouts to establish design focus - absolutely positioned so it never pushes the layout down */}
      <header className="hidden lg:flex absolute top-6 left-6 flex-col items-start text-left space-y-1 max-w-xs pointer-events-none z-15">
        <h1 className="text-xl font-extrabold text-maroon flex items-center space-x-2 drop-shadow-xs">
          <HeartPulse className="w-5 h-5 text-maroon animate-soft-pulse" />
          <span>Medicine & Lab Test App</span>
        </h1>
        <p className="text-[11px] font-semibold text-neutral-500 leading-normal">
          Styled with Bento Grid compartment aesthetics. Clean crimson accents & mid-maroon borders.
        </p>
      </header>

      {/* 
        Sleek Portable Mobile Smartphone Chassis Mockup!
        This allows full responsive adaptivity:
        - Desktop screens: Centered, rounded, framed smartphone.
        - Mobile screens: Seamlessly fills up 100% of the screen.
      */}
      <div 
        id="applet-viewport-frame"
        className="w-full max-w-[380px] bg-white relative flex flex-col h-full md:h-[630px] md:max-h-[90vh] md:rounded-[48px] md:border-[12px] md:border-[#1a1a1a] shadow-[0_25px_50px_-12px_rgba(128,0,0,0.12)] overflow-hidden z-10 shrink-0 transform"
      >
        {!isOnboardingCompleted ? (
          <OnboardingFlow 
            onComplete={() => {
              setIsOnboardingCompleted(true);
              localStorage.setItem('linkk_onboarding_completed', 'true');
            }}
          />
        ) : !isLoggedIn ? (
          <AuthFlow 
            onLoginSuccess={(phoneOrEmail) => {
              setIsLoggedIn(true);
              setUserPhone(phoneOrEmail);
              localStorage.setItem('linkk_is_logged_in', 'true');
              localStorage.setItem('linkk_user_phone', phoneOrEmail);
              addSystemNotification(
                'Welcome to Linkk.',
                `Successfully signed in as ${phoneOrEmail}`,
                'general'
              );
            }} 
          />
        ) : (
          <>
            {/* Scrollable Container Body Area */}
            <div id="scrollable-body-container" className="flex-1 overflow-y-auto pb-32 bg-white scrollbar-none flex flex-col justify-between">
          
          <div className="flex-col">
            {/* Header with location & shopping widgets */}
            <Header 
              currentAddress={currentAddress}
              onAddressClick={() => setIsAddressModalOpen(true)}
              onNotificationClick={() => setIsNotificationsModalOpen(true)}
              onCartClick={() => setIsCartModalOpen(true)}
              cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
              unreadNotifCount={notifications.filter(n => !n.read).length}
            />

            {/* TAB RENDERING CONTROLLER */}
            <AnimatePresence mode="wait">
              {currentTab === 'home' && (
                <motion.div
                  key="tab-home"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Linkk. Brand Home Header Banner */}
                  <div className="px-5 pt-5 pb-2 flex items-center justify-between select-none">
                    <span className="font-serif text-3xl font-bold text-neutral-900 tracking-tight flex items-baseline">
                      Linkk<span className="text-rose-600 text-4xl leading-none ml-0.5 select-none font-sans font-black">.</span>
                    </span>
                    <span className="text-[10px] bg-rose-50 text-rose-800 font-extrabold px-2.5 py-1 rounded-full border border-rose-100/60 uppercase tracking-widest">
                      Health Hub
                    </span>
                  </div>

                  {/* Pills Search input */}
                  <SearchBar 
                    query={searchQuery}
                    onChange={(val) => {
                      setSearchQuery(val);
                      if (val) {
                        setCurrentTab('medicines');
                      }
                    }}
                    onClear={() => setSearchQuery('')}
                  />

                  {/* Rotational promotions carousel */}
                  <PromoCarousel 
                    onPromoClick={(code) => {
                      setIsCartModalOpen(true);
                      handleApplyCoupon(code);
                    }}
                    onUploadPrescription={() => setIsPrescriptionModalOpen(true)}
                  />

                  {/* Quick toggle action & Category scrolling slider */}
                  <CategorySlider 
                    selectedCategory={selectedCategory}
                    onSelectCategory={(cat) => {
                      setSelectedCategory(cat);
                      setCurrentTab('medicines');
                    }}
                    onBrowseTypeChange={(type) => {
                      if (type === 'lab') {
                        // Smoothly scroll or toggle view tab
                        setCurrentTab('labs');
                      } else {
                        setCurrentTab('medicines');
                      }
                    }}
                    activeBrowseType="medicine"
                  />

                  {/* Popular Medicines grid block list - copied styling of image 4 */}
                  <section className="px-4 py-3 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-[18px] font-extrabold text-neutral-900 tracking-tight flex items-center space-x-1.5">
                          <Pill className="w-5 h-5 text-maroon" />
                          <span>Popular Medicines</span>
                        </h2>
                        <p className="text-[11px] text-neutral-500 font-semibold">Bestselling healthcare remedies</p>
                      </div>
                      <button
                        id="view-all-meds-btn"
                        onClick={() => {
                          setSelectedCategory('All Medicines');
                          setCurrentTab('medicines');
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-maroon-light hover:bg-maroon-mid/30 text-maroon text-xs font-bold flex items-center space-x-1 transition-colors border border-maroon-mid"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {MEDICINES_DATA.slice(0, 4).map((medicine) => {
                        const cartItem = cart.find((i) => i.type === 'medicine' && i.medicine?.id === medicine.id);
                        const qty = cartItem ? cartItem.quantity : 0;
                        return (
                          <ProductCard 
                            key={medicine.id}
                            medicine={medicine}
                            quantityInCart={qty}
                            onAddToCart={() => handleAddToCart(medicine)}
                            onRemoveFromCart={() => handleRemoveFromCart(medicine)}
                            onOpenDetails={() => setSelectedMedicineForDetails(medicine)}
                          />
                        );
                      })}
                    </div>
                  </section>

                  {/* Diagnostics Lab Package sliders */}
                  <LabPackageSlider 
                    onBookLabTest={(pkg) => setSelectedLabPackageForBooking(pkg)}
                    cartPackages={bookings.map(b => b.labTestId)}
                  />

                  {/* Healthcare at your doorstep custom footer - Matches Image 7 */}
                  <div className="my-8 px-6 text-center">
                    <h3 className="text-3xl font-extrabold text-rose-300 italic tracking-tight opacity-50 bg-gradient-to-r from-rose-950 to-rose-700 bg-clip-text text-transparent">
                      Healthcare
                    </h3>
                    <h4 className="text-2xl font-black text-rose-300 tracking-wider">
                      at your doorstep
                    </h4>
                    <div className="w-12 h-1 bg-rose-200 mx-auto mt-3 rounded-full" />
                  </div>
                </motion.div>
              )}

              {/* Browse Catalog Medicaments Tab */}
              {currentTab === 'medicines' && (
                <motion.div
                  key="tab-medicines"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 py-3"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <button 
                      id="back-to-home-med"
                      onClick={() => {
                        setSearchQuery('');
                        setCurrentTab('home');
                      }}
                      className="p-1 rounded-full hover:bg-rose-50 text-red-950"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h2 className="text-xl font-extrabold text-amber-950">Medicines Store</h2>
                      <p className="text-xs text-rose-800 font-medium">Browse by therapeutic classes</p>
                    </div>
                  </div>

                  {/* Pills Search input */}
                  <div className="mb-3">
                    <SearchBar 
                      query={searchQuery}
                      onChange={setSearchQuery}
                      onClear={() => setSearchQuery('')}
                    />
                  </div>

                  {/* Scrolling chips indicators */}
                  <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-none">
                    <button
                      id="chip-all-meds"
                      onClick={() => setSelectedCategory('All Medicines')}
                      className={`px-4 py-2 text-xs font-black rounded-lg border transition-all shrink-0 ${
                        selectedCategory === 'All Medicines'
                          ? 'border-red-950 bg-red-950 text-white'
                          : 'border-rose-100 bg-rose-50/30 text-amber-950'
                      }`}
                    >
                      All Classes
                    </button>
                    {CATEGORY_METADATA.map((cat) => (
                      <button
                        id={`chip-cat-${cat.name.replace(/\s+/g, '-').toLowerCase()}`}
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`px-4 py-2 text-xs font-black rounded-lg border transition-all shrink-0 ${
                          selectedCategory === cat.name
                            ? 'border-red-950 bg-red-950 text-white'
                            : 'border-rose-100 bg-rose-50/30 text-amber-950'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Catalogue results lists */}
                  {filteredMedicines.length === 0 ? (
                    <div className="py-12 text-center">
                      <p className="text-xs text-rose-900/60 font-semibold">No medicines matched your categories or filters.</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('All Medicines');
                        }}
                        className="mt-4 px-5 py-2.5 bg-red-950 text-white font-black text-xs rounded-xl"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {filteredMedicines.map((medicine) => {
                        const cartItem = cart.find((i) => i.type === 'medicine' && i.medicine?.id === medicine.id);
                        const qty = cartItem ? cartItem.quantity : 0;
                        return (
                          <ProductCard 
                            key={medicine.id}
                            medicine={medicine}
                            quantityInCart={qty}
                            onAddToCart={() => handleAddToCart(medicine)}
                            onRemoveFromCart={() => handleRemoveFromCart(medicine)}
                            onOpenDetails={() => setSelectedMedicineForDetails(medicine)}
                          />
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Lab test panel collections diagnostics Tab */}
              {currentTab === 'labs' && (
                <motion.div
                  key="tab-labs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 py-3"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <button 
                      id="back-to-home-labs"
                      onClick={() => setCurrentTab('home')}
                      className="p-1 rounded-full hover:bg-rose-50 text-red-950"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h2 className="text-xl font-extrabold text-amber-950">Lab Diagnostic Services</h2>
                      <p className="text-xs text-rose-800 font-medium">Schedule physician-verified home collection</p>
                    </div>
                  </div>

                  {/* Scheduled Appointments logs */}
                  <div className="mb-6">
                    <h3 className="text-xs font-black uppercase text-red-900 tracking-wider mb-2.5 flex items-center">
                      <ClipboardCheck className="w-4 h-4 mr-1 text-red-950" />
                      <span>Scheduled Appointments ({bookings.length})</span>
                    </h3>

                    {bookings.length === 0 ? (
                      <div className="border-2 border-dashed border-rose-100 p-6 rounded-2xl text-center bg-rose-50/5/50">
                        <Microscope className="w-8 h-8 text-rose-900/40 mx-auto mb-2" />
                        <span className="block text-xs font-extrabold text-amber-950">No diagnostic tests scheduled yet</span>
                        <p className="text-[10px] text-rose-900/60 mt-1">Book tests below to receive clinical phlebotomist samples visits at home.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {bookings.map((b) => (
                          <div key={b.id} className="p-4 bg-white border-2 border-red-950/20 rounded-2xl relative overflow-hidden shadow-xs">
                            <span className="absolute right-3 top-3 bg-red-950 text-white text-[8px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                              {b.status}
                            </span>
                            
                            <h4 className="text-xs font-black text-amber-950 max-w-[70%]">{b.labTestName}</h4>
                            <p className="text-[11px] text-rose-900/70 font-semibold mt-1">Patient: {b.patientName} ({b.patientAge} years, {b.patientGender})</p>
                            
                            <div className="mt-3 pt-2 border-t border-rose-50 flex items-center justify-between text-[11px] font-bold text-red-950">
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-3.5 h-3.5 mr-0.5" />
                                <span>{b.scheduledDate}</span>
                              </span>
                              <span className="flex items-center space-x-1 text-rose-900">
                                <Signal className="w-3.5 h-3.5 mr-0.5" />
                                <span>{b.scheduledTimeSlot}</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Diagnostics package selection catalog */}
                  <div>
                    <h3 className="text-xs font-black uppercase text-red-900 tracking-wider mb-3">Available Lab Diagnostics</h3>
                    <div className="space-y-4">
                      {LAB_PACKAGES_DATA.map((pkg) => {
                        const isAdded = bookings.some(b => b.labTestId === pkg.id);
                        return (
                          <div key={pkg.id} className="p-4.5 border-2 border-rose-100 hover:border-red-950 bg-white rounded-3xl transition-all shadow-2xs">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-sm font-black text-amber-950">{pkg.name}</h4>
                              <span className="bg-red-50 text-red-950 text-[9px] font-extrabold px-2 py-0.5 rounded-md">
                                {pkg.duration}
                              </span>
                            </div>

                            <p className="text-xs text-rose-900/70 font-medium leading-relaxed mb-3">
                              {pkg.description}
                            </p>

                            <div className="flex items-center justify-between pt-3 border-t border-rose-50">
                              <div>
                                <span className="block text-[9px] text-rose-900/40 uppercase font-black">All Inclusive Price</span>
                                <span className="text-base font-black text-red-950">₹{pkg.price}</span>
                              </div>

                              <button
                                onClick={() => setSelectedLabPackageForBooking(pkg)}
                                className={`px-4 py-2.5 text-xs font-black rounded-lg transition-all ${
                                  isAdded
                                    ? 'bg-rose-50 text-rose-900 border border-rose-100 cursor-not-allowed'
                                    : 'bg-red-950 hover:bg-red-900 text-white shadow-xs'
                                }`}
                                disabled={isAdded}
                              >
                                {isAdded ? 'Already Booked ✓' : 'Book Diagnostic'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Upload Prescription Tab */}
              {currentTab === 'prescriptions' && (
                <motion.div
                  key="tab-prescriptions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 py-3"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <button 
                      id="back-to-home-pres"
                      onClick={() => setCurrentTab('home')}
                      className="p-1 rounded-full hover:bg-rose-50 text-red-950"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h2 className="text-xl font-extrabold text-amber-950">Prescription Desk</h2>
                      <p className="text-xs text-rose-800 font-medium">Submit and verify handwritten clinical orders</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-rose-50/70 to-rose-100/30 border border-rose-100 rounded-3xl p-5 mb-5 text-center">
                    <Upload className="w-8 h-8 text-red-950 mx-auto mb-2" />
                    <h3 className="text-sm font-black text-amber-950">Upload Prescription Now</h3>
                    <p className="text-xs text-rose-900/70 font-semibold leading-relaxed mt-1 max-w-[200px] mx-auto">
                      Get direct prescription diagnostic validation from certified medical specialists.
                    </p>
                    <button
                      id="trigger-p-upload"
                      onClick={() => setIsPrescriptionModalOpen(true)}
                      className="mt-4 w-full py-3 bg-red-950 hover:bg-red-900 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-colors shadow-xs"
                    >
                      Start Upload Wizard
                    </button>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase text-red-900 tracking-wider mb-2.5">Your Prescription Records ({prescriptions.length})</h3>
                    {prescriptions.length === 0 ? (
                      <div className="border-2 border-dashed border-rose-100 p-6 rounded-2xl text-center bg-rose-50/5/50">
                        <FileCheck className="w-8 h-8 text-rose-900/40 mx-auto mb-2" />
                        <span className="block text-xs font-extrabold text-amber-950">No uploaded files yet</span>
                        <p className="text-[10px] text-rose-900/60 mt-1">Uploaded digital prescrip documents show up here for fast checkout access.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {prescriptions.map((p) => (
                          <div key={p.id} className="p-4 bg-white border-2 border-red-950/20 rounded-2xl flex justify-between items-start">
                            <div>
                              <h4 className="text-xs font-black text-amber-950">{p.fileName}</h4>
                              <p className="text-[10px] text-rose-950 bg-rose-150/50 px-2 py-0.5 rounded w-fit mt-1.5 font-bold">Uploaded on: {p.date}</p>
                              <p className="text-[11px] text-rose-900/70 mt-2 font-medium">Note: "{p.note}"</p>
                            </div>
                            <span className="bg-emerald-100 text-emerald-950 text-[9px] font-extrabold px-2 py-1 rounded">
                              ✓ VERIFIED
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* User Account Details Profile Tab */}
              {currentTab === 'profile' && (
                <motion.div
                  key="tab-profile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 py-1 flex flex-col items-stretch space-y-4 max-w-sm mx-auto"
                >
                  {/* Linkk. Brand Logo */}
                  <div className="flex justify-center items-center py-4 animate-fade-in shrink-0 select-none">
                    <span className="font-serif text-[42px] font-bold text-neutral-900 tracking-tight flex items-baseline">
                      Linkk<span className="text-rose-600 text-[58px] leading-[0] ml-0.5 select-none font-sans font-black">.</span>
                    </span>
                  </div>

                  {/* Profile ID Card */}
                  <div className="bg-white rounded-2xl border-[1.5px] border-neutral-100 p-4.5 flex items-center space-x-4 shadow-sm animate-fade-in shrink-0">
                    <div className="w-12 h-12 rounded-full border-[2.2px] border-neutral-900 flex items-center justify-center shrink-0">
                      <User className="w-7 h-7 text-neutral-900" />
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-xl font-extrabold text-neutral-900 tracking-tight">{userPhone}</span>
                      <button 
                        onClick={() => {
                          const p = prompt("Enter your dynamic profile phone code number:", userPhone);
                          if (p && p.trim()) {
                            setUserPhone(p.trim());
                            addSystemNotification('Profile Phone Modified', `Profile successfully switched to registered ID ${p.trim()}`, 'general');
                          }
                        }}
                        className="text-[10px] text-maroon hover:bg-maroon-light px-2.5 py-1.5 rounded-lg border border-maroon/20 font-black uppercase tracking-wider transition-all active:scale-95"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  {/* Primary Compartment Menu list */}
                  <div className="bg-white rounded-[24px] border-[1.5px] border-neutral-100 overflow-hidden shadow-sm shrink-0">
                    {[
                      {
                        label: 'My Orders',
                        id: 'item-my-orders',
                        onClick: () => setIsMyOrdersModalOpen(true)
                      },
                      {
                        label: 'Lab Test Orders',
                        id: 'item-lab-orders',
                        onClick: () => {
                          // Toggle and direct back to diagnostics test screen state values
                          setCurrentTab('labs');
                          addSystemNotification('Viewing Diagnostic Bookings', 'Scheduled clinic sample bookings are compiled.', 'lab');
                        }
                      },
                      {
                        label: 'Manage Address',
                        id: 'item-manage-address',
                        onClick: () => setIsAddressModalOpen(true)
                      },
                      {
                        label: 'Create Ticket/Help Support',
                        id: 'item-help-support',
                        onClick: () => setIsHelpModalOpen(true)
                      },
                      {
                        label: 'Policies',
                        id: 'item-policies',
                        onClick: () => setIsPoliciesModalOpen(true)
                      }
                    ].map((item, idx, arr) => (
                      <button
                        id={item.id}
                        key={item.label}
                        onClick={item.onClick}
                        className={`w-full py-4 px-5 flex items-center justify-between text-left transition-all active:bg-neutral-50 hover:bg-neutral-50/50 ${
                          idx !== arr.length - 1 ? 'border-b border-neutral-100' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3.5">
                          <ClipboardList className="w-5 h-5 text-sky-600" strokeWidth={1.75} />
                          <span className="font-extrabold text-[15px] text-neutral-800 tracking-tight">{item.label}</span>
                        </div>
                        <svg className="w-4 h-4 text-sky-600 font-black shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>

                  {/* Secondary Logout/Danger Compartment Menu */}
                  <div className="bg-white rounded-[24px] border-[1.5px] border-neutral-100 overflow-hidden shadow-sm shrink-0">
                    {[
                      {
                        label: 'Delete Account',
                        icon: Trash2,
                        id: 'item-delete-account',
                        iconColor: 'text-red-500',
                        textColor: 'text-red-500 font-extrabold',
                        arrowColor: 'text-red-400',
                        onClick: () => setIsDeleteModalOpen(true)
                      },
                      {
                        label: 'Log Out',
                        icon: LogOut,
                        id: 'item-logout',
                        iconColor: 'text-sky-600',
                        textColor: 'text-neutral-800 font-extrabold',
                        arrowColor: 'text-sky-500',
                        onClick: () => setIsLogoutModalOpen(true)
                      }
                    ].map((item, idx, arr) => (
                      <button
                        id={item.id}
                        key={item.label}
                        onClick={item.onClick}
                        className={`w-full py-4 px-5 flex items-center justify-between text-left transition-all active:bg-neutral-50 hover:bg-neutral-50/50 ${
                          idx !== arr.length - 1 ? 'border-b border-neutral-100' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3.5">
                          <item.icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={1.75} />
                          <span className={`text-[15px] tracking-tight ${item.textColor}`}>{item.label}</span>
                        </div>
                        <svg className={`w-4 h-4 ${item.arrowColor} shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>

                  {/* App Version Stamp */}
                  <p className="text-center text-[10.5px] font-bold text-neutral-400 tracking-wider pt-2">
                    Version 1.0.0
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Capsule bottom navigation - matches the image layout design */}
        <BottomNavigation 
          currentTab={currentTab}
          onChangeTab={(tab) => {
            // Clean dynamic values
            setSearchQuery('');
            setCurrentTab(tab);
          }}
          bookingCount={bookings.length}
        />
          </>
        )}

        {/* Overlay Successful Order Checkout Sheet */}
        <AnimatePresence>
          {justCheckedOutOrder && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute inset-0 bg-white z-50 p-6 flex flex-col justify-between"
            >
              <div className="my-auto text-center space-y-4 max-w-sm mx-auto">
                {/* Check animated green vector bulks */}
                <div className="w-20 h-20 bg-red-950 text-white rounded-full flex items-center justify-center mx-auto shadow-md animate-soft-pulse border-4 border-rose-100">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <h3 className="text-2xl font-black text-amber-950">Order Confirmed!</h3>
                <p className="text-xs text-rose-900/80 font-semibold leading-relaxed">
                  Your payment checkout finalized successfully. Order reference is <span className="font-black text-red-950 font-mono text-sm">{justCheckedOutOrder.orderId}</span>.
                </p>

                {/* Bill summary list checkouts */}
                <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 text-left space-y-2">
                  <span className="text-[10px] uppercase font-black tracking-wider text-red-950 block">Courier Packing List</span>
                  {justCheckedOutOrder.items.map((i, idx) => (
                    <div key={idx} className="text-xs text-amber-950 font-bold flex justify-between">
                      <span>{i}</span>
                      <span className="text-red-950">Added ✓</span>
                    </div>
                  ))}
                  
                  <div className="pt-2 border-t border-rose-100 flex justify-between font-black text-xs text-red-950">
                    <span>Total Bill Incurred</span>
                    <span>₹{justCheckedOutOrder.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {justCheckedOutOrder.requiresPrescription && (
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-2xl flex items-start space-x-2 text-left">
                    <AlertTriangle className="w-4 h-4 text-amber-950 shrink-0 mt-0.5" />
                    <span className="text-[10px] text-amber-950 font-semibold leading-relaxed">
                      <span className="font-black">Prescription (Rx) Verification required:</span> Please keep your GP prescription copies ready. Our courier agent will scan/view it upon delivery.
                    </span>
                  </div>
                )}
                
                <p className="text-[11px] text-rose-900/50">Tracking status or confirmation updates are dispatched on registered SMS +91 98765 43210.</p>
              </div>

              <button
                id="dismiss-checkout-screen"
                onClick={() => setJustCheckedOutOrder(null)}
                className="w-full py-4 bg-red-950 hover:bg-red-900 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-xs transition-colors"
              >
                Go Back to HomeScreen
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* MODALS RENDER OVERLAYS */}
        {/* ========================================================= */}
        <AnimatePresence>
          {/* 1. Address pin change */}
          {isAddressModalOpen && (
            <AddressModal 
              onClose={() => setIsAddressModalOpen(false)}
              addresses={addresses}
              currentAddress={currentAddress}
              onSelectAddress={setCurrentAddress}
              onAddNewAddress={(newAddr) => {
                setAddresses((p) => [...p, newAddr]);
                setCurrentAddress(newAddr);
                addSystemNotification('New Location Added', `Address labeled "${newAddr.label}" successfully saved.`, 'general');
              }}
            />
          )}

          {/* 2. Shopping Basket drawer */}
          {isCartModalOpen && (
            <CartModal 
              onClose={() => setIsCartModalOpen(false)}
              cartItems={cart}
              onUpdateQty={handleUpdateQty}
              couponApplied={couponApplied}
              onApplyCoupon={handleApplyCoupon}
              onCheckout={handleCheckout}
              currentAddress={currentAddress}
            />
          )}

          {/* 3. Diagnostic Book Appointment Scheduler */}
          {selectedLabPackageForBooking && (
            <BookLabTestModal 
              onClose={() => setSelectedLabPackageForBooking(null)}
              labPackage={selectedLabPackageForBooking}
              currentAddress={currentAddress}
              onConfirmBooking={handleConfirmLabBooking}
            />
          )}

          {/* 4. Product Details Overlay */}
          {selectedMedicineForDetails && (
            <ProductDetailsModal 
              onClose={() => setSelectedMedicineForDetails(null)}
              medicine={selectedMedicineForDetails}
              quantityInCart={(cart.find(i => i.type === 'medicine' && i.medicine?.id === selectedMedicineForDetails.id))?.quantity || 0}
              onAddToCart={() => handleAddToCart(selectedMedicineForDetails)}
            />
          )}

          {/* 5. Upload prescription document */}
          {isPrescriptionModalOpen && (
            <PrescriptionUploadModal 
              onClose={() => setIsPrescriptionModalOpen(false)}
              onSubmit={handlePrescriptionSubmit}
            />
          )}

          {/* 6. Notifications modal dropdown */}
          {isNotificationsModalOpen && (
            <NotificationsModal 
              onClose={() => setIsNotificationsModalOpen(false)}
              notifications={notifications}
              onMarkRead={handleMarkNotifRead}
              onClearAll={handleClearAllNotifs}
            />
          )}

          {/* 7. My Orders List Modal */}
          {isMyOrdersModalOpen && (
            <MyOrdersModal 
              onClose={() => setIsMyOrdersModalOpen(false)}
              orders={orders}
            />
          )}

          {/* 8. Help & Support Ticket Drawer */}
          {isHelpModalOpen && (
            <HelpSupportModal 
              onClose={() => setIsHelpModalOpen(false)}
              onSubmitTicket={(category) => {
                addSystemNotification(
                  'Support Ticket Raised',
                  `Successfully logged ticket under "${category}". Our dispatch Pharmacists are on it!`,
                  'general'
                );
              }}
            />
          )}

          {/* 9. Policies & Guidelines accordion */}
          {isPoliciesModalOpen && (
            <PoliciesModal 
              onClose={() => setIsPoliciesModalOpen(false)}
            />
          )}

          {/* 10. Dangerous Arena Account purger */}
          {isDeleteModalOpen && (
            <DeleteAccountModal 
              onClose={() => setIsDeleteModalOpen(false)}
              onConfirmDelete={() => {
                setCart([]);
                setOrders([]);
                setBookings([]);
                setPrescriptions([]);
                setUserPhone('9999999991');
                setIsLoggedIn(false);
                setIsOnboardingCompleted(false);
                localStorage.removeItem('linkk_is_logged_in');
                localStorage.removeItem('linkk_user_phone');
                localStorage.removeItem('linkk_onboarding_completed');
                setIsDeleteModalOpen(false);
                addSystemNotification(
                  'Account Purged Successfully',
                  'All local diagnostic coordinates, historical order values, and presets were wiped.',
                  'general'
                );
              }}
            />
          )}

          {/* 11. Profile Logout confirmation */}
          {isLogoutModalOpen && (
            <LogoutModal 
              onClose={() => setIsLogoutModalOpen(false)}
              onConfirmLogout={() => {
                setIsLogoutModalOpen(false);
                setIsLoggedIn(false);
                localStorage.removeItem('linkk_is_logged_in');
                localStorage.removeItem('linkk_user_phone');
                addSystemNotification(
                  'Logged Out Successfully',
                  'Your session was cleared. Sign code verification is required next time.',
                  'general'
                );
              }}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
