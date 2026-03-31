"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectRowProps {
  name: string;
  category: string;
  status: string;
  color: string;
  description: string;
}

export default function ProjectRow({
  name,
  category,
  status,
  color,
  description,
}: ProjectRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="border-b border-border group"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="flex items-center justify-between py-5 px-2">
        <div className="flex items-baseline gap-4 min-w-0">
          <h3 className="font-display font-medium text-lg text-text-primary transition-colors duration-300 group-hover:text-accent shrink-0">
            {name}
          </h3>
          <span className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted hidden sm:inline">
            {category}
          </span>
        </div>

        <span
          className="font-mono text-[10px] tracking-[2px] uppercase px-3 py-1 shrink-0 ml-4"
          style={{
            color: color,
            backgroundColor: `${color}15`,
          }}
        >
          {status}
        </span>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="font-display font-light text-sm text-text-secondary px-2 pb-5 leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
