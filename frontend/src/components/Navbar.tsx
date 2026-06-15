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
        {/* <div className="hidden sm:flex items-center gap-6">
          <a href="/#templates" className="text-base text-charcoal no-underline hover:opacity-70 transition-opacity">
            Templates
          </a>
        </div> */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer border border-border"
                  onClick={() => navigate("/profile")}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-full bg-charcoal text-cream-light flex items-center justify-center text-sm font-semibold cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  {(user.displayName || user.email || "U")[0].toUpperCase()}
                </div>
              )}
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
