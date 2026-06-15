interface SubdomainInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SubdomainInput({ value, onChange }: SubdomainInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const sanitized = raw
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 63);
    onChange(sanitized);
  };

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="text-sm text-charcoal">Your Subdomain</label>
      <div className="flex items-center bg-cream border border-border rounded-sm overflow-hidden focus-within:border-blue-500/50 focus-within:ring-3 focus-within:ring-blue-500/15 transition-[box-shadow,border-color]">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="my-portfolio"
          className="flex-1 border-none outline-none bg-transparent px-3 py-3 text-charcoal placeholder:text-muted"
        />
        <span className="px-3 py-3 text-sm text-muted bg-charcoal/[0.03]">
          .vercel.app
        </span>
      </div>
    </div>
  );
}
