import type { PortfolioData } from "../types";
import { generateMinimal } from "./minimal";
import { generateCreative } from "./creative";
import { generateDeveloper } from "./developer";
import { generateModern } from "./modern";
import { generateElegant } from "./elegant";
import { generateGlass } from "./glass";
import { generateMono } from "./mono";
import { generateSunset } from "./sunset";

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
  {
    id: "elegant",
    name: "Elegant",
    description: "Luxurious dark theme with gold accents and timeline layout",
    thumbnail: "linear-gradient(135deg, #0f0d0a 0%, #1a1714 50%, #d4a853 150%)",
    generate: generateElegant,
  },
  {
    id: "glass",
    name: "Glass",
    description: "Glassmorphism design with frosted panels and animated background",
    thumbnail: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #7c6aef 150%)",
    generate: generateGlass,
  },
  {
    id: "mono",
    name: "Mono",
    description: "Monochrome typographic design with clean tabular layout",
    thumbnail: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #111111 150%)",
    generate: generateMono,
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm gradient theme with bold typography and glowing accents",
    thumbnail: "linear-gradient(135deg, #1a0f0a 0%, #2a1a12 50%, #ff6b35 150%)",
    generate: generateSunset,
  },
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
