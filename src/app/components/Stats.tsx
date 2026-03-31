"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const METRICS = [
  { value: "5+", label: "Productos deployed" },
  { value: "3", label: "Sectores en producci\u00f3n" },
  { value: "26/26", label: "Tests passing" },
  { value: "0", label: "L\u00edneas escritas manualmente" },
];

function Stat({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className="text-center"
    >
      <span
        className="font-display font-light text-accent block"
        style={{ fontSize: "clamp(32px, 5vw, 48px)" }}
      >
        {value}
      </span>
      <span className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted mt-2 block">
        {label}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative z-10 border-t border-b border-border py-16 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {METRICS.map((m, i) => (
          <Stat key={m.label} value={m.value} label={m.label} index={i} />
        ))}
      </div>
    </section>
  );
}
