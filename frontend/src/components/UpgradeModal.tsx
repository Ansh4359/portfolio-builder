import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" />
      <div
        ref={modalRef}
        className="relative w-full max-w-lg rounded-xl overflow-hidden border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        style={{ background: "var(--color-cream)" }}
      >
        {/* Header */}
        <div className="bg-charcoal p-6 text-center relative">
          <button
            className="absolute top-4 right-4 text-cream-light/60 hover:text-cream-light transition-colors"
            onClick={onClose}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cream-light/10 rounded-full mb-3">
            <span className="text-xs">⚡</span>
            <span className="text-xs font-medium text-cream-light/90">
              Daily Limit Reached
            </span>
          </div>
          <h3 className="text-xl font-semibold text-cream-light mb-1">
            Unlock Unlimited AI Templates
          </h3>
          <p className="text-sm text-cream-light/60">
            Upgrade to Pro and build without limits
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-2 divide-x divide-border bg-cream">
          {/* Free Plan */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-charcoal">Free</span>
            </div>
            <div className="mb-4">
              <span className="text-2xl font-bold text-charcoal">$0</span>
              <span className="text-sm text-muted">/month</span>
            </div>
            <ul className="space-y-2 mb-5">
              <li className="flex items-center gap-2 text-sm text-muted">
                <svg
                  className="w-4 h-4 text-muted/60 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                2 AI templates per day
              </li>
              <li className="flex items-center gap-2 text-sm text-muted">
                <svg
                  className="w-4 h-4 text-muted/60 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                8 pre-built templates
              </li>
              <li className="flex items-center gap-2 text-sm text-muted">
                <svg
                  className="w-4 h-4 text-muted/60 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                3 deployments per day
              </li>
            </ul>
            <div className="w-full py-2 text-center text-sm border border-border rounded-sm text-muted font-medium">
              Current Plan
            </div>
          </div>

          {/* Pro Plan */}
          <div className="p-5 relative">
            <div className="absolute top-0 right-0 px-3 py-1 bg-charcoal text-cream-light text-xs font-medium rounded-bl-lg">
              Most Popular
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-charcoal">Pro</span>
            </div>
            <div className="mb-4">
              <span className="text-2xl font-bold text-charcoal">$9</span>
              <span className="text-sm text-muted">/month</span>
            </div>
            <ul className="space-y-2 mb-5">
              <li className="flex items-center gap-2 text-sm text-charcoal">
                <svg
                  className="w-4 h-4 text-success shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="font-medium">Unlimited</span> AI templates
              </li>
              <li className="flex items-center gap-2 text-sm text-charcoal">
                <svg
                  className="w-4 h-4 text-success shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="font-medium">Unlimited</span> deployments
              </li>
              <li className="flex items-center gap-2 text-sm text-charcoal">
                <svg
                  className="w-4 h-4 text-success shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Priority generation
              </li>
              <li className="flex items-center gap-2 text-sm text-charcoal">
                <svg
                  className="w-4 h-4 text-success shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                All pro features
              </li>
            </ul>
            <button
              className="w-full py-2.5 text-center text-sm bg-charcoal text-cream-light rounded-md shadow-btn hover:opacity-85 active:opacity-80 transition-opacity font-medium"
              onClick={() => {
                toast("Pro upgrade coming soon!");
                onClose();
              }}
            >
              Upgrade to Pro →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
