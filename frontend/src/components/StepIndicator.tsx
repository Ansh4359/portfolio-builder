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
    <div className="steps">
      {steps.map((step, i) => (
        <div key={step.num} className="step-wrapper" style={{ display: "flex", alignItems: "center" }}>
          <div className={`step ${current === step.num ? "active" : ""} ${current > step.num ? "done" : ""}`}>
            <div className="step-num">
              {current > step.num ? "✓" : step.num}
            </div>
            <span className="step-label">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`step-connector ${current > step.num ? "done" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
}
