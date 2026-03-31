"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        background: "rgba(5, 5, 5, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-display font-medium text-base text-accent transition-colors duration-300"
        >
          AC
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-[11px] tracking-[2px] uppercase text-text-secondary transition-colors duration-300 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
