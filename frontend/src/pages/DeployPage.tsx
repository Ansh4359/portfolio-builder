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
    <div className="page">
      <div className="container">
        <StepIndicator current={3} />

        {/* Confirm */}
        {state === "confirm" && (
          <div className="deploy-success">
            <h2>Ready to deploy</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 8 }}>
              Your portfolio will be live at:
            </p>
            <div className="deploy-url" style={{ marginTop: 16 }}>
              <input value={`https://${subdomain}.vercel.app`} readOnly />
            </div>
            <div style={{
              marginTop: 24,
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: 16,
              textAlign: "left",
              maxWidth: 400,
              margin: "24px auto",
            }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 8 }}>
                <strong style={{ color: "var(--text)" }}>Details</strong>
              </p>
              <p style={{ fontSize: "0.85rem" }}>Name: {data.name}</p>
              <p style={{ fontSize: "0.85rem" }}>Template: {selectedTemplate}</p>
              <p style={{ fontSize: "0.85rem" }}>Subdomain: {subdomain}</p>
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="btn btn-outline" onClick={() => navigate("/template")}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={handleDeploy}>
                Deploy Now
              </button>
            </div>
          </div>
        )}

        {/* Deploying */}
        {state === "deploying" && (
          <div className="deploy-status">
            <div className="deploy-spinner" />
            <h2>Deploying your portfolio...</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 8 }}>
              Setting up {subdomain}.vercel.app
            </p>
          </div>
        )}

        {/* Success */}
        {state === "success" && (
          <div className="deploy-success">
            <div className="check-icon">✓</div>
            <h2>Your portfolio is live!</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 8 }}>
              Your site is now accessible to anyone
            </p>
            <div className="deploy-url">
              <input value={url} readOnly />
              <button onClick={copyUrl}>Copy</button>
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View Site →
              </a>
              <button className="btn btn-outline" onClick={() => navigate("/")}>
                Create Another
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {state === "error" && (
          <div className="deploy-error">
            <div className="error-icon">✗</div>
            <h2>Deployment failed</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 8, maxWidth: 400, margin: "8px auto" }}>
              {errorMsg}
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="btn btn-primary" onClick={handleDeploy}>
                Retry
              </button>
              <button className="btn btn-outline" onClick={() => navigate("/template")}>
                Change Subdomain
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
