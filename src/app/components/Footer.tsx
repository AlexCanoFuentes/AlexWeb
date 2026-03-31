export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border py-10 px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
        <a
          href="https://linkedin.com/in/alexkxdev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[3px] uppercase text-text-secondary transition-colors duration-300 hover:text-accent"
        >
          S&iacute;gueme en LinkedIn &rarr;
        </a>
        <span className="font-mono text-[10px] tracking-[2px] uppercase text-text-muted">
          Newsletter pr&oacute;ximamente
        </span>
        <p className="font-mono text-[11px] tracking-[4px] uppercase text-text-muted mt-2">
          &copy; 2026 ALEX CANO &middot; BUILT WITH AI
        </p>
      </div>
    </footer>
  );
}
