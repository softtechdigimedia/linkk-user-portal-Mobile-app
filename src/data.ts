import type{ Medicine, LabPackage, Address, Notification } from './types';

export const MEDICINES_DATA: Medicine[] = [
  {
    id: 'med-1',
    name: 'Eltroxin-50mcg Tab',
    genericName: 'Thyroxine Sodium Tablets IP 50 mcg',
    category: 'All Medicines',
    packaging: '120 Tablets Bottle',
    manufacturer: 'Glaxo SmithKline Pharmaceuticals Ltd',
    price: 114.03,
    originalPrice: 135.00,
    requiresRx: true,
    imageType: 'pill-bottle',
    dosage: 'Take 1 tablet daily on an empty stomach in the morning or as directed by the endocrinologist.',
    description: 'Eltroxin-50mcg is a synthetic thyroid hormone used for replacing natural thyroxine levels in patients suffering from hypothyroidism.',
    prescriptionAlert: 'This medicine requires an official prescription from a certified physician/endocrinologist.'
  },
  {
    id: 'med-2',
    name: 'Eno Lemon Powder Sachet',
    genericName: 'Sodium Bicarbonate, Citric Acid, Sodium Carbonate',
    category: 'Syrups & Liquids',
    packaging: 'Pack of 5g Sachet',
    manufacturer: 'GSK Consumer Healthcare',
    price: 10.00,
    originalPrice: 12.00,
    requiresRx: false,
    imageType: 'sachet',
    dosage: 'Dissolve one sachet in 150ml of cool water. Drink immediately when active fizzing starts.',
    description: 'Fast-action sparkling sachet therapy that neutralizes excess stomach acid in 6 seconds to relieve burning sensations and bloating.'
  },
  {
    id: 'med-3',
    name: 'Evion 400mg Cap',
    genericName: 'Vitamin E Capsules USP 400 mg',
    category: 'All Medicines',
    packaging: 'Strip of 10 Capsules',
    manufacturer: 'P&G Health Ltd',
    price: 40.00,
    originalPrice: 48.00,
    requiresRx: false,
    imageType: 'box',
    dosage: 'Take 1 capsule daily after a heavy meal with water, or applyTopically for nail/skin tissue care.',
    description: 'Evion 400mg is loaded with potent Vitamin E antioxidants that revitalize cell health, defend skin tissues, and support hair follicles.'
  },
  {
    id: 'med-4',
    name: 'Flagyl 400mg Tab',
    genericName: 'Metronidazole Tablets I.P. 400 mg',
    category: 'All Medicines',
    packaging: 'Strip of 15 Tablets',
    manufacturer: 'Abbott India Ltd',
    price: 24.35,
    originalPrice: 30.00,
    requiresRx: true,
    imageType: 'box',
    dosage: 'Take exactly 1 tablet thrice a day with meals for 5-7 days. Do not skip doses to prevent bacterial resistance.',
    description: 'Flagyl 400mg is a reliable nitroimidazole antimicrobial used for fighting amoebic stomach infections, dental, and anaerobic ailments.',
    prescriptionAlert: 'Warning: Complete the entire course. Avoid alcohol consumption during this treatment.'
  },
  {
    id: 'med-5',
    name: 'Calcimax 500 Calcium',
    genericName: 'Calcium Carbonate & Vitamin D3 Tablets',
    category: 'Bone Joint & Muscle Care',
    packaging: 'Strip of 15 Tablets',
    manufacturer: 'Meyer Organics / Abbott',
    price: 180.00,
    originalPrice: 210.00,
    requiresRx: false,
    imageType: 'box',
    dosage: 'Take 1 tablet daily with a glass of milk or after lunches/dinners to facilitate calcium absorption.',
    description: 'Supplies essential mineral calcium combined with high potency Vitamin D3 to maximize skeletal bone density and muscle contractions.'
  },
  {
    id: 'med-6',
    name: 'InstaRaft Antacid Liquid',
    genericName: 'Sodium Alginate, Sodium Bicarbonate & Calcium Carbonate',
    category: 'Bone Joint & Muscle Care',
    packaging: '200ml Syrup Bottle',
    manufacturer: 'Neon Laboratories Ltd',
    price: 125.00,
    originalPrice: 155.00,
    requiresRx: false,
    imageType: 'syrup-bottle',
    dosage: 'Take 10ml to 20ml post-meals and directly prior to sleeping. Swallow slowly without mixing with water.',
    description: 'Creates a rapid protective physical raft on top of the stomach juice column, preventing acid fumes from burning the esophagus.'
  },
  {
    id: 'med-7',
    name: 'Patanjali Tulsi Ghanvati',
    genericName: 'Ocimum Sanctum Herba Extract',
    category: 'All Medicines',
    packaging: '60 Tablets Bottle',
    manufacturer: 'Patanjali Ayurved Ltd',
    price: 90.00,
    originalPrice: 110.00,
    requiresRx: false,
    imageType: 'pill-bottle',
    dosage: 'Take 1 to 2 tablets twice a day with warm water or as prescribed by your ayurvedic consultant.',
    description: 'Traditional organic cold-pressed Tulsi formulation designed to boost immune antibody counts and normalize seasonal fevers/coughs.'
  },
  {
    id: 'med-8',
    name: 'Cetaphil Baby Daily Lotion',
    genericName: 'Organic Calendula Ext & Sunflower Seed Oil',
    category: 'Baby Care',
    packaging: '400ml Pump Bottle',
    manufacturer: 'Galderma Labs India',
    price: 450.00,
    originalPrice: 520.00,
    requiresRx: false,
    imageType: 'syrup-bottle',
    dosage: 'Apply liberally over face and baby body after bath sessions. Massage in circular sweeps to lock rich hydration.',
    description: 'Ultra-gentle hypoallergenic formula enriched with sweet almond lipids and calendula extracts to defend infant skin barriers.'
  },
  {
    id: 'med-9',
    name: 'Pampers All-Round Diapers',
    genericName: 'Hypoallergenic Super Absorbent Polymer',
    category: 'Baby Care',
    packaging: 'Premium Pack of 36 Diapers',
    manufacturer: 'Procter & Gamble Ltd',
    price: 699.00,
    originalPrice: 799.00,
    requiresRx: false,
    imageType: 'box',
    dosage: 'Change diaper immediately upon saturation. Apply anti-rash protective ointment before wearing new diapers.',
    description: 'Equipped with a magic layer of wetness absorbing polymers that keeps moisture locked away for up to 12 hours of peaceful infant sleep.'
  },
  {
    id: 'med-10',
    name: 'Omron Digital BP Monitor',
    genericName: 'Oscillometric Sphygmomanometer',
    category: 'Health Devices',
    packaging: '1 Digital Device Box',
    manufacturer: 'Omron Healthcare Co. Ltd',
    price: 2200.00,
    originalPrice: 2600.00,
    requiresRx: false,
    imageType: 'box',
    dosage: 'Rest peacefully for 5 minutes prior to measuring. Keep cuff aligned perfectly at heart level. Do not speak.',
    description: 'Hospital-grade digital automatic blood pressure analyzer using Intellisense tech for painless, highly precise readings.'
  }
];

export const LAB_PACKAGES_DATA: LabPackage[] = [
  {
    id: 'lab-1',
    name: 'Complete Blood Count (CBC)',
    testsIncluded: ['Total WBC Counter', 'Red Blood Corpuscles (RBC)', 'Hemoglobin Level', 'Platelet Count (PLT)', 'Packed Cell Volume (PCV)', 'Lymphocytes', 'Differential Counts (8 metrics)'],
    description: 'A structural diagnostic screen analyzing blood components to detect infections, severe anemia, cell morphology defects, and platelet coagulative conditions.',
    price: 299.00,
    originalPrice: 599.00,
    duration: '24 Hours Report SLA',
    requiresFasting: false,
    tags: ['Best Seller', 'Highly Trusted'],
    sampleCollected: 'Blood'
  },
  {
    id: 'lab-2',
    name: 'Diabetes Screening Combo',
    testsIncluded: ['HbA1c (Glycated Hemoglobin)', 'Fasting Blood Sugar (FBS)', 'Post Prandial Sugar (PPS)'],
    description: 'Gold standard diabetes monitoring that details average blood sugar ratios over the past 90 days alongside instant sugar metrics.',
    price: 399.00,
    originalPrice: 749.00,
    duration: '12 Hours Report SLA',
    requiresFasting: true,
    tags: ['Best Value', 'Lifestyle Essential'],
    sampleCollected: 'Blood'
  },
  {
    id: 'lab-3',
    name: 'Thyroid Essential Profile',
    testsIncluded: ['Total Triiodothyronine (T3)', 'Total Thyroxine (T4)', 'Thyroid Stimulating Hormone (TSH)'],
    description: 'Important monitoring screen evaluating vital active hormonal products of the thyroid gland to screen hyper or thyroid gland fatigue.',
    price: 499.00,
    originalPrice: 899.00,
    duration: '18 Hours Report SLA',
    requiresFasting: true,
    tags: ['Women Health Specialist'],
    sampleCollected: 'Blood'
  },
  {
    id: 'lab-4',
    name: 'Lipid Cholesterol Profile',
    testsIncluded: ['Total Cholesterol', 'High-Density Lipoprotein (HDL)', 'Low-Density Lipoprotein (LDL)', 'Very Low-Density Lipoprotein (VLDL)', 'Triglycerides Ratio'],
    description: 'Indispensable package measuring arterial coronary lipids to assess cardiac health risks, arterial fat blockages, and active vascular health status.',
    price: 449.00,
    originalPrice: 799.00,
    duration: '24 Hours Report SLA',
    requiresFasting: true,
    tags: ['Heart Care Essential'],
    sampleCollected: 'Blood'
  }
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Home Delivery Pin',
    details: 'MC75+2JR, NDDM District, Dwarka Sect-12',
    receiverName: 'Ayush Sharma',
    phone: '+91 98765 43210'
  },
  {
    id: 'addr-2',
    label: 'Office Workspace',
    details: 'Building 4B, DLF Cyber City, Phase 3, Gurugram',
    receiverName: 'Ayush Sharma',
    phone: '+91 98765 99999'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'Order Status Update',
    message: 'Your medicine order containing Eltroxin is packed and assigned to delivery partner Ramesh. ETA: 2 hours.',
    time: '20 mins ago',
    read: false,
    type: 'order'
  },
  {
    id: 'notif-2',
    title: 'Lab Report Approved',
    message: 'Your Complete Blood Count (CBC) report is finalized and verified by Senior Pathologist Dr. S. K. Roy.',
    time: '2 hrs ago',
    read: false,
    type: 'lab'
  },
  {
    id: 'notif-3',
    title: 'Maroon Health Super Offer!',
    message: 'Get ₹150 instant discount on all booking packages above ₹599. Use promo code MAROON150!',
    time: '1 day ago',
    read: true,
    type: 'promo'
  }
];

export const CATEGORY_METADATA = [
  { name: 'All Medicines', label: 'All Medicines', gradient: 'from-maroon-50 to-rose-100' },
  { name: 'Bone Joint & Muscle Care', label: 'Bone Joint & Muscle Care', gradient: 'from-amber-50 to-rose-100' },
  { name: 'Baby Care', label: 'Baby & Infant Care', gradient: 'from-sky-50 to-pink-100' },
  { name: 'Health Devices', label: 'Medical Devices', gradient: 'from-red-50 to-rose-100' },
  { name: 'Syrups & Liquids', label: 'Liquid Syrups', gradient: 'from-teal-50 to-emerald-100' }
];

export const TIME_SLOTS = [
  '06:00 AM - 08:00 AM',
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM'
];
