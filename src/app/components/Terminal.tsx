"use client";

import { useState, useEffect, useRef } from "react";

const LINES = [
  "$ claude-code --orchestrate",
  "> Loading AICODE methodology...",
  "> KERNEL score: 94/100 \u2713",
  "> Delegating to Builder (Sonnet)...",
  "> Architecture validated by Architect (Opus)",
  "> Tests passing: 26/26 \u2713",
  "> Deploy to Vercel... \u2713",
  "> Product live. Zero lines written manually.",
];

function getLineColor(line: string): string {
  if (line.startsWith("$")) return "#00D282";
  if (line.includes("\u2713")) return "#28CA41";
  return "rgba(255,255,255,0.5)";
}

export default function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function startTyping() {
      setVisibleCount(0);
      let count = 0;

      intervalRef.current = setInterval(() => {
        count++;
        setVisibleCount(count);

        if (count >= LINES.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          timeoutRef.current = setTimeout(startTyping, 3000);
        }
      }, 600);
    }

    startTyping();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="border border-border" style={{ background: "rgba(255,255,255,0.02)" }}>
      {/* macOS chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28CA41" }} />
      </div>

      {/* Terminal body */}
      <div className="p-6 font-mono text-[13px] leading-8 min-h-[280px] max-sm:text-[11px] max-sm:overflow-x-auto">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div key={i} style={{ color: getLineColor(line) }}>
            {line}
          </div>
        ))}

        {/* Blinking cursor */}
        <span className="inline-block w-2 h-4 bg-accent animate-cursor-blink align-middle mt-1" />
      </div>
    </div>
  );
}
