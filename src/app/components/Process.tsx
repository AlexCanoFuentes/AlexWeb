"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Entendemos tu problema, mapeamos tu stack actual y definimos si un MVP, automatizaci\u00f3n o auditor\u00eda es lo que necesitas. 30 minutos, sin compromiso.",
  },
  {
    number: "02",
    title: "Dise\u00f1o + Build",
    description:
      "Defino arquitectura, creo tickets con KERNEL scoring, y orquesto Claude Code para construir. T\u00fa ves el progreso en tiempo real.",
  },
  {
    number: "03",
    title: "Deploy + Iteraci\u00f3n",
    description:
      "Producto en producci\u00f3n. Te entrego el c\u00f3digo, te ense\u00f1o a mantenerlo. Soporte post-launch incluido.",
  },
];

function Step({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
      className="relative flex gap-6 sm:gap-10 pb-12 last:pb-0"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-3 h-3 border border-accent bg-bg-primary rounded-full" />
        {index < STEPS.length - 1 && (
          <div className="w-px flex-1 bg-accent/20 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="-mt-1">
        <span className="font-mono text-[32px] sm:text-[40px] font-light text-accent leading-none">
          {step.number}
        </span>
        <h3 className="font-display font-medium text-lg text-text-primary mt-2 mb-2">
          {step.title}
        </h3>
        <p className="font-display font-light text-sm text-text-secondary leading-relaxed max-w-md">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  return (
    <section id="proceso" className="relative z-10 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="font-mono text-[11px] tracking-[4px] uppercase text-accent">
            Proceso
          </span>
          <h2
            className="font-display font-light text-text-primary mt-3 mb-12"
            style={{ fontSize: "clamp(24px, 4vw, 36px)" }}
          >
            C&oacute;mo trabajamos
          </h2>
        </motion.div>

        <div className="ml-1">
          {STEPS.map((step, i) => (
            <Step key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
