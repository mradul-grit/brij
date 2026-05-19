 import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { useSEO, SEO_DATA } from "@/lib/seo";
import { PageHero, Container } from "@/components/ui/shared";

interface GalleryPhoto {
  title: string;
  src: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  { title: "Banke Bihari Mandir", src: "/gallery/newgal/Banke_Bihari.jpeg" },
  { title: "Gopiswar Mahadev", src: "/gallery/newgal/Gopiswar_mahadev.jpeg" },
  { title: "Goverdhan Parikrama", src: "/gallery/newgal/Goverdhan_Parikrama.jpeg" },
  { title: "Iskcon Temple", src: "/gallery/newgal/Iskcon_temple.jpeg" },
  { title: "Krishna Janmabhoomi", src: "/gallery/newgal/Krishana_janmbhoomi.jpeg" },
  { title: "Mansarovar", src: "/gallery/newgal/Mansarovar.jpeg" },
  { title: "Nidhivan", src: "/gallery/newgal/Nidhivan.jpeg" },
  { title: "Prem Mandir", src: "/gallery/newgal/Prem_mandir.jpeg" },
  { title: "Radha Damodar Temple", src: "/gallery/newgal/Radha_damodar_temple.jpeg" },
  { title: "Radha Kund", src: "/gallery/newgal/Radha_kund.jpeg" },
  { title: "Radha Madan Mohan", src: "/gallery/newgal/radha_madan_mohan_temple.jpeg" },

  // IMPORTANT → yaha "/" missing tha
  { title: "Raman Reti", src: "/gallery/newgal/Raman_reti.jpeg" },

  // IMPORTANT → ye galat image thi
  { title: "Seva Kunj", src: "/gallery/newgal/Seva_kunj.jpeg" },

  { title: "Shri Ji Mandir", src: "/gallery/newgal/Shri_ji_mandir_barsana.jpeg" },

  // IMPORTANT → yaha "/" missing tha
  { title: "Vishram Ghat Mathura", src: "/gallery/newgal/Vishram_ghat_mathura.jpeg" },

  { title: "Anna Dan Seva", src: "/gallery/anna_dan_seva.jpeg" },
  { title: "Aarti", src: "/gallery/arti.jpg" },
  { title: "Goverdhan", src: "/gallery/goverdhan.jpg" },
  { title: "Katha", src: "/gallery/katha.jpeg" },
  { title: "Akroor Ghat", src: "/gallery/newgal/Akroor_ghat.jpeg" },
];

export default function Gallery() {
  useSEO(SEO_DATA.gallery);

  // IMPORTANT → ye missing tha
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // IMPORTANT → ye missing tha
  const activePhoto =
    activeIndex === null ? null : GALLERY_PHOTOS[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) return 0;
      return current === 0
        ? GALLERY_PHOTOS.length - 1
        : current - 1;
    });
  };

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) return 0;
      return current === GALLERY_PHOTOS.length - 1
        ? 0
        : current + 1;
    });
  };

  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <Layout>
      <PageHero
        eyebrow="Sacred Moments"
        title="Divine"
        highlight="Gallery"
        description="Explore the beauty of Braj through timeless moments and sacred places."
        glowPos="40% 80%"
      />

      <section className="py-14 lg:py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1C1C1E]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Explore Vrindavan
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_PHOTOS.map((photo, index) => (
              <motion.button
                key={photo.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="text-left rounded-2xl overflow-hidden bg-white shadow-[0_10px_32px_rgba(0,0,0,0.08)] border border-[#D4AF37]/15 group"
                whileHover={{
                  y: -5,
                  boxShadow: "0 18px 48px rgba(212,175,55,0.14)",
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3
                    className="text-lg font-bold text-[#1C1C1E]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {photo.title}
                  </h3>
                </div>
              </motion.button>
            ))}
          </div>
        </Container>
      </section>

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <div className="p-5 flex items-center justify-between text-white">
              <div>
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {activePhoto.title}
                </h3>

                <p className="text-white/50 text-xs mt-1">
                  {(activeIndex ?? 0) + 1} / {GALLERY_PHOTOS.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                X
              </button>
            </div>

            <div
              className="relative flex-1 flex items-center justify-center px-4 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-4 sm:left-8 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/15 hover:border-[#D4AF37] text-white flex items-center justify-center text-2xl transition-colors"
              >
                ‹
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activePhoto.src}
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-4 sm:right-8 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/15 hover:border-[#D4AF37] text-white flex items-center justify-center text-2xl transition-colors"
              >
                ›
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}