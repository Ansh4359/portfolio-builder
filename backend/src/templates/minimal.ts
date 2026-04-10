import type { PortfolioData } from "../types";

export function generateMinimal(data: PortfolioData): string {
  const esc = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,700;1,300&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#faf8f4;--fg:#1a1a1a;--muted:#7a7570;--accent:#c45d3e;
    --surface:#f0ece4;--border:#e0dbd3;
  }
  html{scroll-behavior:smooth}
  body{
    font-family:'Cormorant Garamond',Georgia,serif;
    background:var(--bg);color:var(--fg);
    line-height:1.7;font-size:18px;
  }
  .mono{font-family:'DM Mono',monospace;font-size:0.75em;letter-spacing:0.05em;text-transform:uppercase}
  a{color:var(--accent);text-decoration:none}
  a:hover{text-decoration:underline}

  /* Layout */
  .container{max-width:720px;margin:0 auto;padding:0 24px}
  header{padding:100px 0 60px;text-align:center}
  header h1{font-size:3.2rem;font-weight:300;letter-spacing:-0.02em;margin-bottom:8px}
  header .subtitle{color:var(--muted);margin-bottom:24px}
  header .contacts{display:flex;gap:20px;justify-content:center;flex-wrap:wrap}
  header .contacts a{color:var(--muted);transition:color 0.2s}
  header .contacts a:hover{color:var(--accent);text-decoration:none}

  section{padding:50px 0;border-top:1px solid var(--border)}
  section h2{font-size:1.1rem;margin-bottom:30px;color:var(--accent)}

  .about-text{font-size:1.15rem;font-weight:300;max-width:600px}

  /* Experience */
  .exp-item{margin-bottom:32px}
  .exp-item .exp-header{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px}
  .exp-item h3{font-size:1.25rem;font-weight:500}
  .exp-item .period{color:var(--muted)}
  .exp-item .company{color:var(--muted);margin-bottom:6px}
  .exp-item p{font-size:0.95rem;color:#4a4540}

  /* Education */
  .edu-item{margin-bottom:20px}
  .edu-item h3{font-size:1.1rem;font-weight:500}
  .edu-item .detail{color:var(--muted)}

  /* Skills */
  .skills-grid{display:flex;flex-wrap:wrap;gap:10px}
  .skill-tag{
    padding:6px 16px;border:1px solid var(--border);border-radius:2px;
    font-size:0.85rem;transition:all 0.2s;
  }
  .skill-tag:hover{border-color:var(--accent);color:var(--accent)}

  /* Projects */
  .project-item{margin-bottom:36px;padding-bottom:36px;border-bottom:1px solid var(--border)}
  .project-item:last-child{border-bottom:none}
  .project-item h3{font-size:1.2rem;font-weight:500;margin-bottom:6px}
  .project-item p{color:#4a4540;margin-bottom:10px;font-size:0.95rem}
  .project-tech{display:flex;flex-wrap:wrap;gap:8px}
  .project-tech span{
    font-size:0.75rem;padding:3px 10px;
    background:var(--surface);border-radius:2px;
  }

  footer{padding:60px 0;text-align:center;color:var(--muted);font-size:0.85rem}

  @media(max-width:600px){
    header h1{font-size:2.2rem}
    header{padding:60px 0 40px}
    section{padding:36px 0}
  }
</style>
</head>
<body>
  <header>
    <div class="container">
      <h1>${esc(data.name)}</h1>
      <p class="subtitle mono">${esc(data.title)}</p>
      <div class="contacts mono">
        <a href="mailto:${esc(data.email)}">${esc(data.email)}</a>
        ${data.phone ? `<span>${esc(data.phone)}</span>` : ""}
        ${data.location ? `<span>${esc(data.location)}</span>` : ""}
      </div>
    </div>
  </header>

  <main class="container">
    <section id="about">
      <h2 class="mono">About</h2>
      <p class="about-text">${esc(data.about)}</p>
    </section>

    ${
      data.experience.length
        ? `<section id="experience">
      <h2 class="mono">Experience</h2>
      ${data.experience
        .map(
          (e) => `
        <div class="exp-item">
          <div class="exp-header">
            <h3>${esc(e.role)}</h3>
            <span class="period mono">${esc(e.period)}</span>
          </div>
          <div class="company mono">${esc(e.company)}</div>
          <p>${esc(e.description)}</p>
        </div>`
        )
        .join("")}
    </section>`
        : ""
    }

    ${
      data.education.length
        ? `<section id="education">
      <h2 class="mono">Education</h2>
      ${data.education
        .map(
          (e) => `
        <div class="edu-item">
          <h3>${esc(e.degree)}</h3>
          <div class="detail mono">${esc(e.school)} · ${esc(e.period)}</div>
        </div>`
        )
        .join("")}
    </section>`
        : ""
    }

    ${
      data.skills.length
        ? `<section id="skills">
      <h2 class="mono">Skills</h2>
      <div class="skills-grid">
        ${data.skills.map((s) => `<span class="skill-tag">${esc(s)}</span>`).join("")}
      </div>
    </section>`
        : ""
    }

    ${
      data.projects.length
        ? `<section id="projects">
      <h2 class="mono">Projects</h2>
      ${data.projects
        .map(
          (p) => `
        <div class="project-item">
          <h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)}</a>` : esc(p.name)}</h3>
          <p>${esc(p.description)}</p>
          <div class="project-tech">
            ${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}
          </div>
        </div>`
        )
        .join("")}
    </section>`
        : ""
    }

    ${
      Object.values(data.socials).some(Boolean)
        ? `<section id="socials">
      <h2 class="mono">Links</h2>
      <div class="contacts mono">
        ${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}
        ${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}
        ${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ""}
        ${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Website</a>` : ""}
      </div>
    </section>`
        : ""
    }
  </main>

  <footer>
    <div class="container">
      <p>${esc(data.name)} · Built with Portfolio Builder</p>
    </div>
  </footer>
</body>
</html>`;
}
