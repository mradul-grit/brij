 import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Layout from "@/components/layout/Layout";
import PackageCard from "@/components/packages/PackageCard";
import { PACKAGES, type PackageData, type ItineraryDay } from "@/data/packages";
import { WHATSAPP_NUMBER } from "@/data";
import { useSEO, SEO_DATA } from "@/lib/seo";
import { PageHero, Container, SectionHeader } from "@/components/ui/shared";

const ACCOMMODATION_IMAGES = [

  "/accomodation/pic1.jpeg",
  "/accomodation/pict2.jpeg",
  "/accomodation/pic3.jpeg",
  "/accomodation/pic4.jpeg",
  "/accomodation/pic5.jpeg",
  "/accomodation/pic6.jpeg",
  "/accomodation/pic7.jpeg",
  "/accomodation/pic8.jpeg",
];

// ─── TYPES EXTENSION (For reference) ─────────────────────────────────────────
interface SiteWithImage {
  name: string;
  icon: string;
  desc?: string;
  image?: string; // <-- हर मंदिर/साइट की बड़ी फोटो का पाथ यहाँ होगा
}

// ─── Image Modal / Lightbox Component ────────────────────────────────────────
function ImageModal({ 
  isOpen, 
  onClose, 
  imageSrc, 
  title 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  imageSrc: string; 
  title: string; 
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all text-xl z-50"
          >
            ✕
          </button>

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()} // रोकने के लिए कि अंदर क्लिक करने पर बंद न हो
            className="relative max-w-3xl w-full bg-[#1C1C1E] rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-black flex items-center justify-center">
              {imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-white/40 text-sm flex flex-col items-center gap-2">
                  <span>📸</span> No Image Available for {title}
                </div>
              )}
              {/* Bottom Info Gradient */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 pt-12" />
            </div>

            {/* Title Bar */}
            <div className="absolute bottom-0 inset-x-0 p-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#F5D56E]" style={{ fontFamily: "Georgia, serif" }}>
                {title}
              </h3>
              <span className="text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                Braj Darshan ✨
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Itinerary Day Row ────────────────────────────────────────────────────────
function ItineraryRow({ 
  day, 
  isLast, 
  index,
  onSiteClick
}: { 
  day: ItineraryDay; 
  isLast: boolean; 
  index: number;
  onSiteClick: (site: any) => void; // Parent component को सूचित करने के लिए
}) {
  const [open, setOpen] = useState(index === 0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-4 sm:gap-6"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        {/* Day circle */}
        <motion.div
          className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm relative z-10 flex-shrink-0 cursor-pointer"
          style={{
            background: open
              ? "linear-gradient(135deg, #D4AF37 0%, #F5D56E 50%, #B8960C 100%)"
              : "rgba(212,175,55,0.1)",
            border: open ? "none" : "1.5px solid rgba(212,175,55,0.3)",
            color: open ? "#1C1C1E" : "#D4AF37",
            boxShadow: open ? "0 0 20px rgba(212,175,55,0.4)" : "none",
          }}
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={open ? { boxShadow: ["0 0 15px rgba(212,175,55,0.3)", "0 0 30px rgba(212,175,55,0.5)", "0 0 15px rgba(212,175,55,0.3)"] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {day.day}
        </motion.div>
        {/* Connector line */}
        {!isLast && (
          <div className="w-px flex-1 mt-2" style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.4), rgba(212,175,55,0.1))", minHeight: "24px" }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="w-full text-left">
          <div className="flex items-start justify-between gap-3 mb-1 cursor-pointer" onClick={() => setOpen(!open)}>
            <div>
              <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">
                Day {day.day}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1C1C1E] leading-tight mt-0.5" style={{ fontFamily: "Georgia, serif" }}>
                {day.title}
              </h3>
              <p className="text-[#1C1C1E]/50 text-sm mt-0.5">{day.subtitle}</p>
            </div>
            <motion.div
              className="w-7 h-7 rounded-full border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 mt-1"
              style={{ background: "rgba(212,175,55,0.06)" }}
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" className="w-3.5 h-3.5">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </motion.div>
          </div>

          {/* Site name pills (always visible - clicking a pill opens image directly) */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {day.sites.map((s) => (
              <button 
                key={s.name} 
                onClick={(e) => {
                  e.stopPropagation(); 
                  onSiteClick(s);
                }}
                className="text-[11px] px-2.5 py-0.5 rounded-full text-[#1C1C1E]/60 border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 hover:text-[#B8960C] transition-all flex items-center gap-1 cursor-pointer"
                style={{ background: "rgba(212,175,55,0.05)" }}
              >
                <span>{s.icon}</span> <span>{s.name}</span> <span className="text-[9px] opacity-40">🔍</span>
              </button>
            ))}
          </div>
        </div>

        {/* Expanded site details */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="mt-4 rounded-2xl border border-[#D4AF37]/15 overflow-hidden"
                style={{ background: "rgba(212,175,55,0.03)" }}>
                {day.sites.map((site, si) => (
                  <motion.div
                    key={site.name}
                    onClick={() => onSiteClick(site)}
                    className="flex gap-4 px-4 py-3.5 border-b border-[#D4AF37]/10 last:border-0 cursor-pointer hover:bg-[#D4AF37]/5 transition-colors group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: si * 0.07 }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                      style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                      <span className="text-lg">{site.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[#1C1C1E] font-semibold text-sm flex items-center gap-1.5 group-hover:text-[#B8960C] transition-colors">
                        {site.name} 
                        <span className="text-[10px] text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">📸 View Photo</span>
                      </p>
                      {site.desc && <p className="text-[#1C1C1E]/50 text-xs mt-0.5 leading-relaxed">{site.desc}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Inclusions / Exclusions ──────────────────────────────────────────────────
function InclusionsExclusions({ pkg }: { pkg: PackageData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Inclusions */}
      <div className="rounded-2xl border border-[#D4AF37]/20 p-6" style={{ background: "rgba(212,175,55,0.03)" }}>
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(72,199,116,0.12)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#48C774" strokeWidth="2.5" className="w-4 h-4">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h4 className="font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>What's Included</h4>
        </div>
        <ul className="space-y-2.5">
          {pkg.inclusions.map((item, i) => (
            <motion.li
              key={item}
              className="flex items-start gap-2.5 text-sm text-[#1C1C1E]/70"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(72,199,116,0.15)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#48C774" strokeWidth="3" className="w-2.5 h-2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span >
              {item}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Exclusions */}
      <div className="rounded-2xl border border-red-200/40 p-6" style={{ background: "rgba(255,80,80,0.02)" }}>
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,80,80,0.10)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#FF5050" strokeWidth="2.5" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </div>
          <h4 className="font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>Not Included</h4>
        </div>
        <ul className="space-y-2.5">
          {pkg.exclusions.map((item, i) => (
            <motion.li
              key={item}
              className="flex items-start gap-2.5 text-sm text-[#1C1C1E]/60"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,80,80,0.12)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#FF5050" strokeWidth="3" className="w-2.5 h-2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Full Package Detail Expanded Panel ───────────────────────────────────────
function PackageDetail({ pkg, onSiteClick }: { pkg: PackageData; onSiteClick: (site: any) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const waMsg = encodeURIComponent(`Hi! I'd like to book the ${pkg.title}. Please share the details.`);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;
  const startingPrice = pkg.pricing[0]?.price ?? "On Request";

  return (
    <div ref={ref} className="max-w-4xl mx-auto mt-6">
      {/* Sticky booking bar (mobile) */}
      <div className="lg:hidden sticky top-16 z-30 mb-6">
        <motion.div
          className="rounded-2xl border border-[#D4AF37]/30 p-4 flex items-center justify-between gap-4"
          style={{ background: "rgba(28,28,30,0.92)", backdropFilter: "blur(16px)" }}
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div>
            <p className="text-white/50 text-xs">Starting from</p>
            <p className="text-[#D4AF37] font-bold text-xl">{startingPrice}</p>
          </div>
          <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl font-semibold text-sm text-[#1C1C1E]"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D56E, #B8960C)" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Book Now
          </motion.a>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Itinerary + Inclusions */}
        <div className="lg:col-span-2 space-y-10">
          {/* Itinerary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(to bottom, #D4AF37, #FF9933)" }} />
              <h2 className="text-2xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
                Day-by-Day Itinerary
              </h2>
            </div>
            <div>
              {pkg.itinerary.map((day, i) => (
                <ItineraryRow
                  key={day.day}
                  day={day}
                  isLast={i === pkg.itinerary.length - 1}
                  index={i}
                  onSiteClick={onSiteClick}
                />
              ))}
            </div>
          </motion.div>

          {/* Inclusions / Exclusions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 rounded-full" style={{ background: "linear-gradient(to bottom, #D4AF37, #FF9933)" }} />
              <h2 className="text-2xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
                Inclusions &amp; Exclusions
              </h2>
            </div>
            <InclusionsExclusions pkg={pkg} />
          </motion.div>
        </div>

        {/* RIGHT: Sticky booking sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <motion.div
              className="rounded-3xl border border-[#D4AF37]/25 overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)" }}
            >
              {/* Top accent bar */}
              <div className="h-1.5" style={{ background: "linear-gradient(90deg, #D4AF37, #FF9933, #D4AF37)" }} />
              <div className="p-6">
                <p className="text-[#1C1C1E]/50 text-xs uppercase tracking-widest mb-1">Starting From</p>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl font-bold text-[#D4AF37]">{startingPrice}</span>
                </div>

                {/* Pricing breakdown */}
                <div className="space-y-2.5 mb-5">
                  {pkg.pricing.map((p) => (
                    <div key={p.label} className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-[#D4AF37]/15"
                      style={{ background: "rgba(212,175,55,0.04)" }}>
                      <span className="text-xs text-[#1C1C1E]/55">{p.label}</span>
                      <div className="flex items-center gap-2">
                        {p.original && <span className="text-xs text-[#1C1C1E]/25 line-through">{p.original}</span>}
                        <span className="font-bold text-[#D4AF37]">{p.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Services icons */}
                <div className="grid grid-cols-4 gap-2 mb-5 pb-5 border-b border-[#D4AF37]/10">
                  {pkg.includes.map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#D4AF37]/20"
                        style={{ background: "rgba(212,175,55,0.07)" }}>
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <span className="text-[10px] text-[#1C1C1E]/45 text-center leading-tight">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Book button */}
                <motion.a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-[#1C1C1E] text-sm mb-3"
                  style={{ background: "linear-gradient(135deg, #D4AF37 0%, #F5D56E 50%, #B8960C 100%)", boxShadow: "0 0 20px rgba(212,175,55,0.25)" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 35px rgba(212,175,55,0.45)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Book on WhatsApp
                </motion.a>

                <p className="text-center text-[#1C1C1E]/35 text-xs">
                  📞 Call us: <a href="tel:+919548367253" className="text-[#D4AF37] hover:underline">+91 95483 67253</a>
                </p>

                {/* Trust badges */}
                <div className="mt-5 pt-5 border-t border-[#D4AF37]/10 grid grid-cols-2 gap-2">
                  {[
                    { icon: "🛡️", label: "Safe & Verified" },
                    { icon: "⭐", label: "4.9/5 Rated" },
                    { icon: "🔄", label: "Easy Cancellation" },
                    { icon: "💬", label: "24/7 Support" },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-1.5 text-[11px] text-[#1C1C1E]/50">
                      <span>{b.icon}</span>
                      <span>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccommodationCarousel() {
  const [activeImage, setActiveImage] = useState(0);
  const current = ACCOMMODATION_IMAGES[activeImage];

  const showPrevious = () => {
    setActiveImage((currentIndex) =>
      currentIndex === 0 ? ACCOMMODATION_IMAGES.length - 1 : currentIndex - 1
    );
  };

  const showNext = () => {
    setActiveImage((currentIndex) =>
      currentIndex === ACCOMMODATION_IMAGES.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-[#FF9933] text-xs tracking-widest uppercase font-semibold mb-2">
            Stay Included
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
            Comfortable Accommodation
          </h2>
          <p className="text-[#1C1C1E]/55 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Clean, peaceful hotel stays arranged for a relaxed Braj Darshan experience.
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-[#D4AF37]/25 bg-[#1C1C1E] shadow-[0_30px_90px_rgba(28,28,30,0.18)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative aspect-[4/3] sm:aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={current}
                alt={`Accommodation view ${activeImage + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                loading="lazy"
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold text-sm sm:text-base">Hotel Room Preview</p>
                <p className="text-white/60 text-xs mt-0.5">
                  {activeImage + 1} / {ACCOMMODATION_IMAGES.length}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                {ACCOMMODATION_IMAGES.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeImage ? "w-8 bg-[#D4AF37]" : "w-2 bg-white/45 hover:bg-white/70"
                    }`}
                    aria-label={`Show accommodation photo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/25 bg-black/40 text-white flex items-center justify-center backdrop-blur-md hover:bg-[#D4AF37] hover:text-[#1C1C1E] transition-colors"
            aria-label="Previous accommodation photo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/25 bg-black/40 text-white flex items-center justify-center backdrop-blur-md hover:bg-[#D4AF37] hover:text-[#1C1C1E] transition-colors"
            aria-label="Next accommodation photo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function Packages() {
  useSEO(SEO_DATA.packages);
  const [activePackage, setActivePackage] = useState<string | null>("braj-darshan-4day");
  const detailRef = useRef<HTMLDivElement>(null);

  // Lightbox Modal State
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardExpand = (id: string) => {
    setActivePackage(activePackage === id ? null : id);
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  // जब किसी मंदिर/साइट आइकन या नाम पर क्लिक होगा
  const handleSiteClick = (site: { name: string; image?: string }) => {
    setModalTitle(site.name);
    setModalImage(site.image || null); // अगर इमेज पाथ नहीं है तो null रहेगा
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <PageHero
        eyebrow="Curated Pilgrimages"
        title="Tour"
        highlight="Packages"
        description="Handcrafted spiritual journeys to the sacred land of Radha Krishna"
        glowPos="60% 80%"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[{ value: "50,000+", label: "Happy Pilgrims" }, { value: "14+", label: "Years Experience" }, { value: "25+", label: "Sacred Sites" }, { value: "4.9 ★", label: "Google Rating" }].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-[#D4AF37] text-2xl font-bold">{s.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Package cards grid */}
      <section className="py-14 bg-[#FFFDD0]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
            {PACKAGES.filter((pkg) => pkg.id === "braj-darshan-4day").map((pkg, i) => (
              <div key={pkg.id} onClick={() => handleCardExpand(pkg.id)} className="cursor-pointer">
                <PackageCard pkg={pkg} index={i} />
              </div>
            ))}

            {false && <>
            {/* Coming soon placeholder cards */}
            {[
              { title: "Braj Chaurasi Kos Yatra", duration: "7 Days", emoji: "🗺️", image: "/gallery/govardhan.jpg", desc: "Complete 84 Kos pilgrimage of all sacred Braj sites." },
              { title: "Vrindavan Weekend Getaway", duration: "2 Days", emoji: "🌸", image: "/gallery/prem_mandir.jpeg", desc: "Quick spiritual escape — perfect for families." },
            ].map((ph, i) => (
              <motion.div
                key={ph.title}
                className="group rounded-3xl border border-[#D4AF37]/15 bg-white/60 overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (PACKAGES.length + i) * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(212,175,55,0.1)" }}
              >
                <div className="aspect-[16/10] flex items-center justify-center relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)" }}>
                  <img
                    src={ph.image}
                    alt={ph.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-white/90" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1C1C1E]/50 via-transparent to-[#D4AF37]/25" />
                  <span className="relative text-7xl opacity-10">{ph.emoji}</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/20 text-sm font-medium tracking-widest uppercase">Coming Soon</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1C1C1E]/60 mb-1" style={{ fontFamily: "Georgia, serif" }}>
                    {ph.title}
                  </h3>
                  <p className="text-[#1C1C1E]/40 text-sm mb-3">{ph.desc}</p>
                  <span className="text-xs px-3 py-1 rounded-full border border-[#D4AF37]/20 text-[#D4AF37]/50">
                    {ph.duration} · Coming Soon
                  </span>
                </div>
              </motion.div>
            ))}
            </>}
          </div>
        </div>
      </section>

      {/* Expanded detail panel */}
      <AnimatePresence>
        {activePackage && (
          <motion.section
            ref={detailRef}
            className="py-14"
            style={{ background: "linear-gradient(180deg, #fff 0%, #FFFDD0 100%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section heading */}
              <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-1 h-8 rounded-full" style={{ background: "linear-gradient(to bottom, #D4AF37, #FF9933)" }} />
                <div>
                  <p className="text-[#FF9933] text-xs tracking-widest uppercase font-semibold">Full Details</p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
                    {PACKAGES.find(p => p.id === activePackage)?.title}
                  </h2>
                </div>
              </motion.div>
              {PACKAGES.filter(p => p.id === "braj-darshan-4day").map(pkg => (
                <PackageDetail key={pkg.id} pkg={pkg} onSiteClick={handleSiteClick} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Global Image Lightbox Modal Component */}
      <ImageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={modalImage!}
        title={modalTitle}
      />

      <AccommodationCarousel />

      {/* Bottom CTA banner */}
      <section className="py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1C1C1E 0%, #2C1A00 60%, #1C1C1E 100%)" }}>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ background: "radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 60%)" }}
        />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Can't find what you're looking for?
          </motion.h2>
          <motion.p
            className="text-white/50 mb-8 text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We create fully custom pilgrimage itineraries tailored to your group, budget, and dates.
          </motion.p>
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to enquire about a custom Vrindavan tour package.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-[#1C1C1E] text-sm"
            style={{ background: "linear-gradient(135deg, #D4AF37 0%, #F5D56E 50%, #B8960C 100%)", boxShadow: "0 0 30px rgba(212,175,55,0.35)" }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(212,175,55,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Request a Custom Package
          </motion.a>
        </div>
      </section>
    </Layout>
  );
}
