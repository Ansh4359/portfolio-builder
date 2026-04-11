import type { DeployRequest, DeployResponse, PreviewResponse, Template } from "./types";


const API_BASE = import.meta.env.VITE_API_BASE;
// const API_BASE = "http://localhost:3001/api";



export async function fetchTemplates(): Promise<Template[]> {
  const res = await fetch(`${API_BASE}/templates`);
  if (!res.ok) throw new Error("Failed to fetch templates");
  const data = await res.json();
  return data;
}

export async function fetchPreview(
  templateId: string,
  data: DeployRequest["data"]
): Promise<string> {
  const res = await fetch(`${API_BASE}/deploy/preview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ templateId, data }),
  });
  if (!res.ok) throw new Error("Failed to generate preview");
  const result: PreviewResponse = await res.json();
  return result.html;
}

export async function deployPortfolio(
  request: DeployRequest
): Promise<DeployResponse> {
  const res = await fetch(`${API_BASE}/deploy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  const result: DeployResponse = await res.json();
  if (!res.ok) {
    throw new Error(result.error || "Deployment failed");
  }
  return result;
}
