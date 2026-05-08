"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
}

interface MasonryGalleryProps {
  items: LightboxItem[];
  /** Tailwind classes for the columns container. Default: 1/2/3/4 columns at sm/md/lg/xl */
  columnsClass?: string;
}

/**
 * CSS-columns based masonry. Reliable, no library, no overlap.
 * Click any image to open the lightbox with arrow navigation.
 */
export function MasonryGallery({
  items,
  columnsClass = "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
}: MasonryGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }

  function next() {
    setIndex((i) => (i + 1) % items.length);
  }

  // Keyboard nav while open
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <div className={`${columnsClass} gap-4 lg:gap-6 [column-fill:_balance]`}>
        {items.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            type="button"
            onClick={() => openAt(i)}
            className="card-image-outline group relative mb-4 block w-full break-inside-avoid overflow-hidden bg-muted lg:mb-6"
            aria-label={`Open ${item.caption ?? item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={800}
              height={1000}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="image-zoom h-auto w-full object-cover"
              quality={75}
            />
            {item.caption ? (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 text-left">
                <span className="font-display text-base font-semibold text-white md:text-lg">
                  {item.caption}
                </span>
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 md:top-6 md:right-6"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 md:left-6 md:h-14 md:w-14"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 md:right-6 md:h-14 md:w-14"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-full max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[index].src}
                alt={items[index].alt}
                width={1920}
                height={1280}
                sizes="100vw"
                className="max-h-[88svh] w-auto rounded-lg object-contain"
                quality={90}
                priority
              />
              {items[index].caption ? (
                <p className="mt-4 text-center font-display text-xl font-semibold text-white md:text-2xl">
                  {items[index].caption}
                </p>
              ) : null}
              <p className="mt-1 text-center font-mono text-xs uppercase tracking-[0.2em] text-white/55">
                {index + 1} of {items.length}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
