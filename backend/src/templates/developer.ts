import type { PortfolioData } from "../types";

export function generateDeveloper(data: PortfolioData): string {
  const esc = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#0d1117;--fg:#c9d1d9;--muted:#8b949e;
    --accent:#58a6ff;--green:#3fb950;--orange:#d29922;
    --surface:#161b22;--border:#30363d;
    --code-bg:#1c2128;
  }
  html{scroll-behavior:smooth}
  body{
    font-family:'IBM Plex Sans',sans-serif;background:var(--bg);color:var(--fg);
    line-height:1.65;font-size:15px;
  }
  code,.mono{font-family:'JetBrains Mono',monospace}
  a{color:var(--accent);text-decoration:none}
  a:hover{text-decoration:underline}

  /* Layout */
  .wrapper{display:grid;grid-template-columns:260px 1fr;min-height:100vh}

  /* Sidebar */
  .sidebar{
    background:var(--surface);border-right:1px solid var(--border);
    padding:40px 24px;position:sticky;top:0;height:100vh;
    display:flex;flex-direction:column;overflow-y:auto;
  }
  .avatar{
    width:80px;height:80px;border-radius:50%;
    background:linear-gradient(135deg,var(--accent),var(--green));
    display:flex;align-items:center;justify-content:center;
    font-size:2rem;font-weight:700;color:var(--bg);margin-bottom:16px;
  }
  .sidebar h1{font-size:1.3rem;font-weight:600;margin-bottom:4px}
  .sidebar .handle{color:var(--muted);font-size:0.85rem;margin-bottom:20px}
  .sidebar .bio{font-size:0.85rem;color:var(--muted);margin-bottom:24px;line-height:1.6}

  .nav{list-style:none;margin-bottom:auto}
  .nav li{margin-bottom:2px}
  .nav a{
    display:flex;align-items:center;gap:10px;
    padding:8px 12px;border-radius:6px;font-size:0.85rem;
    color:var(--fg);transition:background 0.15s;
  }
  .nav a:hover{background:var(--border);text-decoration:none}
  .nav .dot{width:6px;height:6px;border-radius:50%;background:var(--border)}
  .nav a:hover .dot{background:var(--accent)}

  .sidebar-footer{margin-top:24px;display:flex;gap:16px;font-size:0.8rem}
  .sidebar-footer a{color:var(--muted)}
  .sidebar-footer a:hover{color:var(--accent)}

  /* Main */
  .main{padding:48px clamp(32px,5vw,80px);max-width:820px}

  /* Section */
  .block{margin-bottom:56px}
  .block-title{
    font-size:0.75rem;text-transform:uppercase;letter-spacing:0.12em;
    color:var(--muted);margin-bottom:20px;
    padding-bottom:8px;border-bottom:1px solid var(--border);
  }

  /* About */
  .about-text{color:var(--muted);line-height:1.8}

  /* Terminal-style info */
  .info-grid{
    display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
    gap:12px;margin-bottom:32px;
  }
  .info-item{
    background:var(--code-bg);border:1px solid var(--border);
    border-radius:6px;padding:12px 16px;font-size:0.82rem;
  }
  .info-item .label{color:var(--green);margin-right:8px}
  .info-item .value{color:var(--fg)}

  /* Experience */
  .timeline{position:relative;padding-left:24px}
  .timeline::before{
    content:'';position:absolute;left:0;top:8px;bottom:8px;
    width:2px;background:var(--border);
  }
  .timeline-item{margin-bottom:28px;position:relative}
  .timeline-item::before{
    content:'';position:absolute;left:-28px;top:8px;
    width:10px;height:10px;border-radius:50%;
    background:var(--surface);border:2px solid var(--accent);
  }
  .timeline-item h3{font-size:1rem;font-weight:600}
  .timeline-item .meta{font-size:0.8rem;color:var(--muted);margin-bottom:6px}
  .timeline-item p{font-size:0.88rem;color:var(--muted)}

  /* Skills */
  .skills-list{display:flex;flex-wrap:wrap;gap:8px}
  .skill-badge{
    font-size:0.78rem;padding:5px 14px;
    background:var(--code-bg);border:1px solid var(--border);
    border-radius:20px;transition:border-color 0.2s;
  }
  .skill-badge:hover{border-color:var(--accent)}

  /* Projects */
  .project-list{display:grid;gap:16px}
  .project-entry{
    background:var(--surface);border:1px solid var(--border);
    border-radius:8px;padding:20px 24px;transition:border-color 0.2s;
  }
  .project-entry:hover{border-color:var(--accent)}
  .project-entry h3{font-size:0.95rem;font-weight:600;margin-bottom:6px}
  .project-entry p{font-size:0.85rem;color:var(--muted);margin-bottom:10px}
  .project-entry .tech-line{font-size:0.75rem;color:var(--green)}

  footer{
    padding:40px 0;color:var(--muted);font-size:0.78rem;
    border-top:1px solid var(--border);margin-top:40px;
  }

  @media(max-width:768px){
    .wrapper{grid-template-columns:1fr}
    .sidebar{
      position:relative;height:auto;
      border-right:none;border-bottom:1px solid var(--border);
    }
  }
</style>
</head>
<body>
<div class="wrapper">
  <aside class="sidebar">
    <div class="avatar">${esc(data.name.charAt(0))}</div>
    <h1>${esc(data.name)}</h1>
    <p class="handle mono">${esc(data.title)}</p>
    <p class="bio">${esc(data.about).slice(0, 100)}${data.about.length > 100 ? "..." : ""}</p>

    <ul class="nav">
      <li><a href="#about"><span class="dot"></span> About</a></li>
      ${data.experience.length ? `<li><a href="#experience"><span class="dot"></span> Experience</a></li>` : ""}
      ${data.skills.length ? `<li><a href="#skills"><span class="dot"></span> Skills</a></li>` : ""}
      ${data.projects.length ? `<li><a href="#projects"><span class="dot"></span> Projects</a></li>` : ""}
    </ul>

    <div class="sidebar-footer">
      ${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}
      ${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}
      ${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ""}
    </div>
  </aside>

  <main class="main">
    <div class="info-grid">
      <div class="info-item"><span class="label">$</span><span class="value">email: ${esc(data.email)}</span></div>
      ${data.location ? `<div class="info-item"><span class="label">$</span><span class="value">loc: ${esc(data.location)}</span></div>` : ""}
      ${data.phone ? `<div class="info-item"><span class="label">$</span><span class="value">tel: ${esc(data.phone)}</span></div>` : ""}
    </div>

    <div class="block" id="about">
      <p class="block-title mono">// about</p>
      <p class="about-text">${esc(data.about)}</p>
    </div>

    ${
      data.experience.length
        ? `<div class="block" id="experience">
      <p class="block-title mono">// experience</p>
      <div class="timeline">
        ${data.experience
          .map(
            (e) => `
          <div class="timeline-item">
            <h3>${esc(e.role)}</h3>
            <p class="meta mono">${esc(e.company)} · ${esc(e.period)}</p>
            <p>${esc(e.description)}</p>
          </div>`
          )
          .join("")}
      </div>
    </div>`
        : ""
    }

    ${
      data.skills.length
        ? `<div class="block" id="skills">
      <p class="block-title mono">// skills</p>
      <div class="skills-list">
        ${data.skills.map((s) => `<span class="skill-badge">${esc(s)}</span>`).join("")}
      </div>
    </div>`
        : ""
    }

    ${
      data.projects.length
        ? `<div class="block" id="projects">
      <p class="block-title mono">// projects</p>
      <div class="project-list">
        ${data.projects
          .map(
            (p) => `
          <div class="project-entry">
            <h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)}</a>` : esc(p.name)}</h3>
            <p>${esc(p.description)}</p>
            <p class="tech-line mono">${p.tech.map((t) => esc(t)).join(" · ")}</p>
          </div>`
          )
          .join("")}
      </div>
    </div>`
        : ""
    }

    <footer>
      <p>${esc(data.name)} — built with <a href="#">portfolio-builder</a></p>
    </footer>
  </main>
</div>
</body>
</html>`;
}
