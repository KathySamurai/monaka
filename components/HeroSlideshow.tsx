"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { HERO_SLIDES } from "@/lib/hero";

const INTERVAL_MS = 7000;
const FADE_MS = 1400;
const ZOOM_MS = 10500;
const ZOOM_TO = 1.1;

function originFor(index: number) {
  return HERO_SLIDES[index]?.src.includes("IMG_5937")
    ? { x: 0, y: 0.4 }
    : { x: 0.5, y: 0.42 };
}

function coverSource(
  imageWidth: number,
  imageHeight: number,
  canvasWidth: number,
  canvasHeight: number,
  originX: number,
  originY: number,
  zoom: number,
) {
  const scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
  const visibleWidth = canvasWidth / scale / zoom;
  const visibleHeight = canvasHeight / scale / zoom;

  return {
    x: Math.max(0, Math.min((imageWidth - visibleWidth) * originX, imageWidth - visibleWidth)),
    y: Math.max(0, Math.min((imageHeight - visibleHeight) * originY, imageHeight - visibleHeight)),
    w: visibleWidth,
    h: visibleHeight,
  };
}

function drawSlide(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  index: number,
  zoom: number,
  alpha: number,
) {
  if (!image.naturalWidth || alpha <= 0) return;

  const origin = originFor(index);
  const source = coverSource(
    image.naturalWidth,
    image.naturalHeight,
    width,
    height,
    origin.x,
    origin.y,
    zoom,
  );

  context.save();
  context.globalAlpha = alpha;
  context.drawImage(
    image,
    source.x,
    source.y,
    source.w,
    source.h,
    0,
    0,
    width,
    height,
  );
  context.restore();
}

export function HeroSlideshow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const images = HERO_SLIDES.map((slide) => {
      const image = new Image();
      image.src = asset(slide.src);
      return image;
    });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let stopped = false;
    let current = 0;
    let previous = 0;
    let slideStarted = 0;
    let fadeStarted = 0;
    let previousZoom = 1;

    const size = () => {
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      return { width, height, dpr };
    };

    const paint = (now: number) => {
      const { width, height, dpr } = size();
      if (width === 0 || height === 0) return;

      const pixelWidth = Math.round(width * dpr);
      const pixelHeight = Math.round(height * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      const context = canvas.getContext("2d");
      if (!context) return;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.clearRect(0, 0, width, height);

      if (!slideStarted) slideStarted = now;

      const elapsed = now - slideStarted;
      if (!reducedMotion && elapsed >= INTERVAL_MS && images[(current + 1) % images.length]?.naturalWidth) {
        previous = current;
        previousZoom = reducedMotion
          ? 1
          : 1 + (ZOOM_TO - 1) * Math.min(1, elapsed / ZOOM_MS);
        current = (current + 1) % images.length;
        slideStarted = now;
        fadeStarted = now;
        setActive(current);
      }

      const zoom = reducedMotion
        ? 1
        : 1 + (ZOOM_TO - 1) * Math.min(1, (now - slideStarted) / ZOOM_MS);
      const fade = reducedMotion
        ? 1
        : Math.min(1, fadeStarted ? (now - fadeStarted) / FADE_MS : 1);

      if (fade < 1) {
        drawSlide(context, images[previous], width, height, previous, previousZoom, 1);
      }
      drawSlide(context, images[current], width, height, current, zoom, fade);
    };

    const tick = (now: number) => {
      if (stopped) return;
      paint(now);
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (stopped || frame) return;
      slideStarted = 0;
      fadeStarted = 0;
      frame = window.requestAnimationFrame(tick);
    };

    const onReady = () => {
      if (images[0]?.naturalWidth) start();
    };

    images.forEach((image) => {
      if (image.complete && image.naturalWidth) onReady();
      else image.addEventListener("load", onReady);
    });

    const observer = new ResizeObserver(() => {
      if (frame) paint(performance.now());
    });
    observer.observe(wrap);

    return () => {
      stopped = true;
      window.cancelAnimationFrame(frame);
      images.forEach((image) => image.removeEventListener("load", onReady));
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero__media">
      <canvas
        ref={canvasRef}
        className="hero__canvas"
        role="img"
        aria-label={HERO_SLIDES[active].alt}
      />
    </div>
  );
}
