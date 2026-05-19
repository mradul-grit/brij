 export interface ItineraryDay {
  day: number;
  title: string;
  subtitle: string;
  sites: {
    name: string;
    icon: string;
    image?: string;
    gallerySlug?: string;
  }[];
}

export interface PricingOption {
  label: string;
  price: string;
  original?: string;
}

export interface PricingGroup {
  groupLabel: string;
  people: number;
  options: PricingOption[];
  includes?: { icon: string; label: string }[];
}

export interface PackageData {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  nights: number;
  days: number;
  image: string;
  heroEmoji: string;
  accentColor: string;
  tag: string;
  tagColor: string;
  heroGradient: string;
  pricing: PricingOption[];
  pricingGroups?: PricingGroup[];
  includes: { icon: string; label: string }[];
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
}

export const PACKAGES: PackageData[] = [
  {
    id: "braj-darshan-4day",
    title: "4-Day Braj Darshan Package",
    subtitle: "The Complete Sacred Circuit of Braj Mandal",
    duration: "4 Days / 3 Nights",
    nights: 3,
    days: 4,
    image: "/prem.jpeg",
    heroEmoji: "🛕",
    accentColor: "#D4AF37",
    tag: "Most Popular",
    tagColor: "#D4AF37",
    heroGradient:
      "linear-gradient(135deg, #0D0D0F 0%, #1a0a00 40%, #2d1500 70%, #1a0800 100%)",

    pricing: [
      { label: "Mathura Pickup (3 People)", price: "₹29,000" },
      { label: "Delhi Airport Pickup (3 People)", price: "₹31,700" },
    ],

    pricingGroups: [
      {
        groupLabel: "For 3 People",
        people: 3,
        options: [
          { label: "Mathura Pickup", price: "₹29,000" },
          { label: "Delhi Airport Pickup", price: "₹31,700" },
        ],
      },
    ],

    includes: [
      { icon: "🏨", label: "Hotel Stay" },
      { icon: "🚗", label: "AC Vehicle" },
      { icon: "🙏", label: "Guide" },
      { icon: "🍱", label: "Breakfast" },
    ],

    highlights: [
      "Visit Sacred Temples",
      "Govardhan Parikrama",
      "Radha Kund Darshan",
      "Krishna Janmabhoomi",
    ],

    itinerary: [
      {
        day: 1,
        title: "Vrindavan Darshan",
        subtitle: "4 to 5 Hours Trip",

        // ❌ IMAGE REMOVE KAR DIYA
        // gallerySlug use hoga gallery page open karne ke liye

        sites: [
          {
            name: "Radha Madan Mohan",
            icon: "🛕",
            gallerySlug: "radha-madan-mohan",
          },
          {
            name: "Radha Damodar",
            icon: "🪔",
            gallerySlug: "radha-damodar",
          },
          {
            name: "Radha Raman",
            icon: "🌸",
            gallerySlug: "radha-raman",
          },
          {
            name: "Gopiswar Mahadev",
            icon: "🔱",
            gallerySlug: "gopiswar-mahadev",
          },
          {
            name: "Nidhivan",
            icon: "🌿",
            gallerySlug: "nidhivan",
          },
          {
            name: "Banke Bihari",
            icon: "👁️",
            gallerySlug: "banke-bihari",
          },
          {
            name: "ISKCON Temple",
            icon: "✨",
            gallerySlug: "iskcon",
          },
        ],
      },

      {
        day: 2,
        title: "Mathura & Gokul",
        subtitle: "7 to 8 Hours Trip",

        sites: [
          {
            name: "Sri Krishna Janm Bhumi",
            icon: "👑",
            gallerySlug: "janmabhoomi",
          },
          {
            name: "Raman Reti",
            icon: "🌾",
            gallerySlug: "raman-reti",
          },
          {
            name: "Brahmand Ghat",
            icon: "🌊",
            gallerySlug: "brahmand-ghat",
          },
          {
            name: "Dauji Temple",
            icon: "🛕",
            gallerySlug: "dauji",
          },
        ],
      },

      {
        day: 3,
        title: "Barsana & Govardhan",
        subtitle: "9 to 10 Hours Trip",

        sites: [
          {
            name: "Shri Ji Mandir",
            icon: "🌺",
            gallerySlug: "shri-ji",
          },
          {
            name: "Kirti Mandir",
            icon: "🏡",
            gallerySlug: "kirti-mandir",
          },
          {
            name: "Ter Kadamb",
            icon: "🌳",
            gallerySlug: "ter-kadamb",
          },
          {
            name: "Pavan Sarovar",
            icon: "💧",
            gallerySlug: "pavan-sarovar",
          },
          {
            name: "Vrinda Kund",
            icon: "🌿",
            gallerySlug: "vrinda-kund",
          },
          {
            name: "Radha Kund",
            icon: "🔵",
            gallerySlug: "radha-kund",
          },
          {
            name: "Shyam Kund",
            icon: "⚫",
            gallerySlug: "shyam-kund",
          },
        ],
      },

      {
        day: 4,
        title: "Sacred Forests",
        subtitle: "5 to 6 Hours Trip",

        sites: [
          {
            name: "Akroor Ghat",
            icon: "🌅",
            gallerySlug: "akroor-ghat",
          },
          {
            name: "Bhandirvan",
            icon: "🌲",
            gallerySlug: "bhandirvan",
          },
          {
            name: "Belvan",
            icon: "🌳",
            gallerySlug: "belvan",
          },
        ],
      },
    ],

    inclusions: [
      "Hotel Stay",
      "AC Vehicle",
      "Guide",
      "Breakfast",
    ],

    exclusions: [
      "Personal Expenses",
      "Flights & Train Tickets",
    ],
  },
];