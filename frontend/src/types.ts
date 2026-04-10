export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  tech: string[];
}

export interface Socials {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  about: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  socials: Socials;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

export interface DeployRequest {
  data: PortfolioData;
  templateId: string;
  subdomain?: string;
}

export interface DeployResponse {
  success: boolean;
  url: string;
  deploymentId: string;
  projectName: string;
  error?: string;
  suggestion?: string;
}

export interface PreviewResponse {
  html: string;
}

export function emptyPortfolio(): PortfolioData {
  return {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    skills: [],
    experience: [],
    education: [],
    projects: [],
    socials: {},
  };
}

export function emptyExperience(): Experience {
  return { company: "", role: "", period: "", description: "" };
}

export function emptyEducation(): Education {
  return { school: "", degree: "", period: "" };
}

export function emptyProject(): Project {
  return { name: "", description: "", url: "", tech: [] };
}
