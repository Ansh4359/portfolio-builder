import type { PortfolioData } from "../types";

export function generateModern(data: PortfolioData): string {
  const esc = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#fefefe;--fg:#18181b;--muted:#71717a;
    --accent:#6d28d9;--accent-light:#ede9fe;
    --surface:#f4f4f5;--border:#e4e4e7;
  }
  html{scroll-behavior:smooth}
  body{
    font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--fg);
    line-height:1.7;font-size:16px;
  }
  a{color:var(--accent);text-decoration:none}
  a:hover{text-decoration:underline}

  nav{
    position:sticky;top:0;z-index:100;
    background:rgba(254,254,254,0.85);backdrop-filter:blur(12px);
    border-bottom:1px solid var(--border);
    padding:16px clamp(24px,5vw,80px);
    display:flex;justify-content:space-between;align-items:center;
  }
  nav .logo{font-family:'Instrument Serif',serif;font-size:1.3rem;color:var(--fg)}
  nav .nav-links{display:flex;gap:28px;font-size:0.85rem;font-weight:500}
  nav .nav-links a{color:var(--muted);transition:color 0.2s}
  nav .nav-links a:hover{color:var(--fg);text-decoration:none}

  .hero{padding:100px clamp(24px,5vw,80px) 80px;max-width:900px}
  .hero .eyebrow{
    display:inline-block;padding:6px 16px;
    background:var(--accent-light);color:var(--accent);
    border-radius:20px;font-size:0.8rem;font-weight:600;margin-bottom:20px;
  }
  .hero h1{
    font-family:'Instrument Serif',serif;
    font-size:clamp(2.5rem,6vw,4.5rem);line-height:1.1;
    letter-spacing:-0.02em;margin-bottom:20px;
  }
  .hero h1 em{font-style:italic;color:var(--accent)}
  .hero .lead{font-size:1.1rem;color:var(--muted);max-width:560px;margin-bottom:32px}
  .hero .cta-row{display:flex;gap:12px;flex-wrap:wrap}
  .btn{
    display:inline-block;padding:12px 28px;border-radius:8px;
    font-size:0.9rem;font-weight:600;transition:all 0.2s;
  }
  .btn-primary{background:var(--accent);color:white}
  .btn-primary:hover{background:#5b21b6;text-decoration:none}
  .btn-outline{border:1.5px solid var(--border);color:var(--fg)}
  .btn-outline:hover{border-color:var(--fg);text-decoration:none}

  .section{padding:80px clamp(24px,5vw,80px);max-width:900px}
  .section-head{margin-bottom:40px}
  .section-head h2{font-family:'Instrument Serif',serif;font-size:2rem}
  .section-head p{color:var(--muted);margin-top:6px;font-size:0.95rem}

  .exp-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
  .exp-card{
    background:var(--surface);border-radius:12px;padding:28px;
    border:1px solid transparent;transition:all 0.25s;
  }
  .exp-card:hover{border-color:var(--accent);transform:translateY(-2px)}
  .exp-card .role{font-weight:600;font-size:1.05rem;margin-bottom:2px}
  .exp-card .company{color:var(--accent);font-size:0.9rem;margin-bottom:2px}
  .exp-card .period{color:var(--muted);font-size:0.8rem;margin-bottom:12px}
  .exp-card p{font-size:0.9rem;color:var(--muted)}

  .skills-cloud{display:flex;flex-wrap:wrap;gap:10px}
  .skill-chip{
    padding:8px 20px;border-radius:24px;background:var(--surface);
    font-size:0.85rem;font-weight:500;border:1px solid var(--border);transition:all 0.2s;
  }
  .skill-chip:hover{background:var(--accent-light);color:var(--accent);border-color:transparent}

  .project-showcase{display:grid;gap:24px}
  .project-card{
    display:grid;grid-template-columns:1fr auto;gap:20px;align-items:start;
    padding:28px;border:1px solid var(--border);border-radius:12px;transition:border-color 0.2s;
  }
  .project-card:hover{border-color:var(--accent)}
  .project-card h3{font-size:1.1rem;font-weight:600;margin-bottom:6px}
  .project-card p{font-size:0.9rem;color:var(--muted);margin-bottom:12px}
  .project-card .tech-pills{display:flex;flex-wrap:wrap;gap:6px}
  .project-card .tech-pills span{
    font-size:0.72rem;padding:3px 10px;
    background:var(--accent-light);color:var(--accent);border-radius:12px;
  }
  .project-card .link-arrow{
    font-size:1.2rem;color:var(--muted);transition:color 0.2s,transform 0.2s;
  }
  .project-card:hover .link-arrow{color:var(--accent);transform:translate(3px,-3px)}

  footer{
    padding:60px clamp(24px,5vw,80px);border-top:1px solid var(--border);
    display:flex;justify-content:space-between;align-items:center;
    flex-wrap:wrap;gap:16px;color:var(--muted);font-size:0.85rem;
  }
  .footer-links{display:flex;gap:20px}
  .footer-links a{color:var(--muted);transition:color 0.2s}
  .footer-links a:hover{color:var(--accent)}

  @media(max-width:600px){
    .hero{padding:60px 20px 40px}
    .project-card{grid-template-columns:1fr}
    nav .nav-links{gap:16px;font-size:0.8rem}
  }
</style>
</head>
<body>
  <nav>
    <span class="logo">${esc(data.name)}</span>
    <div class="nav-links">
      <a href="#about">About</a>
      ${data.experience.length ? `<a href="#experience">Work</a>` : ""}
      ${data.projects.length ? `<a href="#projects">Projects</a>` : ""}
      <a href="mailto:${esc(data.email)}">Contact</a>
    </div>
  </nav>

  <section class="hero">
    <span class="eyebrow">${esc(data.title)}</span>
    <h1>Hi, I'm <em>${esc(data.name.split(" ")[0])}</em>.</h1>
    <p class="lead">${esc(data.about).slice(0, 160)}${data.about.length > 160 ? "..." : ""}</p>
    <div class="cta-row">
      <a href="mailto:${esc(data.email)}" class="btn btn-primary">Say hello</a>
      ${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank" class="btn btn-outline">GitHub</a>` : ""}
    </div>
  </section>

  ${
    data.about.length > 160
      ? `<section class="section" id="about">
    <div class="section-head"><h2>About Me</h2></div>
    <p style="color:var(--muted);max-width:640px">${esc(data.about)}</p>
  </section>`
      : ""
  }

  ${
    data.experience.length
      ? `<section class="section" id="experience">
    <div class="section-head"><h2>Experience</h2><p>Where I've worked</p></div>
    <div class="exp-cards">
      ${data.experience
        .map(
          (e) => `
        <div class="exp-card">
          <div class="role">${esc(e.role)}</div>
          <div class="company">${esc(e.company)}</div>
          <div class="period">${esc(e.period)}</div>
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
    <div class="section-head"><h2>Skills</h2><p>Technologies I work with</p></div>
    <div class="skills-cloud">
      ${data.skills.map((s) => `<span class="skill-chip">${esc(s)}</span>`).join("")}
    </div>
  </section>`
      : ""
  }

  ${
    data.projects.length
      ? `<section class="section" id="projects">
    <div class="section-head"><h2>Projects</h2><p>Things I've built</p></div>
    <div class="project-showcase">
      ${data.projects
        .map(
          (p) => `
        <div class="project-card">
          <div>
            <h3>${esc(p.name)}</h3>
            <p>${esc(p.description)}</p>
            <div class="tech-pills">
              ${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}
            </div>
          </div>
          ${p.url ? `<a href="${esc(p.url)}" target="_blank" class="link-arrow">↗</a>` : ""}
        </div>`
        )
        .join("")}
    </div>
  </section>`
      : ""
  }

  <footer>
    <span>${esc(data.name)}</span>
    <div class="footer-links">
      ${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}
      ${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}
      ${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ""}
      ${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Website</a>` : ""}
    </div>
  </footer>
</body>
</html>`;
}
