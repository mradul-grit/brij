 import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import { WHATSAPP_NUMBER } from "@/data";
import type { PackageData, ItineraryDay } from "@/data/packages";

// ─── Gallery anchor mapping (keyed by exact site name in packages.ts) ────────
const SITE_TO_GALLERY: Record<string, number> = {
  // Day 1 — Vrindavan
  "Radha Madan Mohan":    16,
  "Radha Damoder":        17,
  "Radha Raman":           4,
  "Gopiswar Mahadev":     18,
  "Nidhivan":             14,
  "Banke Bihari Darshan":  1,
  "ISKCON Temple":         6,
  "Radha Govind Mandir":  19,
  "Rang Nath Ji Mandir":  20,
  // Day 2 — Mathura / Gokul / Dauji
  "Sri Krishna Janm Bhumi":           21,
  "Raval — Birth Place of Radharani": 22,
  "Raman Reti":                       23,
  "Ukhal Bandhan":                    24,
  "Brahmand Ghat":                    25,
  "84 Khamba Mandir":                 26,
  "Chheer Sagar":                     27,
  "Dauji Temple":                     28,
  // Day 3 — Barsana / Nandgaon / Govardhan
  "Shri Ji Mandir":           29,
  "Kirti Mandir":             30,
  "Ashisewar Mahadev":        31,
  "Ter Kadamb":               32,
  "Pavan Sarovar":            33,
  "Vrinda Kund":              34,
  "Nand Mahal":               35,
  "Kusum Sarovar":            36,
  "Mansi Ganga":              37,
  "Govind Kund":              38,
  "Punchhri Ka Lotha Baba":   39,
  "Uddhav Kund":              40,
  "Radha Kund":               15,
  "Shyam Kund":               41,
  // Day 4 — Sacred Forests & Ghats
  "Akroor Ghat":     42,
  "Bhatraod Bihari": 43,
  "Mansarovar":      44,
  "Bhandirvan":      45,
  "Vansivat":        46,
  "Belvan":          47,
  // Legacy / other pages (keep old names working)
  "Banke Bihari Temple":    1,
  "Radha Raman Temple":     4,
  "ISKCON Vrindavan":       6,
  "Prem Mandir":            9,
  "Vishram Ghat":           8,
  "Govardhan Parikrama":   12,
  "Shri Ji Mandir, Barsana": 29,
  "Nandgaon":               2,
};

// ─── Clickable place link ─────────────────────────────────────────────────────
function PlaceLink({ name, children }: { name: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const galleryId = SITE_TO_GALLERY[name];
  const href = galleryId ? `/gallery#gallery-item-${galleryId}` : "/gallery";
  return (
    <Link href={href}>
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          cursor: "pointer",
          borderBottom: hovered ? "1.5px solid #D4AF37" : "1.5px solid transparent",
          textShadow: hovered ? "0 0 14px rgba(212,175,55,0.65)" : "none",
          color: hovered ? "#D4AF37" : "inherit",
          transition: "color 0.22s ease, border-color 0.22s ease, text-shadow 0.22s ease",
          paddingBottom: "1px",
        }}
      >
        {children}
      </span>
    </Link>
  );
}

// ─── Itinerary Day Row ────────────────────────────────────────────────────────
export function ItineraryRow({ day, isLast, index }: { day: ItineraryDay; isLast: boolean; index: number }) {
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
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
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
        {!isLast && (
          <div className="w-px flex-1 mt-2" style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.4), rgba(212,175,55,0.1))", minHeight: "24px" }} />
        )}
      </div>

      <div className="flex-1 pb-6">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left"
          aria-expanded={open}
        >
          <div className="flex items-start justify-between gap-3 mb-1">
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

          <div className="flex flex-wrap gap-1.5 mt-2">
            {day.sites.map((s) => (
              <PlaceLink key={s.name} name={s.name}>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full text-[#1C1C1E]/60 border border-[#D4AF37]/15"
                  style={{ background: "rgba(212,175,55,0.05)" }}>
                  {s.icon} {s.name}
                </span>
              </PlaceLink>
            ))}
          </div>
        </button>

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
                    className="flex gap-4 px-4 py-3.5 border-b border-[#D4AF37]/10 last:border-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: si * 0.07 }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                      <span className="text-lg">{site.icon}</span>
                    </div>
                    <div>
                      <PlaceLink name={site.name}>
                        <p className="text-[#1C1C1E] font-semibold text-sm inline">{site.name}</p>
                      </PlaceLink>
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
export function InclusionsExclusions({ pkg }: { pkg: PackageData }) {
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
              </span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>

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

// ─── Full Package Detail Panel ────────────────────────────────────────────────
export function PackageDetailView({ pkg }: { pkg: PackageData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const waMsg = encodeURIComponent(`Hi! I'd like to book the ${pkg.title}. Please share the details.`);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

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
            <p className="text-[#D4AF37] font-bold text-xl">
              {(pkg.pricingGroups?.[0]?.options[0] ?? pkg.pricing[0])?.price}
              <span className="text-xs font-normal text-white/40 ml-1">
                {pkg.pricingGroups ? `for ${pkg.pricingGroups[0].people} people` : "/ person"}
              </span>
            </p>
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
                />
              ))}
            </div>
          </motion.div>

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
              <div className="h-1.5" style={{ background: "linear-gradient(90deg, #D4AF37, #FF9933, #D4AF37)" }} />
              <div className="p-6">
                <p className="text-[#1C1C1E]/50 text-xs uppercase tracking-widest mb-1">Starting From</p>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl font-bold text-[#D4AF37]">
                    {(pkg.pricingGroups?.[0]?.options[0] ?? pkg.pricing[0])?.price}
                  </span>
                  <span className="text-[#1C1C1E]/40 text-sm mb-1">
                    {pkg.pricingGroups ? `for ${pkg.pricingGroups[0].people} people` : "/ person"}
                  </span>
                </div>

                <div className="space-y-3 mb-5">
                  {pkg.pricingGroups ? pkg.pricingGroups.map((group) => (
                    <div key={group.groupLabel}>
                      {/* Group header */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="h-px flex-1" style={{ background: "rgba(212,175,55,0.2)" }} />
                        <span className="text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap"
                          style={{ color: "rgba(212,175,55,0.6)" }}>
                          👥 {group.groupLabel}
                        </span>
                        <div className="h-px flex-1" style={{ background: "rgba(212,175,55,0.2)" }} />
                      </div>
                      {/* Options */}
                      <div className="space-y-1.5">
                        {group.options.map((p) => (
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
                      {/* Includes pills for this group */}
                      {group.includes && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-2 px-1">
                          {group.includes.map((inc) => (
                            <span key={inc.label} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border border-[#D4AF37]/20"
                              style={{ background: "rgba(212,175,55,0.06)", color: "rgba(28,28,30,0.55)" }}>
                              {inc.icon} {inc.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )) : pkg.pricing.map((p) => (
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

                {/* Fixed inclusions pills mapping safely from pkg.inclusions */}
                <div className="grid grid-cols-2 gap-2 mb-5 pb-5 border-b border-[#D4AF37]/10">
                  {pkg.inclusions.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[#D4AF37]/10"
                      style={{ background: "rgba(212,175,55,0.02)" }}>
                      <span className="text-sm">✨</span>
                      <span className="text-[11px] text-[#1C1C1E]/60 truncate font-medium leading-none">{item}</span>
                    </div>
                  ))}
                </div>

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