import type { PortfolioData } from "../types";

export function generateCreative(data: PortfolioData): string {
  const esc = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#0c0a09;--fg:#fafaf9;--muted:#a8a29e;
    --accent:#facc15;--accent2:#f97316;
    --surface:#1c1917;--border:#292524;
  }
  html{scroll-behavior:smooth}
  body{
    font-family:'Syne',sans-serif;background:var(--bg);color:var(--fg);
    line-height:1.6;overflow-x:hidden;
  }
  .mono{font-family:'Space Mono',monospace;font-size:0.72em;letter-spacing:0.12em;text-transform:uppercase}
  a{color:var(--accent);text-decoration:none;transition:color 0.2s}
  a:hover{color:var(--accent2)}

  /* Hero */
  .hero{
    min-height:100vh;display:flex;flex-direction:column;
    justify-content:center;padding:60px clamp(24px,6vw,120px);
    position:relative;
  }
  .hero::before{
    content:'';position:absolute;top:-30%;right:-20%;
    width:600px;height:600px;border-radius:50%;
    background:radial-gradient(circle,rgba(250,204,21,0.12) 0%,transparent 70%);
    pointer-events:none;
  }
  .hero h1{
    font-size:clamp(3rem,10vw,8rem);font-weight:800;
    line-height:0.95;letter-spacing:-0.04em;
    background:linear-gradient(135deg,var(--fg) 40%,var(--accent));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
  }
  .hero .tagline{
    font-size:clamp(1rem,2.5vw,1.5rem);color:var(--muted);
    margin-top:16px;max-width:500px;
  }
  .hero .email-link{
    display:inline-block;margin-top:32px;padding:14px 32px;
    border:2px solid var(--accent);font-size:0.85rem;
    letter-spacing:0.08em;text-transform:uppercase;
    transition:all 0.3s;font-family:'Space Mono',monospace;
  }
  .hero .email-link:hover{
    background:var(--accent);color:var(--bg);text-decoration:none;
  }

  /* Sections */
  .section{
    padding:80px clamp(24px,6vw,120px);
    border-top:1px solid var(--border);
  }
  .section-label{
    font-size:0.8rem;margin-bottom:40px;
    display:flex;align-items:center;gap:16px;
  }
  .section-label::after{content:'';flex:1;height:1px;background:var(--border)}

  .about-text{font-size:1.2rem;max-width:600px;color:var(--muted);line-height:1.8}

  /* Experience */
  .exp-grid{display:grid;gap:40px}
  .exp-card{
    padding:32px;border:1px solid var(--border);
    transition:border-color 0.3s;
  }
  .exp-card:hover{border-color:var(--accent)}
  .exp-card h3{font-size:1.3rem;font-weight:700;margin-bottom:4px}
  .exp-card .meta{color:var(--accent);margin-bottom:12px}
  .exp-card p{color:var(--muted);font-size:0.95rem}

  /* Skills */
  .skills-wrap{display:flex;flex-wrap:wrap;gap:12px}
  .skill-pill{
    padding:8px 20px;border:1px solid var(--border);
    font-size:0.85rem;font-weight:600;
    transition:all 0.3s;cursor:default;
  }
  .skill-pill:hover{background:var(--accent);color:var(--bg);border-color:var(--accent)}

  /* Projects */
  .project-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}
  .project-card{
    background:var(--surface);padding:32px;border:1px solid var(--border);
    transition:transform 0.3s,border-color 0.3s;
  }
  .project-card:hover{transform:translateY(-4px);border-color:var(--accent)}
  .project-card h3{font-size:1.15rem;font-weight:700;margin-bottom:8px}
  .project-card p{color:var(--muted);font-size:0.9rem;margin-bottom:16px}
  .project-card .tech-tags{display:flex;flex-wrap:wrap;gap:6px}
  .project-card .tech-tags span{
    font-size:0.7rem;padding:3px 10px;
    border:1px solid var(--border);color:var(--accent);
  }

  /* Footer */
  footer{
    padding:60px clamp(24px,6vw,120px);
    display:flex;justify-content:space-between;align-items:center;
    flex-wrap:wrap;gap:20px;border-top:1px solid var(--border);
    color:var(--muted);font-size:0.85rem;
  }
  .social-links{display:flex;gap:24px}

  @media(max-width:600px){
    .hero h1{font-size:2.8rem}
    .project-grid{grid-template-columns:1fr}
  }
</style>
</head>
<body>
  <section class="hero">
    <p class="mono">${esc(data.title)}</p>
    <h1>${esc(data.name)}</h1>
    <p class="tagline">${esc(data.about).slice(0, 120)}${data.about.length > 120 ? "..." : ""}</p>
    <a href="mailto:${esc(data.email)}" class="email-link">Get in touch</a>
  </section>

  ${
    data.about.length > 120
      ? `<section class="section" id="about">
    <p class="section-label mono">About</p>
    <p class="about-text">${esc(data.about)}</p>
  </section>`
      : ""
  }

  ${
    data.experience.length
      ? `<section class="section" id="experience">
    <p class="section-label mono">Experience</p>
    <div class="exp-grid">
      ${data.experience
        .map(
          (e) => `
        <div class="exp-card">
          <h3>${esc(e.role)}</h3>
          <p class="meta mono">${esc(e.company)} · ${esc(e.period)}</p>
          <p>${esc(e.description)}</p>
        </div>`
        )
        .join("")}
    </div>
  </section>`
      : ""
  }

  ${
    data.skills.length
      ? `<section class="section" id="skills">
    <p class="section-label mono">Skills</p>
    <div class="skills-wrap">
      ${data.skills.map((s) => `<span class="skill-pill">${esc(s)}</span>`).join("")}
    </div>
  </section>`
      : ""
  }

  ${
    data.projects.length
      ? `<section class="section" id="projects">
    <p class="section-label mono">Projects</p>
    <div class="project-grid">
      ${data.projects
        .map(
          (p) => `
        <div class="project-card">
          <h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)} ↗</a>` : esc(p.name)}</h3>
          <p>${esc(p.description)}</p>
          <div class="tech-tags">
            ${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}
          </div>
        </div>`
        )
        .join("")}
    </div>
  </section>`
      : ""
  }

  <footer>
    <span>${esc(data.name)}</span>
    <div class="social-links mono">
      ${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}
      ${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}
      ${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ""}
      ${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Web</a>` : ""}
    </div>
  </footer>
</body>
</html>`;
}
