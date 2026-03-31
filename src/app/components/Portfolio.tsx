"use client";

import ScrollReveal from "./ScrollReveal";
import ProjectRow from "./ProjectRow";

const PROJECTS = [
  {
    name: "NAIA",
    category: "EdTech \u00B7 IA",
    status: "LIVE",
    color: "#7020b0",
    description:
      "Plataforma educativa potenciada por IA que personaliza el aprendizaje en tiempo real. Generaci\u00F3n de contenido adaptativo y evaluaci\u00F3n autom\u00E1tica.",
  },
  {
    name: "HuespedIA",
    category: "SaaS \u00B7 Hotelero",
    status: "MVP",
    color: "#00A8E8",
    description:
      "Sistema de gesti\u00F3n hotelera con IA para optimizar ocupaci\u00F3n, pricing din\u00E1mico y experiencia del hu\u00E9sped. Automatizaci\u00F3n end-to-end.",
  },
  {
    name: "Guachinche Bot",
    category: "Voice AI",
    status: "LIVE",
    color: "#FF6B35",
    description:
      "Asistente de voz con IA para descubrir guachinches en Tenerife. Procesamiento de lenguaje natural en espa\u00F1ol con contexto local.",
  },
  {
    name: "UNFOLD Type D",
    category: "PsychTech",
    status: "DEPLOYED",
    color: "#E63946",
    description:
      "Herramienta de evaluaci\u00F3n psicol\u00F3gica basada en IA. An\u00E1lisis de patrones conductuales y generaci\u00F3n de informes cl\u00EDnicos automatizados.",
  },
  {
    name: "CAVITA",
    category: "AI Security",
    status: "BETA",
    color: "#00D282",
    description:
      "Plataforma de seguridad impulsada por IA. Detecci\u00F3n de vulnerabilidades, an\u00E1lisis de amenazas y respuesta automatizada a incidentes.",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative z-10 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <span className="font-mono text-[11px] tracking-[4px] uppercase text-accent">
            Portfolio
          </span>
          <h2
            className="font-display font-light text-text-primary mt-3 mb-12"
            style={{ fontSize: "clamp(24px, 4vw, 36px)" }}
          >
            Proyectos
          </h2>
        </ScrollReveal>

        <div className="border-t border-border">
          {PROJECTS.map((p) => (
            <ScrollReveal key={p.name}>
              <ProjectRow
                name={p.name}
                category={p.category}
                status={p.status}
                color={p.color}
                description={p.description}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
