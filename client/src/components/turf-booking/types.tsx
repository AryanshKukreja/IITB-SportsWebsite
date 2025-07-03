export interface Booking {
  id: number;
  name: string;
  email: string;
  rollNumber: string;
  purpose: string;
  rollnumberOfPlayers: string[];
  numberOfPlayers: number;
  slotTime: string;
  status: 'requested' | 'booked';
}

export interface BookingData {
  name: string;
  email: string;
  rollNumber: string;
  purpose: string;
  date: string;
  rollnumberOfPlayers: string[];
  numberOfPlayers: number;
  status: 'requested' | 'booked' | 'pending';  // Add 'pending'
}

export interface Slot {
  slot: number; // Slot number
  status: 'available' | 'requested' | 'booked'; // Status of the slot
  date: string;
}


