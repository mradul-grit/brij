 import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useSEO, SEO_DATA } from "@/lib/seo";
import { PageHero, PageCTA, Container } from "@/components/ui/shared";
import { TESTIMONIAL_STATS } from "@/data/testimonials";

// ─── VIDEOS LIST ─────────────────────────────────────────────────────────────
const VIDEOS = [
  "/videos/tes1.mp4",
  "/videos/tes2.mp4",
  "/videos/tes3.mp4",
];

// ─── STAR (Rating Stars) ───────────────────────────────────────────────────────
function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

// ─── STATS BAR ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-10 border-y border-yellow-400/20 bg-yellow-50">
      <Container className="grid grid-cols-2 sm:grid-cols-4 text-center gap-4">
        {TESTIMONIAL_STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-2xl font-bold text-yellow-600">{s.value}</p>
            <p className="text-xs text-gray-600">{s.label}</p>
          </motion.div>
        ))}
      </Container>
    </section>
  );
}

// ─── VIDEO CARD (FIXED WITH AUDIO SUPPORT) ───────────────────────────────────
function VideoCard({ src, index }: { src: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl overflow-hidden border border-yellow-200 bg-white shadow-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* VIDEO FRAME */}
      <div className="relative w-full aspect-[9/16] bg-black">
        {/* 🔥 OPTIMIZED VIDEO ELEMENT FOR SOUND & STREAMING */}
        <video
          src={src}
          className="w-full h-full object-contain bg-black"
          controls
          playsInline
          preload="auto"
        />
      </div>

      {/* FOOTER */}
      <div className="p-3">
        <p className="font-semibold text-sm">Customer Video</p>
        <p className="text-xs text-gray-500">Testimonial Review</p>
      </div>
    </motion.div>
  );
}

// ─── VIDEO SECTION ───────────────────────────────────────────────────────────
function VideoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="py-14 bg-gradient-to-b from-white to-yellow-50"
    >
      <Container>
        <motion.h2
          className="text-center text-3xl font-bold mb-10 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Video Testimonials
        </motion.h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map((src, i) => (
            <VideoCard key={i} src={src} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── MAIN PAGE COMPONENT ──────────────────────────────────────────────────────
export default function Testimonials() {
  useSEO(SEO_DATA.testimonials);

  return (
    <Layout>
      <PageHero
        eyebrow="Heartfelt Words"
        title="Pilgrim"
        highlight="Testimonials"
        description="Real stories from devotees"
        glowPos="60% 80%"
      />

      <StatsBar />
      <VideoSection />

      <PageCTA
        title="Be Our Next Happy Pilgrim"
        description="Join thousands of devotees"
        buttonText="Plan My Trip"
      />
    </Layout>
  );
}