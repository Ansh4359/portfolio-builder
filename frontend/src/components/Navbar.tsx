import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-cream border-b border-border">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-14">
        <div
          className="text-xl font-semibold text-charcoal cursor-pointer"
          onClick={() => navigate("/")}
        >
          Portfolio<span>Builder</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <a href="/#templates" className="text-base text-charcoal no-underline hover:opacity-70 transition-opacity">
            Templates
          </a>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                className="bg-charcoal text-cream-light px-4 py-1.5 rounded-sm text-sm shadow-btn hover:opacity-85 active:opacity-80 transition-opacity"
                onClick={() => navigate("/create")}
              >
                Dashboard
              </button>
              <button
                className="border border-border-interactive text-charcoal px-4 py-1.5 rounded-sm text-sm hover:opacity-80 transition-opacity"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="border border-border-interactive text-charcoal px-4 py-1.5 rounded-sm text-sm hover:opacity-80 transition-opacity"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
              <button
                className="bg-charcoal text-cream-light px-4 py-1.5 rounded-sm text-sm shadow-btn hover:opacity-85 active:opacity-80 transition-opacity"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
