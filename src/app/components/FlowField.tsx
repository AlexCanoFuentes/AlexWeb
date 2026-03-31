"use client";

import { useEffect, useRef, useCallback } from "react";

// Simplex-like 2D noise (permutation-based)
const PERM = new Uint8Array(512);
const GRAD = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1],
];

(function initPerm() {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
})();

function noise2D(x: number, y: number): number {
  const xi = Math.floor(x) & 255;
  const yi = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);

  const g00 = GRAD[PERM[PERM[xi] + yi] & 7];
  const g10 = GRAD[PERM[PERM[xi + 1] + yi] & 7];
  const g01 = GRAD[PERM[PERM[xi] + yi + 1] & 7];
  const g11 = GRAD[PERM[PERM[xi + 1] + yi + 1] & 7];

  const n00 = g00[0] * xf + g00[1] * yf;
  const n10 = g10[0] * (xf - 1) + g10[1] * yf;
  const n01 = g01[0] * xf + g01[1] * (yf - 1);
  const n11 = g11[0] * (xf - 1) + g11[1] * (yf - 1);

  const nx0 = n00 + u * (n10 - n00);
  const nx1 = n01 + u * (n11 - n01);
  return nx0 + v * (nx1 - nx0);
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const NOISE_SCALE = 200;
const NOISE_SPEED = 0.003;
const PARTICLE_RADIUS = 1.2;
const TRAIL_LENGTH = 4;
const FADE_ALPHA = 0.1;
const MOUSE_RADIUS = 250;
const MOUSE_STRENGTH = 0.003;

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: 0,
    vy: 0,
    life: Math.random() * 200 + 100,
    maxLife: 300,
  };
}

export default function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  const handlePointer = useCallback((e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0]?.clientX ?? -1000 : e.clientX;
    const clientY = "touches" in e ? e.touches[0]?.clientY ?? -1000 : e.clientY;
    mouseRef.current = { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  const handlePointerLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.scale(dpr, dpr);

      const isMobile = w < 768;
      const count = isMobile
        ? Math.min(150, Math.floor((w * h) / 3000))
        : Math.min(400, Math.floor((w * h) / 3000));

      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(w, h)
      );
    }

    resize();

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mouse = mouseRef.current;
      timeRef.current += NOISE_SPEED;
      const t = timeRef.current;

      // Alpha fade for trail effect
      ctx!.fillStyle = `rgba(5, 5, 5, ${FADE_ALPHA})`;
      ctx!.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Noise-based angle
        const angle = noise2D(p.x / NOISE_SCALE, p.y / NOISE_SCALE + t) * Math.PI * 2;
        p.vx += Math.cos(angle) * 0.3;
        p.vy += Math.sin(angle) * 0.3;

        // Mouse influence
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        // Damping
        p.vx *= 0.92;
        p.vy *= 0.92;

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        // Respawn if dead or out of bounds
        if (p.life <= 0 || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) {
          const np = createParticle(w, h);
          particles[i] = np;
          continue;
        }

        // Alpha based on life
        const lifeRatio = p.life / p.maxLife;
        const alpha = Math.min(lifeRatio, 0.6);

        // Draw trail
        ctx!.beginPath();
        ctx!.moveTo(p.x - p.vx * TRAIL_LENGTH, p.y - p.vy * TRAIL_LENGTH);
        ctx!.lineTo(p.x, p.y);
        ctx!.strokeStyle = `rgba(0, 210, 130, ${alpha * 0.4})`;
        ctx!.lineWidth = 0.8;
        ctx!.stroke();

        // Draw particle
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 210, 130, ${alpha})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handlePointer);
    window.addEventListener("touchmove", handlePointer, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("touchend", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointer);
      window.removeEventListener("touchmove", handlePointer);
      window.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("touchend", handlePointerLeave);
    };
  }, [handlePointer, handlePointerLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
