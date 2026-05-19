import { Link } from "wouter";
import { motion } from "framer-motion";
import { FOOTER_QUICK_LINKS, SOCIAL_LINKS, WHATSAPP_NUMBER } from "@/data";

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1E] border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Vrindavan Special Tour
            </h3>
            <p className="text-[#D4AF37]/50 text-xs tracking-widest uppercase mb-4">
              Divine Journeys Since 2010
            </p>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Your trusted spiritual travel partner for Vrindavan, Mathura, and Braj Mandal pilgrimages. 
              We craft soul-enriching journeys with premium comfort and devotion.
            </p>
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <motion.a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37]/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(212,175,55,0.1)" }}
                whileTap={{ scale: 0.95 }}
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </motion.a>
              {/* Instagram */}
              <motion.a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37]/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(212,175,55,0.1)" }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </motion.a>
              {/* Facebook */}
              <motion.a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37]/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(212,175,55,0.1)" }}
                whileTap={{ scale: 0.95 }}
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
              {/* YouTube */}
              <motion.a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37]/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(212,175,55,0.1)" }}
                whileTap={{ scale: 0.95 }}
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-white/50 hover:text-[#D4AF37] text-sm cursor-pointer transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition-colors" />
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase mb-5">
              Contact Us
            </h4>
            <div className="space-y-4 text-sm text-white/60">
              <div className="flex gap-3">
                <span className="text-[#D4AF37] mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z"/>
                  </svg>
                </span>
                <a href={`tel:+91${WHATSAPP_NUMBER}`} className="hover:text-[#D4AF37] transition-colors">
                  +91 {WHATSAPP_NUMBER}
                </a>
              </div>
              <div className="flex gap-3">
                <span className="text-[#D4AF37] mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <span>Vrindavan, Mathura,<br />Uttar Pradesh, India</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#D4AF37] mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <a href="mailto:info@vrindavanspecialtour.com" className="hover:text-[#D4AF37] transition-colors break-all">
                  info@vrindavanspecialtour.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center">
            &copy; {new Date().getFullYear()} Vrindavan Special Tour. All rights reserved.
          </p>
          <p className="text-[#D4AF37]/30 text-xs flex items-center gap-1">
            <span>Made with</span>
            <span className="text-[#FF9933]">♥</span>
            <span>in Vrindavan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
