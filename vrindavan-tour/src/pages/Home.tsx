import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import { WHATSAPP_URL } from "@/data";
import { useSEO, SEO_DATA } from "@/lib/seo";


// ─── Hero Slides ─────────────────────────────────────────────────────────────
const slides = [
  {
    id: 0,
    label: "Vrindavan Dham",
    sublabel: "The Land of Radha Krishna",
    gradient: "linear-gradient(135deg, #0D1117 0%, #1a0a00 40%, #2d1500 70%, #1a0800 100%)",
    accent: "#D4AF37",
    emoji: "🛕",
    
    image:"/radharaman.jpeg",
  },
  {
    id: 1,
    label: "Govardhan Parikrama",
    sublabel: "The Sacred Hill of Lord Krishna",
    gradient: "linear-gradient(135deg, #080d14 0%, #0a1a0d 40%, #0d2010 70%, #060e08 100%)",
    accent: "#4CAF50",
    emoji: "⛰️",
  image:"/prem.jpeg",
  },
  {
    id: 2,
    label: "Yamuna Aarti",
    sublabel: "Sacred River of Devotion",
    gradient: "linear-gradient(135deg, #050a18 0%, #0a0f2e 40%, #0e1540 60%, #060a1a 100%)",
    accent: "#6B9FD4",
    emoji: "🌊",
   image:"/diya.jpeg",
  },
  {
    id: 3,
    label: "Braj Mandal Yatra",
    sublabel: "84 Kos Sacred Pilgrimage",
    gradient: "linear-gradient(135deg, #18080d 0%, #2d0a18 40%, #3d1020 60%, #1a0510 100%)",
    accent: "#E57373",
    emoji: "🌺",
    image: "/brajmandal_yatra.jpeg",
  },
];

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setPrev(current);
    setCurrent(idx);
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Slideshow layers */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          {/* Ken Burns: slow zoom out */}
          <motion.div
            className="absolute inset-0"
  animate={{ scale: [1.08, 1.0] }}
  transition={{ duration: 5.5, ease: "easeOut" }}
  > <img
    src={slides[current].image}
    alt={slides[current].label}
    className="w-full h-full object-cover"
  />
</motion.div>
          
          {/* Pattern overlay */}
          <div
            className="absolute inset-0"
            style={{ background: slides[current].pattern }}
          />
          {/* Landscape illustration */}
          <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
            {/* Silhouette temple skyline */}
            <svg
              viewBox="0 0 1440 400"
              className="w-full opacity-[0.07]"
              preserveAspectRatio="xMidYMax slice"
            >
              {/* Temple spires */}
              <path d="M0 400 L0 300 L60 300 L60 200 L80 180 L100 200 L100 300 L160 300 L160 240 L180 200 L200 160 L220 200 L240 240 L240 300 L300 300 L300 220 L320 180 L340 140 L360 180 L380 220 L380 300 L420 300 L420 260 L440 220 L460 180 L480 220 L500 260 L500 300 L560 300 L560 200 L580 160 L600 120 L620 160 L640 200 L640 300 L700 300 L700 240 L720 200 L740 160 L760 200 L780 240 L780 300 L840 300 L840 180 L860 140 L880 100 L900 140 L920 180 L920 300 L980 300 L980 220 L1000 180 L1020 220 L1020 300 L1080 300 L1080 260 L1100 220 L1120 180 L1140 220 L1160 260 L1160 300 L1200 300 L1200 240 L1220 200 L1240 160 L1260 200 L1280 240 L1280 300 L1340 300 L1340 200 L1360 160 L1380 120 L1400 160 L1420 200 L1440 200 L1440 400 Z" fill={slides[current].accent} />
            </svg>
          </div>
          {/* Large emoji accent */}
          <div className="absolute bottom-1/4 right-16 lg:right-24 text-[140px] lg:text-[200px] opacity-[0.06] select-none pointer-events-none leading-none">
            {slides[current].emoji}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.85) 100%)" }} />

      {/* Slide label top-right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${current}`}
          className="absolute top-28 right-6 lg:right-10 z-20 text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/40 text-xs tracking-widest uppercase">{slides[current].sublabel}</p>
          <p className="text-white/70 text-sm font-medium mt-0.5">{slides[current].label}</p>
        </motion.div>
      </AnimatePresence>

      {/* Hero text content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs sm:text-sm font-medium mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ✦ Welcome to Vrindavan Special Tour ✦
            </motion.p>

            <h1
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "Georgia, serif", textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
            >
              Experience Divine{" "}
              <span style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #F5D56E 50%, #FF9933 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Braj Darshan
              </span>
            </h1>

            <h2 className="text-lg sm:text-xl lg:text-2xl text-white/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Complete Vrindavan, Mathura &amp; Braj Tour Packages
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link href="/packages">
                  <span
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-[#1C1C1E] text-sm cursor-pointer shadow-2xl transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37 0%, #F5D56E 50%, #B8960C 100%)",
                      boxShadow: "0 0 30px rgba(212,175,55,0.35)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    Book Now
                  </span>
                </Link>
              </motion.div>

              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white text-sm border transition-all duration-300"
                style={{
                  borderColor: "rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
                whileHover={{
                  scale: 1.05,
                  background: "rgba(37,211,102,0.15)",
                  borderColor: "rgba(37,211,102,0.6)",
                  boxShadow: "0 0 25px rgba(37,211,102,0.2)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: "#25D366" }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Contact on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicator dots */}
        <div className="flex items-center justify-center gap-2.5 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-1.5 rounded-full transition-all duration-500 overflow-hidden"
              style={{
                width: i === current ? "36px" : "10px",
                background: i === current ? "transparent" : "rgba(255,255,255,0.3)",
              }}
            >
              {i === current && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(90deg, #D4AF37, #FF9933)" }}
                  layoutId="dot-active"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/30"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </section>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, highlight, subtitle }: {
  eyebrow: string; title: string; highlight?: string; subtitle?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className="text-center mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <p className="text-[#FF9933] tracking-[0.25em] uppercase text-xs font-semibold mb-3">{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
        {title}{" "}
        {highlight && (
          <span style={{
            background: "linear-gradient(135deg, #D4AF37, #FF9933)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {highlight}
          </span>
        )}
      </h2>
      {subtitle && <p className="mt-3 text-[#1C1C1E]/55 text-base max-w-xl mx-auto leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}

// ─── Skeleton Card ─────────────────────────────────────────────────────────────
function SkeletonCard({ delay = 0, dark = false }: { delay?: number; dark?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl border h-48 flex items-end p-5 relative overflow-hidden ${
        dark ? "border-[#D4AF37]/20" : "border-[#D4AF37]/20 bg-white/70"
      }`}
      style={dark ? { background: "rgba(28,28,30,0.6)", backdropFilter: "blur(12px)" } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(212,175,55,0.15)" }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
      />
      <div className={`w-20 h-3 rounded-full ${dark ? "bg-[#D4AF37]/20" : "bg-[#D4AF37]/15"}`} />
    </motion.div>
  );
}

// ─── Featured Packages ─────────────────────────────────────────────────────────
function FeaturedPackages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const packages = [
    {
      image: "/home/haridwar.jpeg",
      title: "Vrindavan and Haridwar Rishikesh",
      prices: ["₹10,500 / 4 people", "₹16,500 / 7 people"],
    },
    {
      image: "/home/jaipur.jpeg",
      title: "Jaipur Sightseeing",
      prices: ["₹7,500 / 4 people", "₹10,000 / 7 people"],
    },
    {
      image: "/home/delhi.jpeg",
      title: "Delhi Sightseeing",
      prices: ["₹5,000 / 4 people", "₹7,000 / 7 people"],
    },
    {
      image: "/home/taj_mahal.jpeg",
      title: "Agra Sightseeing",
      prices: ["₹3,000 / 4 people", "₹4,000 / 7 people"],
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Curated Pilgrimages" title="Featured" highlight="Packages By Vrindavan" subtitle="Featured package fares from Vrindavan and Haridwar Rishikesh." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {packages.map((pkg, i) => (
            <div key={pkg.title}>
              <motion.div
                className="group rounded-2xl border border-[#D4AF37]/20 bg-[#FFFDD0]/40 overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(212,175,55,0.18)" }}
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: "radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 70%)"
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1C1C1E] mb-4" style={{ fontFamily: "Georgia, serif" }}>{pkg.title}</h3>
                  <div className="space-y-2">
                    {pkg.prices.map((price) => (
                      <div
                        key={price}
                        className="rounded-xl border border-[#D4AF37]/15 px-3 py-2 text-sm font-semibold text-[#D4AF37]"
                        style={{ background: "rgba(212,175,55,0.06)" }}
                      >
                        {price}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link href="/packages">
            <motion.span
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] text-sm font-semibold cursor-pointer hover:bg-[#D4AF37] hover:text-[#1C1C1E] transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View All Packages
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Taxi Preview ─────────────────────────────────────────────────────────────
function TaxiPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const routes = [
    { from: "Mathura", to: "Vrindavan", icon: "🚗" },
    { from: "Delhi", to: "Vrindavan", icon: "🚙" },
    { from: "Agra", to: "Mathura", icon: "🚕" },
    { from: "Vrindavan", to: "Govardhan", icon: "🛺" },
  ];
  return (
    <section ref={ref} className="py-20 lg:py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p
            className="text-[#FF9933] tracking-[0.25em] uppercase text-xs font-semibold mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Comfortable Travel
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Taxi{" "}
            <span style={{
              background: "linear-gradient(135deg, #D4AF37, #FF9933)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Services
            </span>
          </motion.h2>
          <motion.p
            className="mt-3 text-white/40 text-base max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Premium, safe, and comfortable rides across all Braj Mandal pilgrimage sites.
          </motion.p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {routes.map((r, i) => (
            <motion.div
              key={r.from + r.to}
              className="rounded-2xl p-5 border border-[#D4AF37]/15 text-center relative overflow-hidden group"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, borderColor: "rgba(212,175,55,0.5)", boxShadow: "0 0 30px rgba(212,175,55,0.12)" }}
            >
              <span className="text-3xl mb-3 block">{r.icon}</span>
              <p className="text-white/80 font-medium text-sm">{r.from}</p>
              <p className="text-[#D4AF37]/50 text-xs my-1">↓</p>
              <p className="text-[#D4AF37] font-semibold text-sm">{r.to}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link href="/taxi">
            <motion.span
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-semibold cursor-pointer hover:bg-[#D4AF37] hover:text-[#1C1C1E] transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View All Routes →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Divine Seva Preview ──────────────────────────────────────────────────────
function DivineSevaPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const sevas = [
    { image: "/cow_seva/cow_selfi.jpg", title: "Gau Seva", desc: "Sacred cow care and protection in Vrindavan's revered Goshalas." },
    { image: "/gallery/anna_dan_seva.jpeg", title: "Anna Dan", desc: "Feed hundreds of devotees with pure Sattvic Prasad." },
    { image: "/Divine_Services/weddings/sacred_wedding.jpeg", title: "Vedic Weddings", desc: "Divine destination weddings in the land of Radha Krishna." },
    { image: "/Divine_Services/vigrah_seva.jpeg", title: "Vigrah Seva", desc: "Offer flowers, lamps, and garlands to sacred temple deities." },
    { image: "/gallery/arti.jpg", title: "Purshottam Maas", desc: "Special seva programmes during the holiest month." },
    { image: "/home/pandit_sevices.jpeg", title: "Pandit Services", desc: "Experienced pandits for all rituals, poojas, and ceremonies." },
  ];
  return (
    <section ref={ref} className="py-20 lg:py-24" style={{ background: "linear-gradient(180deg, #FFFDD0 0%, #FFF8E0 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Sacred Offerings" title="Divine Seva" highlight="Services" subtitle="Participate in sacred acts of devotion and earn divine blessings." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {sevas.map((seva, i) => (
            <motion.div
              key={seva.title}
              className="group bg-white/80 border border-[#D4AF37]/20 rounded-2xl overflow-hidden cursor-pointer relative"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, borderColor: "rgba(212,175,55,0.6)", boxShadow: "0 20px 50px rgba(212,175,55,0.14)" }}
            >
              {/* Image Container */}
              <div className="h-48 w-full overflow-hidden relative">
                <motion.img
                  src={seva.image}
                  alt={seva.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x300?text=" + seva.title;
                  }}
                />
              </div>

              {/* Content Container */}
              <div className="p-6 relative">
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
                />
                <h3 className="font-bold text-[#1C1C1E] mb-2 text-lg group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "Georgia, serif" }}>
                  {seva.title}
                </h3>
                <p className="text-[#1C1C1E]/55 text-sm leading-relaxed">{seva.desc}</p>
                <motion.div
                  className="mt-4 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, #D4AF37, #FF9933)" }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div className="text-center"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          <Link href="/divine-services">
            <motion.span
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-[#1C1C1E] text-sm cursor-pointer"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F5D56E, #B8960C)", boxShadow: "0 0 20px rgba(212,175,55,0.25)" }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(212,175,55,0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Divine Services →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Video Section ─────────────────────────────────────────────────────────────
function VideoSection() {const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  
  // 📜 नया वीडियो ID यहाँ अपडेट कर दिया गया है
  const videoId = "ir0WPdWkLdQ";
  const videoUrl = `https://youtu.be/${videoId}`;

  return (
    <section ref={ref} className="py-20 lg:py-24 bg-[#1C1C1E] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.p 
            className="text-[#FF9933] tracking-[0.25em] uppercase text-xs font-semibold mb-3"
            initial={{ opacity: 0 }} 
            animate={inView ? { opacity: 1 } : {}}
          >
            Feel the Divinity
          </motion.p>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white" 
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0, y: 20 }} 
            animate={inView ? { opacity: 1, y: 0 } : {}} 
            transition={{ delay: 0.1 }}
          >
            Experience{" "}
            <span style={{ background: "linear-gradient(135deg, #D4AF37, #FF9933)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Vrindavan
            </span>
          </motion.h2>
        </div>

        <motion.div
          className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/20 group cursor-pointer"
          style={{ paddingBottom: "56.25%", background: "linear-gradient(135deg, #0D0D0F 0%, #1C1C1E 100%)" }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          whileHover={{ boxShadow: "0 0 50px rgba(212,175,55,0.2)" }}
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
            title="Vrindavan Tour Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            allowFullScreen
          />
        </motion.div>

        <div className="mt-5 text-center">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:text-[#F5D56E] transition-colors"
          >
            Open video on YouTube
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );}

// ─── Spiritual Quote ───────────────────────────────────────────────────────────
function SpiritualQuote() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="py-20 lg:py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FFFDD0 0%, #FFF5D6 100%)" }}>
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)", backgroundSize: "30px 30px" }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#D4AF37] text-8xl font-serif leading-none opacity-20 block -mb-4">"</span>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#1C1C1E] italic leading-relaxed px-4"
            style={{ fontFamily: "Georgia, serif" }}>
            Vrindavan is not a place on a map. It is a state of the heart where Krishna eternally plays.
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#D4AF37]/40" />
            <span className="text-[#D4AF37] font-semibold text-sm tracking-wide">Radha Rasa Sudha Nidhi</span>
            <div className="h-px w-12 bg-[#D4AF37]/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ─────────────────────────────────────────────────────────────
function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reasons = [
    { icon: "🏆", title: "14+ Years of Experience", desc: "Trusted by over 50,000 devotees since 2010." },
    { icon: "🙏", title: "Expert Spiritual Guides", desc: "Knowledgeable pandits and local experts on every tour." },
    { icon: "🛡️", title: "Safe & Reliable", desc: "Fully insured, verified vehicles and verified tour staff." },
    { icon: "💰", title: "Transparent Pricing", desc: "No hidden costs. What you see is what you pay." },
    { icon: "📞", title: "24/7 Support", desc: "We're always a WhatsApp message away for any help." },
    { icon: "⭐", title: "5-Star Rated", desc: "Consistently rated 4.9/5 by our pilgrims on Google." },
  ];
  return (
    <section ref={ref} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Our Promise" title="Why Choose" highlight="Us" subtitle="We're not just a tour company — we're your spiritual companions." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              className="group flex gap-4 p-6 rounded-2xl border border-[#D4AF37]/15 bg-[#FFFDD0]/30 hover:border-[#D4AF37]/50 transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(212,175,55,0.12)" }}
            >
              <span className="text-3xl flex-shrink-0 mt-0.5">{r.icon}</span>
              <div>
                <h3 className="font-bold text-[#1C1C1E] mb-1 group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "Georgia, serif" }}>
                  {r.title}
                </h3>
                <p className="text-[#1C1C1E]/55 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  useSEO(SEO_DATA.home);
  return (
    <>
      <AnnouncementBanner />
      <Layout>
        <HeroSection />
        <FeaturedPackages />
        <TaxiPreview />
        <DivineSevaPreview />
        <VideoSection />
        <SpiritualQuote />
        <WhyChooseUs />
      </Layout>
    </>
  );
}
