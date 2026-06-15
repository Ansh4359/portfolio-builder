import type { PortfolioData } from "../types";

export function generateGlass(data: PortfolioData): string {
  const esc = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#0a0a1a;--fg:#f0f0ff;--muted:#8888aa;
    --accent:#7c6aef;--accent2:#a78bfa;
    --glass:rgba(255,255,255,0.05);--glass-border:rgba(255,255,255,0.1);
  }
  html{scroll-behavior:smooth}
  body{
    font-family:'Plus Jakarta Sans',sans-serif;
    background:var(--bg);color:var(--fg);
    line-height:1.6;overflow-x:hidden;min-height:100vh;
  }
  body::before{
    content:'';position:fixed;top:-50%;left:-50%;
    width:200%;height:200%;
    background:radial-gradient(ellipse at 30% 20%,rgba(124,106,239,0.15) 0%,transparent 50%),
               radial-gradient(ellipse at 70% 80%,rgba(56,189,248,0.1) 0%,transparent 50%),
               radial-gradient(ellipse at 50% 50%,rgba(167,139,250,0.05) 0%,transparent 70%);
    z-index:-1;animation:bgShift 20s ease-in-out infinite alternate;
  }
  @keyframes bgShift{
    0%{transform:translate(0,0)}
    100%{transform:translate(-5%,-3%)}
  }
  a{color:var(--accent2);text-decoration:none;transition:color 0.3s}
  a:hover{color:var(--accent)}

  .container{max-width:1000px;margin:0 auto;padding:0 24px}
  .glass{
    background:var(--glass);
    backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
    border:1px solid var(--glass-border);border-radius:16px;
  }

  /* Hero */
  .hero{
    min-height:100vh;display:flex;flex-direction:column;
    justify-content:center;padding:60px 24px;
  }
  .hero-card{
    max-width:700px;padding:60px;text-align:center;margin:0 auto;
  }
  .hero .avatar{
    width:80px;height:80px;border-radius:50%;
    background:linear-gradient(135deg,var(--accent),#38bdf8);
    margin:0 auto 24px;display:flex;align-items:center;justify-content:center;
    font-size:2rem;font-weight:700;
  }
  .hero h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:700;margin-bottom:8px}
  .hero .role{
    font-size:1.1rem;color:var(--accent2);font-weight:500;margin-bottom:16px;
  }
  .hero .bio{color:var(--muted);max-width:500px;margin:0 auto 32px;font-size:0.95rem}
  .hero .actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .btn{
    padding:12px 28px;border-radius:10px;font-size:0.85rem;
    font-weight:600;transition:all 0.3s;cursor:pointer;
    border:none;font-family:inherit;
  }
  .btn-primary{background:var(--accent);color:#fff}
  .btn-primary:hover{background:var(--accent2);text-decoration:none}
  .btn-outline{
    background:transparent;border:1px solid var(--glass-border);color:var(--fg);
  }
  .btn-outline:hover{border-color:var(--accent);color:var(--accent);text-decoration:none}

  /* Section */
  .section{padding:80px 0}
  .section-title{
    font-size:1.5rem;font-weight:700;margin-bottom:40px;
    display:flex;align-items:center;gap:12px;
  }
  .section-title .dot{
    width:10px;height:10px;border-radius:50%;
    background:linear-gradient(135deg,var(--accent),#38bdf8);
  }

  /* About */
  .about-card{padding:40px}
  .about-card p{color:var(--muted);font-size:1.05rem;line-height:1.8}

  /* Experience */
  .exp-list{display:flex;flex-direction:column;gap:16px}
  .exp-card{padding:28px 32px;display:flex;gap:24px;align-items:flex-start;transition:all 0.3s}
  .exp-card:hover{border-color:var(--accent)}
  .exp-dot{
    width:12px;height:12px;border-radius:50%;margin-top:6px;flex-shrink:0;
    background:linear-gradient(135deg,var(--accent),#38bdf8);
  }
  .exp-card h3{font-size:1.1rem;font-weight:600;margin-bottom:2px}
  .exp-card .company{color:var(--accent2);font-size:0.85rem;margin-bottom:8px}
  .exp-card p{color:var(--muted);font-size:0.9rem}

  /* Education */
  .edu-list{display:grid;gap:12px}
  .edu-card{padding:24px 28px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
  .edu-card h3{font-size:1rem;font-weight:600}
  .edu-card .detail{font-size:0.8rem;color:var(--muted)}

  /* Skills */
  .skills-grid{display:flex;flex-wrap:wrap;gap:10px}
  .skill-chip{
    padding:8px 18px;border-radius:100px;font-size:0.8rem;font-weight:500;
    background:var(--glass);border:1px solid var(--glass-border);
    transition:all 0.3s;
  }
  .skill-chip:hover{border-color:var(--accent);color:var(--accent2)}

  /* Projects */
  .projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
  .project-card{padding:28px;transition:all 0.3s}
  .project-card:hover{border-color:var(--accent);transform:translateY(-3px)}
  .project-card h3{font-size:1.05rem;font-weight:600;margin-bottom:8px}
  .project-card p{color:var(--muted);font-size:0.88rem;margin-bottom:14px}
  .project-card .tech-tags{display:flex;flex-wrap:wrap;gap:6px}
  .project-card .tech-tags span{
    font-size:0.7rem;padding:3px 10px;border-radius:100px;
    background:rgba(124,106,239,0.1);color:var(--accent2);
  }

  /* Footer */
  footer{
    padding:60px 0;border-top:1px solid var(--glass-border);
    display:flex;justify-content:space-between;align-items:center;
    flex-wrap:wrap;gap:16px;color:var(--muted);font-size:0.85rem;
  }
  .social-pills{display:flex;gap:10px}
  .social-pills a{
    padding:8px 16px;border-radius:100px;font-size:0.78rem;
    border:1px solid var(--glass-border);transition:all 0.3s;
  }
  .social-pills a:hover{border-color:var(--accent);color:var(--accent)}

  @media(max-width:600px){
    .hero-card{padding:32px 20px}
    .projects-grid{grid-template-columns:1fr}
    .exp-card{flex-direction:column;gap:8px}
  }
</style>
</head>
<body>
  <section class="hero">
    <div class="hero-card glass">
      <div class="avatar">${esc(data.name.charAt(0))}</div>
      <h1>${esc(data.name)}</h1>
      <p class="role">${esc(data.title)}</p>
      <p class="bio">${esc(data.about).slice(0, 140)}${data.about.length > 140 ? "..." : ""}</p>
      <div class="actions">
        <a href="mailto:${esc(data.email)}" class="btn btn-primary">Contact Me</a>
        ${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank" class="btn btn-outline">GitHub</a>` : ""}
        ${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank" class="btn btn-outline">LinkedIn</a>` : ""}
      </div>
    </div>
  </section>

  <main class="container">
    <section class="section" id="about">
      <h2 class="section-title"><span class="dot"></span>About</h2>
      <div class="about-card glass">
        <p>${esc(data.about)}</p>
      </div>
    </section>

    ${
      data.experience.length
        ? `<section class="section" id="experience">
      <h2 class="section-title"><span class="dot"></span>Experience</h2>
      <div class="exp-list">
        ${data.experience
          .map(
            (e) => `
          <div class="exp-card glass">
            <span class="exp-dot"></span>
            <div>
              <h3>${esc(e.role)}</h3>
              <p class="company">${esc(e.company)} · ${esc(e.period)}</p>
              <p>${esc(e.description)}</p>
            </div>
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
      <h2 class="section-title"><span class="dot"></span>Education</h2>
      <div class="edu-list">
        ${data.education
          .map(
            (e) => `
          <div class="edu-card glass">
            <h3>${esc(e.degree)}</h3>
            <span class="detail">${esc(e.school)} · ${esc(e.period)}</span>
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
      <h2 class="section-title"><span class="dot"></span>Skills</h2>
      <div class="skills-grid">
        ${data.skills.map((s) => `<span class="skill-chip">${esc(s)}</span>`).join("")}
      </div>
    </section>`
        : ""
    }

    ${
      data.projects.length
        ? `<section class="section" id="projects">
      <h2 class="section-title"><span class="dot"></span>Projects</h2>
      <div class="projects-grid">
        ${data.projects
          .map(
            (p) => `
          <div class="project-card glass">
            <h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)}</a>` : esc(p.name)}</h3>
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
  </main>

  <footer>
    <span>${esc(data.name)}</span>
    <div class="social-pills">
      ${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}
      ${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}
      ${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ""}
      ${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Website</a>` : ""}
    </div>
  </footer>
</body>
</html>`;
}
