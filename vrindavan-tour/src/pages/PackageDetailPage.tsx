import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { PackageDetailView } from "@/components/packages/PackageDetailView";
import { PACKAGES } from "@/data/packages";
import { PageHero } from "@/components/ui/shared";

export default function PackageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const pkg = PACKAGES.find((p) => p.id === id);

  if (!pkg) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <span className="text-6xl mb-4">🛕</span>
          <h1 className="text-2xl font-bold text-[#1C1C1E] mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Package Not Found
          </h1>
          <p className="text-[#1C1C1E]/50 mb-6">We couldn't find this tour package.</p>
          <Link href="/packages">
            <motion.span
              className="px-6 py-3 rounded-xl font-semibold text-[#1C1C1E] text-sm cursor-pointer"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F5D56E, #B8960C)" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View All Packages
            </motion.span>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        eyebrow={pkg.tag}
        title={pkg.title.split(" ").slice(0, -1).join(" ")}
        highlight={pkg.title.split(" ").slice(-1)[0]}
        description={pkg.subtitle}
        glowPos="60% 80%"
      >
        {/* Back link + stats row */}
        <div className="flex flex-col items-center gap-6">
          <Link href="/packages">
            <motion.span
              className="flex items-center gap-1.5 text-white/50 hover:text-[#D4AF37] text-sm transition-colors cursor-pointer"
              whileHover={{ x: -3 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back to all packages
            </motion.span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { value: pkg.duration, label: "Duration" },
              { value: pkg.pricing[0]?.price ?? "—", label: "Starting Price" },
              { value: `${pkg.itinerary.reduce((a, d) => a + d.sites.length, 0)}+`, label: "Sacred Sites" },
              { value: "4.9 ★", label: "Rating" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-[#D4AF37] text-2xl font-bold">{s.value}</p>
                <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      {/* Detail section */}
      <section className="py-14" style={{ background: "linear-gradient(180deg, #fff 0%, #FFFDD0 100%)" }}>
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
                {pkg.title}
              </h2>
            </div>
          </motion.div>

          <PackageDetailView pkg={pkg} />
        </div>
      </section>
    </Layout>
  );
}
