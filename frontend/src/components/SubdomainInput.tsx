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
    <div className="form-group">
      <label>Your Subdomain</label>
      <div className="subdomain-group">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="my-portfolio"
        />
        <span className="subdomain-suffix">.vercel.app</span>
      </div>
    </div>
  );
}
