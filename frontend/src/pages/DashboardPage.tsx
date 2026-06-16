import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { fetchProfile, fetchPortfolios, uploadResume } from "../api";
import type { PortfolioData, Portfolio } from "../types";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<PortfolioData | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const p = await fetchProfile();
        setProfile(p);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
      try {
        const data = await fetchPortfolios();
        setPortfolios(data);
      } catch (err) {
        console.error("Failed to fetch portfolios:", err);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const getProfileCompletion = () => {
    if (!profile) return 0;
    let filled = 0;
    let total = 8;
    if (profile.name) filled++;
    if (profile.title) filled++;
    if (profile.email) filled++;
    if (profile.about) filled++;
    if (profile.skills.length > 0) filled++;
    if (profile.experience.length > 0) filled++;
    if (profile.education.length > 0) filled++;
    if (profile.projects.length > 0) filled++;
    return Math.round((filled / total) * 100);
  };

  const completion = getProfileCompletion();
  const hasTemplate = portfolios.some((p) => p.templateId);
  const hasDeployed = portfolios.some((p) => p.deploymentUrl);
  const hasProfile = completion >= 50;

  const getStepStatus = (step: number) => {
    if (step === 1) {
      if (completion === 0) return { label: "Not Started", color: "bg-charcoal/[0.04] text-muted" };
      if (completion < 100) return { label: "In Progress", color: "bg-amber-bg text-amber border border-amber/20" };
      return { label: "Complete", color: "bg-success-bg text-success border border-success/20" };
    }
    if (step === 2) {
      if (!hasProfile) return { label: "Not Started", color: "bg-charcoal/[0.04] text-muted" };
      if (hasTemplate) return { label: "Complete", color: "bg-success-bg text-success border border-success/20" };
      return { label: "In Progress", color: "bg-amber-bg text-amber border border-amber/20" };
    }
    if (step === 3) {
      if (!hasTemplate) return { label: "Not Started", color: "bg-charcoal/[0.04] text-muted" };
      if (hasDeployed) return { label: "Complete", color: "bg-success-bg text-success border border-success/20" };
      return { label: "In Progress", color: "bg-amber-bg text-amber border border-amber/20" };
    }
    return { label: "Not Started", color: "bg-charcoal/[0.04] text-muted" };
  };

  const step2 = getStepStatus(2);
  const step3 = getStepStatus(3);

  const showChecklist = !localStorage.getItem("onboarding-dismissed") && completion < 100;
  const handleDismissChecklist = () => localStorage.setItem("onboarding-dismissed", "true");

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large (max 5MB)");
      return;
    }
    setUploading(true);
    try {
      const data = await uploadResume(file);
      setProfile(data);
      setUploadSuccess(true);
      toast.success("Resume parsed! Profile updated.");
    } catch (err: any) {
      toast.error(err.message || "Failed to parse resume");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8 pb-[60px] flex-1 animate-fade-in">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-8">
            <div className="skeleton h-8 w-64 mb-3" />
            <div className="skeleton h-4 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-cream border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="skeleton w-8 h-8 rounded-full" />
                    <div className="skeleton h-4 w-16" />
                  </div>
                  <div className="skeleton h-5 w-10 rounded-full" />
                </div>
                <div className="skeleton h-2 w-full rounded-full mb-4" />
                <div className="skeleton h-3 w-3/4 mb-4" />
                <div className="skeleton h-9 w-28" />
              </div>
            ))}
          </div>
          <div className="bg-cream border border-border rounded-xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="skeleton h-5 w-40 mb-2" />
                <div className="skeleton h-3 w-64" />
              </div>
              <div className="skeleton h-9 w-32" />
            </div>
          </div>
          <div className="bg-cream border border-border rounded-xl p-6">
            <div className="skeleton h-5 w-32 mb-5" />
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-sm">
                  <div>
                    <div className="skeleton h-4 w-32 mb-2" />
                    <div className="skeleton h-3 w-48" />
                  </div>
                  <div className="skeleton h-8 w-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 pb-[60px] flex-1 animate-fade-in">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-[28px] font-semibold tracking-[-0.5px] mb-2">
            Welcome back, {user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "there"} 👋
          </h1>
          <p className="text-muted">Build and deploy your portfolio in minutes.</p>
        </div>

        {/* Onboarding Checklist */}
        {showChecklist && (
          <div className="bg-cream border border-border rounded-xl p-6 mb-8 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-charcoal">Getting Started</h3>
              <button
                className="text-xs text-muted hover:text-charcoal transition-colors"
                onClick={handleDismissChecklist}
              >
                Dismiss
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  completion >= 50 ? "bg-success text-white" : "border border-border"
                }`}>
                  {completion >= 50 && "✓"}
                </div>
                <span className={`text-sm ${completion >= 50 ? "text-muted line-through" : "text-charcoal"}`}>
                  Create your profile with your details
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  hasTemplate ? "bg-success text-white" : "border border-border"
                }`}>
                  {hasTemplate && "✓"}
                </div>
                <span className={`text-sm ${hasTemplate ? "text-muted line-through" : "text-charcoal"}`}>
                  Choose a template or generate one with AI
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  hasDeployed ? "bg-success text-white" : "border border-border"
                }`}>
                  {hasDeployed && "✓"}
                </div>
                <span className={`text-sm ${hasDeployed ? "text-muted line-through" : "text-charcoal"}`}>
                  Deploy your portfolio to a custom subdomain
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Step 1: Profile */}
          <div className="bg-cream border border-border rounded-xl p-6 hover:border-border-interactive hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    completion >= 50
                      ? "bg-charcoal text-cream-light"
                      : "bg-charcoal/[0.04] text-muted"
                  }`}
                >
                  1
                </div>
                <span className="text-base font-medium text-charcoal">Profile</span>
              </div>
              {completion >= 50 ? (
                <span className="text-xs px-2 py-1 bg-charcoal text-cream-light rounded-full">
                  {completion}%
                </span>
              ) : (
                <span className="text-xs px-2 py-1 bg-charcoal/[0.04] text-muted rounded-full">
                  {completion}%
                </span>
              )}
            </div>
            <div className="w-full h-2 bg-charcoal/[0.06] rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-charcoal rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="text-sm text-muted mb-4">
              {completion === 0
                ? "Add your details to get started"
                : completion < 50
                  ? "Fill in more sections to improve your portfolio"
                  : completion < 100
                    ? "Almost there! Add a few more details"
                    : "Your profile is complete!"}
            </p>
            <button
              className="bg-charcoal text-cream-light px-4 py-2 rounded-sm text-sm shadow-btn hover:opacity-85 active:opacity-80 active:scale-[0.98] transition-all"
              onClick={() => navigate("/profile")}
            >
              {completion === 0 ? "Create Profile" : "Edit Profile"}
            </button>
          </div>

          {/* Step 2: Template */}
          <div className="bg-cream border border-border rounded-xl p-6 hover:border-border-interactive hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step2.label === "Complete" ? "bg-charcoal text-cream-light" : "bg-charcoal/[0.04] text-muted"
                }`}>
                  2
                </div>
                <span className="text-base font-medium text-charcoal">Template</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${step2.color}`}>
                {step2.label}
              </span>
            </div>
            <p className="text-sm text-muted mb-4">
              Choose from professionally designed templates and customize your portfolio.
            </p>
            <button
              className="border border-border-interactive text-charcoal px-4 py-2 rounded-sm text-sm hover:opacity-80 active:scale-[0.98] transition-all"
              onClick={() => navigate("/template")}
            >
              Choose Template
            </button>
          </div>

          {/* Step 3: Deploy */}
          <div className="bg-cream border border-border rounded-xl p-6 hover:border-border-interactive hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step3.label === "Complete" ? "bg-charcoal text-cream-light" : "bg-charcoal/[0.04] text-muted"
                }`}>
                  3
                </div>
                <span className="text-base font-medium text-charcoal">Deploy</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${step3.color}`}>
                {step3.label}
              </span>
            </div>
            <p className="text-sm text-muted mb-4">
              One click to deploy your portfolio to a custom subdomain.
            </p>
            <button
              className="border border-border-interactive text-charcoal px-4 py-2 rounded-sm text-sm hover:opacity-80 active:scale-[0.98] transition-all"
              onClick={() => navigate("/template")}
            >
              Start Building
            </button>
          </div>
        </div>

        {/* Resume Upload Banner */}
        <div className="bg-cream border border-border rounded-xl p-6 mb-8 hover:border-border-interactive transition-colors duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-charcoal mb-1">
                Upload Resume to Auto-Fill
              </h3>
              <p className="text-sm text-muted">
                Upload your resume (PDF, DOCX, TXT) and let AI extract your details automatically.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleResumeUpload}
                className="hidden"
                id="dashboard-resume-upload"
              />
              <label
                htmlFor="dashboard-resume-upload"
                className="bg-charcoal text-cream-light px-4 py-2 rounded-sm text-sm shadow-btn hover:opacity-85 active:opacity-80 active:scale-[0.98] transition-all cursor-pointer inline-block"
              >
                {uploading ? "Parsing..." : "Upload Resume"}
              </label>
            </div>
          </div>
          {uploading && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
              <div className="w-5 h-5 border-2 border-border border-t-charcoal rounded-full animate-spin" />
              <span className="text-sm text-muted">AI is parsing your resume...</span>
            </div>
          )}
          {uploadSuccess && !uploading && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
              <span className="text-sm text-success">✓ Resume parsed successfully!</span>
              <button
                className="text-sm text-charcoal underline hover:opacity-70 transition-opacity"
                onClick={() => navigate("/profile")}
              >
                Review & Edit
              </button>
            </div>
          )}
        </div>

        {/* Your Portfolios */}
        <div className="bg-cream border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-border">
            Your Portfolios
          </h2>
          {portfolios.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-charcoal/[0.04] rounded-2xl flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <p className="text-charcoal font-medium mb-1">No portfolios yet</p>
              <p className="text-muted text-sm mb-5">Create your first portfolio to get started.</p>
              <button
                className="bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-sm shadow-btn hover:opacity-85 active:opacity-80 active:scale-[0.98] transition-all"
                onClick={() => navigate("/create")}
              >
                Create Your First Portfolio
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {portfolios.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center justify-between p-4 border border-border rounded-sm hover:border-border-interactive hover:shadow-card-hover transition-all duration-200"
                >
                  <div>
                    <p className="font-medium text-charcoal">{p.name}</p>
                    <p className="text-sm text-muted">
                      {p.deploymentUrl ? (
                        <a
                          href={p.deploymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-charcoal underline hover:opacity-70 transition-opacity"
                        >
                          {p.subdomain}.myfolio.codes
                        </a>
                      ) : (
                        "Not deployed yet"
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {p.deploymentUrl && (
                      <span className="text-xs px-2 py-1 bg-charcoal text-cream-light rounded-full">
                        Live
                      </span>
                    )}
                    {p.views !== undefined && p.views > 0 && (
                      <span className="flex items-center gap-1 text-xs text-muted">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        {p.views.toLocaleString()}
                      </span>
                    )}
                    <span className="text-xs text-muted">
                      {new Date(p.updatedAt).toLocaleDateString()}
                    </span>
                    <button
                      className="text-xs px-3 py-1.5 border border-border-interactive text-charcoal rounded-sm hover:opacity-80 active:scale-[0.98] transition-all"
                      onClick={() => navigate(`/portfolio/${p._id}/edit`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
