import type { Template } from "../types";

interface TemplateCardProps {
  template: Template;
  selected: boolean;
  onSelect: () => void;
}

export default function TemplateCard({ template, selected, onSelect }: TemplateCardProps) {
  return (
    <div
      className={`template-card ${selected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <div className="template-thumb" style={{ background: template.thumbnail }} />
      <div className="template-info">
        <h3>{template.name}</h3>
        <p>{template.description}</p>
      </div>
    </div>
  );
}
