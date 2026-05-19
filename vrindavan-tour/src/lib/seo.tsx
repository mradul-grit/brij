import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

const BASE_TITLE = "Vrindavan Special Tour";
const BASE_DESC = "Premium spiritual tourism to Vrindavan, Mathura & Braj Mandal. Tour packages, taxi services, divine seva, and destination weddings.";
const BASE_OG_IMAGE = "https://vrindavanspecialtour.com/og-image.jpg";

export function useSEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${BASE_TITLE}`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("robots", "index, follow");

    // Open Graph
    setMeta("og:type", "website", true);
    setMeta("og:title", ogTitle ?? fullTitle, true);
    setMeta("og:description", ogDescription ?? description, true);
    setMeta("og:image", ogImage ?? BASE_OG_IMAGE, true);
    setMeta("og:site_name", BASE_TITLE, true);

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", ogTitle ?? fullTitle);
    setMeta("twitter:description", ogDescription ?? description);
    setMeta("twitter:image", ogImage ?? BASE_OG_IMAGE);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    return () => {
      document.title = BASE_TITLE;
    };
  }, [title, description, ogTitle, ogDescription, ogImage, canonical]);
}

export const SEO_DATA = {
  home: {
    title: "Divine Vrindavan Tour Packages",
    description: "Book premium Vrindavan, Mathura & Braj Mandal tour packages. Expert guides, AC vehicles, comfortable hotels. Serving 50,000+ pilgrims since 2010.",
    ogTitle: "Vrindavan Special Tour — Experience Divine Braj Darshan",
    ogDescription: "Premium spiritual tourism to Vrindavan, Mathura & Braj. Tour packages, taxi services, Gau Seva & destination weddings.",
  },
  packages: {
    title: "Tour Packages — Braj Darshan Itineraries",
    description: "Explore our handcrafted Vrindavan & Braj Mandal tour packages. 4-Day Braj Darshan starting ₹29,000. Includes hotel, AC vehicle, guide & breakfast.",
    ogTitle: "Vrindavan Tour Packages — Starting ₹29,000/person",
    ogDescription: "4-Day Braj Darshan Package including Vrindavan, Mathura, Barsana & Govardhan. Expert spiritual guide, AC vehicle & comfortable hotel.",
  },
  taxi: {
    title: "Taxi Services — AC Vehicles Across Braj Mandal",
    description: "Premium AC taxi services in Vrindavan, Mathura & Braj. Dzire, Ertiga, Innova, Innova Crysta & Tempo Traveller. Delhi, Agra & Govardhan routes.",
    ogTitle: "Vrindavan Taxi Services — AC Cabs at Best Prices",
    ogDescription: "Book reliable AC taxis for Vrindavan sightseeing, Delhi pickup, Agra tour & Govardhan Parikrama. Verified drivers, transparent pricing.",
  },
  divineServices: {
    title: "Divine Services — Gau Seva, Weddings & Spiritual Offerings",
    description: "Participate in sacred Gau Seva, Anna Dan, Vigrah Seva during Purshottam Maas. Divine destination weddings in Vrindavan. Book via WhatsApp.",
    ogTitle: "Divine Seva in Vrindavan — Gau Seva, Weddings & Anna Dan",
    ogDescription: "Sacred cow care, food donation, deity service & divine weddings in the land of Radha Krishna. Purshottam Maas special packages.",
  },
  gallery: {
    title: "Gallery — Sacred Vrindavan Moments",
    description: "Browse our photo gallery of sacred temples, devotees, Govardhan, Yamuna Aarti, and Braj Mandal pilgrimage moments captured by Vrindavan Special Tour.",
    ogTitle: "Vrindavan Gallery — Temples, Devotees & Sacred Moments",
    ogDescription: "A visual journey through Vrindavan's sacred temples, devotional gatherings, Govardhan Parikrama & Yamuna Aarti.",
  },
  testimonials: {
    title: "Testimonials — 50,000+ Happy Pilgrims",
    description: "Read heartfelt reviews from our pilgrims. Vrindavan Special Tour is rated 4.9/5 by thousands of devotees from across India.",
    ogTitle: "What Our Pilgrims Say — Vrindavan Special Tour Reviews",
    ogDescription: "Genuine reviews from 50,000+ devotees who experienced the divine magic of Vrindavan with us. Rated 4.9★ on Google.",
  },
  about: {
    title: "About Us — Serving Pilgrims Since 2010",
    description: "Learn about Vrindavan Special Tour — our mission, philosophy, and 14+ years of devoted spiritual tourism service across Braj Mandal.",
    ogTitle: "About Vrindavan Special Tour — Our Story & Mission",
    ogDescription: "Since 2010, we've been crafting soul-enriching journeys to Vrindavan, Mathura & Braj for over 50,000 devotees.",
  },
  contact: {
    title: "Contact Us — Plan Your Divine Journey",
    description: "Get in touch with Vrindavan Special Tour for tour bookings, taxi reservations, and divine seva inquiries. Call, WhatsApp, or fill our enquiry form.",
    ogTitle: "Contact Vrindavan Special Tour — Book Your Pilgrimage",
    ogDescription: "Reach us via WhatsApp, call, or email to plan your perfect Vrindavan pilgrimage. We respond within minutes.",
  },
};
