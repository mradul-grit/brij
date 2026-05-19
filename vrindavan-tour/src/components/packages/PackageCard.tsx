 import { motion } from "framer-motion";
import { Link } from "wouter";
import { WHATSAPP_NUMBER } from "@/data";
import type { PackageData } from "@/data/packages";

interface PackageCardProps {
  pkg: PackageData;
  index?: number;
}

export default function PackageCard({
  pkg,
  index = 0,
}: PackageCardProps) {
  const waMsg = encodeURIComponent(
    `Hi! I'm interested in the ${pkg.title}. Please share more details.`
  );

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

  return (
    <motion.div
      className="group rounded-3xl overflow-hidden border border-[#D4AF37]/20 bg-white relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 32px 80px rgba(212,175,55,0.18), 0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* HERO IMAGE */}
      <div className="relative h-56 overflow-hidden">

        {/* REAL IMAGE */}
        <img
          src={pkg.image}
          alt={pkg.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* DARK OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55))",
          }}
        />

        {/* GLOW EFFECT */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 30% 60%, rgba(212,175,55,0.6) 0%, transparent 55%)",
          }}
        />

        {/* TEMPLE SVG */}
        <svg
          viewBox="0 0 400 180"
          className="absolute bottom-0 left-0 right-0 w-full opacity-[0.08]"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M0 180 L0 130 L30 130 L30 90 L45 70 L60 90 L60 130 L90 130 L90 100 L110 70 L130 50 L150 70 L170 100 L170 130 L200 130 L200 80 L220 55 L240 35 L260 55 L280 80 L280 130 L310 130 L310 100 L325 75 L340 55 L355 75 L370 100 L370 130 L400 130 L400 180 Z"
            fill="#D4AF37"
          />
        </svg>

        {/* CENTER EMOJI */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl opacity-[0.12] select-none">
            {pkg.heroEmoji}
          </span>
        </div>

        {/* TAG */}
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1 rounded-full text-[11px] font-bold text-[#1C1C1E] tracking-wide"
            style={{
              background: `linear-gradient(135deg, ${pkg.tagColor}, #F5D56E)`,
            }}
          >
            {pkg.tag}
          </span>
        </div>

        {/* DURATION */}
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full border border-white/20 text-white/80 text-xs"
          style={{
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          {pkg.duration}
        </div>

        {/* BOTTOM FADE */}
        <div
          className="absolute bottom-0 inset-x-0 h-24"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,1) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 pt-3">
        <h3
          className="text-xl font-bold text-[#1C1C1E] mb-1 group-hover:text-[#D4AF37] transition-colors duration-300"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {pkg.title}
        </h3>

        <p className="text-[#1C1C1E]/50 text-sm mb-5 leading-snug">
          {pkg.subtitle}
        </p>

        {/* SERVICES */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#D4AF37]/10">
          {pkg.includes.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-[#D4AF37]/20"
                style={{
                  background: "rgba(212,175,55,0.06)",
                }}
              >
                <span className="text-lg">{item.icon}</span>
              </div>

              <span className="text-[10px] text-[#1C1C1E]/45 leading-tight max-w-[52px]">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* HIGHLIGHTS */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {pkg.highlights.slice(0, 4).map((h) => (
            <span
              key={h}
              className="text-[11px] px-2.5 py-1 rounded-full text-[#D4AF37] border border-[#D4AF37]/25"
              style={{
                background: "rgba(212,175,55,0.06)",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* PRICING */}
        <div className="space-y-3 mb-5">
          {pkg.pricingGroups
            ? pkg.pricingGroups.map((group) => (
                <div key={group.groupLabel}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className="h-px flex-1"
                      style={{
                        background: "rgba(212,175,55,0.2)",
                      }}
                    />

                    <span
                      className="text-[10px] font-semibold tracking-widest uppercase whitespace-nowrap"
                      style={{
                        color: "rgba(212,175,55,0.65)",
                      }}
                    >
                      👥 {group.groupLabel}
                    </span>

                    <div
                      className="h-px flex-1"
                      style={{
                        background: "rgba(212,175,55,0.2)",
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    {group.options.map((p) => (
                      <div
                        key={p.label}
                        className="flex items-center justify-between px-3 py-2 rounded-xl border border-[#D4AF37]/15"
                        style={{
                          background: "rgba(212,175,55,0.04)",
                        }}
                      >
                        <span className="text-xs text-[#1C1C1E]/60">
                          {p.label}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {p.original && (
                            <span className="text-xs text-[#1C1C1E]/30 line-through">
                              {p.original}
                            </span>
                          )}

                          <span className="text-sm font-bold text-[#D4AF37]">
                            {p.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : pkg.pricing.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-[#D4AF37]/15"
                  style={{
                    background: "rgba(212,175,55,0.04)",
                  }}
                >
                  <span className="text-xs text-[#1C1C1E]/60">
                    {p.label}
                  </span>

                  <div className="flex items-center gap-2">
                    {p.original && (
                      <span className="text-xs text-[#1C1C1E]/30 line-through">
                        {p.original}
                      </span>
                    )}

                    <span className="text-base font-bold text-[#D4AF37]">
                      {p.price}
                    </span>
                  </div>
                </div>
              ))}
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-[#1C1C1E]"
            style={{
              background:
                "linear-gradient(135deg, #D4AF37 0%, #F5D56E 50%, #B8960C 100%)",
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 25px rgba(212,175,55,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Book on WhatsApp
          </motion.a>

          <Link href={`/packages/${pkg.id}`}>
            <motion.span
              className="flex items-center justify-center gap-1 px-5 py-3 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-medium cursor-pointer hover:bg-[#D4AF37]/8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Details
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}