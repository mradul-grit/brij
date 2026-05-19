import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useSEO, SEO_DATA } from "@/lib/seo";
import { WHATSAPP_URL } from "@/data";
import { PageHero, PageCTA, SectionHeader, Container } from "@/components/ui/shared";

// ─── Alternating story block ──────────────────────────────────────────────────
// ─── StoryBlockProps ──────────────────────────────────────────────────────────
interface StoryBlockProps {
  eyebrow: string;
  heading: string;
  highlight?: string;
  body: string[];
  emoji: string;
  image: string;
  gradient: string;
  reverse?: boolean;
  index: number;
}
// ─── StoryBlock Component ─────────────────────────────────────────────────────
function StoryBlock({
  eyebrow,
  heading,
  highlight,
  body,
  emoji,
  image,
  gradient,
  reverse = false,
  index,
}: StoryBlockProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } gap-10 lg:gap-16 items-center`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Visual panel */}
      <div className="w-full lg:w-5/12 flex-shrink-0">
        <motion.div
          className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl"
          style={{ paddingBottom: "70%", background: gradient }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 32px 80px rgba(212,175,55,0.18)",
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={image}
              alt={heading}
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(212,175,55,1) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,1) 1px,transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Index number watermark */}
          <div
            className="absolute bottom-4 right-5 text-[#D4AF37]/10 font-bold text-8xl select-none"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </motion.div>
      </div>

      {/* Text */}
      <div className="w-full lg:w-7/12">
        <p className="text-[#FF9933] tracking-[0.25em] uppercase text-xs font-semibold mb-3">
          {eyebrow}
        </p>

        <h2
          className="text-3xl sm:text-4xl font-bold text-[#1C1C1E] leading-tight mb-5"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {heading}{" "}
          {highlight && (
            <span
              style={{
                background: "linear-gradient(135deg,#D4AF37,#FF9933)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {highlight}
            </span>
          )}
        </h2>

        <div className="space-y-4">
          {body.map((para, i) => (
            <motion.p
              key={i}
              className="text-[#1C1C1E]/65 leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Decorative divider */}
        <motion.div
          className="mt-6 h-0.5 w-20 rounded-full"
          style={{
            background: "linear-gradient(90deg,#D4AF37,#FF9933)",
          }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
}
// ─── Values grid ──────────────────────────────────────────────────────────────
const VALUES = [
 { 
  icon: "🙏",
  image: "/about/img1.jpeg",
  title: "Devotion First",
  desc: "Every journey we craft begins with a prayer. Spiritual authenticity is never compromised."
},
  { icon: "🤝", title: "Genuine Hospitality", desc: "We treat every pilgrim as a guest of God — with warmth, patience, and personal care." },
  { icon: "🛡️", title: "Trust & Safety", desc: "Verified drivers, safe vehicles, and transparent pricing. Your security is sacred to us." },
  { icon: "🌿", title: "Sustainable Travel", desc: "We honour the environment of Braj with eco-conscious practices at every step." },
  { icon: "📿", title: "Spiritual Knowledge", desc: "Our guides are born in Braj — they carry living knowledge passed through generations." },
  { icon: "💛", title: "Family Values", desc: "Founded by a family of devotees, we bring the same love and care to every group." },
];

function ValuesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <section ref={ref} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-[#FF9933] tracking-widest uppercase text-xs font-semibold mb-3">What We Stand For</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
            Our Core <span style={{ background: "linear-gradient(135deg,#D4AF37,#FF9933)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Values</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              className="group flex gap-4 p-6 rounded-2xl border border-[#D4AF37]/15 bg-[#FFFDD0]/40 hover:border-[#D4AF37]/50 transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(212,175,55,0.12)" }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 0%,rgba(212,175,55,0.06) 0%,transparent 70%)" }}
              />
              <span className="text-3xl flex-shrink-0 mt-0.5">{v.icon}</span>
              <div>
                <h3 className="font-bold text-[#1C1C1E] mb-1.5 group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "Georgia, serif" }}>{v.title}</h3>
                <p className="text-[#1C1C1E]/55 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Team / Founder ───────────────────────────────────────────────────────────
function FounderSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <section ref={ref} className="py-20 lg:py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#1C1C1E 0%,#2C1A00 60%,#1C1C1E 100%)" }}>
      <div className="absolute inset-0 opacity-10"
        style={{ background: "radial-gradient(circle at 40% 50%,#D4AF37 0%,transparent 60%)" }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Avatar */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-36 h-36 rounded-full border-4 border-[#D4AF37]/40 flex items-center justify-center text-6xl relative"
              style={{ background: "linear-gradient(135deg,rgba(212,175,55,0.15),rgba(255,153,51,0.08))" }}>
              🧘
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/20"
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-[#D4AF37]/30 text-6xl font-serif leading-none block -mb-2">"</span>
            <blockquote className="text-white/80 text-lg sm:text-xl italic leading-relaxed"
              style={{ fontFamily: "Georgia, serif" }}>
              Every soul that visits Vrindavan carries a piece of Krishna's flute melody back home with them. Our mission is simply to be the bridge between the pilgrim and that divine moment.
            </blockquote>
            <div className="mt-5 flex items-center gap-4">
              <div className="h-px w-12 bg-[#D4AF37]/30" />
              <div>
                {/* <p className="text-[#D4AF37] font-bold">Pandit Radheshyam Sharma</p>
                <p className="text-white/40 text-xs">Founder, Vrindavan Special Tour</p> */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Milestones ───────────────────────────────────────────────────────────────
const MILESTONES = [
  { year: "2010", title: "Founded in Vrindavan", desc: "Started with a single Innova and an unshakeable devotion to serve pilgrims." },
  { year: "2013", title: "5,000 Pilgrims Served", desc: "Word of mouth from satisfied devotees helped us grow rapidly across North India." },
  { year: "2016", title: "Braj Full Circuit", desc: "Expanded itineraries to cover all 84 Kos of the sacred Braj Mandal region." },
  { year: "2019", title: "Divine Services Launch", desc: "Introduced Gau Seva, Anna Dan, and destination wedding services to deepen our offerings." },
  { year: "2022", title: "25,000+ Pilgrims", desc: "Reached a milestone of 25,000 devotees served with a perfect 5-star reputation." },
  { year: "2025", title: "50,000+ Pilgrims", desc: "Today we're honoured to have guided over 50,000 souls on their divine Braj journey." },
];

function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <section ref={ref} className="py-20 lg:py-24" style={{ background: "linear-gradient(180deg,#FFFDD0 0%,#fff 100%)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-[#FF9933] tracking-widest uppercase text-xs font-semibold mb-3">Since 2010</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1C1E]" style={{ fontFamily: "Georgia, serif" }}>
            Our <span style={{ background: "linear-gradient(135deg,#D4AF37,#FF9933)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom,#D4AF37,rgba(212,175,55,0.1))", transform: "translateX(-50%)" }} />

          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} pl-14 sm:pl-0`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.55 }}
              >
                {/* Year pill — desktop centered */}
                <div className={`hidden sm:flex sm:w-1/2 ${i % 2 === 0 ? "justify-end pr-8" : "justify-start pl-8"}`}>
                  <div className="max-w-xs">
                    {i % 2 === 0 ? (
                      <div className="text-right">
                        <span className="text-2xl font-bold text-[#D4AF37]">{m.year}</span>
                        <h3 className="font-bold text-[#1C1C1E] mt-1" style={{ fontFamily: "Georgia, serif" }}>{m.title}</h3>
                        <p className="text-[#1C1C1E]/55 text-sm mt-1 leading-relaxed">{m.desc}</p>
                      </div>
                    ) : (
                      <div className="text-left">
                        <span className="text-2xl font-bold text-[#D4AF37]">{m.year}</span>
                        <h3 className="font-bold text-[#1C1C1E] mt-1" style={{ fontFamily: "Georgia, serif" }}>{m.title}</h3>
                        <p className="text-[#1C1C1E]/55 text-sm mt-1 leading-relaxed">{m.desc}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dot — desktop center */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#D4AF37] top-1.5 z-10"
                  style={{ background: "linear-gradient(135deg,#D4AF37,#FF9933)", boxShadow: "0 0 12px rgba(212,175,55,0.5)" }} />

                {/* Spacer other side desktop */}
                <div className="hidden sm:block sm:w-1/2" />

                {/* Mobile layout */}
                <div className="sm:hidden absolute left-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#D4AF37] top-1 z-10"
                  style={{ background: "linear-gradient(135deg,#D4AF37,#FF9933)", boxShadow: "0 0 10px rgba(212,175,55,0.4)" }} />
                <div className="sm:hidden">
                  <span className="text-xl font-bold text-[#D4AF37]">{m.year}</span>
                  <h3 className="font-bold text-[#1C1C1E] mt-0.5" style={{ fontFamily: "Georgia, serif" }}>{m.title}</h3>
                  <p className="text-[#1C1C1E]/55 text-sm mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const STORY_BLOCKS: StoryBlockProps[] = [
  {
    eyebrow: "Our Story",
    heading: "Born from",
    highlight: "Pure Devotion",
    image: "/about/img1.jpeg",
    body: [
      "Vrindavan Special Tour was founded in 2010..."
    ],
    emoji: "🛕",
    gradient: "linear-gradient(135deg,#0D0D0F 0%,#1a0a00 40%,#2d1500 100%)",
    index: 0,
  },
  {
    eyebrow: "Our Philosophy",
    heading: "Spiritual Tourism as",
    highlight: "Sacred Service",
    image: "/about/img2.jpeg",
    body: [
      "For us, spiritual tourism is not an industry..."
    ],
    emoji: "🪔",
    gradient: "linear-gradient(135deg,#050a18 0%,#0e1540 50%,#06081a 100%)",
    reverse: true,
    index: 1,
  },
  {
    eyebrow: "Our Promise",
    heading: "Hospitality Rooted in",
    highlight: "Braj Culture",
    image: "/about/img3.jpeg",
    body: [
      "The people of Braj are famous for their warmth..."
    ],
    emoji: "🌸",
    gradient: "linear-gradient(135deg,#0a1a05 0%,#153015 50%,#0d2010 100%)",
    index: 2,
  },
];

export default function About() {
  useSEO(SEO_DATA.about);
  return (
    <Layout>
      <PageHero
        eyebrow="Our Story"
        title="About"
        highlight="Us"
        description="14 years of devoted spiritual tourism — crafted with love for Vrindavan, Mathura & Braj"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          {[{ v: "2010", l: "Founded" }, { v: "50,000+", l: "Pilgrims Served" }, { v: "4.9 ★", l: "Google Rating" }, { v: "100%", l: "Devotion" }].map(s => (
            <div key={s.l} className="text-center">
              <p className="text-[#D4AF37] text-2xl font-bold">{s.v}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Story blocks */}
      <section className="py-20 lg:py-28" style={{ background: "linear-gradient(180deg,#FFFDD0 0%,#fff 60%,#FFFDD0 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {STORY_BLOCKS.map((block) => (
            <StoryBlock key={block.index} {...block} />
          ))}
        </div>
      </section>

      <ValuesSection />
      <FounderSection />
      <Timeline />

      <PageCTA
        title="Begin Your Divine Journey"
        description="Let's plan your perfect Vrindavan pilgrimage together — WhatsApp us and we'll get back in minutes."
        buttonText="Plan My Pilgrimage"
      />
    </Layout>
  );
}
