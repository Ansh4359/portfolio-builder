import type { PortfolioData } from "../types";

export function generateElegant(data: PortfolioData): string {
  const esc = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#0f0d0a;--fg:#f5f0e8;--muted:#a39e93;
    --accent:#d4a853;--accent2:#c49a3c;
    --surface:#1a1714;--border:#2a2520;
  }
  html{scroll-behavior:smooth}
  body{
    font-family:'Inter',sans-serif;background:var(--bg);color:var(--fg);
    line-height:1.7;font-weight:300;
  }
  .serif{font-family:'Playfair Display',Georgia,serif}
  a{color:var(--accent);text-decoration:none;transition:color 0.3s}
  a:hover{color:var(--accent2)}

  .container{max-width:900px;margin:0 auto;padding:0 32px}

  /* Hero */
  .hero{
    min-height:100vh;display:flex;flex-direction:column;
    justify-content:center;align-items:center;text-align:center;
    position:relative;overflow:hidden;
  }
  .hero::before{
    content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);
    width:1px;height:200px;background:linear-gradient(to bottom,transparent,var(--accent),transparent);
    top:60px;
  }
  .hero::after{
    content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);
    width:1px;height:200px;background:linear-gradient(to top,transparent,var(--accent),transparent);
    bottom:60px;
  }
  .hero .overline{
    font-size:0.75rem;letter-spacing:0.3em;text-transform:uppercase;
    color:var(--accent);margin-bottom:24px;
  }
  .hero h1{
    font-family:'Playfair Display',Georgia,serif;
    font-size:clamp(2.8rem,8vw,6rem);font-weight:400;
    letter-spacing:-0.02em;line-height:1.1;margin-bottom:16px;
  }
  .hero h1 em{font-style:italic;color:var(--accent)}
  .hero .subtitle{
    font-size:1.1rem;color:var(--muted);max-width:480px;margin:0 auto 40px;
  }
  .hero .cta{
    display:inline-flex;align-items:center;gap:8px;
    padding:14px 36px;border:1px solid var(--accent);
    font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;
    transition:all 0.4s;
  }
  .hero .cta:hover{background:var(--accent);color:var(--bg);text-decoration:none}

  /* Nav dots */
  .nav-dots{
    position:fixed;right:32px;top:50%;transform:translateY(-50%);
    display:flex;flex-direction:column;gap:12px;z-index:10;
  }
  .nav-dots a{
    width:8px;height:8px;border-radius:50%;
    border:1px solid var(--accent);background:transparent;
    transition:all 0.3s;display:block;
  }
  .nav-dots a:hover,.nav-dots a.active{background:var(--accent)}

  /* Sections */
  .section{padding:100px 0}
  .section-header{
    display:flex;align-items:center;gap:20px;margin-bottom:60px;
  }
  .section-header .line{flex:1;height:1px;background:var(--border)}
  .section-header h2{
    font-family:'Playfair Display',Georgia,serif;
    font-size:1.8rem;font-weight:400;white-space:nowrap;
  }
  .section-header .num{
    font-size:0.7rem;color:var(--accent);letter-spacing:0.2em;
  }

  /* About */
  .about-text{
    font-size:1.15rem;line-height:1.9;color:var(--muted);max-width:640px;
  }

  /* Experience */
  .timeline{position:relative;padding-left:40px}
  .timeline::before{
    content:'';position:absolute;left:0;top:0;bottom:0;
    width:1px;background:var(--border);
  }
  .timeline-item{position:relative;margin-bottom:48px}
  .timeline-item::before{
    content:'';position:absolute;left:-44px;top:6px;
    width:9px;height:9px;border-radius:50%;
    border:2px solid var(--accent);background:var(--bg);
  }
  .timeline-item h3{
    font-family:'Playfair Display',Georgia,serif;
    font-size:1.2rem;font-weight:600;margin-bottom:2px;
  }
  .timeline-item .meta{
    font-size:0.8rem;color:var(--accent);letter-spacing:0.1em;
    text-transform:uppercase;margin-bottom:10px;
  }
  .timeline-item p{color:var(--muted);font-size:0.95rem}

  /* Education */
  .edu-grid{display:grid;gap:24px}
  .edu-card{
    padding:28px;border:1px solid var(--border);
    display:flex;justify-content:space-between;align-items:baseline;
    flex-wrap:wrap;gap:12px;transition:border-color 0.3s;
  }
  .edu-card:hover{border-color:var(--accent)}
  .edu-card h3{font-family:'Playfair Display',Georgia,serif;font-size:1.1rem}
  .edu-card .detail{font-size:0.85rem;color:var(--muted)}

  /* Skills */
  .skills-list{
    display:flex;flex-wrap:wrap;gap:16px;
    counter-reset:skill;
  }
  .skill-item{
    counter-increment:skill;display:flex;align-items:center;gap:8px;
    font-size:0.9rem;color:var(--muted);
  }
  .skill-item::before{
    content:counter(skill,decimal-leading-zero);
    font-size:0.7rem;color:var(--accent);letter-spacing:0.1em;
  }

  /* Projects */
  .projects-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:32px}
  .project-card{
    background:var(--surface);border:1px solid var(--border);
    padding:36px;transition:all 0.4s;
  }
  .project-card:hover{border-color:var(--accent);transform:translateY(-2px)}
  .project-card h3{
    font-family:'Playfair Display',Georgia,serif;
    font-size:1.15rem;margin-bottom:10px;
  }
  .project-card p{color:var(--muted);font-size:0.9rem;margin-bottom:16px}
  .project-card .tech{display:flex;flex-wrap:wrap;gap:8px}
  .project-card .tech span{
    font-size:0.7rem;padding:4px 12px;
    border:1px solid var(--border);color:var(--accent);
    letter-spacing:0.05em;
  }

  /* Footer */
  footer{
    padding:80px 0;border-top:1px solid var(--border);
    display:flex;justify-content:space-between;align-items:center;
    flex-wrap:wrap;gap:20px;
  }
  footer .name{
    font-family:'Playfair Display',Georgia,serif;font-size:1.2rem;
  }
  .footer-links{display:flex;gap:28px}
  .footer-links a{font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted)}
  .footer-links a:hover{color:var(--accent)}

  @media(max-width:768px){
    .hero h1{font-size:2.4rem}
    .projects-grid{grid-template-columns:1fr}
    .nav-dots{display:none}
  }
</style>
</head>
<body>
  <nav class="nav-dots">
    <a href="#about" title="About"></a>
    <a href="#experience" title="Experience"></a>
    <a href="#skills" title="Skills"></a>
    <a href="#projects" title="Projects"></a>
  </nav>

  <section class="hero">
    <p class="overline">${esc(data.title)}</p>
    <h1><em>${esc(data.name)}</em></h1>
    <p class="subtitle">${esc(data.about).slice(0, 150)}${data.about.length > 150 ? "..." : ""}</p>
    <a href="mailto:${esc(data.email)}" class="cta">Get in touch →</a>
  </section>

  <main class="container">
    <section class="section" id="about">
      <div class="section-header">
        <span class="num">01</span>
        <h2>About</h2>
        <span class="line"></span>
      </div>
      <p class="about-text">${esc(data.about)}</p>
    </section>

    ${
      data.experience.length
        ? `<section class="section" id="experience">
      <div class="section-header">
        <span class="num">02</span>
        <h2>Experience</h2>
        <span class="line"></span>
      </div>
      <div class="timeline">
        ${data.experience
          .map(
            (e) => `
          <div class="timeline-item">
            <h3>${esc(e.role)}</h3>
            <p class="meta">${esc(e.company)} · ${esc(e.period)}</p>
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
      <div class="section-header">
        <span class="num">03</span>
        <h2>Education</h2>
        <span class="line"></span>
      </div>
      <div class="edu-grid">
        ${data.education
          .map(
            (e) => `
          <div class="edu-card">
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
      <div class="section-header">
        <span class="num">04</span>
        <h2>Skills</h2>
        <span class="line"></span>
      </div>
      <div class="skills-list">
        ${data.skills.map((s) => `<span class="skill-item">${esc(s)}</span>`).join("")}
      </div>
    </section>`
        : ""
    }

    ${
      data.projects.length
        ? `<section class="section" id="projects">
      <div class="section-header">
        <span class="num">05</span>
        <h2>Projects</h2>
        <span class="line"></span>
      </div>
      <div class="projects-grid">
        ${data.projects
          .map(
            (p) => `
          <div class="project-card">
            <h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)}</a>` : esc(p.name)}</h3>
            <p>${esc(p.description)}</p>
            <div class="tech">
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
    <span class="name serif">${esc(data.name)}</span>
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
