import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_URL } from "@/data";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="relative z-50 w-full"
          style={{ background: "linear-gradient(90deg, #1C1C1E 0%, #2C1A00 50%, #1C1C1E 100%)" }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
            {/* Pulsing dot */}
            <div className="flex items-center gap-2.5 flex-1 justify-center">
              <motion.span
                className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <p className="text-xs sm:text-sm text-white/90 text-center">
                <span className="text-[#D4AF37] font-semibold">🪔 Special Janmashtami Darshan Available</span>
                <span className="hidden sm:inline text-white/60"> — Limited slots. </span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 text-[#FF9933] hover:text-[#D4AF37] transition-colors font-medium ml-1"
                >
                  Book Now →
                </a>
              </p>
            </div>
            {/* Close */}
            <button
              onClick={() => setVisible(false)}
              aria-label="Close announcement"
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {/* Bottom shimmer line */}
          <motion.div
            className="absolute bottom-0 inset-x-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #D4AF37, #FF9933, #D4AF37, transparent)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
