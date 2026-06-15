interface StepIndicatorProps {
  current: number;
}

const steps = [
  { num: 1, label: "Your Info" },
  { num: 2, label: "Pick Template" },
  { num: 3, label: "Deploy" },
];

export default function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className="flex justify-center gap-2 py-6">
      {steps.map((step, i) => {
        const isActive = current === step.num;
        const isDone = current > step.num;
        return (
          <div key={step.num} className="flex items-center">
            <div className={`flex items-center gap-2 ${isActive ? "" : isDone ? "" : ""}`}>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
                  isActive
                    ? "bg-charcoal text-cream-light"
                    : isDone
                      ? "bg-success text-white"
                      : "bg-charcoal/[0.04] text-muted"
                }`}
              >
                {isDone ? "✓" : step.num}
              </div>
              <span
                className={`text-sm ${
                  isActive ? "text-charcoal" : "text-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-10 h-0.5 mx-1 ${
                  isDone ? "bg-success" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
