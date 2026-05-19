 import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { VEHICLES, POPULAR_ROUTES,TAXI_NOTES, type VehicleData } from "@/data/taxi";
import { WHATSAPP_NUMBER } from "@/data";
import { useSEO, SEO_DATA } from "@/lib/seo";
import { PageHero, Container, SectionHeader } from "@/components/ui/shared";

// ─── Vehicle Card ─────────────────────────────────────────────────────────────
function VehicleCard({ vehicle, index }: { vehicle: VehicleData; index: number }) {
  const waMsg = encodeURIComponent(
    `Hi! I'd like to book a *${vehicle.name}* taxi. Please share availability and confirm pricing.`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

  const tagColors: Record<string, { bg: string; text: string }> = {
    "Most Popular": { bg: "linear-gradient(135deg, #D4AF37, #F5D56E)", text: "#1C1C1E" },
    "Premium":      { bg: "linear-gradient(135deg, #2C1A00, #D4AF37)", text: "#FFFDD0" },
    "Best Value":   { bg: "linear-gradient(135deg, #1a3a1a, #4CAF50)", text: "#fff" },
    "Group Tours":  { bg: "linear-gradient(135deg, #0a1a2a, #6B9FD4)", text: "#fff" },
  };
  const tagStyle = vehicle.tag ? tagColors[vehicle.tag] ?? tagColors["Most Popular"] : null;
  const svgColor = vehicle.id === "innova-crysta" ? "#D4AF37"
    : vehicle.id === "innova" ? "#FF9933"
    : vehicle.id === "ertiga" ? "#6B9FD4"
    : vehicle.id === "tempo" ? "#4CAF50"
    : "#A0A0A0";

  return (
    <motion.div
      className="group rounded-3xl overflow-hidden border border-[#D4AF37]/15 bg-white relative flex flex-col"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: "easeOut" }}
      whileHover={{
        y: -8,
        boxShadow: "0 32px 80px rgba(212,175,55,0.16), 0 8px 24px rgba(0,0,0,0.07)",
        borderColor: "rgba(212,175,55,0.45)",
      }}
    >
      {/* Hero area */}
   {/* Hero area */}
<div className="relative h-44 overflow-hidden w-full group">
  {/* Real Vehicle Image as Full Banner */}
  <img 
    src={vehicle.image} 
    alt={vehicle.name} 
    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
  />
  
  {/* Dark overlay taaki badges saaf dikhein */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

  {/* AC badge */}
  <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-[11px] font-semibold"
    style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)" }}>
    ❄️ AC
  </div>

  {/* Tag */}
  {vehicle.tag && tagStyle && (
    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold"
      style={{ background: tagStyle.bg, color: tagStyle.text }}>
      {vehicle.tag}
    </div>
  )}
</div>

      {/* Info */}
      <div className="px-5 pt-3 pb-5 flex flex-col flex-1">
        <h3 className="text-[#1C1C1E] font-bold text-lg mb-0.5 group-hover:text-[#D4AF37] transition-colors duration-300"
          style={{ fontFamily: "Georgia, serif" }}>
          {vehicle.name}
        </h3>

        {/* Specs row */}
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 text-[#1C1C1E]/50 text-xs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
            {vehicle.seats} Seats
          </span>
          <span className="w-px h-3 bg-[#D4AF37]/20" />
          <span className="flex items-center gap-1 text-[#1C1C1E]/50 text-xs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
            </svg>
            {vehicle.luggage}
          </span>
          <span className="w-px h-3 bg-[#D4AF37]/20" />
          <span className="flex items-center gap-1 text-[#1C1C1E]/50 text-xs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            {vehicle.fuel}
          </span>
        </div>

        {/* Pricing table */}
        <div className="rounded-2xl border border-[#D4AF37]/12 overflow-hidden mb-4 flex-1"
          style={{ background: "rgba(212,175,55,0.025)" }}>
          {vehicle.trips.map((trip, i) => (
            <div
              key={trip.label}
              className={`flex items-center justify-between px-4 py-2.5 ${i < vehicle.trips.length - 1 ? "border-b border-[#D4AF37]/10" : ""}`}
            >
              <div>
                <p className="text-[#1C1C1E]/75 text-xs font-medium">{trip.label}</p>
                {trip.note && <p className="text-[#1C1C1E]/35 text-[10px]">{trip.note}</p>}
              </div>
              <span className="text-[#D4AF37] font-bold text-base">{trip.price}</span>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-[#1C1C1E] text-sm"
          style={{ background: "linear-gradient(135deg, #D4AF37 0%, #F5D56E 50%, #B8960C 100%)" }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(212,175,55,0.45)" }}
          whileTap={{ scale: 0.97 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          Book This Taxi
        </motion.a>
      </div>
    </motion.div>
  );
}

// ─── Popular Routes Strip ─────────────────────────────────────────────────────
function RoutesStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <section ref={ref} className="py-14 bg-white border-b border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-[#FF9933] tracking-widest uppercase text-xs font-semibold mb-2">We Cover</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
            Popular <span style={{ background: "linear-gradient(135deg,#D4AF37,#FF9933)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Routes</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_ROUTES.map((route, i) => (
            <motion.div
              key={route.from + route.to}
              className="flex items-center gap-4 p-4 rounded-2xl border border-[#D4AF37]/15 group hover:border-[#D4AF37]/50 transition-all duration-300"
              style={{ background: "rgba(212,175,55,0.03)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(212,175,55,0.1)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" className="w-5 h-5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#1C1C1E] font-semibold text-sm truncate">{route.from}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" className="w-3.5 h-3.5 flex-shrink-0">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  <span className="text-[#D4AF37] font-semibold text-sm truncate">{route.to}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[#1C1C1E]/40 text-xs">{route.distance}</span>
                  <span className="text-[#1C1C1E]/25 text-xs">·</span>
                  <span className="text-[#1C1C1E]/40 text-xs">{route.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Book With Us ─────────────────────────────────────────────────────────
function WhyBookUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const points = [
    { icon: "🛡️", title: "Verified Drivers", desc: "All drivers are background-checked and well-versed with Braj Mandal routes." },
    { icon: "🕐", title: "Punctual Pickup", desc: "We arrive on time — your darshan schedule is our priority." },
    { icon: "❄️", title: "Well-Maintained AC", desc: "Clean, serviced vehicles with functioning AC for your comfort." },
    { icon: "💬", title: "WhatsApp Booking", desc: "Instant confirmation via WhatsApp — no forms, no wait." },
    { icon: "💰", title: "Transparent Fares", desc: "No hidden charges. Fixed pricing published upfront." },
    { icon: "📞", title: "24/7 Support", desc: "Driver contact and our number available throughout your journey." },
  ];
  return (
    <section ref={ref} className="py-16 lg:py-20" style={{ background: "linear-gradient(180deg, #FFFDD0 0%, #FFF8E0 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-[#FF9933] tracking-widest uppercase text-xs font-semibold mb-2">Our Promise</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
            Why Book With <span style={{ background: "linear-gradient(135deg,#D4AF37,#FF9933)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Us</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              className="flex gap-4 p-5 rounded-2xl bg-white/70 border border-[#D4AF37]/15 group hover:border-[#D4AF37]/50 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{p.icon}</span>
              <div>
                <h4 className="font-bold text-[#1C1C1E] text-sm mb-1 group-hover:text-[#D4AF37] transition-colors">{p.title}</h4>
                <p className="text-[#1C1C1E]/55 text-xs leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function BottomCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const waMsg = encodeURIComponent("Hi! I'd like to book a taxi for my Vrindavan trip. Please help me with details.");
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;
  return (
    <section ref={ref} className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1C1C1E 0%, #2C1A00 60%, #1C1C1E 100%)" }}>
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.06, 0.14, 0.06] }} transition={{ duration: 4, repeat: Infinity }}
        style={{ background: "radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 60%)" }} />
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <motion.h2 className="text-3xl sm:text-4xl font-bold text-white mb-3"
          style={{ fontFamily: "Georgia, serif" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          Need a Custom Quote?
        </motion.h2>
        <motion.p className="text-white/50 text-base mb-8"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}>
          Tell us your pickup point, destination, dates, and group size — we'll send a personalised fare instantly on WhatsApp.
        </motion.p>
        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-[#1C1C1E] text-sm"
          style={{ background: "linear-gradient(135deg,#D4AF37 0%,#F5D56E 50%,#B8960C 100%)", boxShadow: "0 0 30px rgba(212,175,55,0.35)" }}
          initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.25 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(212,175,55,0.55)" }}
          whileTap={{ scale: 0.97 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          Get Instant Quote on WhatsApp
        </motion.a>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Taxi() {
  useSEO(SEO_DATA.taxi);
  return (
    <Layout>
      <PageHero
        eyebrow="Comfortable Travel"
        title="Taxi"
        highlight="Services"
        description="Premium AC vehicles for every pilgrimage, sightseeing, and airport transfer across Braj Mandal"
        glowPos="70% 80%"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[{ value: "5", label: "Vehicle Types" }, { value: "All AC", label: "Every Vehicle" }, { value: "24/7", label: "Availability" }, { value: "₹0", label: "Hidden Charges" }].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-[#D4AF37] text-2xl font-bold">{s.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Vehicle grid */}
      <section className="py-14 lg:py-16" style={{ background: "linear-gradient(180deg, #FFFDD0 0%, #fff 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-[#FF9933] tracking-widest uppercase text-xs font-semibold mb-2">Choose Your Ride</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
              Our{" "}
              <span style={{ background: "linear-gradient(135deg,#D4AF37,#FF9933)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Fleet
              </span>
            </h2>
            <p className="mt-2 text-[#1C1C1E]/50 text-sm max-w-lg mx-auto">
              All vehicles are fully AC, GPS-equipped, and driven by verified, experienced drivers.
            </p>
          </motion.div>

          {/* 2-col then 3-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VEHICLES.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>

          {/* Note */}
<div className="mt-10 rounded-3xl border border-[#D4AF37]/15 bg-white p-6">
  <h3
    className="text-xl font-bold text-[#1C1C1E] mb-4"
    style={{ fontFamily: "Georgia, serif" }}
  >
    Important Notes
  </h3>

  <div
  className="mt-10 rounded-3xl border p-6 backdrop-blur-xl"
  style={{
    background:
      "linear-gradient(135deg, rgba(28,28,30,0.96) 0%, rgba(44,26,0,0.92) 100%)",
    borderColor: "rgba(212,175,55,0.22)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
  }}
>
    {TAXI_NOTES.map((note, index) => (
      <div
        key={index}
       className="flex items-start gap-2 text-sm text-white/75"
   
      >
        <span className="text-[#D4AF37] mt-0.5">●</span>
        <span>{note}</span>
      </div>
    ))}
  </div>
</div>
        </div>
      </section>

      <RoutesStrip />
      <WhyBookUs />
      <BottomCTA />
    </Layout>
  );
}