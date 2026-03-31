"use client";

import FlowField from "./FlowField";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <FlowField />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Label */}
        <span
          className="font-mono text-[11px] tracking-[4px] uppercase text-accent mb-6"
        >
          CTO &middot; AI ORCHESTRATOR &middot; BUILDER
        </span>

        {/* Name */}
        <h1
          className="font-display font-light text-text-primary"
          style={{ fontSize: "clamp(36px, 8vw, 80px)" }}
        >
          Alex Cano
        </h1>

        {/* Tagline */}
        <p className="font-display font-light text-[clamp(14px,2.5vw,20px)] text-text-secondary mt-4">
          Construyo productos con IA.
        </p>
        <p className="font-display font-light text-[clamp(14px,2.5vw,20px)] text-accent mt-1">
          La IA ejecuta. Yo dirijo.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 mt-10">
          <a
            href="#portfolio"
            className="border border-border px-6 py-3 font-mono text-[11px] tracking-[3px] uppercase text-text-primary transition-all duration-300 hover:border-border-hover hover:text-accent"
          >
            Ver Portfolio
          </a>
          <a
            href="#contacto"
            className="border border-accent px-6 py-3 font-mono text-[11px] tracking-[3px] uppercase text-accent transition-all duration-300 hover:bg-accent-dim"
          >
            Contacto
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[3px] uppercase text-text-muted">
          Scroll
        </span>
        <div className="w-px h-8 bg-accent animate-pulse-line" />
      </div>
    </section>
  );
}
