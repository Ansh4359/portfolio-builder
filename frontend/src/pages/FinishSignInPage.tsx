import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function FinishSignInPage() {
  const navigate = useNavigate();
  const { finishMagicLinkSignIn } = useAuth();
  const [status, setStatus] = useState<"loading" | "email-prompt" | "error">("loading");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      setStatus("error");
      setErrorMsg("Invalid or expired sign-in link.");
      return;
    }

    const storedEmail = localStorage.getItem("emailForSignIn");
    if (storedEmail) {
      completeSignIn(storedEmail);
    } else {
      setStatus("email-prompt");
    }
  }, []);

  const completeSignIn = async (emailToUse: string) => {
    setStatus("loading");
    localStorage.setItem("emailForSignIn", emailToUse);

    try {
      await finishMagicLinkSignIn();
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error: any) {
      console.error("Finish sign-in error:", error);
      setStatus("error");
      setErrorMsg(error.message || "Failed to complete sign-in.");
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeSignIn(email);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen animate-fade-in">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-border border-t-charcoal rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted text-[15px]">Completing sign-in...</p>
        </div>
      </div>
    );
  }

  if (status === "email-prompt") {
    return (
      <div className="py-6 pb-[60px] flex-1 animate-fade-in">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
            <div className="bg-cream border border-border rounded-xl p-10 w-full max-w-[400px]">
              <h1 className="text-2xl font-semibold text-center mb-2 tracking-[-0.5px]">
                Confirm your email
              </h1>
              <p className="text-center text-muted mb-6 text-[15px]">
                Please enter the email you used to request the sign-in link.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-charcoal">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoFocus
                    className="px-3 py-2.5 border border-border rounded-sm bg-cream text-charcoal placeholder:text-muted focus:outline-none focus:border-blue-500/50 focus:ring-3 focus:ring-blue-500/15 transition-[box-shadow,border-color]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-charcoal text-cream-light px-4 py-2.5 rounded-sm text-base shadow-btn hover:opacity-85 active:opacity-80 active:scale-[0.98] transition-all"
                >
                  Complete Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 pb-[60px] flex-1 animate-fade-in">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <div className="bg-cream border border-border rounded-xl p-10 w-full max-w-[400px] text-center">
            <p className="text-error mb-4">{errorMsg}</p>
            <button
              className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-base hover:opacity-80 active:scale-[0.98] transition-all"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
