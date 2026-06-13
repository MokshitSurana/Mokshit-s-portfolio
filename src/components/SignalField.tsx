"use client";

import { useEffect, useRef } from "react";

/**
 * Faint oscilloscope-style traces behind the hero — a quiet "signal vs noise"
 * motif for the evaluation theme. Cheap by design: a handful of sine paths,
 * throttled to ~30fps, paused when off-screen, and static under reduced motion.
 */
export default function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // baseline (fraction of height), amplitude, wavelength, speed, alpha, accent?
    const waves = [
      { y: 0.3, amp: 16, len: 320, spd: 0.5, a: 0.1, accent: false },
      { y: 0.42, amp: 26, len: 460, spd: -0.35, a: 0.07, accent: true },
      { y: 0.55, amp: 13, len: 240, spd: 0.8, a: 0.08, accent: false },
      { y: 0.67, amp: 30, len: 540, spd: -0.28, a: 0.13, accent: true },
      { y: 0.79, amp: 20, len: 380, spd: 0.45, a: 0.06, accent: false },
    ];

    let width = 0;
    let height = 0;
    let accent = "#c6f24e";
    let foreground = "#ededed";

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      accent = cs.getPropertyValue("--accent").trim() || accent;
      foreground = cs.getPropertyValue("--foreground").trim() || foreground;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      for (const w of waves) {
        const baseY = height * w.y;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const y =
            baseY + Math.sin((x / w.len) * Math.PI * 2 + t * w.spd) * w.amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = w.accent ? accent : foreground;
        ctx.globalAlpha = w.a;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    readColors();
    resize();

    let raf = 0;
    let visible = true;
    let lastDraw = 0;

    const loop = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      if (now - lastDraw >= 33) {
        draw(now / 1000);
        lastDraw = now;
      }
      raf = requestAnimationFrame(loop);
    };

    // Draw one frame immediately so it's never blank, then animate (unless reduced).
    draw(0);
    if (!reduce) raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf && !reduce) raf = requestAnimationFrame(loop);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onResize = () => {
      resize();
      draw(performance.now() / 1000);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Repaint with new colors when the theme toggles.
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw(performance.now() / 1000);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      style={{
        maskImage:
          "radial-gradient(135% 105% at 72% 42%, #000 0%, rgba(0,0,0,0.55) 45%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(135% 105% at 72% 42%, #000 0%, rgba(0,0,0,0.55) 45%, transparent 78%)",
      }}
    />
  );
}
