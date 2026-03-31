"use client";

import ScrollReveal from "./ScrollReveal";
import ServiceCard from "./ServiceCard";

const SERVICES = [
  {
    icon: "\u25C9",
    title: "Auditor\u00EDa T\u00E9cnica",
    description:
      "An\u00E1lisis profundo de arquitectura, stack y procesos. Identifico cuellos de botella y oportunidades de automatizaci\u00F3n con IA.",
  },
  {
    icon: "\u2B21",
    title: "MVP con IA",
    description:
      "Dise\u00F1o y construyo productos m\u00EDnimos viables usando IA como motor de desarrollo. De idea a producci\u00F3n en semanas, no meses.",
  },
  {
    icon: "\u25B3",
    title: "Automatizaci\u00F3n IA",
    description:
      "Implemento flujos inteligentes que eliminan tareas repetitivas. Agentes, pipelines y orquestaci\u00F3n end-to-end.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <span className="font-mono text-[11px] tracking-[4px] uppercase text-accent">
            Servicios
          </span>
          <h2
            className="font-display font-light text-text-primary mt-3 mb-12"
            style={{ fontSize: "clamp(24px, 4vw, 36px)" }}
          >
            Lo que hago
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {SERVICES.map((s) => (
            <ScrollReveal key={s.title}>
              <ServiceCard icon={s.icon} title={s.title} description={s.description} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
