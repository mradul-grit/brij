import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (href: string) => location === href;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#1C1C1E]/95 backdrop-blur-xl shadow-2xl border-b border-[#D4AF37]/20"
            : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex flex-col cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
                  <span className="text-[#D4AF37]">Vrindavan</span>
                  <span className={scrolled ? "text-white" : "text-white"}>
                    {" "}Special Tour
                  </span>
                </span>
                <span className="text-xs text-[#D4AF37]/70 tracking-widest uppercase">
                  Divine Journeys Since 2010
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    className={`relative px-3 py-2 text-sm font-medium cursor-pointer transition-colors duration-200 rounded-md ${
                      isActive(link.href)
                        ? "text-[#D4AF37]"
                        : scrolled
                        ? "text-white/80 hover:text-[#D4AF37]"
                        : "text-white/90 hover:text-[#D4AF37]"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.span
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D4AF37] rounded-full"
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-0.5 bg-[#D4AF37] rounded-full block"
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-[#D4AF37] rounded-full block"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-[#D4AF37] rounded-full block"
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute top-16 left-0 right-0 bg-[#1C1C1E]/98 backdrop-blur-2xl border-b border-[#D4AF37]/20 shadow-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link href={link.href}>
                      <span
                        className={`block px-4 py-3 rounded-lg text-base font-medium cursor-pointer transition-colors ${
                          isActive(link.href)
                            ? "bg-[#D4AF37]/15 text-[#D4AF37]"
                            : "text-white/80 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
