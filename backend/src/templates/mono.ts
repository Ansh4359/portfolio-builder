import type { PortfolioData } from "../types";

export function generateMono(data: PortfolioData): string {
  const esc = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#ffffff;--fg:#111111;--muted:#666666;
    --accent:#111111;--border:#e0e0e0;--surface:#f7f7f7;
  }
  html{scroll-behavior:smooth}
  body{
    font-family:'Space Grotesk',sans-serif;
    background:var(--bg);color:var(--fg);
    line-height:1.6;
  }
  .mono{font-family:'JetBrains Mono',monospace;font-size:0.75em;letter-spacing:0.08em;text-transform:uppercase}
  a{color:var(--fg);text-decoration:none;border-bottom:1px solid var(--fg);transition:opacity 0.3s}
  a:hover{opacity:0.5}

  .container{max-width:840px;margin:0 auto;padding:0 32px}

  /* Header */
  header{
    padding:80px 0 40px;
    border-bottom:3px solid var(--fg);
  }
  header .top-row{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px}
  header h1{font-size:clamp(2.5rem,7vw,5rem);font-weight:700;letter-spacing:-0.04em;line-height:1}
  header .title-block{text-align:right}
  header .title-block .role{font-size:1.1rem;font-weight:500}
  header .title-block .contact{color:var(--muted);margin-top:8px}
  header .title-block .contact a{border-bottom:none;color:var(--muted)}
  header .title-block .contact a:hover{color:var(--fg)}
  .divider{width:100%;height:3px;background:var(--fg);margin:40px 0}

  /* Section */
  .section{padding:48px 0}
  .section-label{
    font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;
    font-weight:700;margin-bottom:28px;
    display:flex;align-items:center;gap:12px;
  }
  .section-label::after{content:'';flex:1;height:1px;background:var(--border)}

  /* About */
  .about-text{font-size:1.1rem;max-width:600px;color:var(--muted)}

  /* Experience */
  .exp-table{width:100%}
  .exp-row{
    display:grid;grid-template-columns:140px 1fr auto;gap:16px;
    padding:20px 0;border-bottom:1px solid var(--border);
    align-items:baseline;
  }
  .exp-row:last-child{border-bottom:none}
  .exp-row .company{font-weight:600;font-size:0.95rem}
  .exp-row .role{color:var(--muted);font-size:0.9rem}
  .exp-row .period{
    font-family:'JetBrains Mono',monospace;font-size:0.75rem;
    color:var(--muted);text-align:right;white-space:nowrap;
  }

  /* Education */
  .edu-row{
    display:grid;grid-template-columns:1fr auto;gap:16px;
    padding:16px 0;border-bottom:1px solid var(--border);
    align-items:baseline;
  }
  .edu-row:last-child{border-bottom:none}
  .edu-row h3{font-size:1rem;font-weight:600}
  .edu-row .detail{font-size:0.85rem;color:var(--muted)}

  /* Skills */
  .skills-wrap{display:flex;flex-wrap:wrap;gap:8px}
  .skill-tag{
    padding:6px 14px;border:1px solid var(--fg);font-size:0.8rem;
    font-weight:500;transition:all 0.3s;
  }
  .skill-tag:hover{background:var(--fg);color:var(--bg)}

  /* Projects */
  .project-list{}
  .project-item{
    padding:24px 0;border-bottom:1px solid var(--border);
    display:grid;grid-template-columns:1fr auto;gap:20px;align-items:start;
  }
  .project-item:last-child{border-bottom:none}
  .project-item h3{font-size:1.1rem;font-weight:600;margin-bottom:6px}
  .project-item h3 a{border-bottom:1px solid var(--fg)}
  .project-item p{color:var(--muted);font-size:0.9rem}
  .project-item .tech-col{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}
  .project-item .tech-col span{
    font-family:'JetBrains Mono',monospace;font-size:0.65rem;
    padding:2px 8px;background:var(--surface);color:var(--muted);
  }

  /* Footer */
  footer{
    padding:48px 0;border-top:3px solid var(--fg);
    display:flex;justify-content:space-between;align-items:center;
    flex-wrap:wrap;gap:16px;
  }
  footer .name{font-weight:700;font-size:1.1rem}
  .footer-links{display:flex;gap:20px}
  .footer-links a{font-size:0.8rem;border-bottom:none;color:var(--muted)}
  .footer-links a:hover{color:var(--fg)}

  @media(max-width:600px){
    header h1{font-size:2rem}
    .exp-row{grid-template-columns:1fr;gap:4px}
    .exp-row .period{text-align:left}
    .project-item{grid-template-columns:1fr}
    .project-item .tech-col{justify-content:flex-start}
  }
</style>
</head>
<body>
  <div class="container">
    <header>
      <div class="top-row">
        <h1>${esc(data.name)}</h1>
        <div class="title-block">
          <p class="role">${esc(data.title)}</p>
          <p class="contact mono">
            <a href="mailto:${esc(data.email)}">${esc(data.email)}</a>
            ${data.location ? ` · ${esc(data.location)}` : ""}
          </p>
        </div>
      </div>
    </header>

    <section class="section">
      <p class="section-label mono">About</p>
      <p class="about-text">${esc(data.about)}</p>
    </section>

    ${
      data.experience.length
        ? `<section class="section">
      <p class="section-label mono">Experience</p>
      <div class="exp-table">
        ${data.experience
          .map(
            (e) => `
          <div class="exp-row">
            <span class="company">${esc(e.company)}</span>
            <span class="role">${esc(e.role)} — ${esc(e.description)}</span>
            <span class="period">${esc(e.period)}</span>
          </div>`
          )
          .join("")}
      </div>
    </section>`
        : ""
    }

    ${
      data.education.length
        ? `<section class="section">
      <p class="section-label mono">Education</p>
      ${data.education
        .map(
          (e) => `
        <div class="edu-row">
          <h3>${esc(e.degree)} — ${esc(e.school)}</h3>
          <span class="detail mono">${esc(e.period)}</span>
        </div>`
        )
        .join("")}
    </section>`
        : ""
    }

    ${
      data.skills.length
        ? `<section class="section">
      <p class="section-label mono">Skills</p>
      <div class="skills-wrap">
        ${data.skills.map((s) => `<span class="skill-tag">${esc(s)}</span>`).join("")}
      </div>
    </section>`
        : ""
    }

    ${
      data.projects.length
        ? `<section class="section">
      <p class="section-label mono">Projects</p>
      <div class="project-list">
        ${data.projects
          .map(
            (p) => `
          <div class="project-item">
            <div>
              <h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)}</a>` : esc(p.name)}</h3>
              <p>${esc(p.description)}</p>
            </div>
            <div class="tech-col">
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
      <span class="name">${esc(data.name)}</span>
      <div class="footer-links mono">
        ${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}
        ${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}
        ${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ""}
        ${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Website</a>` : ""}
      </div>
    </footer>
  </div>
</body>
</html>`;
}
