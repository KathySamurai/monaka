"use client";

import { useEffect, useRef, useState } from "react";

export function LazySnapshotCell({
  src,
  alt,
  onOpen,
}: {
  src: string;
  alt: string;
  onOpen?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(src);
          io.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0.01 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <button
      ref={ref}
      type="button"
      className="snapshots__cell"
      onClick={onOpen}
      aria-label={`${alt}を大きく見る`}
    >
      {activeSrc ? (
        <img
          className={loaded ? "snapshots__img is-loaded" : "snapshots__img"}
          src={activeSrc}
          alt=""
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setLoaded(true)}
        />
      ) : null}
    </button>
  );
}
