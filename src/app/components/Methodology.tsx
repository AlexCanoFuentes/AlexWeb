"use client";

import ScrollReveal from "./ScrollReveal";
import Terminal from "./Terminal";

export default function Methodology() {
  return (
    <section id="metodologia" className="relative z-10 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <span className="font-mono text-[11px] tracking-[4px] uppercase text-accent">
            Metodolog&iacute;a
          </span>
          <h2
            className="font-display font-light text-text-primary mt-3 mb-12"
            style={{ fontSize: "clamp(24px, 4vw, 36px)" }}
          >
            AICODE
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <Terminal />
        </ScrollReveal>

        <ScrollReveal>
          <p className="font-display font-light text-sm text-text-secondary leading-relaxed mt-10 max-w-2xl">
            AICODE es mi metodolog&iacute;a de desarrollo donde la IA no es una herramienta
            &mdash; es el equipo. Cada tarea pasa por un sistema KERNEL de scoring que
            valida claridad, scope y riesgo antes de ejecutar. Los agentes especializados
            (Architect, Builder, Tester) trabajan en secuencia con delegaci&oacute;n
            expl&iacute;cita. El resultado: productos en producci&oacute;n sin escribir
            c&oacute;digo manualmente.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
