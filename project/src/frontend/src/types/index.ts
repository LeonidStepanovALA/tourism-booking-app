export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'tourist' | 'guide' | 'admin';
  phone?: string;
}

export interface Accommodation {
  _id: string;
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  type: 'hotel' | 'apartment' | 'hostel' | 'guesthouse';
  price: {
    amount: number;
    currency: string;
  };
  amenities: string[];
  images: string[];
  rating: {
    average: number;
    count: number;
  };
}

export interface Guide {
  _id: string;
  user: User;
  bio: string;
  specializations: string[];
  languages: string[];
  experience: number;
  services: {
    title: string;
    description: string;
    duration: number;
    price: {
      amount: number;
      currency: string;
    };
    maxGroupSize: number;
  }[];
  rating: {
    average: number;
    count: number;
  };
  profileImage: string;
  location: {
    city: string;
    country: string;
  };
}

export interface Booking {
  _id: string;
  user: User;
  type: 'accommodation' | 'guide';
  accommodation?: Accommodation;
  guide?: Guide;
  serviceDetails?: {
    title: string;
    duration: number;
  };
  dates: {
    checkIn: Date;
    checkOut: Date;
  };
  guests: {
    adults: number;
    children: number;
  };
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment: {
    amount: number;
    currency: string;
    status: 'pending' | 'paid' | 'refunded';
  };
  specialRequests?: string;
} 