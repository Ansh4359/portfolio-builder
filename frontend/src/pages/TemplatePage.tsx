import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import StepIndicator from "../components/StepIndicator";
import TemplateCard from "../components/TemplateCard";
import SubdomainInput from "../components/SubdomainInput";
import UpgradeModal from "../components/UpgradeModal";
import {
  fetchTemplates,
  fetchPreview,
  checkSubdomain,
  generateAITemplate,
  fetchAIUsage,
  fetchAIHistory,
  fetchAITemplate,
} from "../api";
import type { PortfolioData, Template, AITemplateInfo, AIUsage } from "../types";

function renderAITemplate(htmlTemplate: string, data: PortfolioData): string {
  try {
    const esc = (s: string) => (s ? String(s).replace(/</g, "&lt;").replace(/>/g, "&gt;") : "");
    const fn = new Function("data", "esc", `return \`${htmlTemplate}\`;`);
    return fn(data, esc);
  } catch (err) {
    console.error("Template render error:", err);
    return htmlTemplate;
  }
}

const examplePrompts = [
  "Minimal and clean with lots of whitespace",
  "Dark theme with neon accents and sidebar",
  "Colorful gradient background with modern cards",
  "Corporate professional with timeline layout",
  "Glassmorphism with frosted panels",
  "Retro vintage inspired with serif fonts",
];

interface TemplatePageProps {
  data: PortfolioData;
  selectedTemplate: string;
  subdomain: string;
  onTemplateChange: (id: string) => void;
  onSubdomainChange: (subdomain: string) => void;
  isEdit?: boolean;
}

export default function TemplatePage({
  data,
  selectedTemplate,
  subdomain,
  onTemplateChange,
  onSubdomainChange,
  isEdit,
}: TemplatePageProps) {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [checkStatus, setCheckStatus] = useState<"idle" | "checking" | "available" | "taken" | "owned">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // AI Template Builder state
  const [mode, setMode] = useState<"prebuilt" | "ai">("prebuilt");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [aiPreviewHtml, setAiPreviewHtml] = useState("");
  const [aiPreviewName, setAiPreviewName] = useState("");
  const [aiPreviewId, setAiPreviewId] = useState("");
  const [aiUsage, setAiUsage] = useState<AIUsage | null>(null);
  const [aiHistory, setAiHistory] = useState<AITemplateInfo[]>([]);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTemplates().then(setTemplates).catch(console.error);
    fetchAIUsage().then(setAiUsage).catch(() => {});
  }, []);

  useEffect(() => {
    if (mode === "ai") {
      fetchAIHistory().then(setAiHistory).catch(() => {});
    }
  }, [mode]);

  useEffect(() => {
    if (!selectedTemplate || mode === "ai") return;
    setPreviewLoading(true);
    fetchPreview(selectedTemplate, data)
      .then(setPreviewHtml)
      .catch(console.error)
      .finally(() => setPreviewLoading(false));
  }, [selectedTemplate, data, mode]);

  // Smooth scroll to preview when template is selected
  useEffect(() => {
    if (selectedTemplate && mode === "prebuilt" && previewRef.current) {
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [selectedTemplate, mode]);

  useEffect(() => {
    clearTimeout(timerRef.current);

    if (subdomain.length < 3) {
      setCheckStatus("idle");
      return;
    }

    setCheckStatus("checking");
    timerRef.current = setTimeout(async () => {
      try {
        const result = await checkSubdomain(subdomain);
        if (result.owned) {
          setCheckStatus("owned");
        } else {
          setCheckStatus(result.available ? "available" : "taken");
        }
      } catch {
        setCheckStatus("idle");
      }
    }, 400);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [subdomain]);

  const handleGenerate = async () => {
    const trimmedPrompt = prompt.trim();
    const wordCount = trimmedPrompt.split(/\s+/).length;

    if (!trimmedPrompt || trimmedPrompt.length < 3) {
      toast.error("Please enter a prompt with at least 3 characters");
      return;
    }
    if (wordCount > 40) {
      toast.error("Prompt must be 40 words or less");
      return;
    }

    setGenerating(true);
    setAiPreviewHtml("");
    setAiPreviewName("");
    setAiPreviewId("");

    // Optimistic update - decrement credits immediately
    setAiUsage((prev) =>
      prev && prev.limit
        ? {
            ...prev,
            used: (prev.used ?? 0) + 1,
            remaining: Math.max(0, (prev.remaining ?? 1) - 1),
          }
        : prev
    );

    try {
      const result = await generateAITemplate(trimmedPrompt);
      const renderedHtml = renderAITemplate(result.html, data);
      setAiPreviewHtml(renderedHtml);
      setAiPreviewName(result.name);
      setAiPreviewId(result.id);
      onTemplateChange(`ai-${result.id}`);

      // Update with actual server value
      setAiUsage((prev) =>
        prev ? { ...prev, remaining: result.remaining } : prev
      );

      setAiHistory((prev) => [
        { _id: result.id, name: result.name, prompt: trimmedPrompt, createdAt: new Date().toISOString() },
        ...prev,
      ]);

      // Notify Navbar to re-fetch credits
      window.dispatchEvent(new Event("credits-updated"));

      toast.success(`Template "${result.name}" generated!`);
    } catch (err: any) {
      // Revert optimistic update on failure
      setAiUsage((prev) =>
        prev && prev.limit
          ? {
              ...prev,
              used: Math.max(0, (prev.used ?? 1) - 1),
              remaining: (prev.remaining ?? 0) + 1,
            }
          : prev
      );

      if (err.message?.includes("limit reached")) {
        setShowUpgrade(true);
      }
      toast.error(err.message || "Failed to generate template");
    } finally {
      setGenerating(false);
    }
  };

  const handleUseAiTemplate = () => {
    if (aiPreviewId) {
      onTemplateChange(`ai-${aiPreviewId}`);
    }
  };

  const handleLoadHistoryTemplate = async (id: string) => {
    try {
      const tpl = await fetchAITemplate(id);
      const renderedHtml = renderAITemplate(tpl.html, data);
      setAiPreviewHtml(renderedHtml);
      setAiPreviewName(tpl.name);
      setAiPreviewId(tpl.id);
      onTemplateChange(`ai-${id}`);
    } catch {
      toast.error("Failed to load template");
    }
  };

  const handleModeChange = (newMode: "prebuilt" | "ai") => {
    setMode(newMode);
    if (newMode === "prebuilt" && selectedTemplate.startsWith("ai-")) {
      onTemplateChange("");
      setAiPreviewHtml("");
      setAiPreviewName("");
      setAiPreviewId("");
    } else if (newMode === "ai" && selectedTemplate && !selectedTemplate.startsWith("ai-")) {
      onTemplateChange("");
    }
  };

  const canDeploy = selectedTemplate && (checkStatus === "available" || checkStatus === "owned");

  return (
    <div className="py-6 pb-[60px] flex-1">
      <div className="max-w-[1200px] mx-auto px-6">
        <StepIndicator current={2} />
        <div className="text-center mb-6">
          <h1 className="text-[28px] font-semibold mb-2 tracking-[-0.5px]">
            Choose your style
          </h1>
          <p className="text-muted">
            Pick a pre-built template or describe one with AI
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-3 mb-6 justify-center">
          <button
            className={`px-5 py-2 rounded-sm text-sm transition-opacity ${
              mode === "prebuilt"
                ? "bg-charcoal text-cream-light shadow-btn"
                : "border border-border-interactive text-charcoal hover:opacity-80"
            }`}
            onClick={() => handleModeChange("prebuilt")}
          >
            Pre-built Templates
          </button>
          <button
            className={`px-5 py-2 rounded-sm text-sm transition-opacity ${
              mode === "ai"
                ? "bg-charcoal text-cream-light shadow-btn"
                : "border border-border-interactive text-charcoal hover:opacity-80"
            }`}
            onClick={() => handleModeChange("ai")}
          >
            AI Template Builder
          </button>
        </div>

        {mode === "prebuilt" ? (
          <>
            {/* Pre-built Templates */}
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

            <SubdomainInput value={subdomain} onChange={onSubdomainChange} disabled={checkStatus === "owned"} />

            {checkStatus === "checking" && (
              <div className="text-sm text-muted mt-1.5">
                Checking availability...
              </div>
            )}
            {checkStatus === "available" && (
              <div className="text-sm text-success mt-1.5">
                ✓ Available — your site will be at https://{subdomain}.myfolio.codes
              </div>
            )}
            {checkStatus === "owned" && (
              <div className="text-sm text-success mt-1.5">
                ✓ Your subdomain — https://{subdomain}.myfolio.codes will be updated
              </div>
            )}
            {checkStatus === "taken" && (
              <div className="text-sm text-error mt-1.5">
                ✗ Already taken — try a different name
              </div>
            )}

            {selectedTemplate && !selectedTemplate.startsWith("ai-") && (
              <div ref={previewRef} className="bg-cream border border-border rounded-xl overflow-hidden mb-6 mt-4 scroll-mt-20">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <h3 className="text-sm font-normal">
                    Preview: {templates.find((t) => t.id === selectedTemplate)?.name}
                  </h3>
                  {previewLoading && (
                    <span className="text-sm text-muted">Loading...</span>
                  )}
                </div>
                {previewHtml ? (
                  <iframe
                    className="w-full h-[500px] border-none"
                    srcDoc={previewHtml}
                    title="Template Preview"
                  />
                ) : (
                  <div className="p-10 text-center text-muted">
                    {previewLoading
                      ? "Generating preview..."
                      : "Select a template to see preview"}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {/* AI Template Builder */}
            <div className="bg-cream border border-border rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Describe Your Template
              </h3>
              <textarea
                className="w-full p-3 border border-border rounded-sm bg-cream text-charcoal placeholder:text-muted resize-y min-h-[100px] focus:outline-none focus:border-blue-500/50 focus:ring-3 focus:ring-blue-500/15 transition-[box-shadow,border-color]"
                placeholder="Describe your template in 3+ words (max 40 words)..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex justify-between mt-1">
                <span className={`text-xs ${
                  prompt.trim().split(/\s+/).filter(Boolean).length > 40
                    ? "text-error"
                    : prompt.trim().split(/\s+/).filter(Boolean).length > 35
                      ? "text-amber-600"
                      : "text-muted"
                }`}>
                  {prompt.trim() ? prompt.trim().split(/\s+/).filter(Boolean).length : 0}/40 words
                </span>
                {prompt.trim().split(/\s+/).filter(Boolean).length > 35 &&
                  prompt.trim().split(/\s+/).filter(Boolean).length <= 40 && (
                    <span className="text-xs text-amber-600">Approaching limit</span>
                )}
                {prompt.trim().split(/\s+/).filter(Boolean).length > 40 && (
                  <span className="text-xs text-error">Limit exceeded</span>
                )}
              </div>

              {/* Example Prompts */}
              <div className="mt-3">
                <p className="text-xs text-muted mb-2">💡 Try these:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((ep) => (
                    <button
                      key={ep}
                      className="text-xs px-3 py-1.5 border border-border rounded-full text-muted hover:border-border-interactive hover:text-charcoal transition-colors"
                      onClick={() => setPrompt(ep)}
                    >
                      {ep}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upgrade Prompt */}
              {aiUsage?.limit && aiUsage.remaining === 0 && (
                <div className="mt-4 p-3 bg-charcoal/[0.03] rounded-lg border border-border flex items-center justify-between">
                  <p className="text-sm text-muted">
                    You've used all free generations today
                  </p>
                  <button
                    className="text-xs px-3 py-1.5 bg-charcoal text-cream-light rounded-full hover:opacity-80 transition-opacity font-medium"
                    onClick={() => setShowUpgrade(true)}
                  >
                    Upgrade to Pro
                  </button>
                </div>
              )}

              {/* Generate Button */}
              <button
                className="mt-4 bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-sm shadow-btn hover:opacity-85 active:opacity-80 transition-opacity disabled:bg-border disabled:text-muted disabled:shadow-none disabled:opacity-100 disabled:cursor-not-allowed"
                onClick={handleGenerate}
                disabled={
                  !prompt.trim() ||
                  prompt.trim().length < 3 ||
                  prompt.trim().split(/\s+/).filter(Boolean).length > 40 ||
                  generating ||
                  (aiUsage?.remaining !== null && aiUsage?.remaining === 0)
                }
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-border border-t-charcoal rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  "Generate Template"
                )}
              </button>
            </div>

            {/* AI Preview */}
            {aiPreviewHtml && (
              <div className={`bg-cream border rounded-xl overflow-hidden mb-6 ${
                selectedTemplate === `ai-${aiPreviewId}` ? "border-charcoal" : "border-border"
              }`}>
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium">
                      Preview: {aiPreviewName}
                    </h3>
                    {selectedTemplate === `ai-${aiPreviewId}` && (
                      <span className="text-xs px-2 py-0.5 bg-charcoal text-cream-light rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                  <button
                    className={`text-xs px-3 py-1.5 rounded-sm transition-opacity ${
                      selectedTemplate === `ai-${aiPreviewId}`
                        ? "bg-charcoal/[0.04] text-muted border border-border"
                        : "bg-charcoal text-cream-light shadow-btn hover:opacity-80"
                    }`}
                    onClick={handleUseAiTemplate}
                  >
                    {selectedTemplate === `ai-${aiPreviewId}` ? "Selected" : "Use This Template"}
                  </button>
                </div>
                <iframe
                  className="w-full h-[500px] border-none"
                  srcDoc={aiPreviewHtml}
                  title="AI Template Preview"
                />
              </div>
            )}

            {/* My AI Templates */}
            {aiHistory.length > 0 && (
              <div className="bg-cream border border-border rounded-xl p-6 mb-6">
                <h3 className="text-base font-semibold mb-4 pb-3 border-b border-border">
                  My AI Templates
                </h3>
                <div className="space-y-2">
                  {aiHistory.slice(0, 5).map((t) => (
                    <div
                      key={t._id}
                      className="flex items-center justify-between p-3 border border-border rounded-sm hover:border-border-interactive transition-colors cursor-pointer"
                      onClick={() => handleLoadHistoryTemplate(t._id)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-charcoal truncate">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted truncate">
                          {t.prompt}
                        </p>
                      </div>
                      <span className="text-xs text-muted ml-4 whitespace-nowrap">
                        {getTimeAgo(t.createdAt)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <SubdomainInput value={subdomain} onChange={onSubdomainChange} disabled={checkStatus === "owned"} />

            {checkStatus === "checking" && (
              <div className="text-sm text-muted mt-1.5">
                Checking availability...
              </div>
            )}
            {checkStatus === "available" && (
              <div className="text-sm text-success mt-1.5">
                ✓ Available — your site will be at https://{subdomain}.myfolio.codes
              </div>
            )}
            {checkStatus === "owned" && (
              <div className="text-sm text-success mt-1.5">
                ✓ Your subdomain — https://{subdomain}.myfolio.codes will be updated
              </div>
            )}
            {checkStatus === "taken" && (
              <div className="text-sm text-error mt-1.5">
                ✗ Already taken — try a different name
              </div>
            )}
          </>
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
            onClick={() => navigate("/deploy", { state: { isEdit: checkStatus === "owned" } })}
          >
            {checkStatus === "owned"
              ? "Update Portfolio →"
              : checkStatus === "available"
                ? "Deploy Now →"
                : checkStatus === "checking"
                  ? "Checking..."
                  : "Enter Subdomain"}
          </button>
        </div>
      </div>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
