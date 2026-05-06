"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  photos: { id: string; url: string; caption?: string }[];
  themeConfig: Record<string, string>;
}

export function GallerySection({ photos, themeConfig }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));
  const goPrev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));

  return (
    <section id="gallery" className="invitation-section" style={{ backgroundColor: themeConfig.backgroundColor }}>
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title" style={{ color: themeConfig.textColor }}>Galeri Foto</h2>
        <p className="section-subtitle" style={{ color: themeConfig.primaryColor }}>Our Moments</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(index)}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={photo.url}
                alt={photo.caption || `Foto ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/80 hover:text-white z-10">
              <X className="h-8 w-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 text-white/80 hover:text-white z-10">
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 text-white/80 hover:text-white z-10">
              <ChevronRight className="h-8 w-8" />
            </button>
            <div className="relative max-w-4xl max-h-[80vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={photos[lightboxIndex].url}
                alt={photos[lightboxIndex].caption || ""}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
