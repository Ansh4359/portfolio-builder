import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import TemplateCard from "../components/TemplateCard";
import SubdomainInput from "../components/SubdomainInput";
import { fetchTemplates, fetchPreview } from "../api";
import type { PortfolioData, Template } from "../types";

interface TemplatePageProps {
  data: PortfolioData;
  selectedTemplate: string;
  subdomain: string;
  onTemplateChange: (id: string) => void;
  onSubdomainChange: (subdomain: string) => void;
}

const API_BASE = "https://api.ansh-dev.me/api";
// const API_BASE = "http://64.227.175.36:3001/api";

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
  const abortRef = useRef<AbortController>(undefined);

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
    abortRef.current?.abort();

    if (subdomain.length < 3) {
      setCheckStatus("idle");
      return;
    }

    setCheckStatus("checking");
    timerRef.current = setTimeout(async () => {
      abortRef.current = new AbortController();
      try {
        const res = await fetch(
          `${API_BASE}/deploy/check/${subdomain}`,
          { signal: abortRef.current.signal }
        );
        const result = await res.json();
        setCheckStatus(result.available ? "available" : "taken");
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setCheckStatus("idle");
        }
      }
    }, 400);

    return () => {
      clearTimeout(timerRef.current);
      abortRef.current?.abort();
    };
  }, [subdomain]);

  const canDeploy = selectedTemplate && checkStatus === "available";

  return (
    <div className="page">
      <div className="container">
        <StepIndicator current={2} />
        <div className="page-header">
          <h1>Choose your style</h1>
          <p>Pick a template and set your subdomain</p>
        </div>

        <div className="template-grid">
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
          <div className="subdomain-status" style={{ color: "var(--text-muted)" }}>
            Checking availability...
          </div>
        )}
        {checkStatus === "available" && (
          <div className="subdomain-status available">
            ✓ Available — your site will be at https://{subdomain}.vercel.app
          </div>
        )}
        {checkStatus === "taken" && (
          <div className="subdomain-status taken">
            ✗ Already taken — try a different name
          </div>
        )}

        {selectedTemplate && (
          <div className="preview-container">
            <div className="preview-header">
              <h3>Preview: {templates.find((t) => t.id === selectedTemplate)?.name}</h3>
              {previewLoading && <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Loading...</span>}
            </div>
            {previewHtml ? (
              <iframe
                className="preview-iframe"
                srcDoc={previewHtml}
                title="Template Preview"
              />
            ) : (
              <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>
                {previewLoading ? "Generating preview..." : "Select a template to see preview"}
              </div>
            )}
          </div>
        )}

        <div className="page-actions">
          <button className="btn btn-outline" onClick={() => navigate("/")}>
            ← Back to Info
          </button>
          <button
            className="btn btn-primary"
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
