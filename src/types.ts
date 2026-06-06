export interface Medicine {
  id: string;
  name: string;
  genericName?: string;
  category: string;
  packaging: string;
  manufacturer: string;
  price: number;
  originalPrice?: number;
  requiresRx: boolean;
  imageType: 'pill-bottle' | 'sachet' | 'box' | 'syrup-bottle' | 'test-tube';
  description: string;
  dosage: string;
  prescriptionAlert?: string;
}

export interface LabPackage {
  id: string;
  name: string;
  testsIncluded: string[];
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  requiresFasting: boolean;
  tags: string[]; // e.g. "Best Value", "Lifestyle"
  sampleCollected: 'Blood' | 'Urine' | 'Swab' | 'Multi-sample';
}

export interface CartItem {
  medicine?: Medicine;
  labTest?: LabPackage;
  quantity: number;
  type: 'medicine' | 'lab';
}

export interface Address {
  id: string;
  label: string; // e.g. "Home", "Office", "Current Location"
  details: string; // e.g. "MC75+2JR, NDDM District"
  receiverName: string;
  phone: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'lab' | 'promo' | 'general';
}

export interface LabBooking {
  id: string;
  labTestId: string;
  labTestName: string;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  scheduledDate: string;
  scheduledTimeSlot: string;
  status: 'Scheduled' | 'Sample Collected' | 'Processing' | 'Report Ready';
  collectionAddress: string;
}
