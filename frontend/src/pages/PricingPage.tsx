import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const features = [
  { name: "AI template generations", free: "2 per day", pro: "Unlimited" },
  { name: "Pre-built templates", free: "8 templates", pro: "8 templates" },
  { name: "Portfolio deployments", free: "3 per day", pro: "Unlimited" },
  { name: "Custom subdomain", free: true, pro: true },
  { name: "Resume auto-fill with AI", free: true, pro: true },
  { name: "One-click deploy", free: true, pro: true },
  { name: "Dark mode support", free: true, pro: true },
  { name: "Priority generation", free: false, pro: true },
  { name: "All future features", free: false, pro: true },
];

const faqs = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes. You can upgrade or downgrade at any time. Changes take effect immediately.",
  },
  {
    q: "What happens when I hit the free tier limits?",
    a: "You'll be prompted to upgrade to Pro. Your existing portfolios remain live and unaffected.",
  },
  {
    q: "Do I need a credit card to start?",
    a: "No. The free tier requires no payment info. You only enter payment details when upgrading to Pro.",
  },
  {
    q: "Can I use my own domain?",
    a: "Custom domains are coming soon. Currently all portfolios are hosted on *.myfolio.codes subdomains.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. If you're not satisfied within the first 14 days, contact us for a full refund.",
  },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="py-16 pb-[60px] flex-1 animate-fade-in">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold tracking-[-1.2px] leading-tight mb-3">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted max-w-[480px] mx-auto">
            Start for free. Upgrade when you need more.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {/* Free */}
          <div className="bg-cream border border-border rounded-xl p-8 hover:border-border-interactive hover:shadow-card-hover transition-all duration-200">
            <h3 className="text-lg font-medium text-charcoal mb-1">Free</h3>
            <p className="text-sm text-muted mb-6">Everything you need to get started</p>
            <div className="mb-8">
              <span className="text-5xl font-semibold text-charcoal tracking-tight">$0</span>
              <span className="text-muted">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f.name} className="flex items-center gap-3 text-sm">
                  {f.free === true ? (
                    <svg className="w-4 h-4 text-success shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : f.free === false ? (
                    <svg className="w-4 h-4 text-muted/30 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-success shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  <span className={f.free === false ? "text-muted" : "text-charcoal"}>
                    {f.name}
                    {typeof f.free === "string" && <span className="text-muted ml-1">({f.free})</span>}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className="w-full border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-base hover:opacity-80 active:scale-[0.98] transition-all"
              onClick={() => navigate(user ? "/" : "/login")}
            >
              {user ? "Current Plan" : "Get Started Free"}
            </button>
          </div>

          {/* Pro */}
          <div className="bg-cream border border-charcoal rounded-xl p-8 relative shadow-card-hover hover:border-border-interactive transition-all duration-200">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-charcoal text-cream-light text-xs font-medium rounded-full">
              Most Popular
            </div>
            <h3 className="text-lg font-medium text-charcoal mb-1">Pro</h3>
            <p className="text-sm text-muted mb-6">For developers who build without limits</p>
            <div className="mb-8">
              <span className="text-5xl font-semibold text-charcoal tracking-tight">$9</span>
              <span className="text-muted">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f.name} className="flex items-center gap-3 text-sm">
                  {f.pro === true ? (
                    <svg className="w-4 h-4 text-success shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : f.pro === false ? (
                    <svg className="w-4 h-4 text-muted/30 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-success shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  <span className={f.pro === false ? "text-muted" : "text-charcoal"}>
                    {f.name}
                    {typeof f.pro === "string" && <span className="text-muted ml-1">({f.pro})</span>}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-base shadow-btn hover:opacity-85 active:opacity-80 active:scale-[0.98] transition-all"
              onClick={() => navigate(user ? "/" : "/login")}
            >
              {user ? "Upgrade to Pro" : "Get Started"}
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-[640px] mx-auto">
          <h2 className="text-3xl font-semibold text-center tracking-[-0.8px] mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-border pb-6">
                <h3 className="text-base font-medium text-charcoal mb-2">{faq.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-muted mb-4">Still have questions?</p>
          <button
            className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-base hover:opacity-80 active:scale-[0.98] transition-all"
            onClick={() => navigate("/login")}
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
}
