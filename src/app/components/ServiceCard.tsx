"use client";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="group border border-border bg-bg-card p-8 transition-all duration-300 hover:border-border-hover hover:bg-bg-card-hover">
      <span className="text-2xl text-accent">{icon}</span>
      <h3 className="font-display font-medium text-lg text-text-primary mt-4 mb-3">
        {title}
      </h3>
      <p className="font-display font-light text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}
