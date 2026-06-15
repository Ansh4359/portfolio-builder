import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { fetchProfile, uploadResume } from "../api";
import { auth } from "../config/firebase";
import type { PortfolioData } from "../types";

interface Portfolio {
  _id: string;
  name: string;
  templateId: string;
  subdomain?: string;
  deploymentUrl?: string;
  updatedAt: string;
}

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
      } catch {
        // No profile yet
      }

      try {
        const token = await auth.currentUser?.getIdToken();
        const API_BASE =
          import.meta.env.VITE_API_BASE || "http://localhost:3001/api";
        const res = await fetch(`${API_BASE}/portfolios`, {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });
        if (res.ok) {
          const data = await res.json();
          setPortfolios(data);
        }
      } catch {
        // No portfolios yet
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
      <div className="py-6 pb-[60px] flex-1">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-10 h-10 border-3 border-border border-t-charcoal rounded-full animate-spin" />
            <p className="text-muted">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 pb-[60px] flex-1">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-[28px] font-semibold tracking-[-0.5px] mb-2">
            Welcome back, {user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "there"} 👋
          </h1>
          <p className="text-muted">Build and deploy your portfolio in minutes.</p>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Step 1: Profile */}
          <div className="bg-cream border border-border rounded-xl p-6 hover:border-border-interactive transition-colors">
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
              className="bg-charcoal text-cream-light px-4 py-2 rounded-sm text-sm shadow-btn hover:opacity-85 active:opacity-80 transition-opacity"
              onClick={() => navigate("/profile")}
            >
              {completion === 0 ? "Create Profile" : "Edit Profile"}
            </button>
          </div>

          {/* Step 2: Template */}
          <div className="bg-cream border border-border rounded-xl p-6 hover:border-border-interactive transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-charcoal/[0.04] text-muted flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <span className="text-base font-medium text-charcoal">Template</span>
              </div>
              <span className="text-xs px-2 py-1 bg-charcoal/[0.04] text-muted rounded-full">
                Pending
              </span>
            </div>
            <p className="text-sm text-muted mb-4">
              Choose from professionally designed templates and customize your portfolio.
            </p>
            <button
              className="border border-border-interactive text-charcoal px-4 py-2 rounded-sm text-sm hover:opacity-80 transition-opacity"
              onClick={() => navigate("/template")}
            >
              Choose Template
            </button>
          </div>

          {/* Step 3: Deploy */}
          <div className="bg-cream border border-border rounded-xl p-6 hover:border-border-interactive transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-charcoal/[0.04] text-muted flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <span className="text-base font-medium text-charcoal">Deploy</span>
              </div>
              <span className="text-xs px-2 py-1 bg-charcoal/[0.04] text-muted rounded-full">
                Pending
              </span>
            </div>
            <p className="text-sm text-muted mb-4">
              One click to deploy your portfolio to a custom subdomain.
            </p>
            <button
              className="border border-border-interactive text-charcoal px-4 py-2 rounded-sm text-sm hover:opacity-80 transition-opacity"
              onClick={() => navigate("/template")}
            >
              Start Building
            </button>
          </div>
        </div>

        {/* Resume Upload Banner */}
        <div className="bg-cream border border-border rounded-xl p-6 mb-8">
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
                className="bg-charcoal text-cream-light px-4 py-2 rounded-sm text-sm shadow-btn hover:opacity-85 active:opacity-80 transition-opacity cursor-pointer inline-block"
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
            <div className="text-center py-8">
              <p className="text-muted mb-4">You haven't created any portfolios yet.</p>
              <button
                className="bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-sm shadow-btn hover:opacity-85 active:opacity-80 transition-opacity"
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
                  className="flex items-center justify-between p-4 border border-border rounded-sm hover:border-border-interactive transition-colors"
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
                          {p.subdomain}.vercel.app
                        </a>
                      ) : (
                        "Not deployed yet"
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.deploymentUrl && (
                      <span className="text-xs px-2 py-1 bg-charcoal text-cream-light rounded-full">
                        Live
                      </span>
                    )}
                    <span className="text-xs text-muted">
                      {new Date(p.updatedAt).toLocaleDateString()}
                    </span>
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
