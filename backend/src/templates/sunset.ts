import type { PortfolioData } from "../types";

export function generateSunset(data: PortfolioData): string {
  const esc = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#1a0f0a;--fg:#fef0e6;--muted:#c4a88e;
    --accent:#ff6b35;--accent2:#f7c59f;--accent3:#e8445a;
    --surface:#2a1a12;--border:#3d2a1e;
  }
  html{scroll-behavior:smooth}
  body{
    font-family:'Sora',sans-serif;background:var(--bg);color:var(--fg);
    line-height:1.6;overflow-x:hidden;
  }
  .mono{font-family:'Fira Code',monospace;font-size:0.72em;letter-spacing:0.06em}
  a{color:var(--accent2);text-decoration:none;transition:color 0.3s}
  a:hover{color:var(--accent)}

  .container{max-width:960px;margin:0 auto;padding:0 28px}

  /* Hero */
  .hero{
    min-height:100vh;display:flex;align-items:center;
    position:relative;overflow:hidden;
  }
  .hero::before{
    content:'';position:absolute;top:-30%;right:-10%;
    width:600px;height:600px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,107,53,0.2) 0%,rgba(232,68,90,0.1) 40%,transparent 70%);
    filter:blur(40px);
  }
  .hero::after{
    content:'';position:absolute;bottom:-20%;left:-10%;
    width:400px;height:400px;border-radius:50%;
    background:radial-gradient(circle,rgba(247,197,159,0.1) 0%,transparent 70%);
    filter:blur(30px);
  }
  .hero-content{position:relative;z-index:1;max-width:600px}
  .hero .greeting{
    font-size:0.85rem;color:var(--accent);font-weight:500;
    margin-bottom:16px;letter-spacing:0.05em;
  }
  .hero h1{
    font-size:clamp(2.5rem,7vw,4.5rem);font-weight:700;
    line-height:1.1;letter-spacing:-0.03em;margin-bottom:12px;
  }
  .hero h1 span{
    background:linear-gradient(135deg,var(--accent),var(--accent3));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
  }
  .hero .subtitle{font-size:1.15rem;color:var(--muted);margin-bottom:32px;max-width:480px}
  .hero .contacts{
    display:flex;gap:16px;flex-wrap:wrap;
  }
  .hero .contacts a{
    padding:10px 22px;border:1px solid var(--border);border-radius:8px;
    font-size:0.82rem;font-weight:500;transition:all 0.3s;
  }
  .hero .contacts a:hover{border-color:var(--accent);color:var(--accent);text-decoration:none}

  /* Section */
  .section{padding:80px 0}
  .section-tag{
    font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;
    color:var(--accent);font-weight:600;margin-bottom:12px;
  }
  .section-title{font-size:1.8rem;font-weight:600;margin-bottom:40px}

  /* About */
  .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
  .about-text{font-size:1.05rem;color:var(--muted);line-height:1.8}
  .about-stats{display:grid;gap:20px}
  .stat-card{
    padding:24px;background:var(--surface);border:1px solid var(--border);border-radius:12px;
  }
  .stat-card .label{font-size:0.75rem;color:var(--accent);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px}
  .stat-card .value{font-size:1.2rem;font-weight:600}

  /* Experience */
  .exp-cards{display:grid;gap:16px}
  .exp-card{
    padding:28px 32px;background:var(--surface);border:1px solid var(--border);
    border-radius:12px;transition:all 0.3s;
  }
  .exp-card:hover{border-color:var(--accent);transform:translateX(4px)}
  .exp-card .exp-top{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px;margin-bottom:8px}
  .exp-card h3{font-size:1.1rem;font-weight:600}
  .exp-card .period{
    font-family:'Fira Code',monospace;font-size:0.75rem;color:var(--accent);
  }
  .exp-card .company{color:var(--accent2);font-size:0.9rem;margin-bottom:8px}
  .exp-card p{color:var(--muted);font-size:0.9rem}

  /* Education */
  .edu-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
  .edu-card{
    padding:24px;background:var(--surface);border:1px solid var(--border);
    border-radius:12px;transition:border-color 0.3s;
  }
  .edu-card:hover{border-color:var(--accent)}
  .edu-card h3{font-size:1rem;font-weight:600;margin-bottom:4px}
  .edu-card .detail{font-size:0.85rem;color:var(--muted)}

  /* Skills */
  .skills-cloud{display:flex;flex-wrap:wrap;gap:10px}
  .skill-bubble{
    padding:8px 20px;border-radius:100px;font-size:0.82rem;font-weight:500;
    background:linear-gradient(135deg,rgba(255,107,53,0.1),rgba(232,68,90,0.1));
    border:1px solid var(--border);transition:all 0.3s;
  }
  .skill-bubble:hover{border-color:var(--accent);color:var(--accent)}

  /* Projects */
  .projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}
  .project-card{
    background:var(--surface);border:1px solid var(--border);border-radius:12px;
    overflow:hidden;transition:all 0.4s;
  }
  .project-card:hover{border-color:var(--accent);transform:translateY(-4px)}
  .project-card .card-bar{
    height:4px;background:linear-gradient(90deg,var(--accent),var(--accent3));
  }
  .project-card .card-body{padding:28px}
  .project-card h3{font-size:1.05rem;font-weight:600;margin-bottom:8px}
  .project-card p{color:var(--muted);font-size:0.88rem;margin-bottom:16px}
  .project-card .tech-list{display:flex;flex-wrap:wrap;gap:6px}
  .project-card .tech-list span{
    font-size:0.68rem;padding:3px 10px;border-radius:6px;
    background:rgba(255,107,53,0.08);color:var(--accent2);
    font-family:'Fira Code',monospace;
  }

  /* Footer */
  footer{
    padding:60px 0;border-top:1px solid var(--border);
    display:flex;justify-content:space-between;align-items:center;
    flex-wrap:wrap;gap:16px;
  }
  footer .name{font-weight:600;font-size:1.1rem}
  .footer-socials{display:flex;gap:16px}
  .footer-socials a{
    width:40px;height:40px;border-radius:50%;border:1px solid var(--border);
    display:flex;align-items:center;justify-content:center;
    font-size:0.75rem;font-weight:600;transition:all 0.3s;
  }
  .footer-socials a:hover{border-color:var(--accent);color:var(--accent);text-decoration:none}

  @media(max-width:768px){
    .hero h1{font-size:2.2rem}
    .about-grid{grid-template-columns:1fr}
    .projects-grid{grid-template-columns:1fr}
  }
</style>
</head>
<body>
  <section class="hero">
    <div class="hero-content container">
      <p class="greeting mono">Hello, I'm</p>
      <h1><span>${esc(data.name)}</span></h1>
      <p class="subtitle">${esc(data.title)} — ${esc(data.about).slice(0, 100)}${data.about.length > 100 ? "..." : ""}</p>
      <div class="contacts">
        <a href="mailto:${esc(data.email)}">${esc(data.email)}</a>
        ${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}
        ${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}
      </div>
    </div>
  </section>

  <main class="container">
    <section class="section" id="about">
      <p class="section-tag mono">01 // About</p>
      <h2 class="section-title">About Me</h2>
      <div class="about-grid">
        <p class="about-text">${esc(data.about)}</p>
        <div class="about-stats">
          ${data.skills.length ? `<div class="stat-card"><p class="label mono">Skills</p><p class="value">${data.skills.length}+</p></div>` : ""}
          ${data.projects.length ? `<div class="stat-card"><p class="label mono">Projects</p><p class="value">${data.projects.length}</p></div>` : ""}
          ${data.experience.length ? `<div class="stat-card"><p class="label mono">Experience</p><p class="value">${data.experience.length} Roles</p></div>` : ""}
        </div>
      </div>
    </section>

    ${
      data.experience.length
        ? `<section class="section" id="experience">
      <p class="section-tag mono">02 // Experience</p>
      <h2 class="section-title">Work History</h2>
      <div class="exp-cards">
        ${data.experience
          .map(
            (e) => `
          <div class="exp-card">
            <div class="exp-top">
              <h3>${esc(e.role)}</h3>
              <span class="period">${esc(e.period)}</span>
            </div>
            <p class="company">${esc(e.company)}</p>
            <p>${esc(e.description)}</p>
          </div>`
          )
          .join("")}
      </div>
    </section>`
        : ""
    }

    ${
      data.education.length
        ? `<section class="section" id="education">
      <p class="section-tag mono">03 // Education</p>
      <h2 class="section-title">Education</h2>
      <div class="edu-cards">
        ${data.education
          .map(
            (e) => `
          <div class="edu-card">
            <h3>${esc(e.degree)}</h3>
            <p class="detail">${esc(e.school)} · ${esc(e.period)}</p>
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
      <p class="section-tag mono">04 // Skills</p>
      <h2 class="section-title">Tech Stack</h2>
      <div class="skills-cloud">
        ${data.skills.map((s) => `<span class="skill-bubble">${esc(s)}</span>`).join("")}
      </div>
    </section>`
        : ""
    }

    ${
      data.projects.length
        ? `<section class="section" id="projects">
      <p class="section-tag mono">05 // Projects</p>
      <h2 class="section-title">Featured Work</h2>
      <div class="projects-grid">
        ${data.projects
          .map(
            (p) => `
          <div class="project-card">
            <div class="card-bar"></div>
            <div class="card-body">
              <h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)}</a>` : esc(p.name)}</h3>
              <p>${esc(p.description)}</p>
              <div class="tech-list">
                ${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}
              </div>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </section>`
        : ""
    }
  </main>

  <footer>
    <span class="name">${esc(data.name)}</span>
    <div class="footer-socials">
      ${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank" title="GitHub">GH</a>` : ""}
      ${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank" title="LinkedIn">LI</a>` : ""}
      ${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank" title="Twitter">TW</a>` : ""}
      ${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank" title="Website">WB</a>` : ""}
    </div>
  </footer>
</body>
</html>`;
}
