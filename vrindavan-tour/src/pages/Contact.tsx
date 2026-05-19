import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useSEO, SEO_DATA } from "@/lib/seo";
import { WHATSAPP_NUMBER, WHATSAPP_URL, SOCIAL_LINKS } from "@/data";
import { PageHero, SectionHeader, Container } from "@/components/ui/shared";

// ─── Input component ──────────────────────────────────────────────────────────
function Field({
  label, type = "text", name, value, onChange, placeholder, required = false,
  textarea = false, rows = 4,
}: {
  label: string; type?: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string; required?: boolean; textarea?: boolean; rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#1C1C1E]/70 text-sm font-medium" htmlFor={name}>
        {label}
        {required && <span className="text-[#D4AF37] ml-0.5">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/20 bg-white/70 text-[#1C1C1E] text-sm placeholder-[#1C1C1E]/30 resize-none transition-all duration-200 outline-none focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/10"
          style={{ background: "rgba(255,253,208,0.3)" }}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/20 bg-white/70 text-[#1C1C1E] text-sm placeholder-[#1C1C1E]/30 transition-all duration-200 outline-none focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/10"
          style={{ background: "rgba(255,253,208,0.3)" }}
        />
      )}
    </div>
  );
}

// ─── Contact Info Card ────────────────────────────────────────────────────────
function ContactCard({ icon, title, value, href, delay }: {
  icon: React.ReactNode; title: string; value: string; href?: string; delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const content = (
    <div className="flex gap-4 items-start">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#D4AF37]/25"
        style={{ background: "rgba(212,175,55,0.1)" }}>
        {icon}
      </div>
      <div>
        <p className="text-[#1C1C1E]/45 text-xs uppercase tracking-wider mb-0.5">{title}</p>
        <p className="text-[#1C1C1E] font-medium text-sm leading-snug">{value}</p>
      </div>
    </div>
  );
  return (
    <motion.div
      ref={ref}
      className="p-4 rounded-2xl border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-all duration-300 group"
      style={{ background: "rgba(212,175,55,0.03)" }}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(212,175,55,0.1)" }}
    >
      {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{content}</a> : content}
    </motion.div>
  );
}

// ─── Inquiry Form ─────────────────────────────────────────────────────────────
type FormState = { name: string; phone: string; dates: string; package: string; message: string };

function InquiryForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [form, setForm] = useState<FormState>({ name: "", phone: "", dates: "", package: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `🙏 *New Enquiry from Website*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Travel Dates:* ${form.dates}\n*Package Interest:* ${form.package || "Not specified"}\n*Message:* ${form.message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <motion.div
      ref={ref}
      className="rounded-3xl border border-[#D4AF37]/20 overflow-hidden shadow-2xl"
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      {/* Gold top bar */}
      <div className="h-1.5" style={{ background: "linear-gradient(90deg,#D4AF37,#FF9933,#D4AF37)" }} />
      <div className="p-7 sm:p-8" style={{ background: "rgba(255,253,208,0.15)", backdropFilter: "blur(8px)" }}>
        <div className="mb-6">
          <p className="text-[#FF9933] tracking-widest uppercase text-xs font-semibold mb-1.5">Start Planning</p>
          <h3 className="text-2xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
            Send an <span style={{ background: "linear-gradient(135deg,#D4AF37,#FF9933)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Enquiry</span>
          </h3>
          <p className="text-[#1C1C1E]/50 text-sm mt-1">We'll reply on WhatsApp within minutes.</p>
        </div>

        {submitted ? (
          <motion.div
            className="rounded-2xl border border-[#48C774]/30 p-6 text-center"
            style={{ background: "rgba(72,199,116,0.07)" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-4xl block mb-3">🙏</span>
            <p className="text-[#1C1C1E] font-bold text-lg mb-1">Sent via WhatsApp!</p>
            <p className="text-[#1C1C1E]/55 text-sm">We'll reply within minutes. Jai Shri Krishna!</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" value={form.name} onChange={handle} placeholder="e.g. Ramesh Sharma" required />
              <Field label="Phone / WhatsApp" type="tel" name="phone" value={form.phone} onChange={handle} placeholder="+91 98765 43210" required />
            </div>

            <Field label="Travel Dates" type="text" name="dates" value={form.dates} onChange={handle} placeholder="e.g. 20 June – 24 June 2026" />

            {/* Package dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#1C1C1E]/70 text-sm font-medium">Package Interest</label>
              <select
                name="package"
                value={form.package}
                onChange={handle}
                className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/20 text-[#1C1C1E] text-sm transition-all duration-200 outline-none focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/10 appearance-none cursor-pointer"
                style={{ background: "rgba(255,253,208,0.3)" }}
              >
                <option value="">Select a service...</option>
                <option>4-Day Braj Darshan Package</option>
                <option>Taxi Service</option>
                <option>Gau Seva / Anna Dan</option>
                <option>Destination Wedding</option>
                <option>Custom Package</option>
              </select>
            </div>

            <Field label="Message" name="message" value={form.message} onChange={handle}
              placeholder="Tell us about your group size, any special requirements, accommodation preferences..." textarea rows={4} />

            <motion.button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-[#1C1C1E] text-sm"
              style={{ background: "linear-gradient(135deg,#D4AF37 0%,#F5D56E 50%,#B8960C 100%)", boxShadow: "0 0 20px rgba(212,175,55,0.25)" }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 35px rgba(212,175,55,0.45)" }}
              whileTap={{ scale: 0.98 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Send via WhatsApp
            </motion.button>

            <p className="text-center text-[#1C1C1E]/30 text-xs">
              Your enquiry will open WhatsApp with a pre-filled message.
            </p>
          </form>
        )}
      </div>
    </motion.div>
  );
}

// ─── Left contact panel ───────────────────────────────────────────────────────
function ContactInfo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="flex flex-col gap-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="text-[#FF9933] tracking-widest uppercase text-xs font-semibold mb-3">Reach Us</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1C1E] mb-3" style={{ fontFamily: "Georgia, serif" }}>
          Get in <span style={{ background: "linear-gradient(135deg,#D4AF37,#FF9933)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Touch</span>
        </h2>
        <p className="text-[#1C1C1E]/55 leading-relaxed">
          We're available on WhatsApp, phone, and email — always ready to help you plan your perfect Vrindavan pilgrimage.
        </p>
      </motion.div>

      {/* Contact cards */}
      <div className="space-y-3">
        <ContactCard
          delay={0.1}
          title="WhatsApp / Phone"
          value={`+91 ${WHATSAPP_NUMBER}`}
          href={WHATSAPP_URL}
          icon={<svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>}
        />
        <ContactCard
          delay={0.15}
          title="Email Address"
          value="info@vrindavanspecialtour.com"
          href="mailto:info@vrindavanspecialtour.com"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" className="w-5 h-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
        />
        <ContactCard
          delay={0.2}
          title="Office Address"
          value="Vrindavan, Mathura District, Uttar Pradesh — 281121"
          href="https://maps.google.com/?q=Vrindavan,Mathura,UttarPradesh"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>}
        />
        <ContactCard
          delay={0.25}
          title="Working Hours"
          value="Monday – Sunday: 6 AM – 10 PM IST"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
        />
      </div>

      {/* Social */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35, duration: 0.5 }}>
        <p className="text-[#1C1C1E]/45 text-xs uppercase tracking-wider mb-3">Follow Us</p>
        <div className="flex items-center gap-2.5">
          {[
            { href: SOCIAL_LINKS.whatsapp, label: "WhatsApp", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg> },
            { href: SOCIAL_LINKS.instagram, label: "Instagram", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg> },
            { href: SOCIAL_LINKS.facebook, label: "Facebook", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
            { href: SOCIAL_LINKS.youtube, label: "YouTube", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-[#D4AF37]/25 text-[#D4AF37]/60 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
              style={{ background: "rgba(212,175,55,0.06)" }}
              whileHover={{ scale: 1.1, background: "rgba(212,175,55,0.12)" }}
              whileTap={{ scale: 0.95 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Google Maps iframe */}
      <motion.div
        className="rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <iframe
          title="Vrindavan location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56891.77767744374!2d77.62432384179688!3d27.578879400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736c7afb4d6efd%3A0xdf3da26e8ae3c1a8!2sVrindavan%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="220"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "How do I book a tour?", a: "Simply WhatsApp us at +91 9548367253 with your travel dates, group size, and preferred package. We'll confirm availability and share the full itinerary within minutes." },
  { q: "Is accommodation included in the packages?", a: "Yes, our packages include hotel accommodation. We can arrange budget, standard, or premium hotels based on your preference and budget." },
  { q: "Do you arrange transport from Delhi?", a: "Yes. We offer pickup from Delhi, Delhi Airport, Agra, and all major nearby cities. Delhi pickup adds ₹2,700 to the base package price." },
  { q: "Can you arrange a custom itinerary?", a: "Absolutely. We specialise in custom itineraries for families, groups, seniors, and solo pilgrims. Just tell us your requirements and we'll design the perfect trip." },
  { q: "What is your cancellation policy?", a: "Cancellations made 7+ days before travel receive a full refund. Within 7 days, 50% is retained. Same-day cancellations are non-refundable. We recommend travel insurance." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <section ref={ref} className="py-16 lg:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-[#FF9933] tracking-widest uppercase text-xs font-semibold mb-2">Common Questions</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
            Frequently Asked{" "}
            <span style={{ background: "linear-gradient(135deg,#D4AF37,#FF9933)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Questions
            </span>
          </h2>
        </motion.div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-[#D4AF37]/15 overflow-hidden"
              style={{ background: "rgba(212,175,55,0.03)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`font-semibold text-sm transition-colors ${open === i ? "text-[#D4AF37]" : "text-[#1C1C1E]"}`}>{faq.q}</span>
                <motion.div
                  className="w-6 h-6 rounded-full border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0"
                  style={{ background: open === i ? "rgba(212,175,55,0.12)" : "transparent" }}
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" className="w-3 h-3">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </motion.div>
              </button>
              {open === i && (
                <motion.div
                  className="px-5 pb-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[#1C1C1E]/60 text-sm leading-relaxed border-t border-[#D4AF37]/10 pt-3">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  useSEO(SEO_DATA.contact);
  return (
    <Layout>
      <PageHero
        eyebrow="We're Here for You"
        title="Contact"
        highlight="Us"
        description="Plan your divine journey — we reply within minutes on WhatsApp"
        glowPos="30% 80%"
      />

      {/* Two-column contact grid */}
      <section className="py-14 lg:py-20" style={{ background: "linear-gradient(180deg,#FFFDD0 0%,#fff 50%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <ContactInfo />
            <InquiryForm />
          </div>
        </div>
      </section>

      <FAQSection />
    </Layout>
  );
}
