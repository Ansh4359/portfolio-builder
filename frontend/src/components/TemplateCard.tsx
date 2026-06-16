import type { Template } from "../types";

interface TemplateCardProps {
  template: Template;
  selected: boolean;
  onSelect: () => void;
}

export default function TemplateCard({ template, selected, onSelect }: TemplateCardProps) {
  return (
    <div
      className={`bg-cream border rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
        selected
          ? "border-charcoal shadow-card-hover"
          : "border-border hover:border-border-interactive hover:shadow-card-hover hover:-translate-y-0.5"
      }`}
      onClick={onSelect}
    >
      <div className="h-40 w-full" style={{ background: template.thumbnail }} />
      <div className="p-4">
        <h3 className="text-base font-normal mb-1">{template.name}</h3>
        <p className="text-sm text-muted">{template.description}</p>
      </div>
    </div>
  );
}
