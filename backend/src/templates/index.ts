import type { PortfolioData } from "../types";
import { generateMinimal } from "./minimal";
import { generateCreative } from "./creative";
import { generateDeveloper } from "./developer";
import { generateModern } from "./modern";

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  generate: (data: PortfolioData) => string;
}

export const templates: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, elegant design with serif typography and warm tones",
    thumbnail: "linear-gradient(135deg, #faf8f4 0%, #f0ece4 100%)",
    generate: generateMinimal,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold dark theme with dramatic typography and vibrant accents",
    thumbnail: "linear-gradient(135deg, #0c0a09 0%, #1c1917 50%, #facc15 150%)",
    generate: generateCreative,
  },
  {
    id: "developer",
    name: "Developer",
    description: "GitHub-inspired sidebar layout with terminal aesthetics",
    thumbnail: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #58a6ff 150%)",
    generate: generateDeveloper,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with soft gradients and refined spacing",
    thumbnail: "linear-gradient(135deg, #fefefe 0%, #ede9fe 50%, #6d28d9 150%)",
    generate: generateModern,
  },
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
