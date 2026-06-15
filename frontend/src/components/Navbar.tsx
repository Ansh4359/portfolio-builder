import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { fetchAccountInfo, fetchAIUsage } from "../api";
import UpgradeModal from "./UpgradeModal";
import type { AccountInfo, AIUsage } from "../types";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [aiUsage, setAiUsage] = useState<AIUsage | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropdownOpen && !accountInfo && user) {
      fetchAccountInfo().then(setAccountInfo).catch(() => {});
    }
  }, [dropdownOpen, accountInfo, user]);

  useEffect(() => {
    if (user) {
      fetchAIUsage()
        .then(setAiUsage)
        .catch((err) => console.error("Failed to fetch AI usage:", err));
    } else {
      setAiUsage(null);
    }
  }, [user]);

  // Listen for credit updates from TemplatePage
  useEffect(() => {
    if (!user) return;

    const handleCreditsUpdated = () => {
      fetchAIUsage()
        .then(setAiUsage)
        .catch((err) => console.error("Failed to refresh credits:", err));
    };

    window.addEventListener("credits-updated", handleCreditsUpdated);
    return () => window.removeEventListener("credits-updated", handleCreditsUpdated);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    if (dropdownOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-cream border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-14">
          <div
            className="text-xl font-semibold text-charcoal cursor-pointer"
            onClick={() => navigate("/")}
          >
            Folio<span>Builder</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            {user ? (
              <>
                {/* SaaS-Level Credits Display */}
                {aiUsage && (
                  <div
                    className="hidden sm:flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                   
                  >
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        !aiUsage.limit
                          ? "bg-[#dcfce7] text-[#16a34a] border border-[#16a34a]/20"
                          : aiUsage.remaining === 0
                            ? "bg-[#fee2e2] text-[#dc2626] border border-[#dc2626]/20"
                            : aiUsage.remaining === 1
                              ? "bg-[#fef3c7] text-[#b45309] border border-[#b45309]/20"
                              : "bg-charcoal/[0.04] text-muted border border-border"
                      }`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                      {!aiUsage.limit ? (
                        <span>Unlimited</span>
                      ) : aiUsage.remaining === 0 ? (
                        <span>0 credits</span>
                      ) : (
                        <span>
                          {aiUsage.remaining} credit
                          {aiUsage.remaining !== 1 ? "s" : ""} left
                        </span>
                      )}
                    </div>
                    {aiUsage.limit && aiUsage.remaining === 0 && (
                      <button
                        className="text-xs px-3 py-1.5 bg-charcoal text-cream-light rounded-full hover:opacity-80 transition-opacity font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowUpgrade(true);
                        }}
                      >
                        Upgrade
                      </button>
                    )}
                  </div>
                )}

                {/* Avatar & Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full cursor-pointer border border-border hover:opacity-80 transition-opacity"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full bg-charcoal text-cream-light flex items-center justify-center text-sm font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-cream border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium text-charcoal truncate">
                          {accountInfo?.displayName ||
                            user.displayName ||
                            "User"}
                        </p>
                        <p className="text-xs text-muted truncate">
                          {accountInfo?.email || user.email}
                        </p>
                      </div>

                      <div className="px-4 py-2.5 border-b border-border">
                        <span className="text-xs px-2.5 py-1 bg-charcoal/[0.04] text-muted rounded-full font-medium">
                          {accountInfo?.tier === "pro" ? "Pro" : "Free"} tier
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-charcoal/[0.04] transition-colors"
                          onClick={() => {
                            navigate("/profile");
                            setDropdownOpen(false);
                          }}
                        >
                          Profile
                        </button>
                      </div>

                      <div className="border-t border-border" />

                      <div className="py-1">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-charcoal/[0.04] transition-colors"
                          onClick={handleLogout}
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </>
  );
}
