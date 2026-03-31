"use client";

import ScrollReveal from "./ScrollReveal";

const LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/alexkxdev" },
  { label: "WhatsApp", href: "https://wa.me/34611956373" },
  { label: "Email", href: "mailto:hello@alexcano.dev" },
];

export default function Contact() {
  return (
    <section id="contacto" className="relative z-10 py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <span className="font-mono text-[11px] tracking-[4px] uppercase text-accent">
            Contacto
          </span>
          <h2
            className="font-display font-light text-text-primary mt-3 mb-12"
            style={{ fontSize: "clamp(24px, 4vw, 36px)" }}
          >
            Hablemos
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border px-8 py-3 font-mono text-[11px] tracking-[3px] uppercase text-text-primary transition-all duration-300 hover:border-border-hover hover:text-accent w-full sm:w-auto text-center"
              >
                {link.label}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
