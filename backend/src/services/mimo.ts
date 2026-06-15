import type { PortfolioData } from "../types/index.js";

const SYSTEM_PROMPT = `You are a resume parser. Extract the following information from the resume text and return it as a JSON object with exactly this structure. Return ONLY the JSON object, no other text, no markdown fences.

{
  "name": "Full name",
  "title": "Current job title or professional title",
  "email": "Email address",
  "phone": "Phone number or null",
  "location": "City, State/Country or null",
  "about": "Professional summary (2-3 sentences max)",
  "skills": ["skill1", "skill2"],
  "experience": [
    {
      "company": "Company name",
      "role": "Job title",
      "period": "Start — End",
      "description": "Key responsibilities and achievements"
    }
  ],
  "education": [
    {
      "school": "Institution name",
      "degree": "Degree and major",
      "period": "Start — End"
    }
  ],
  "projects": [
    {
      "name": "Project name",
      "description": "What it does",
      "url": "GitHub/live URL or null",
      "tech": ["tech1", "tech2"]
    }
  ],
  "socials": {
    "github": "URL or null",
    "linkedin": "URL or null",
    "twitter": "URL or null",
    "website": "URL or null"
  }
}

If a field is not found in the resume, use null for optional fields and empty string/array for required fields. Always return valid JSON.`;

export async function parseResumeWithAI(
  resumeText: string
): Promise<PortfolioData> {
  const MIMO_API_URL =
    process.env.MIMO_API_URL ||
    "https://api.xiaomimimo.com/v1/chat/completions";
  const MIMO_API_KEY = process.env.MIMO_API_KEY || "";
  const MIMO_MODEL = process.env.MIMO_MODEL || "mimo-v2.5-pro";

  if (!MIMO_API_KEY) {
    throw new Error(
      "MIMO_API_KEY is not set. Add it to backend/.env"
    );
  }

  const truncatedText = resumeText.slice(0, 12000);

  const response = await fetch(MIMO_API_URL, {
    method: "POST",
    headers: {
      "api-key": MIMO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MIMO_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Parse this resume and return the JSON object:\n\n---\n${truncatedText}\n---`,
        },
      ],
      stream: false,
      max_completion_tokens: 2048,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("[mimo] API error:", response.status, errText);
    throw new Error(`Mimo API error: ${response.status}`);
  }

  const data = await response.json();
  const content: string =
    data.choices?.[0]?.message?.content || "";

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("[mimo] No JSON found in response:", content);
    throw new Error("AI did not return valid JSON");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  return {
    name: parsed.name || "",
    title: parsed.title || "",
    email: parsed.email || "",
    phone: parsed.phone || undefined,
    location: parsed.location || undefined,
    about: parsed.about || "",
    skills: Array.isArray(parsed.skills) ? parsed.skills : [],
    experience: Array.isArray(parsed.experience) ? parsed.experience : [],
    education: Array.isArray(parsed.education) ? parsed.education : [],
    projects: Array.isArray(parsed.projects) ? parsed.projects : [],
    socials: parsed.socials || {},
  };
}

const TEMPLATE_SYSTEM_PROMPT = `You are a portfolio template generator. Generate a complete, self-contained HTML page for a developer portfolio.

Requirements:
- Single HTML file with all CSS and JS embedded in <style> and <script> tags
- Responsive design that works on mobile and desktop
- Include sections: header/hero, about, experience, skills, projects, contact/footer
- Use Google Fonts (include <link> tag in <head>)
- Use CSS variables for colors
- Make it visually distinctive based on the user's description
- The template must be production-ready and visually polished

The template MUST use these JavaScript template literals for dynamic data. Use backticks and \${} syntax:
- \${esc(data.name)} - Full name
- \${esc(data.title)} - Job title
- \${esc(data.email)} - Email
- \${esc(data.phone)} - Phone (optional)
- \${esc(data.location)} - Location (optional)
- \${esc(data.about)} - About text
- \${data.skills.map(s => '<span class="skill">' + esc(s) + '</span>').join('')} - Skills array
- \${data.experience.map(e => '<div class="exp"><h3>' + esc(e.role) + '</h3><p>' + esc(e.company) + ' · ' + esc(e.period) + '</p><p>' + esc(e.description) + '</p></div>').join('')} - Experience array
- \${data.education.map(e => '<div class="edu"><h3>' + esc(e.degree) + '</h3><p>' + esc(e.school) + ' · ' + esc(e.period) + '</p></div>').join('')} - Education array
- \${data.projects.map(p => '<div class="project"><h3>' + esc(p.name) + '</h3><p>' + esc(p.description) + '</p><div class="tech">' + p.tech.map(t => '<span>' + esc(t) + '</span>').join('') + '</div></div>').join('')} - Projects array

You MUST include this esc function at the beginning of the script:
const esc = s => s ? String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';

Return a JSON object with exactly two fields:
- "name": A short descriptive name for the template style (2-4 words, e.g., "Dark Neon", "Clean Minimal")
- "html": The complete HTML template string (must be valid HTML)

Return ONLY the JSON object, no other text, no markdown fences.`;

export async function generateTemplateWithAI(
  prompt: string
): Promise<{ name: string; html: string }> {
  const MIMO_API_URL =
    process.env.MIMO_API_URL ||
    "https://api.xiaomimimo.com/v1/chat/completions";
  const MIMO_API_KEY = process.env.MIMO_API_KEY || "";
  const MIMO_MODEL = process.env.MIMO_MODEL || "mimo-v2.5-pro";

  if (!MIMO_API_KEY) {
    throw new Error("MIMO_API_KEY is not set. Add it to backend/.env");
  }

  const response = await fetch(MIMO_API_URL, {
    method: "POST",
    headers: {
      "api-key": MIMO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MIMO_MODEL,
      messages: [
        { role: "system", content: TEMPLATE_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate a portfolio template based on this description:\n\n${prompt}`,
        },
      ],
      stream: false,
      max_completion_tokens: 4096,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("[mimo] Template API error:", response.status, errText);
    throw new Error(`Mimo API error: ${response.status}`);
  }

  const data = await response.json();
  const content: string = data.choices?.[0]?.message?.content || "";

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("[mimo] No JSON found in template response:", content);
    throw new Error("AI did not return valid JSON");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  if (!parsed.html || !parsed.name) {
    throw new Error("AI response missing required fields (name, html)");
  }

  return {
    name: parsed.name,
    html: parsed.html,
  };
}
