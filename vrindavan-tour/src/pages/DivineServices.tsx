import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/layout/Layout";
import { WHATSAPP_URL } from "@/data";
import { useSEO, SEO_DATA } from "@/lib/seo";
import { PageHero } from "@/components/ui/shared";
import { openDonationCheckout, parseAmountPaise, RAZORPAY_KEY } from "@/lib/razorpay";

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function WhatsAppCTA({ label }: { label: string }) {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-[#1C1C1E] text-sm shadow-lg transition-all duration-300"
      style={{ background: "linear-gradient(135deg, #D4AF37 0%, #F5D56E 50%, #B8960C 100%)" }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.5)" }}
      whileTap={{ scale: 0.97 }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
      </svg>
      {label}
    </motion.a>
  );
}

// ─── Razorpay donate button ───────────────────────────────────────────────────
interface DonateButtonProps {
  label: string;
  seva: string;
  priceStr: string;
  className?: string;
  popular?: boolean;
}

function DonateButton({ label, seva, priceStr, className = "", popular = false }: DonateButtonProps) {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await openDonationCheckout({
      title: seva,
      description: seva,
      amount: parseAmountPaise(priceStr),
      onSuccess: (paymentId) => {
        const params = new URLSearchParams({
          seva,
          amount: priceStr,
          pid: paymentId,
        });
        navigate(`/thank-you?${params.toString()}`);
      },
      onDismiss: () => setLoading(false),
    });
    setLoading(false);
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={loading}
      className={className}
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Loading…
        </span>
      ) : label}
    </motion.button>
  );
}

// ─── SECTION 1: Divine Weddings ──────────────────────────────────────────────
const weddingFeatures = [
  { icon: "🏛️", title: "Premium Venue Selection", desc: "Curated heritage venues and dharamshalas along the sacred Yamuna banks." },
  { icon: "🌸", title: "Floral Decor & Mandap", desc: "Exquisite marigold, rose, and jasmine arrangements with traditional mandap design." },
  { icon: "🙏", title: "Pandit Management", desc: "Experienced Vedic pandits performing all rituals with authenticity and devotion." },
  { icon: "🍱", title: "Sattvic Catering", desc: "Pure vegetarian Sattvic cuisine prepared with sacred ingredients and love." },
  { icon: "🚌", title: "Guest Logistics", desc: "Seamless transportation, accommodation, and hospitality for all guests." },
  { icon: "📸", title: "Photography & Decor", desc: "Capturing your divine moments against Vrindavan's timeless backdrop." },
];

function WeddingSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FFFDD0]/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[#FF9933] tracking-widest uppercase text-xs font-semibold mb-3">Divine Services</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1C1E] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              Tie the Knot in the Land of{" "}
              <span style={{
                background: "linear-gradient(135deg, #D4AF37, #FF9933)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Radha Krishna
              </span>
            </h2>
            <p className="mt-5 text-[#1C1C1E]/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Experience a divine, stress-free destination wedding in Vrindavan. We handle everything from premium venue selection to authentic Sattvic catering, floral decor, Pandit management, and guest logistics.
            </p>
          </motion.div>

          {/* Alternating feature blocks */}
          <div className="space-y-10 mb-14">
            {[0, 1].map((rowIdx) => (
              <motion.div
                key={rowIdx}
                variants={fadeUp}
                className={`flex flex-col md:flex-row gap-6 ${rowIdx === 1 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Image placeholder */}
            <div className="md:w-1/2 rounded-3xl overflow-hidden shadow-2xl relative min-h-[260px]">

  <img
    src={
      rowIdx === 0
        ? "Divine_Services/weddings/sacred_wedding.jpeg"
        : "Divine_Services/weddings/weddings_decore.jpeg"
    }
    alt={rowIdx === 0 ? "Wedding Ceremony" : "Wedding Decor"}
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/30" />

  <div className="absolute bottom-6 left-6 z-10 text-white">
    <h3 className="text-2xl font-bold">
      {rowIdx === 0 ? "Sacred Ceremony" : "Divine Decor"}
    </h3>

    <p className="text-white/70 text-sm">
      Vrindavan Wedding Experience
    </p>
  </div>

</div>

                {/* Features */}
                <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 content-center">
                  {weddingFeatures.slice(rowIdx * 3, rowIdx * 3 + 3).map((f) => (
                    <motion.div
                      key={f.title}
                      className="bg-white/70 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl p-4 hover:border-[#D4AF37]/60 hover:shadow-lg transition-all duration-300 group"
                      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(212,175,55,0.15)" }}
                    >
                      <span className="text-2xl mb-2 block">{f.icon}</span>
                      <h4 className="font-semibold text-[#1C1C1E] text-sm mb-1 group-hover:text-[#D4AF37] transition-colors">{f.title}</h4>
                      <p className="text-[#1C1C1E]/50 text-xs leading-relaxed">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="text-center">
            <WhatsAppCTA label="Plan Your Divine Wedding" />
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── SECTION 2: My Vrindavan Seva ────────────────────────────────────────────
const sevaCards = [
  {
    image:"cow_seva/cow_geta.jpg",
    title: "Gau Seva",
    targetId: "gau-seva",
    desc: "Sacred cow protection and care — feed, shelter, and nurture the divine cows of Vrindavan.",
    color: "#D4AF37",
  },
  {
    image:"Divine_Services/andan_seva.jpeg",
    title: "Anna Dan Seva",
    targetId: "anna-dan-seva",
    desc: "Offer food to devotees and the needy. Feeding hungry souls is the highest act of devotion.",
    color: "#FF9933",
  },
  {
    image:"Divine_Services/vigrah_Seva (2).jpeg",
    title: "Vigrah Seva",
    targetId: "vigrah-seva",
    desc: "Participate in the service of sacred deities — offer flowers, garlands, and lamp offerings.",
    color: "#D4AF37",
  },
];

const sevaIcons = [
  { icon: "🛕", label: "Temple & Ashram Support" },
  { icon: "📖", label: "Scripture Distribution" },
  { icon: "🌱", label: "Plantation & Environment" },
  { icon: "🎵", label: "Festivals & Kirtan" },
  { icon: "🎓", label: "Education & Cultural" },
  { icon: "💧", label: "Water & Cleanliness" },
];

function SevaSection() {
  const scrollToSeva = (targetId: string) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0D0D0F 0%, #1C1C1E 50%, #2C1A00 100%)" }}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Dark hero banner */}
        <SectionReveal>
          <motion.div
            variants={fadeUp}
            className="rounded-3xl border border-[#D4AF37]/30 p-10 md:p-14 text-center mb-14 relative overflow-hidden"
            style={{ background: "rgba(28,28,30,0.7)", backdropFilter: "blur(20px)" }}
          >
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: "repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] text-xs tracking-widest uppercase mb-5"
              style={{ background: "rgba(212,175,55,0.08)" }}
              animate={{ boxShadow: ["0 0 10px rgba(212,175,55,0.1)", "0 0 25px rgba(212,175,55,0.3)", "0 0 10px rgba(212,175,55,0.1)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🪔 Special Seva Programme
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              Purshottam Maas —{" "}
              <span style={{
                background: "linear-gradient(135deg, #D4AF37, #FFB366)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                A Time to Give &amp; Receive Blessings
              </span>
            </h2>
            <p className="text-[#D4AF37]/80 text-xl font-semibold tracking-wide">
              17th May – 15th June 2026
            </p>
            <p className="mt-3 text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              The holiest month of the Hindu calendar — every act of charity is multiplied manifold. Participate in divine seva and receive eternal blessings.
            </p>
          </motion.div>

          {/* 3-column seva cards */}
       {/* 3-column seva cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
  {sevaCards.map((card, i) => (
    <motion.div
      key={card.title}
      variants={fadeUp}
      className="relative rounded-2xl overflow-hidden group min-h-[420px] flex flex-col justify-end"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        border: `1px solid rgba(212,175,55,0.2)`,
      }}
      whileHover={{
        y: -8,
        border: "1px solid rgba(212,175,55,0.6)",
        boxShadow: `0 0 40px rgba(212,175,55,0.2), 0 20px 60px rgba(0,0,0,0.5)`,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.92) 10%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)",
          }}
        />
      </div>

      {/* Top Glow Border */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 p-7 flex flex-col h-full justify-end">
        {/* Title */}
        <h3
          className="text-white text-3xl font-bold mb-4 leading-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-white/80 text-sm leading-relaxed mb-6">
          {card.desc}
        </p>

        {/* Optional Button */}
        <motion.button
          onClick={() => scrollToSeva(card.targetId)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl font-semibold text-sm text-[#1C1C1E] shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, #D4AF37 0%, #F5D56E 50%, #B8960C 100%)",
          }}
        >
          Offer Seva
        </motion.button>
      </div>

      {/* Bottom Gradient Line */}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-0.5 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
        }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  ))}
</div>

        </SectionReveal>
      </div>
    </section>
  );
}

// ─── SECTION 3: Sacred Gau Seva ──────────────────────────────────────────────
const gauPlans = [
  { title: "Feed 10 Cows", price: "Rs. 1,500/-", icon: "🐄", popular: false },
  { title: "Feed 20 Cows", price: "Rs. 3,000/-", icon: "🐄🐄", popular: false },
  { title: "Adopt 1 Cow for 1 Month", price: "Rs. 3,000/-", icon: "🌸", popular: true },
  { title: "Adopt 1 Cow for 3 Months", price: "Rs. 9,000/-", icon: "🌺", popular: false },
  { title: "Adopt 1 Calf/Cow for Lifetime", price: "Rs. 3,60,000/-", icon: "💛", popular: false },
  { title: "1 Day Maintenance of Goshala", price: "Rs. 51,000/-", icon: "🛕", popular: false },
];

const blessings = [
  { icon: "🧠", label: "Purifies Mind & Soul" },
  { icon: "☮️", label: "Brings Peace & Prosperity" },
  { icon: "🔥", label: "Destroys Sins & Negativity" },
  { icon: "💝", label: "Increases Compassion" },
  { icon: "🌟", label: "Leads to Spiritual Progress" },
];

function GauSevaSection() {
  return (
    <section id="gau-seva" className="py-20 lg:py-28 bg-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          {/* Quote */}
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="inline-block relative">
              <span className="text-[#D4AF37] text-7xl font-serif absolute -top-4 -left-4 opacity-30 leading-none">"</span>
              <blockquote className="text-xl md:text-2xl font-medium text-[#1C1C1E] italic leading-relaxed px-8 py-6 max-w-3xl mx-auto rounded-2xl border border-[#D4AF37]/20"
                style={{ background: "linear-gradient(135deg, #FFFDD0 0%, rgba(212,175,55,0.05) 100%)" }}>
                Charity of cow is sacred, purifying and supreme among all charities.
                <span className="block mt-2 text-base not-italic text-[#D4AF37] font-semibold">— Mahabharata</span>
              </blockquote>
              <span className="text-[#D4AF37] text-7xl font-serif absolute -bottom-8 -right-4 opacity-30 leading-none rotate-180">"</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="text-[#FF9933] tracking-widest uppercase text-xs font-semibold mb-3">Sacred Service</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
              Sacred <span className="text-[#D4AF37]">Gau Seva</span>
            </h2>
          </motion.div>

          {/* 6-card pricing grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {gauPlans.map((plan, i) => (
              <motion.div
                key={plan.title}
                variants={fadeUp}
                className={`relative rounded-2xl p-7 border transition-all duration-300 group overflow-hidden ${
                  plan.popular
                    ? "border-[#D4AF37] shadow-xl"
                    : "border-[#D4AF37]/20 hover:border-[#D4AF37]/60"
                }`}
                style={{
                  background: plan.popular
                    ? "linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)"
                    : "rgba(255,255,255,0.9)",
                }}
                whileHover={{
                  y: -6,
                  boxShadow: plan.popular
                    ? "0 0 40px rgba(212,175,55,0.35), 0 20px 50px rgba(0,0,0,0.2)"
                    : "0 0 30px rgba(212,175,55,0.15), 0 16px 40px rgba(0,0,0,0.08)",
                }}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#1C1C1E] tracking-wider"
                    style={{ background: "linear-gradient(135deg, #D4AF37, #F5D56E)" }}>
                    POPULAR
                  </div>
                )}
                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
                />
                <h3 className={`font-bold text-lg mb-3 leading-tight ${plan.popular ? "text-white" : "text-[#1C1C1E]"}`}
                  style={{ fontFamily: "Georgia, serif" }}>
                  {plan.title}
                </h3>
                <p className={`text-2xl font-bold ${plan.popular ? "text-[#D4AF37]" : "text-[#D4AF37]"}`}>
                  {plan.price}
                </p>
                <DonateButton
                  label="Donate Now"
                  seva={plan.title}
                  priceStr={plan.price}
                  popular={plan.popular}
                  className={`mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-[#D4AF37] text-[#1C1C1E] hover:bg-[#F5D56E]"
                      : "border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1C1C1E]"
                  }`}
                />
              </motion.div>
            ))}
          </div>

          {/* Blessings banner */}
          <motion.div
            variants={fadeUp}
            className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1C1C1E 0%, #2C1A00 100%)" }}
          >
            <div className="absolute inset-0 opacity-10"
              style={{ background: "radial-gradient(circle at 30% 50%, #D4AF37 0%, transparent 60%)" }} />
            <p className="text-center text-[#D4AF37]/70 text-xs tracking-widest uppercase mb-6 relative z-10">
              Fruits of Gau Seva
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
              {blessings.map((b, i) => (
                <motion.div
                  key={b.label}
                  className="flex flex-col items-center gap-2 text-center p-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <motion.span
                    className="text-3xl"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  >
                    {b.icon}
                  </motion.span>
                  <span className="text-white/70 text-xs leading-snug">{b.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── SECTION 4: Anna Dan Seva ────────────────────────────────────────────────
const annaPlans = [
  { devotees: "50 Devotees", price: "Rs. 3,000" },
  { devotees: "100 Devotees", price: "Rs. 6,000" },
  { devotees: "500 Devotees", price: "Rs. 30,000" },
  { devotees: "1,000 Devotees", price: "Rs. 60,000" },
  { devotees: "1,500 Devotees", price: "Rs. 90,000" },
  { devotees: "3,000 Devotees", price: "Rs. 1,80,000" },
];

function AnnaDanSection() {
  return (
    <section id="anna-dan-seva" className="py-20 lg:py-28 overflow-hidden scroll-mt-24" style={{ background: "linear-gradient(135deg, #FFFDD0 0%, #FFF5D6 50%, #FFFDD0 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <motion.div variants={fadeUp} className="text-center mb-4">
            <p className="text-[#FF9933] tracking-widest uppercase text-xs font-semibold mb-3">Sacred Offering</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
              Anna Dan <span className="text-[#D4AF37]">Seva</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-center text-[#1C1C1E]/60 text-lg mb-3">
            Food for Body, Soul &amp; Everyone
          </motion.p>
          <motion.div variants={fadeUp} className="flex justify-center gap-6 mb-12">
            {["🌅 Breakfast — 9 AM", "☀️ Lunch — 3 PM"].map((t) => (
              <span key={t} className="px-4 py-2 rounded-full text-sm font-medium text-[#D4AF37] border border-[#D4AF37]/30"
                style={{ background: "rgba(212,175,55,0.08)" }}>
                {t}
              </span>
            ))}
          </motion.div>

          {/* Donation grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {annaPlans.map((plan, i) => (
              <motion.div
                key={plan.devotees}
                variants={fadeUp}
                className="group relative rounded-2xl p-6 border border-[#D4AF37]/25 bg-white/80 backdrop-blur-sm hover:border-[#D4AF37] transition-all duration-300 overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(212,175,55,0.15)" }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
                />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#1C1C1E]/50 text-xs uppercase tracking-wider mb-1">Feed</p>
                    <h3 className="text-[#1C1C1E] font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>
                      {plan.devotees}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[#D4AF37]/60 text-xs uppercase tracking-wider mb-1">Donation</p>
                    <p className="text-[#D4AF37] font-bold text-xl">{plan.price}</p>
                  </div>
                </div>
                <motion.div
                  className="mt-4 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, #D4AF37, #FF9933, #D4AF37)" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                />
                <DonateButton
                  label="Donate Now"
                  seva={`Anna Dan Seva — ${plan.devotees}`}
                  priceStr={plan.price}
                  className="mt-4 w-full flex items-center justify-center py-2 rounded-xl text-sm font-semibold text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#1C1C1E] transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── SECTION 5: Vigrah Seva ───────────────────────────────────────────────────
const vigrahPlans = [
  { title: "Daily Flower Offering", price: "Rs. 501/-",    icon: "🌸", popular: false },
  { title: "Dhoop & Lamp Seva",     price: "Rs. 1,001/-",  icon: "🪔", popular: true  },
  { title: "Shringar Seva",         price: "Rs. 2,100/-",  icon: "👑", popular: false },
  { title: "Monthly Flower Seva",   price: "Rs. 5,100/-",  icon: "🌺", popular: false },
  { title: "Festival Special Seva", price: "Rs. 11,000/-", icon: "✨", popular: false },
  { title: "Annual Deity Seva",     price: "Rs. 51,000/-", icon: "🛕", popular: false },
];

const vigrahBlessings = [
  { icon: "🙏", label: "Divine Darshan" },
  { icon: "🌸", label: "Purifies Karma" },
  { icon: "💛", label: "Deity Blessings" },
  { icon: "🕊️", label: "Inner Peace" },
  { icon: "🌟", label: "Spiritual Merit" },
];

function VigrahSevaSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="vigrah-seva" ref={ref} className="py-20 lg:py-28 overflow-hidden scroll-mt-24"
      style={{ background: "linear-gradient(180deg, #FFFDD0 0%, #FFF8E0 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-xs tracking-widest uppercase mb-5"
              style={{ background: "rgba(212,175,55,0.06)" }}>
              🪔 Deity Service
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1C1C1E] leading-tight mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Vigrah{" "}
              <span style={{ background: "linear-gradient(135deg,#D4AF37,#FF9933)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Seva
              </span>
            </h2>
            <p className="text-[#1C1C1E]/55 max-w-xl mx-auto text-sm leading-relaxed">
              Participate in the sacred service of the divine deities — offer flowers, garlands, lamps and adorning services to receive eternal blessings.
            </p>
          </motion.div>

          {/* Pricing grid */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {vigrahPlans.map((plan, i) => (
              <motion.div
                key={plan.title}
                className={`relative rounded-2xl p-6 flex flex-col border transition-all duration-300 ${
                  plan.popular
                    ? "border-[#D4AF37]/60 shadow-lg"
                    : "border-[#D4AF37]/15"
                }`}
                style={{
                  background: plan.popular
                    ? "linear-gradient(135deg, #1C1C1E 0%, #2C1A00 100%)"
                    : "rgba(255,255,255,0.85)",
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(212,175,55,0.15)" }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold text-[#1C1C1E]"
                    style={{ background: "linear-gradient(135deg,#D4AF37,#F5D56E)" }}>
                    Most Requested
                  </span>
                )}
                <h3 className={`font-bold text-base mb-1 ${plan.popular ? "text-white" : "text-[#1C1C1E]"}`}
                  style={{ fontFamily: "Georgia, serif" }}>
                  {plan.title}
                </h3>
                <p className="text-2xl font-bold text-[#D4AF37] mb-1">{plan.price}</p>
                <DonateButton
                  label="Donate Now"
                  seva={`Vigrah Seva — ${plan.title}`}
                  priceStr={plan.price}
                  popular={plan.popular}
                  className={`mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-[#D4AF37] text-[#1C1C1E] hover:bg-[#F5D56E]"
                      : "border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1C1C1E]"
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Blessings row */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            {vigrahBlessings.map((b) => (
              <div key={b.label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 text-xs text-[#1C1C1E]/60"
                style={{ background: "rgba(212,175,55,0.05)" }}>
                <span>{b.icon}</span>{b.label}
              </div>
            ))}
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── FOOTER CTA ───────────────────────────────────────────────────────────────
function FooterCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1C1C1E 0%, #2C1A00 60%, #1C1C1E 100%)" }}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ background: "radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 60%)" }}
      />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.p
          className="text-[#D4AF37]/70 tracking-widest uppercase text-xs mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Connect With Us
        </motion.p>
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          style={{ fontFamily: "Georgia, serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Offer Your{" "}
          <span style={{
            background: "linear-gradient(135deg, #D4AF37, #FF9933, #D4AF37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Seva Today
          </span>
        </motion.h2>
        <motion.p
          className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Every act of seva in Vrindavan is multiplied a thousandfold. Connect with us on WhatsApp to book your seva and receive divine blessings.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <WhatsAppCTA label="Chat on WhatsApp — +91 95483 67253" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function DivineServices() {
  useSEO(SEO_DATA.divineServices);
  return (
    <Layout>
      <PageHero
        eyebrow="Vrindavan Special Tour"
        title="Divine"
        highlight="Services"
        description="Sacred weddings, spiritual seva, and devotional offerings in the holy land of Vrindavan."
      />

      <WeddingSection />
      <SevaSection />
      <GauSevaSection />
      <AnnaDanSection />
      <VigrahSevaSection />
      <FooterCTA />
    </Layout>
  );
}
