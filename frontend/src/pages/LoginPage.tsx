import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await loginWithEmail(email, password);
        toast.success("Logged in successfully!");
      } else {
        await registerWithEmail(email, password);
        toast.success("Account created successfully!");
      }
      navigate("/");
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error: any) {
      console.error("Google auth error:", error);
      toast.error(error.message || "Google authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 pb-[60px] flex-1">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <div className="bg-cream border border-border rounded-xl p-10 w-full max-w-[400px]">
            <h1 className="text-2xl font-semibold text-center mb-2 tracking-[-0.5px]">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-center text-muted mb-6 text-[15px]">
              {isLogin
                ? "Sign in to manage your portfolios"
                : "Sign up to get started"}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-charcoal">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="px-3 py-2.5 border border-border rounded-sm bg-cream text-charcoal placeholder:text-muted focus:outline-none focus:border-blue-500/50 focus:ring-3 focus:ring-blue-500/15 transition-[box-shadow,border-color]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-charcoal">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="px-3 py-2.5 border border-border rounded-sm bg-cream text-charcoal placeholder:text-muted focus:outline-none focus:border-blue-500/50 focus:ring-3 focus:ring-blue-500/15 transition-[box-shadow,border-color]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-charcoal text-cream-light px-4 py-2.5 rounded-sm text-base shadow-btn hover:opacity-85 active:opacity-80 transition-opacity disabled:bg-border disabled:text-muted disabled:shadow-none disabled:opacity-100 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading
                  ? "Loading..."
                  : isLogin
                    ? "Sign In"
                    : "Create Account"}
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              className="w-full bg-cream border border-border-interactive text-charcoal flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm hover:opacity-80 transition-opacity"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center mt-6 text-sm text-muted">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                className="bg-none border-none text-charcoal cursor-pointer text-sm underline hover:opacity-70 transition-opacity"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
