import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import SoftAurora from "../components/SoftAurora";
import { previews, templateList } from "../data/templateGenerators";

const steps = [
  {
    num: "1",
    title: "Fill Your Details",
    desc: "Add your info, experience, projects, and skills through our simple form.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "Choose a Template",
    desc: "Pick from professionally designed templates that match your style.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Deploy Instantly",
    desc: "One click and your portfolio is live on a custom subdomain.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const stats = [
  { value: "500+", label: "Portfolios Built" },
  { value: "10+", label: "Templates" },
  { value: "1-Click", label: "Deploy" },
  { value: "Free", label: "To Get Started" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  const handleGetStarted = () => {
    if (loading) return;
    navigate(user ? "/create" : "/login");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <SoftAurora
            speed={0.4}
            scale={1.2}
            brightness={theme === "dark" ? 0.6 : 0.8}
            color1={theme === "dark" ? "#141413" : "#f7f4ed"}
            color2={theme === "dark" ? "#6d5a9e" : "#c4b5fd"}
            noiseFrequency={2.0}
            noiseAmplitude={0.8}
            bandHeight={0.6}
            bandSpread={1.2}
            octaveDecay={0.15}
            layerOffset={0.5}
            colorSpeed={0.8}
            enableMouseInteraction
            mouseInfluence={0.15}
          />
        </div>
        <div className="relative z-10 text-center max-w-[720px]">
          <div className="inline-block px-4 py-1.5 bg-charcoal/[0.04] border border-border rounded-full text-sm text-muted mb-8">
            Portfolio Builder
          </div>
          <h1 className="text-6xl font-semibold text-charcoal leading-[1.10] tracking-[-1.5px] mb-6">
            Build Your Portfolio
            <br />
            in Minutes
          </h1>
          <p className="text-lg text-muted leading-[1.38] mb-10 max-w-[540px] mx-auto">
            Create a stunning developer portfolio by filling out a simple form.
            No coding required. Pick a template, customize, and deploy with one
            click.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              className="bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-base shadow-btn hover:opacity-85 active:opacity-80 transition-opacity inline-flex items-center gap-2"
              onClick={handleGetStarted}
            >
              Get Started
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <a
              href="#templates"
              className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-base hover:opacity-80 transition-opacity inline-flex items-center gap-2 no-underline"
            >
              View Templates
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-5xl font-semibold text-center tracking-[-1.2px] leading-tight mb-3">
            How It Works
          </h2>
          <p className="text-center text-muted text-lg mb-14">
            Three simple steps to your live portfolio
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="bg-cream border border-border rounded-xl p-8 text-center hover:border-border-interactive transition-colors">
                <div className="w-14 h-14 bg-charcoal/[0.04] text-charcoal rounded-[14px] flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-xs text-muted uppercase tracking-[0.1em] mb-2">
                  Step {step.num}
                </div>
                <h3 className="text-xl font-normal mb-2 text-charcoal">
                  {step.title}
                </h3>
                <p className="text-[15px] text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section className="py-32" id="templates">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-5xl font-semibold text-center tracking-[-1.2px] leading-tight mb-3">
            Choose Your Style
          </h2>
          <p className="text-center text-muted text-lg mb-14">
            Start with a professionally designed template
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {templateList.map((t) => (
              <div
                key={t.id}
                className="bg-cream border border-border rounded-xl overflow-hidden hover:border-border-interactive transition-colors cursor-pointer"
                onClick={handleGetStarted}
              >
                <div className="h-[240px] overflow-hidden relative">
                  <iframe
                    srcDoc={previews[t.id]}
                    className="absolute top-0 left-0 border-none"
                    style={{
                      width: "500%",
                      height: "500%",
                      transform: "scale(0.2)",
                      transformOrigin: "top left",
                      pointerEvents: "none",
                    }}
                    tabIndex={-1}
                    title={t.name}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-normal mb-1">{t.name}</h3>
                  <p className="text-sm text-muted">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-base hover:opacity-80 transition-opacity"
              onClick={handleGetStarted}
            >
              View All Templates
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-5xl font-semibold text-center tracking-[-1.2px] leading-tight mb-3">
            Trusted by Developers
          </h2>
          <p className="text-center text-muted text-lg mb-14">
            Numbers that speak for themselves
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center py-8 px-4 bg-cream border border-border rounded-xl hover:border-border-interactive transition-colors">
                <div className="text-5xl font-semibold text-charcoal tracking-[-1.2px] leading-tight mb-1">
                  {s.value}
                </div>
                <div className="text-base text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-charcoal rounded-2xl py-20 px-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(251,191,36,0.1)_0%,transparent_60%),radial-gradient(ellipse_at_30%_80%,rgba(147,197,253,0.08)_0%,transparent_50%)]" />
            <h2 className="relative z-10 text-5xl font-semibold text-cream-light tracking-[-1.2px] leading-tight mb-4">
              Ready to Build Your Portfolio?
            </h2>
            <p className="relative z-10 text-lg text-cream-light/60 mb-10 max-w-[480px] mx-auto leading-[1.38]">
              Join hundreds of developers who have already created their
              portfolio. It&apos;s free to get started.
            </p>
            <button
              className="relative z-10 bg-cream-light text-charcoal px-5 py-2.5 rounded-sm text-base shadow-btn hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              onClick={handleGetStarted}
            >
              Get Started for Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal py-16 pb-8 text-cream-light/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col items-center gap-2 mb-10">
            <div className="text-xl font-semibold text-cream-light">
              Portfolio<span>Builder</span>
            </div>
            <p className="text-sm">Build and deploy your portfolio in minutes.</p>
          </div>
          <div className="border-t border-cream-light/10 pt-6 text-center text-[13px]">
            <p>&copy; {new Date().getFullYear()} Portfolio Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
