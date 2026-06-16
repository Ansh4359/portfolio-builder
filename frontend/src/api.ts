import type {
  AccountInfo,
  AITemplateInfo,
  AIUsage,
  DeployRequest,
  DeployResponse,
  PortfolioData,
  Portfolio,
  PreviewResponse,
  SubdomainCheck,
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

export async function checkSubdomain(subdomain: string): Promise<SubdomainCheck> {
  const res = await fetchWithAuth(`${API_BASE}/deploy/check/${subdomain}`);
  const data = await res.json();
  return data;
}

export async function fetchProfile(): Promise<PortfolioData | null> {
  const res = await fetchWithAuth(`${API_BASE}/profile`);
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function saveProfile(data: PortfolioData): Promise<void> {
  const res = await fetchWithAuth(`${API_BASE}/profile`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save profile");
}

export async function uploadResume(file: File): Promise<PortfolioData> {
  const token = await getAuthToken();
  const formData = new FormData();
  formData.append("resume", file);

  const res = await fetch(`${API_BASE}/profile/resume`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to parse resume");
  }
  return res.json();
}

export async function fetchAccountInfo(): Promise<AccountInfo> {
  const res = await fetchWithAuth(`${API_BASE}/auth/me`);
  if (!res.ok) throw new Error("Failed to fetch account info");
  return res.json();
}

export async function generateAITemplate(
  prompt: string
): Promise<{ id: string; html: string; name: string; remaining: number | null }> {
  const res = await fetchWithAuth(`${API_BASE}/templates/generate`, {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to generate template");
  }
  return res.json();
}

export async function fetchAIUsage(): Promise<AIUsage> {
  const res = await fetchWithAuth(`${API_BASE}/templates/ai-usage`);
  if (!res.ok) throw new Error("Failed to fetch AI usage");
  return res.json();
}

export async function fetchAIHistory(): Promise<AITemplateInfo[]> {
  const res = await fetchWithAuth(`${API_BASE}/templates/ai-history`);
  if (!res.ok) throw new Error("Failed to fetch AI history");
  return res.json();
}

export async function fetchAITemplate(id: string): Promise<{ id: string; name: string; html: string }> {
  const res = await fetchWithAuth(`${API_BASE}/templates/ai/${id}`);
  if (!res.ok) throw new Error("Failed to fetch AI template");
  return res.json();
}

export async function fetchPortfolios(): Promise<Portfolio[]> {
  const res = await fetchWithAuth(`${API_BASE}/portfolios`);
  if (!res.ok) throw new Error("Failed to fetch portfolios");
  return res.json();
}

export async function fetchPortfolio(id: string): Promise<Portfolio> {
  const res = await fetchWithAuth(`${API_BASE}/portfolios/${id}`);
  if (!res.ok) throw new Error("Failed to fetch portfolio");
  return res.json();
}
