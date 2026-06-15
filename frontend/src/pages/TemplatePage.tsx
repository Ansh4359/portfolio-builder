import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import TemplateCard from "../components/TemplateCard";
import SubdomainInput from "../components/SubdomainInput";
import { fetchTemplates, fetchPreview, checkSubdomain } from "../api";
import type { PortfolioData, Template } from "../types";

interface TemplatePageProps {
  data: PortfolioData;
  selectedTemplate: string;
  subdomain: string;
  onTemplateChange: (id: string) => void;
  onSubdomainChange: (subdomain: string) => void;
}

export default function TemplatePage({
  data,
  selectedTemplate,
  subdomain,
  onTemplateChange,
  onSubdomainChange,
}: TemplatePageProps) {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [checkStatus, setCheckStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    fetchTemplates().then(setTemplates).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedTemplate) return;
    setPreviewLoading(true);
    fetchPreview(selectedTemplate, data)
      .then(setPreviewHtml)
      .catch(console.error)
      .finally(() => setPreviewLoading(false));
  }, [selectedTemplate, data]);

  useEffect(() => {
    clearTimeout(timerRef.current);

    if (subdomain.length < 3) {
      setCheckStatus("idle");
      return;
    }

    setCheckStatus("checking");
    timerRef.current = setTimeout(async () => {
      try {
        const available = await checkSubdomain(subdomain);
        setCheckStatus(available ? "available" : "taken");
      } catch {
        setCheckStatus("idle");
      }
    }, 400);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [subdomain]);

  const canDeploy = selectedTemplate && checkStatus === "available";

  return (
    <div className="py-6 pb-[60px] flex-1">
      <div className="max-w-[1200px] mx-auto px-6">
        <StepIndicator current={2} />
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-semibold mb-2 tracking-[-0.5px]">Choose your style</h1>
          <p className="text-muted">Pick a template and set your subdomain</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {templates.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              selected={selectedTemplate === t.id}
              onSelect={() => onTemplateChange(t.id)}
            />
          ))}
        </div>

        <SubdomainInput
          value={subdomain}
          onChange={onSubdomainChange}
        />

        {checkStatus === "checking" && (
          <div className="text-sm text-muted mt-1.5">
            Checking availability...
          </div>
        )}
        {checkStatus === "available" && (
          <div className="text-sm text-success mt-1.5">
            ✓ Available — your site will be at https://{subdomain}.vercel.app
          </div>
        )}
        {checkStatus === "taken" && (
          <div className="text-sm text-error mt-1.5">
            ✗ Already taken — try a different name
          </div>
        )}

        {selectedTemplate && (
          <div className="bg-cream border border-border rounded-xl overflow-hidden mb-6 mt-4">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-normal">Preview: {templates.find((t) => t.id === selectedTemplate)?.name}</h3>
              {previewLoading && <span className="text-sm text-muted">Loading...</span>}
            </div>
            {previewHtml ? (
              <iframe
                className="w-full h-[500px] border-none"
                srcDoc={previewHtml}
                title="Template Preview"
              />
            ) : (
              <div className="p-10 text-center text-muted">
                {previewLoading ? "Generating preview..." : "Select a template to see preview"}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between gap-4 mt-8">
          <button
            className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-base hover:opacity-80 transition-opacity"
            onClick={() => navigate("/create")}
          >
            ← Back to Info
          </button>
          <button
            className="bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-base shadow-btn hover:opacity-85 active:opacity-80 transition-opacity disabled:bg-border disabled:text-muted disabled:shadow-none disabled:opacity-100 disabled:cursor-not-allowed"
            disabled={!canDeploy}
            onClick={() => navigate("/deploy")}
          >
            {checkStatus === "available" ? "Deploy Now →" : checkStatus === "checking" ? "Checking..." : "Enter Subdomain"}
          </button>
        </div>
      </div>
    </div>
  );
}
