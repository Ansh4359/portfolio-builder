import type {
  DeployRequest,
  DeployResponse,
  PreviewResponse,
  Template,
} from "./types";
import { auth } from "./config/firebase";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001/api";

async function getAuthToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
}

async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

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
  const res = await fetchWithAuth(`${API_BASE}/deploy/preview`, {
    method: "POST",
    body: JSON.stringify({ templateId, data }),
  });
  if (!res.ok) throw new Error("Failed to generate preview");
  const result: PreviewResponse = await res.json();
  return result.html;
}

export async function deployPortfolio(
  request: DeployRequest
): Promise<DeployResponse> {
  const res = await fetchWithAuth(`${API_BASE}/deploy`, {
    method: "POST",
    body: JSON.stringify(request),
  });
  const result: DeployResponse = await res.json();
  if (!res.ok) {
    throw new Error(result.error || "Deployment failed");
  }
  return result;
}

export async function checkSubdomain(subdomain: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/deploy/check/${subdomain}`);
  const data = await res.json();
  return data.available;
}
