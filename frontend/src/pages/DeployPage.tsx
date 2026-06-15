import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import StepIndicator from "../components/StepIndicator";
import { deployPortfolio } from "../api";
import type { PortfolioData } from "../types";

interface DeployPageProps {
  data: PortfolioData;
  selectedTemplate: string;
  subdomain: string;
}

type DeployState = "confirm" | "deploying" | "success" | "error";

const inputCls =
  "flex-1 border-none outline-none bg-transparent text-sm text-charcoal";

export default function DeployPage({ data, selectedTemplate, subdomain }: DeployPageProps) {
  const navigate = useNavigate();
  const [state, setState] = useState<DeployState>("confirm");
  const [url, setUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!selectedTemplate || !subdomain) {
    navigate("/");
    return null;
  }

  const handleDeploy = async () => {
    setState("deploying");
    try {
      const res = await deployPortfolio({
        data,
        templateId: selectedTemplate,
        subdomain,
      });
      setUrl(res.url);
      setState("success");
      toast.success("Portfolio deployed!");
    } catch (err: any) {
      setErrorMsg(err.message);
      setState("error");
      toast.error("Deployment failed");
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied!");
  };

  return (
    <div className="py-6 pb-[60px] flex-1">
      <div className="max-w-[1200px] mx-auto px-6">
        <StepIndicator current={3} />

        {/* Confirm */}
        {state === "confirm" && (
          <div className="text-center p-10">
            <h2 className="text-xl font-semibold mb-2">Ready to deploy</h2>
            <p className="text-muted mt-2">Your portfolio will be live at:</p>
            <div className="flex items-center gap-2 bg-cream border border-border rounded-sm p-3 mx-auto max-w-[500px] mt-4">
              <input className={inputCls} value={`https://${subdomain}.vercel.app`} readOnly />
            </div>
            <div className="mt-6 bg-cream border border-border rounded-sm p-4 text-left max-w-[400px] mx-auto">
              <p className="text-sm text-muted mb-2">
                <strong className="text-charcoal">Details</strong>
              </p>
              <p className="text-sm">Name: {data.name}</p>
              <p className="text-sm">Template: {selectedTemplate}</p>
              <p className="text-sm">Subdomain: {subdomain}</p>
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <button
                className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-base hover:opacity-80 transition-opacity"
                onClick={() => navigate("/template")}
              >
                ← Back
              </button>
              <button
                className="bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-base shadow-btn hover:opacity-85 active:opacity-80 transition-opacity"
                onClick={handleDeploy}
              >
                Deploy Now
              </button>
            </div>
          </div>
        )}

        {/* Deploying */}
        {state === "deploying" && (
          <div className="text-center py-[60px] px-5">
            <div className="w-12 h-12 border-3 border-border border-t-charcoal rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-semibold">Deploying your portfolio...</h2>
            <p className="text-muted mt-2">Setting up {subdomain}.vercel.app</p>
          </div>
        )}

        {/* Success */}
        {state === "success" && (
          <div className="text-center p-10">
            <div className="w-16 h-16 bg-success-bg text-success rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              ✓
            </div>
            <h2 className="text-xl font-semibold">Your portfolio is live!</h2>
            <p className="text-muted mt-2">Your site is now accessible to anyone</p>
            <div className="flex items-center gap-2 bg-cream border border-border rounded-sm p-3 mx-auto max-w-[500px] mt-4">
              <input className={inputCls} value={url} readOnly />
              <button
                className="bg-charcoal text-cream-light px-4 py-2 rounded-sm text-xs shadow-btn hover:opacity-85 transition-opacity border-none"
                onClick={copyUrl}
              >
                Copy
              </button>
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-base shadow-btn hover:opacity-85 transition-opacity no-underline inline-flex items-center"
              >
                View Site →
              </a>
              <button
                className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-base hover:opacity-80 transition-opacity"
                onClick={() => navigate("/create")}
              >
                Create Another
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {state === "error" && (
          <div className="text-center p-10">
            <div className="w-16 h-16 bg-error-bg text-error rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              ✗
            </div>
            <h2 className="text-xl font-semibold">Deployment failed</h2>
            <p className="text-muted mt-2 max-w-[400px] mx-auto">{errorMsg}</p>
            <div className="mt-6 flex gap-3 justify-center">
              <button
                className="bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-base shadow-btn hover:opacity-85 active:opacity-80 transition-opacity"
                onClick={handleDeploy}
              >
                Retry
              </button>
              <button
                className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-base hover:opacity-80 transition-opacity"
                onClick={() => navigate("/template")}
              >
                Change Subdomain
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
