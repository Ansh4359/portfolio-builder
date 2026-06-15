import type { Template } from "../types";

interface TemplateCardProps {
  template: Template;
  selected: boolean;
  onSelect: () => void;
}

export default function TemplateCard({ template, selected, onSelect }: TemplateCardProps) {
  return (
    <div
      className={`bg-cream border rounded-xl overflow-hidden cursor-pointer transition-colors ${
        selected
          ? "border-charcoal"
          : "border-border hover:border-border-interactive"
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
