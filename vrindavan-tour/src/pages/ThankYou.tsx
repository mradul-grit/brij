import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useSearch } from "wouter";
import Layout from "@/components/layout/Layout";
import { WHATSAPP_URL } from "@/data";

export default function ThankYou() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const seva = params.get("seva") ?? "Your Seva";
  const amount = params.get("amount") ?? "";
  const paymentId = params.get("pid") ?? "";
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Layout>
      <div
        className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1C1C1E 0%, #2C1A00 60%, #1C1C1E 100%)" }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.06, 0.15, 0.06] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ background: "radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 60%)" }}
        />

        <div className="relative z-10 max-w-xl w-full text-center">
          {/* Animated checkmark circle */}
          <motion.div
            className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center border-2 border-[#D4AF37]/60 relative"
            style={{ background: "rgba(212,175,55,0.1)", backdropFilter: "blur(8px)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            >
              <motion.polyline points="20 6 9 17 4 12" />
            </motion.svg>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-[#D4AF37]/70 text-xs tracking-widest uppercase mb-3">🙏 Hari Om</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              Thank You for Your{" "}
              <span style={{
                background: "linear-gradient(135deg, #D4AF37, #FF9933)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Divine Seva
              </span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed max-w-md mx-auto">
              Your contribution towards <strong className="text-[#D4AF37]">{seva}</strong> has been received successfully.
              May Radha Krishna bless you and your family with love, peace, and prosperity.
            </p>
          </motion.div>

          {/* Payment details card */}
          <motion.div
            className="mt-8 rounded-2xl border border-[#D4AF37]/25 p-6 text-left space-y-3"
            style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="h-0.5 rounded-full mb-4" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
            {[
              { label: "Seva", value: seva },
              ...(amount ? [{ label: "Amount", value: amount }] : []),
              ...(paymentId ? [{ label: "Payment ID", value: paymentId }] : []),
              { label: "Status", value: "✅ Payment Successful" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-white/40 uppercase tracking-wider text-xs">{item.label}</span>
                <span className="text-white/80 font-medium">{item.value}</span>
              </div>
            ))}
          </motion.div>

          {/* Spiritual quote */}
          <motion.blockquote
            className="mt-8 italic text-white/40 text-sm leading-relaxed"
            style={{ fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            "Offering to Govinda is a thousand times more meritorious than any other act of charity."
            <span className="block mt-1 not-italic text-[#D4AF37]/50 text-xs">— Skanda Purana</span>
          </motion.blockquote>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Link href="/">
              <motion.span
                className="px-7 py-3 rounded-full font-semibold text-[#1C1C1E] text-sm cursor-pointer inline-block"
                style={{ background: "linear-gradient(135deg, #D4AF37 0%, #F5D56E 50%, #B8960C 100%)" }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.45)" }}
                whileTap={{ scale: 0.97 }}
              >
                Return Home
              </motion.span>
            </Link>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full font-semibold text-[#D4AF37] text-sm border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all duration-300"
              style={{ background: "rgba(212,175,55,0.06)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Us on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
