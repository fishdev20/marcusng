"use client";

import createGlobe, { type Globe } from "cobe";
import { useEffect, useRef, useState } from "react";

const HELSINKI: [number, number] = [60.1699, 24.9384];
const HELSINKI_PHI = -Math.PI / 2 - (HELSINKI[1] * Math.PI) / 180;
const GLOBE_THETA = 0.2;
const MARKER_ELEVATION = 0.01;

export function HeroGlobe({ location = "Helsinki, Finland" }: { location?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<Globe | null>(null);
  const [size, setSize] = useState(420);
  const helsinkiLatitude = (HELSINKI[0] * Math.PI) / 180;
  const markerTop =
    (size * (1 - (0.8 + MARKER_ELEVATION) * Math.sin(helsinkiLatitude - GLOBE_THETA))) / 2;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const nextSize = Math.min(1400, Math.max(500, container.clientWidth * 1.34));
      setSize(Math.round(nextSize));
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let paintFrame = 0;
    const setupFrame = requestAnimationFrame(() => {
      globeRef.current?.destroy();

      canvas.style.opacity = "0";
      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.8 : 2),
        width: size,
        height: size,
        phi: HELSINKI_PHI,
        theta: GLOBE_THETA,
        dark: 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 10,
        baseColor: [1, 1, 1],
        markerColor: [0.3, 0.45, 0.85],
        glowColor: [0.94, 0.93, 0.91],
        markerElevation: MARKER_ELEVATION,
        opacity: 0.7,
        markers: [{ id: "helsinki", location: HELSINKI, size: 0.035 }],
      });

      const startedAt = performance.now();
      const repaintTexture = () => {
        globeRef.current?.update({ phi: HELSINKI_PHI });
        if (performance.now() - startedAt < 1800) {
          paintFrame = requestAnimationFrame(repaintTexture);
        }
      };

      repaintTexture();
      requestAnimationFrame(() => {
        canvas.style.opacity = "1";
      });
    });

    return () => {
      cancelAnimationFrame(setupFrame);
      cancelAnimationFrame(paintFrame);
      globeRef.current?.destroy();
      globeRef.current = null;
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden"
      style={{ height: Math.round(size * 0.34) }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Globe showing ${location}`}
        className="pointer-events-none absolute left-1/2 top-0 block -translate-x-1/2 select-none rounded-full opacity-0 transition-opacity duration-[800ms]"
        style={{ width: size, height: size }}
      />

      <div
        className="pointer-events-none absolute left-1/2 z-10 whitespace-nowrap bg-primary px-1.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-primary-foreground"
        style={{ top: markerTop, transform: "translate(-50%, calc(-100% - 24px))" }}
      >
        {location}
        <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-px border-[5px] border-transparent border-t-primary" />
      </div>
    </div>
  );
}
