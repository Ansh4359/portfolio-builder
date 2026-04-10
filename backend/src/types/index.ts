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

export interface DeployRequest {
  data: PortfolioData;
  templateId: string;
  subdomain?: string;
}

export interface VercelFile {
  file: string;        // pathname
  sha: string;         // sha256 hex
  size: number;
}

export interface VercelDeploymentPayload {
  name: string;
  files: VercelFile[];
  projectSettings: {
    framework: null;
  };
  target?: string;
}
