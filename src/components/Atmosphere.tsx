"use client";

import { useEffect, useRef } from "react";

/**
 * A soft accent glow that trails the cursor, plus a top scroll-progress bar.
 * Pure CSS transforms driven by rAF — cheap and respects reduced motion.
 */
export default function Atmosphere() {
  const glowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.3;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let running = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${p}%`;
    };

    const tick = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 300}px, ${
          y - 300
        }px, 0)`;
      }
      // Stop the loop once the glow has settled; onMove restarts it.
      if (Math.abs(targetX - x) < 0.5 && Math.abs(targetY - y) < 0.5) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    if (!reduce) {
      window.addEventListener("mousemove", onMove, { passive: true });
      // Position once on mount; the loop only runs while the cursor moves.
      tick();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-40 blur-[120px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, var(--glow) 0%, transparent 65%)",
        }}
      />
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
        <div
          ref={barRef}
          className="h-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: "0%" }}
        />
      </div>
    </>
  );
}
