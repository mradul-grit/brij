export interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  tour: string;
  review: string;
  highlight: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Anita Sharma",
    location: "Delhi, India",
    avatar: "🙏",
    rating: 5,
    date: "March 2025",
    tour: "4-Day Braj Darshan Package",
    highlight: "Life-changing spiritual experience",
    review: "This journey to Vrindavan completely transformed my soul. Every temple visit felt like a direct blessing from Shri Krishna. Our guide was so knowledgeable about the spiritual significance of each place. Banke Bihari darshan left me in tears of pure devotion. I will carry these divine moments with me forever. Highly recommend Vrindavan Special Tour to every devotee!",
  },
  {
    id: 2,
    name: "Rajesh & Meena Patel",
    location: "Ahmedabad, Gujarat",
    avatar: "👨‍👩‍👧",
    rating: 5,
    date: "January 2025",
    tour: "Family Vrindavan Tour",
    highlight: "Perfect family pilgrimage",
    review: "We came as a family of 6 including elderly parents and two young children. The team arranged everything flawlessly — comfortable Innova, excellent hotel, and a guide who was patient with everyone. Govardhan Parikrama in the morning mist was absolutely magical. Our driver arrived 15 minutes early every single day. Will come back every year!",
  },
  {
    id: 3,
    name: "Suresh Iyer",
    location: "Chennai, Tamil Nadu",
    avatar: "🧘",
    rating: 5,
    date: "February 2025",
    tour: "Mathura & Vrindavan Circuit",
    highlight: "Best travel company in Braj",
    review: "As someone visiting from South India who didn't know Hindi, I was worried about navigating Vrindavan. But the team was incredibly welcoming. They arranged a guide who spoke Tamil and helped us understand the deep stories behind each deity. Krishna Janmabhoomi was overwhelming — I could feel the divine energy. Truly the best spiritual tour I've ever taken.",
  },
  {
    id: 4,
    name: "Priya Gupta",
    location: "Mumbai, Maharashtra",
    avatar: "🌸",
    rating: 5,
    date: "April 2025",
    tour: "Gau Seva & Vrindavan Package",
    highlight: "Sacred cow seva was divine",
    review: "I specifically came to participate in Gau Seva during Purshottam Maas and it was the most spiritually fulfilling experience of my life. Feeding 20 cows at the Goshala brought tears to my eyes. The team arranged everything beautifully — from Pandit to prasadam. Vrindavan Special Tour treats every traveller like family. Cannot thank them enough!",
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    location: "Chandigarh, Punjab",
    avatar: "🎵",
    rating: 5,
    date: "December 2024",
    tour: "Braj Darshan with Evening Aarti",
    highlight: "Yamuna Aarti was unforgettable",
    review: "I'm not a particularly religious person but this trip moved something deep within me. The Yamuna Aarti at Vishram Ghat at dusk — with hundreds of lamps floating on the river — is something I will never forget until my last breath. The logistics were seamless, the hotel was clean and comfortable, and the driver knew every shortcut in Vrindavan. Exceptional service!",
  },
  {
    id: 6,
    name: "Dr. Kavita Menon",
    location: "Bengaluru, Karnataka",
    avatar: "🌺",
    rating: 5,
    date: "November 2024",
    tour: "Weekend Vrindavan Getaway",
    highlight: "Stress-free spiritual escape",
    review: "As a busy doctor, I needed a completely hassle-free spiritual retreat. Vrindavan Special Tour delivered exactly that. I didn't have to think about a single thing — hotel, car, guide, meals, darshan timings, everything was handled. The Nidhivan visit at twilight was deeply peaceful. I returned to work recharged in a way that no holiday resort has ever managed!",
  },
  {
    id: 7,
    name: "Ramesh & Sunita Agarwal",
    location: "Jaipur, Rajasthan",
    avatar: "👴",
    rating: 5,
    date: "October 2024",
    tour: "Senior Pilgrimage Special",
    highlight: "Perfect for senior devotees",
    review: "My parents are in their 70s and we were nervous about managing a pilgrimage at their age. The team was so thoughtful — wheelchair assistance at Banke Bihari, a slow-paced itinerary, and a driver who helped my father at every step. They even arranged Prasad to be brought to the car when walking was difficult. This kind of devotion to service is rare. Radhe Radhe!",
  },
  {
    id: 8,
    name: "Deepak Tiwari",
    location: "Varanasi, UP",
    avatar: "📿",
    rating: 5,
    date: "September 2024",
    tour: "4-Day Braj Darshan Package",
    highlight: "Authentic and deeply spiritual",
    review: "I've visited Vrindavan many times on my own but always felt I was missing the deeper meaning behind each site. Having an expert guide from Vrindavan Special Tour changed everything. He recited the exact scriptures and stories at each sacred spot. By Day 3 at Radha Kund, I was chanting continuously — such is the power of visiting with the right guidance. Jai Shri Krishna!",
  },
];

export const TESTIMONIAL_STATS = [
  { value: "50,000+", label: "Happy Pilgrims" },
  { value: "4.9 ★",  label: "Google Rating"  },
  { value: "14+",    label: "Years Serving"   },
  { value: "98%",    label: "Would Return"    },
];
