import { useState } from "react";
import type { AIUsage } from "../types";
import UpgradeModal from "./UpgradeModal";

interface CreditsBadgeProps {
  aiUsage: AIUsage | null;
  timeUntilReset: string;
}

export default function CreditsBadge({
  aiUsage,
  timeUntilReset,
}: CreditsBadgeProps) {
  const [showUpgrade, setShowUpgrade] = useState(false);

  if (!aiUsage) return null;

  return (
    <>
      <div className="bg-cream border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-charcoal">
              AI Credits
            </span>
            {aiUsage.limit && (
              <span className="text-xs text-muted">
                Resets in {timeUntilReset}
              </span>
            )}
          </div>
          {aiUsage.limit && aiUsage.remaining === 0 && (
            <button
              className="text-xs px-3 py-1 bg-charcoal text-cream-light rounded-full hover:opacity-80 transition-opacity font-medium"
              onClick={() => setShowUpgrade(true)}
            >
              Upgrade to Pro
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {aiUsage.limit
              ? Array.from({ length: aiUsage.limit }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i < (aiUsage.used ?? 0)
                        ? "bg-charcoal"
                        : "bg-charcoal/[0.15]"
                    }`}
                  />
                ))
              : null}
          </div>
          <p className="text-sm text-muted">
            {aiUsage.limit
              ? `${aiUsage.remaining ?? 0} of ${aiUsage.limit} remaining`
              : "Unlimited (Pro)"}
          </p>
        </div>
      </div>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </>
  );
}
