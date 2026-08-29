"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import { LazySnapshotCell } from "@/components/LazySnapshotCell";
import { WirePhoto } from "@/components/WirePhoto";
import { SNAPSHOT_LABELS, type SnapshotPhoto } from "@/lib/snapshots";

export function SnapshotsGrid({ photos }: { photos: SnapshotPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null || photos.length === 0) return current;
      return (current + photos.length - 1) % photos.length;
    });
  }, [photos.length]);
  const showNext = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null || photos.length === 0) return current;
      return (current + 1) % photos.length;
    });
  }, [photos.length]);

  if (photos.length === 0) {
    return (
      <div className="snapshots__grid">
        {SNAPSHOT_LABELS.map((label) => (
          <WirePhoto key={label} ratio="1/1" shape="bleed" compact label={label} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="snapshots__grid">
        {photos.map((photo, index) => (
          <LazySnapshotCell
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            onOpen={() => setOpenIndex(index)}
          />
        ))}
      </div>
      {openIndex !== null
        ? createPortal(
            <SnapshotSlideshow
              photos={photos}
              index={openIndex}
              onClose={close}
              onPrev={showPrev}
              onNext={showNext}
            />,
            document.body,
          )
        : null}
    </>
  );
}

function SnapshotSlideshow({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: SnapshotPhoto[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = photos[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const [fullReady, setFullReady] = useState(false);

  useEffect(() => {
    setFullReady(false);
  }, [index]);

  useEffect(() => {
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    const neighbors = [
      photos[(index + 1) % photos.length],
      photos[(index + photos.length - 1) % photos.length],
    ];
    neighbors.forEach((item) => {
      const preload = new window.Image();
      preload.src = item.fullSrc;
    });
  }, [index, photos]);

  function onTouchStart(event: TouchEvent) {
    touchX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: TouchEvent) {
    if (touchX.current === null) return;
    const dx = event.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (dx > 48) onPrev();
    if (dx < -48) onNext();
  }

  return (
    <div
      className="slideshow"
      role="dialog"
      aria-modal="true"
      aria-label="写真"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        className="slideshow__backdrop"
        onClick={onClose}
        aria-label="閉じる"
      />
      <div className="slideshow__stage">
        <img
          className={fullReady ? "slideshow__img" : "slideshow__img is-visible"}
          src={photo.src}
          alt=""
        />
        <img
          className={fullReady ? "slideshow__img is-visible" : "slideshow__img"}
          src={photo.fullSrc}
          alt={photo.alt}
          onLoad={() => setFullReady(true)}
        />
      </div>
      <p className="slideshow__count">
        {index + 1} / {photos.length}
      </p>
      <button
        ref={closeRef}
        type="button"
        className="slideshow__close"
        onClick={onClose}
      >
        閉じる
      </button>
      <button
        type="button"
        className="slideshow__nav slideshow__nav--prev"
        onClick={onPrev}
        aria-label="前の写真"
      >
        ‹
      </button>
      <button
        type="button"
        className="slideshow__nav slideshow__nav--next"
        onClick={onNext}
        aria-label="次の写真"
      >
        ›
      </button>
    </div>
  );
}
