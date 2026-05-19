export interface TripPrice {
  label: string;
  price: string;
  note?: string;
  duration?: string;
}

export interface VehicleData {
  id: string;
  name: string;
  emoji: string;
  image: string;
  accentGradient: string;
  tag?: string;
  seats: number;
  luggage: string;
  ac: true;
  fuel: string;
  features: string[];
  trips: TripPrice[];
}

export const VEHICLES: VehicleData[] = [
  {
    id: "dzire",
    name: "Maruti Dzire",
    emoji: "🚗",
    image: "/taxi_photos/Dzire.jpg",
    accentGradient:
      "linear-gradient(135deg, #1a2a1a 0%, #2d3d2d 100%)",
    tag: "Budget",
    seats: 4,
    luggage: "2 Bags",
    ac: true,
    fuel: "CNG / Petrol",
    features: [
      "AC",
      "Music System",
      "Comfortable Seats",
      "Affordable Ride",
    ],
    trips: [
      { label: "Delhi Pickup / Drop", price: "₹3,700" },
      { label: "Delhi via Expressway", price: "₹4,200" },
      { label: "Delhi Sightseeing", price: "₹5,000" },
      { label: "Agra Sightseeing", price: "₹3,000" },
      { label: "Agra Pickup / Drop", price: "₹2,700" },
      { label: "Agra Fatehpur Sikri", price: "₹4,200" },
      {
        label: "Barsana & Nandgaon",
        price: "₹2,500",
        duration: "7 Hours",
      },
      {
        label: "Barsana + Govardhan",
        price: "₹3,000",
        duration: "10 Hours",
      },
      { label: "Govardhan Up/Down", price: "₹1,800" },
      {
        label: "Gokul Sightseeing",
        price: "₹2,500",
        duration: "7 Hours",
      },
      {
        label: "Gokul Dauji",
        price: "₹2,700",
        duration: "8 Hours",
      },
      {
        label: "Bhandirvan Tour",
        price: "₹2,200",
        duration: "6 Hours",
      },
      {
        label: "Barsana + Gokul",
        price: "₹4,000",
        duration: "12 Hours",
      },
      { label: "Kamvan Tour", price: "₹4,000" },
      {
        label: "Mathura Tour",
        price: "₹1,500",
        duration: "6 Hours",
      },
      { label: "Mathura Pickup / Drop", price: "₹700" },
      { label: "Jaipur Tour", price: "₹7,500" },
      {
        label: "Haridwar + Rishikesh",
        price: "₹10,500",
        duration: "2 Days",
      },
    ],
  },

  {
    id: "ertiga",
    name: "Maruti Ertiga",
    emoji: "🚙",
    image: "/taxi_photos/Ertiga.jpg",
    accentGradient:
      "linear-gradient(135deg, #1a1a2a 0%, #2d2d3d 100%)",
    tag: "Family Choice",
    seats: 6,
    luggage: "3 Bags",
    ac: true,
    fuel: "CNG / Petrol",
    features: [
      "AC",
      "Extra Legroom",
      "Family Friendly",
      "Comfort Ride",
    ],
    trips: [
      { label: "Delhi Pickup / Drop", price: "₹5,000" },
      { label: "Delhi via Expressway", price: "₹5,500" },
      { label: "Delhi Sightseeing", price: "₹6,000" },
      { label: "Agra Sightseeing", price: "₹3,500" },
      { label: "Govardhan Up/Down", price: "₹2,400" },
      { label: "Mathura Tour", price: "₹2,000" },
      { label: "Jaipur Tour", price: "₹9,000" },
      { label: "Haridwar + Rishikesh", price: "₹14,000" },
    ],
  },

  {
    id: "innova",
    name: "Toyota Innova",
    emoji: "🚐",
    image: "/taxi_photos/Innova.jpg",
    accentGradient:
      "linear-gradient(135deg, #2a1a0a 0%, #3d2d0d 100%)",
    tag: "Most Popular",
    seats: 7,
    luggage: "4 Bags",
    ac: true,
    fuel: "Diesel",
    features: [
      "AC",
      "Spacious Boot",
      "Smooth Ride",
      "Premium Comfort",
    ],
    trips: [
      { label: "Delhi Pickup / Drop", price: "₹5,500" },
      { label: "Delhi via Expressway", price: "₹6,000" },
      { label: "Delhi Sightseeing", price: "₹7,000" },
      { label: "Agra Sightseeing", price: "₹4,000" },
      { label: "Govardhan Up/Down", price: "₹2,500" },
      { label: "Mathura Tour", price: "₹2,000" },
      { label: "Jaipur Tour", price: "₹10,000" },
      { label: "Haridwar + Rishikesh", price: "₹16,500" },
    ],
  },

  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    emoji: "✨",
    image: "/taxi_photos/Innova.jpg",
    accentGradient:
      "linear-gradient(135deg, #1a0a00 0%, #2d1500 100%)",
    tag: "Premium",
    seats: 7,
    luggage: "4 Bags",
    ac: true,
    fuel: "Diesel",
    features: [
      "Luxury Interior",
      "Premium Comfort",
      "AC",
      "Long Route Comfort",
    ],
    trips: [
      { label: "Delhi Pickup / Drop", price: "₹6,000" },
      { label: "Delhi via Expressway", price: "₹6,500" },
      { label: "Delhi Sightseeing", price: "₹7,500" },
      { label: "Agra Sightseeing", price: "₹5,000" },
      { label: "Govardhan Up/Down", price: "₹2,700" },
      { label: "Mathura Tour", price: "₹2,500" },
      { label: "Jaipur Tour", price: "₹12,000" },
      { label: "Haridwar + Rishikesh", price: "₹18,000" },
    ],
  },

  {
    id: "tempo",
    name: "Tempo Traveller",
    emoji: "🚌",
    image: "/taxi_photos/tempo_traveller.jpg",
    accentGradient:
      "linear-gradient(135deg, #0a1a2a 0%, #0d2d3d 100%)",
    tag: "Group Tours",
    seats: 12,
    luggage: "8 Bags",
    ac: true,
    fuel: "Diesel",
    features: [
      "Group Seating",
      "Large Luggage Space",
      "Pushback Seats",
      "AC",
    ],
    trips: [
      { label: "Delhi Pickup / Drop", price: "₹11,000" },
      { label: "Delhi via Expressway", price: "₹11,500" },
      { label: "Delhi Sightseeing", price: "₹15,000" },
      { label: "Agra Sightseeing", price: "₹7,000" },
      { label: "Govardhan Up/Down", price: "₹5,000" },
      { label: "Mathura Tour", price: "₹3,500" },
      { label: "Jaipur Tour", price: "₹17,000" },
      { label: "Haridwar + Rishikesh", price: "₹30,000" },
    ],
  },
];

export const POPULAR_ROUTES = [
  {
    from: "Delhi",
    to: "Vrindavan",
    distance: "150 km",
    duration: "3 hrs",
  },
  {
    from: "Agra",
    to: "Vrindavan",
    distance: "70 km",
    duration: "1.5 hrs",
  },
  {
    from: "Mathura",
    to: "Vrindavan",
    distance: "15 km",
    duration: "30 mins",
  },
  {
    from: "Vrindavan",
    to: "Govardhan",
    distance: "25 km",
    duration: "45 mins",
  },
];

export const TAXI_NOTES = [
  "Minimum 300 KM per day applicable.",
  "Night halt charges ₹200 extra.",
  "Parking charges extra for every trip.",
  "Outstation hill charges ₹1/km extra.",
  "Toll tax, parking and state tax paid by customer.",
  "Rates applicable from 15 May 2023.",
];