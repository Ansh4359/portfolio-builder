import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001/api";

export default function UnsubscribePage() {
  const navigate = useNavigate();
  const { user, getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleUnsubscribe = async (type: string) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE}/auth/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type }),
      });
      if (!res.ok) throw new Error("Failed to unsubscribe");
      setDone(true);
      toast.success("Preferences updated");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="py-6 pb-[60px] flex-1 animate-fade-in">
        <div className="max-w-[480px] mx-auto px-6 text-center py-20">
          <h1 className="text-2xl font-semibold mb-3">Email Preferences</h1>
          <p className="text-muted mb-6">Please sign in to manage your email preferences.</p>
          <button
            className="bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-base shadow-btn hover:opacity-85 active:opacity-80 active:scale-[0.98] transition-all"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="py-6 pb-[60px] flex-1 animate-fade-in">
        <div className="max-w-[480px] mx-auto px-6 text-center py-20">
          <div className="w-16 h-16 bg-success-bg text-success rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
            ✓
          </div>
          <h1 className="text-2xl font-semibold mb-3">Preferences Updated</h1>
          <p className="text-muted mb-6">
            Your email preferences have been saved. You can change them anytime from your profile.
          </p>
          <button
            className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-base hover:opacity-80 active:scale-[0.98] transition-all"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 pb-[60px] flex-1 animate-fade-in">
      <div className="max-w-[480px] mx-auto px-6 py-20">
        <h1 className="text-2xl font-semibold text-center mb-2">Email Preferences</h1>
        <p className="text-center text-muted mb-8">
          Choose which emails you'd like to receive from Portfolio Builder.
        </p>

        <div className="space-y-3">
          <div className="bg-cream border border-border rounded-xl p-6 hover:border-border-interactive hover:shadow-card-hover transition-all duration-200">
            <h3 className="text-base font-medium mb-1">Milestone Emails</h3>
            <p className="text-sm text-muted mb-4">
              Get notified when your portfolio hits view milestones (10, 50, 100, 500, 1000 views).
            </p>
            <button
              className="border border-border-interactive text-charcoal px-4 py-2 rounded-sm text-sm hover:opacity-80 active:scale-[0.98] transition-all disabled:opacity-50"
              onClick={() => handleUnsubscribe("milestones")}
              disabled={loading}
            >
              Unsubscribe from milestones
            </button>
          </div>

          <div className="bg-cream border border-border rounded-xl p-6 hover:border-border-interactive hover:shadow-card-hover transition-all duration-200">
            <h3 className="text-base font-medium mb-1">Marketing Emails</h3>
            <p className="text-sm text-muted mb-4">
              Product updates, new features, and tips for building a great portfolio.
            </p>
            <button
              className="border border-border-interactive text-charcoal px-4 py-2 rounded-sm text-sm hover:opacity-80 active:scale-[0.98] transition-all disabled:opacity-50"
              onClick={() => handleUnsubscribe("marketing")}
              disabled={loading}
            >
              Unsubscribe from marketing
            </button>
          </div>

          <div className="bg-cream border border-border rounded-xl p-6 border-error/30 hover:border-error/50 transition-all duration-200">
            <h3 className="text-base font-medium mb-1 text-error">Unsubscribe from All</h3>
            <p className="text-sm text-muted mb-4">
              You'll only receive essential account-related emails (sign-in links, security alerts).
            </p>
            <button
              className="bg-error-bg text-error px-4 py-2 rounded-sm text-sm hover:bg-error hover:text-white active:scale-[0.98] transition-all disabled:opacity-50"
              onClick={() => handleUnsubscribe("all")}
              disabled={loading}
            >
              Unsubscribe from all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
