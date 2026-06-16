import { forwardRef } from "react";

interface SubdomainInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  highlight?: boolean;
}

const SubdomainInput = forwardRef<HTMLInputElement, SubdomainInputProps>(
  function SubdomainInput({ value, onChange, disabled, highlight }, ref) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const raw = e.target.value;
      const sanitized = raw
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 63);
      onChange(sanitized);
    };

    const showHighlight = highlight && !value && !disabled;

    return (
      <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-sm text-charcoal">Your Subdomain</label>
        <div
          className={`flex items-center bg-cream border rounded-sm overflow-hidden transition-[box-shadow,border-color] ${
            disabled
              ? "border-border opacity-60"
              : showHighlight
                ? "border-charcoal/30 animate-[pulse-ring_2s_ease-in-out_infinite]"
                : "border-border focus-within:border-blue-500/50 focus-within:ring-3 focus-within:ring-blue-500/15"
          }`}
        >
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="my-portfolio"
            disabled={disabled}
            className={`flex-1 border-none outline-none bg-transparent px-3 py-3 text-charcoal placeholder:text-muted ${disabled ? "cursor-not-allowed" : ""}`}
          />
          <span className="px-3 py-3 text-sm text-muted bg-charcoal/[0.03]">
            .myfolio.codes
          </span>
        </div>
        {disabled && (
          <p className="text-xs text-muted">Subdomain cannot be changed during edit</p>
        )}
      </div>
    );
  }
);

export default SubdomainInput;
