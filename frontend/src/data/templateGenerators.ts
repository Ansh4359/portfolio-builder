import type { PortfolioData } from "../types";

const sampleData: PortfolioData = {
  name: "Alex Chen",
  title: "Full Stack Developer",
  email: "alex@example.com",
  phone: "+1 555 123 4567",
  location: "San Francisco, CA",
  about:
    "Passionate full stack developer with 5+ years of experience building scalable web applications. I love turning complex problems into simple, beautiful solutions.",
  skills: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "GraphQL"],
  experience: [
    {
      company: "TechCorp",
      role: "Senior Software Engineer",
      period: "2022 — Present",
      description:
        "Led development of a real-time collaboration platform serving 50K+ users. Architected microservices backend and React frontend.",
    },
    {
      company: "StartupXYZ",
      role: "Full Stack Developer",
      period: "2020 — 2022",
      description:
        "Built the core product from scratch using Next.js and Node.js. Implemented CI/CD pipelines and automated testing.",
    },
  ],
  education: [
    {
      school: "UC Berkeley",
      degree: "B.S. Computer Science",
      period: "2016 — 2020",
    },
  ],
  projects: [
    {
      name: "TaskFlow",
      description:
        "A project management app with real-time updates, Kanban boards, and team collaboration features.",
      url: "https://github.com/alexchen/taskflow",
      tech: ["React", "TypeScript", "Socket.io", "MongoDB"],
    },
    {
      name: "DevBlog",
      description:
        "A technical blog platform with markdown support, syntax highlighting, and SEO optimization.",
      url: "https://github.com/alexchen/devblog",
      tech: ["Next.js", "MDX", "Tailwind CSS"],
    },
  ],
  socials: {
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    twitter: "https://twitter.com/alexchen",
    website: "https://alexchen.dev",
  },
};

function esc(s: string): string {
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function generateMinimal(data: PortfolioData): string {
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
  :root{--bg:#faf8f4;--fg:#1a1a1a;--muted:#7a7570;--accent:#c45d3e;--surface:#f0ece4;--border:#e0dbd3}
  html{scroll-behavior:smooth}
  body{font-family:'Cormorant Garamond',Georgia,serif;background:var(--bg);color:var(--fg);line-height:1.7;font-size:18px}
  .mono{font-family:'DM Mono',monospace;font-size:0.75em;letter-spacing:0.05em;text-transform:uppercase}
  a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}
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
  .exp-item{margin-bottom:32px}
  .exp-item .exp-header{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px}
  .exp-item h3{font-size:1.25rem;font-weight:500}
  .exp-item .period{color:var(--muted)}
  .exp-item .company{color:var(--muted);margin-bottom:6px}
  .exp-item p{font-size:0.95rem;color:#4a4540}
  .skills-grid{display:flex;flex-wrap:wrap;gap:10px}
  .skill-tag{padding:6px 16px;border:1px solid var(--border);border-radius:2px;font-size:0.85rem;transition:all 0.2s}
  .skill-tag:hover{border-color:var(--accent);color:var(--accent)}
  .project-item{margin-bottom:36px;padding-bottom:36px;border-bottom:1px solid var(--border)}
  .project-item:last-child{border-bottom:none}
  .project-item h3{font-size:1.2rem;font-weight:500;margin-bottom:6px}
  .project-item p{color:#4a4540;margin-bottom:10px;font-size:0.95rem}
  .project-tech{display:flex;flex-wrap:wrap;gap:8px}
  .project-tech span{font-size:0.75rem;padding:3px 10px;background:var(--surface);border-radius:2px}
  footer{padding:60px 0;text-align:center;color:var(--muted);font-size:0.85rem}
</style>
</head>
<body>
  <header><div class="container">
    <h1>${esc(data.name)}</h1>
    <p class="subtitle mono">${esc(data.title)}</p>
    <div class="contacts mono">
      <a href="mailto:${esc(data.email)}">${esc(data.email)}</a>
      ${data.phone ? `<span>${esc(data.phone)}</span>` : ""}
      ${data.location ? `<span>${esc(data.location)}</span>` : ""}
    </div>
  </div></header>
  <main class="container">
    <section id="about"><h2 class="mono">About</h2><p class="about-text">${esc(data.about)}</p></section>
    ${data.experience.length ? `<section id="experience"><h2 class="mono">Experience</h2>${data.experience.map((e) => `<div class="exp-item"><div class="exp-header"><h3>${esc(e.role)}</h3><span class="period mono">${esc(e.period)}</span></div><div class="company mono">${esc(e.company)}</div><p>${esc(e.description)}</p></div>`).join("")}</section>` : ""}
    ${data.skills.length ? `<section id="skills"><h2 class="mono">Skills</h2><div class="skills-grid">${data.skills.map((s) => `<span class="skill-tag">${esc(s)}</span>`).join("")}</div></section>` : ""}
    ${data.projects.length ? `<section id="projects"><h2 class="mono">Projects</h2>${data.projects.map((p) => `<div class="project-item"><h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)}</a>` : esc(p.name)}</h3><p>${esc(p.description)}</p><div class="project-tech">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>`).join("")}</section>` : ""}
  </main>
  <footer><div class="container"><p>${esc(data.name)} · Built with Portfolio Builder</p></div></footer>
</body>
</html>`;
}

function generateCreative(data: PortfolioData): string {
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
  :root{--bg:#0c0a09;--fg:#fafaf9;--muted:#a8a29e;--accent:#facc15;--accent2:#f97316;--surface:#1c1917;--border:#292524}
  html{scroll-behavior:smooth}
  body{font-family:'Syne',sans-serif;background:var(--bg);color:var(--fg);line-height:1.6;overflow-x:hidden}
  .mono{font-family:'Space Mono',monospace;font-size:0.72em;letter-spacing:0.12em;text-transform:uppercase}
  a{color:var(--accent);text-decoration:none;transition:color 0.2s}a:hover{color:var(--accent2)}
  .hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:60px clamp(24px,6vw,120px);position:relative}
  .hero::before{content:'';position:absolute;top:-30%;right:-20%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(250,204,21,0.12) 0%,transparent 70%);pointer-events:none}
  .hero h1{font-size:clamp(3rem,10vw,8rem);font-weight:800;line-height:0.95;letter-spacing:-0.04em;background:linear-gradient(135deg,var(--fg) 40%,var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .hero .tagline{font-size:clamp(1rem,2.5vw,1.5rem);color:var(--muted);margin-top:16px;max-width:500px}
  .hero .email-link{display:inline-block;margin-top:32px;padding:14px 32px;border:2px solid var(--accent);font-size:0.85rem;letter-spacing:0.08em;text-transform:uppercase;transition:all 0.3s;font-family:'Space Mono',monospace}
  .hero .email-link:hover{background:var(--accent);color:var(--bg);text-decoration:none}
  .section{padding:80px clamp(24px,6vw,120px);border-top:1px solid var(--border)}
  .section-label{font-size:0.8rem;margin-bottom:40px;display:flex;align-items:center;gap:16px}
  .section-label::after{content:'';flex:1;height:1px;background:var(--border)}
  .about-text{font-size:1.2rem;max-width:600px;color:var(--muted);line-height:1.8}
  .exp-grid{display:grid;gap:40px}
  .exp-card{padding:32px;border:1px solid var(--border);transition:border-color 0.3s}
  .exp-card:hover{border-color:var(--accent)}
  .exp-card h3{font-size:1.3rem;font-weight:700;margin-bottom:4px}
  .exp-card .meta{color:var(--accent);margin-bottom:12px}
  .exp-card p{color:var(--muted);font-size:0.95rem}
  .skills-wrap{display:flex;flex-wrap:wrap;gap:12px}
  .skill-pill{padding:8px 20px;border:1px solid var(--border);font-size:0.85rem;font-weight:600;transition:all 0.3s;cursor:default}
  .skill-pill:hover{background:var(--accent);color:var(--bg);border-color:var(--accent)}
  .project-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}
  .project-card{background:var(--surface);padding:32px;border:1px solid var(--border);transition:transform 0.3s,border-color 0.3s}
  .project-card:hover{transform:translateY(-4px);border-color:var(--accent)}
  .project-card h3{font-size:1.15rem;font-weight:700;margin-bottom:8px}
  .project-card p{color:var(--muted);font-size:0.9rem;margin-bottom:16px}
  .project-card .tech-tags{display:flex;flex-wrap:wrap;gap:6px}
  .project-card .tech-tags span{font-size:0.7rem;padding:3px 10px;border:1px solid var(--border);color:var(--accent)}
  footer{padding:60px clamp(24px,6vw,120px);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;border-top:1px solid var(--border);color:var(--muted);font-size:0.85rem}
  .social-links{display:flex;gap:24px}
</style>
</head>
<body>
  <section class="hero">
    <p class="mono">${esc(data.title)}</p>
    <h1>${esc(data.name)}</h1>
    <p class="tagline">${esc(data.about).slice(0, 120)}${data.about.length > 120 ? "..." : ""}</p>
    <a href="mailto:${esc(data.email)}" class="email-link">Get in touch</a>
  </section>
  ${data.experience.length ? `<section class="section" id="experience"><p class="section-label mono">Experience</p><div class="exp-grid">${data.experience.map((e) => `<div class="exp-card"><h3>${esc(e.role)}</h3><p class="meta mono">${esc(e.company)} · ${esc(e.period)}</p><p>${esc(e.description)}</p></div>`).join("")}</div></section>` : ""}
  ${data.skills.length ? `<section class="section" id="skills"><p class="section-label mono">Skills</p><div class="skills-wrap">${data.skills.map((s) => `<span class="skill-pill">${esc(s)}</span>`).join("")}</div></section>` : ""}
  ${data.projects.length ? `<section class="section" id="projects"><p class="section-label mono">Projects</p><div class="project-grid">${data.projects.map((p) => `<div class="project-card"><h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)} ↗</a>` : esc(p.name)}</h3><p>${esc(p.description)}</p><div class="tech-tags">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>`).join("")}</div></section>` : ""}
  <footer><span>${esc(data.name)}</span><div class="social-links mono">${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ""}${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Web</a>` : ""}</div></footer>
</body>
</html>`;
}

function generateDeveloper(data: PortfolioData): string {
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
  :root{--bg:#0d1117;--fg:#c9d1d9;--muted:#8b949e;--accent:#58a6ff;--green:#3fb950;--surface:#161b22;--border:#30363d;--code-bg:#1c2128}
  html{scroll-behavior:smooth}
  body{font-family:'IBM Plex Sans',sans-serif;background:var(--bg);color:var(--fg);line-height:1.65;font-size:15px}
  code,.mono{font-family:'JetBrains Mono',monospace}
  a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}
  .wrapper{display:grid;grid-template-columns:260px 1fr;min-height:100vh}
  .sidebar{background:var(--surface);border-right:1px solid var(--border);padding:40px 24px;position:sticky;top:0;height:100vh;display:flex;flex-direction:column;overflow-y:auto}
  .avatar{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--green));display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:var(--bg);margin-bottom:16px}
  .sidebar h1{font-size:1.3rem;font-weight:600;margin-bottom:4px}
  .sidebar .handle{color:var(--muted);font-size:0.85rem;margin-bottom:20px}
  .sidebar .bio{font-size:0.85rem;color:var(--muted);margin-bottom:24px;line-height:1.6}
  .nav{list-style:none;margin-bottom:auto}
  .nav li{margin-bottom:2px}
  .nav a{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;font-size:0.85rem;color:var(--fg);transition:background 0.15s}
  .nav a:hover{background:var(--border);text-decoration:none}
  .nav .dot{width:6px;height:6px;border-radius:50%;background:var(--border)}
  .nav a:hover .dot{background:var(--accent)}
  .sidebar-footer{margin-top:24px;display:flex;gap:16px;font-size:0.8rem}
  .sidebar-footer a{color:var(--muted)}.sidebar-footer a:hover{color:var(--accent)}
  .main{padding:48px clamp(32px,5vw,80px);max-width:820px}
  .block{margin-bottom:56px}
  .block-title{font-size:0.75rem;text-transform:uppercase;letter-spacing:0.12em;color:var(--muted);margin-bottom:20px;padding-bottom:8px;border-bottom:1px solid var(--border)}
  .about-text{color:var(--muted);line-height:1.8}
  .info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:32px}
  .info-item{background:var(--code-bg);border:1px solid var(--border);border-radius:6px;padding:12px 16px;font-size:0.82rem}
  .info-item .label{color:var(--green);margin-right:8px}
  .info-item .value{color:var(--fg)}
  .timeline{position:relative;padding-left:24px}
  .timeline::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:2px;background:var(--border)}
  .timeline-item{margin-bottom:28px;position:relative}
  .timeline-item::before{content:'';position:absolute;left:-28px;top:8px;width:10px;height:10px;border-radius:50%;background:var(--surface);border:2px solid var(--accent)}
  .timeline-item h3{font-size:1rem;font-weight:600}
  .timeline-item .meta{font-size:0.8rem;color:var(--muted);margin-bottom:6px}
  .timeline-item p{font-size:0.88rem;color:var(--muted)}
  .skills-list{display:flex;flex-wrap:wrap;gap:8px}
  .skill-badge{font-size:0.78rem;padding:5px 14px;background:var(--code-bg);border:1px solid var(--border);border-radius:20px;transition:border-color 0.2s}
  .skill-badge:hover{border-color:var(--accent)}
  .project-list{display:grid;gap:16px}
  .project-entry{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:20px 24px;transition:border-color 0.2s}
  .project-entry:hover{border-color:var(--accent)}
  .project-entry h3{font-size:0.95rem;font-weight:600;margin-bottom:6px}
  .project-entry p{font-size:0.85rem;color:var(--muted);margin-bottom:10px}
  .project-entry .tech-line{font-size:0.75rem;color:var(--green)}
  footer{padding:40px 0;color:var(--muted);font-size:0.78rem;border-top:1px solid var(--border);margin-top:40px}
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
    </div>
    <div class="block" id="about"><p class="block-title mono">// about</p><p class="about-text">${esc(data.about)}</p></div>
    ${data.experience.length ? `<div class="block" id="experience"><p class="block-title mono">// experience</p><div class="timeline">${data.experience.map((e) => `<div class="timeline-item"><h3>${esc(e.role)}</h3><p class="meta mono">${esc(e.company)} · ${esc(e.period)}</p><p>${esc(e.description)}</p></div>`).join("")}</div></div>` : ""}
    ${data.skills.length ? `<div class="block" id="skills"><p class="block-title mono">// skills</p><div class="skills-list">${data.skills.map((s) => `<span class="skill-badge">${esc(s)}</span>`).join("")}</div></div>` : ""}
    ${data.projects.length ? `<div class="block" id="projects"><p class="block-title mono">// projects</p><div class="project-list">${data.projects.map((p) => `<div class="project-entry"><h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)}</a>` : esc(p.name)}</h3><p>${esc(p.description)}</p><p class="tech-line mono">${p.tech.map((t) => esc(t)).join(" · ")}</p></div>`).join("")}</div></div>` : ""}
    <footer><p>${esc(data.name)} — built with portfolio-builder</p></footer>
  </main>
</div>
</body>
</html>`;
}

function generateModern(data: PortfolioData): string {
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
  :root{--bg:#fefefe;--fg:#18181b;--muted:#71717a;--accent:#6d28d9;--accent-light:#ede9fe;--surface:#f4f4f5;--border:#e4e4e7}
  html{scroll-behavior:smooth}
  body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--fg);line-height:1.7;font-size:16px}
  a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}
  nav{position:sticky;top:0;z-index:100;background:rgba(254,254,254,0.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:16px clamp(24px,5vw,80px);display:flex;justify-content:space-between;align-items:center}
  nav .logo{font-family:'Instrument Serif',serif;font-size:1.3rem;color:var(--fg)}
  nav .nav-links{display:flex;gap:28px;font-size:0.85rem;font-weight:500}
  nav .nav-links a{color:var(--muted);transition:color 0.2s}
  nav .nav-links a:hover{color:var(--fg);text-decoration:none}
  .hero{padding:100px clamp(24px,5vw,80px) 80px;max-width:900px}
  .hero .eyebrow{display:inline-block;padding:6px 16px;background:var(--accent-light);color:var(--accent);border-radius:20px;font-size:0.8rem;font-weight:600;margin-bottom:20px}
  .hero h1{font-family:'Instrument Serif',serif;font-size:clamp(2.5rem,6vw,4.5rem);line-height:1.1;letter-spacing:-0.02em;margin-bottom:20px}
  .hero h1 em{font-style:italic;color:var(--accent)}
  .hero .lead{font-size:1.1rem;color:var(--muted);max-width:560px;margin-bottom:32px}
  .hero .cta-row{display:flex;gap:12px;flex-wrap:wrap}
  .btn{display:inline-block;padding:12px 28px;border-radius:8px;font-size:0.9rem;font-weight:600;transition:all 0.2s}
  .btn-primary{background:var(--accent);color:white}
  .btn-primary:hover{background:#5b21b6;text-decoration:none}
  .btn-outline{border:1.5px solid var(--border);color:var(--fg)}
  .btn-outline:hover{border-color:var(--fg);text-decoration:none}
  .section{padding:80px clamp(24px,5vw,80px);max-width:900px}
  .section-head{margin-bottom:40px}
  .section-head h2{font-family:'Instrument Serif',serif;font-size:2rem}
  .section-head p{color:var(--muted);margin-top:6px;font-size:0.95rem}
  .exp-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
  .exp-card{background:var(--surface);border-radius:12px;padding:28px;border:1px solid transparent;transition:all 0.25s}
  .exp-card:hover{border-color:var(--accent);transform:translateY(-2px)}
  .exp-card .role{font-weight:600;font-size:1.05rem;margin-bottom:2px}
  .exp-card .company{color:var(--accent);font-size:0.9rem;margin-bottom:2px}
  .exp-card .period{color:var(--muted);font-size:0.8rem;margin-bottom:12px}
  .exp-card p{font-size:0.9rem;color:var(--muted)}
  .skills-cloud{display:flex;flex-wrap:wrap;gap:10px}
  .skill-chip{padding:8px 20px;border-radius:24px;background:var(--surface);font-size:0.85rem;font-weight:500;border:1px solid var(--border);transition:all 0.2s}
  .skill-chip:hover{background:var(--accent-light);color:var(--accent);border-color:transparent}
  .project-showcase{display:grid;gap:24px}
  .project-card{display:grid;grid-template-columns:1fr auto;gap:20px;align-items:start;padding:28px;border:1px solid var(--border);border-radius:12px;transition:border-color 0.2s}
  .project-card:hover{border-color:var(--accent)}
  .project-card h3{font-size:1.1rem;font-weight:600;margin-bottom:6px}
  .project-card p{font-size:0.9rem;color:var(--muted);margin-bottom:12px}
  .project-card .tech-pills{display:flex;flex-wrap:wrap;gap:6px}
  .project-card .tech-pills span{font-size:0.72rem;padding:3px 10px;background:var(--accent-light);color:var(--accent);border-radius:12px}
  footer{padding:60px clamp(24px,5vw,80px);border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;color:var(--muted);font-size:0.85rem}
  .footer-links{display:flex;gap:20px}
  .footer-links a{color:var(--muted);transition:color 0.2s}.footer-links a:hover{color:var(--accent)}
</style>
</head>
<body>
  <nav><span class="logo">${esc(data.name)}</span><div class="nav-links"><a href="#about">About</a>${data.experience.length ? `<a href="#experience">Work</a>` : ""}${data.projects.length ? `<a href="#projects">Projects</a>` : ""}<a href="mailto:${esc(data.email)}">Contact</a></div></nav>
  <section class="hero">
    <span class="eyebrow">${esc(data.title)}</span>
    <h1>Hi, I'm <em>${esc(data.name.split(" ")[0])}</em>.</h1>
    <p class="lead">${esc(data.about).slice(0, 160)}${data.about.length > 160 ? "..." : ""}</p>
    <div class="cta-row"><a href="mailto:${esc(data.email)}" class="btn btn-primary">Say hello</a>${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank" class="btn btn-outline">GitHub</a>` : ""}</div>
  </section>
  ${data.experience.length ? `<section class="section" id="experience"><div class="section-head"><h2>Experience</h2><p>Where I've worked</p></div><div class="exp-cards">${data.experience.map((e) => `<div class="exp-card"><div class="role">${esc(e.role)}</div><div class="company">${esc(e.company)}</div><div class="period">${esc(e.period)}</div><p>${esc(e.description)}</p></div>`).join("")}</div></section>` : ""}
  ${data.skills.length ? `<section class="section" id="skills"><div class="section-head"><h2>Skills</h2><p>Technologies I work with</p></div><div class="skills-cloud">${data.skills.map((s) => `<span class="skill-chip">${esc(s)}</span>`).join("")}</div></section>` : ""}
  ${data.projects.length ? `<section class="section" id="projects"><div class="section-head"><h2>Projects</h2><p>Things I've built</p></div><div class="project-showcase">${data.projects.map((p) => `<div class="project-card"><div><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><div class="tech-pills">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>${p.url ? `<a href="${esc(p.url)}" target="_blank" class="link-arrow">↗</a>` : ""}</div>`).join("")}</div></section>` : ""}
  <footer><span>${esc(data.name)}</span><div class="footer-links">${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ""}${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Website</a>` : ""}</div></footer>
</body>
</html>`;
}

function generateElegant(data: PortfolioData): string {
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
  :root{--bg:#0f0d0a;--fg:#f5f0e8;--muted:#a39e93;--accent:#d4a853;--accent2:#c49a3c;--surface:#1a1714;--border:#2a2520}
  html{scroll-behavior:smooth}
  body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--fg);line-height:1.7;font-weight:300}
  .serif{font-family:'Playfair Display',Georgia,serif}
  a{color:var(--accent);text-decoration:none;transition:color 0.3s}a:hover{color:var(--accent2)}
  .container{max-width:900px;margin:0 auto;padding:0 32px}
  .hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;top:60px;left:50%;transform:translateX(-50%);width:1px;height:200px;background:linear-gradient(to bottom,transparent,var(--accent),transparent)}
  .hero::after{content:'';position:absolute;bottom:60px;left:50%;transform:translateX(-50%);width:1px;height:200px;background:linear-gradient(to top,transparent,var(--accent),transparent)}
  .hero .overline{font-size:0.75rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--accent);margin-bottom:24px}
  .hero h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.8rem,8vw,6rem);font-weight:400;letter-spacing:-0.02em;line-height:1.1;margin-bottom:16px}
  .hero h1 em{font-style:italic;color:var(--accent)}
  .hero .subtitle{font-size:1.1rem;color:var(--muted);max-width:480px;margin:0 auto 40px}
  .hero .cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;border:1px solid var(--accent);font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;transition:all 0.4s}
  .hero .cta:hover{background:var(--accent);color:var(--bg);text-decoration:none}
  .section{padding:100px 0}
  .section-header{display:flex;align-items:center;gap:20px;margin-bottom:60px}
  .section-header .line{flex:1;height:1px;background:var(--border)}
  .section-header h2{font-family:'Playfair Display',Georgia,serif;font-size:1.8rem;font-weight:400;white-space:nowrap}
  .section-header .num{font-size:0.7rem;color:var(--accent);letter-spacing:0.2em}
  .about-text{font-size:1.15rem;line-height:1.9;color:var(--muted);max-width:640px}
  .timeline{position:relative;padding-left:40px}
  .timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:var(--border)}
  .timeline-item{position:relative;margin-bottom:48px}
  .timeline-item::before{content:'';position:absolute;left:-44px;top:6px;width:9px;height:9px;border-radius:50%;border:2px solid var(--accent);background:var(--bg)}
  .timeline-item h3{font-family:'Playfair Display',Georgia,serif;font-size:1.2rem;font-weight:600;margin-bottom:2px}
  .timeline-item .meta{font-size:0.8rem;color:var(--accent);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px}
  .timeline-item p{color:var(--muted);font-size:0.95rem}
  .skills-list{display:flex;flex-wrap:wrap;gap:16px;counter-reset:skill}
  .skill-item{counter-increment:skill;display:flex;align-items:center;gap:8px;font-size:0.9rem;color:var(--muted)}
  .skill-item::before{content:counter(skill,decimal-leading-zero);font-size:0.7rem;color:var(--accent);letter-spacing:0.1em}
  .projects-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:32px}
  .project-card{background:var(--surface);border:1px solid var(--border);padding:36px;transition:all 0.4s}
  .project-card:hover{border-color:var(--accent);transform:translateY(-2px)}
  .project-card h3{font-family:'Playfair Display',Georgia,serif;font-size:1.15rem;margin-bottom:10px}
  .project-card p{color:var(--muted);font-size:0.9rem;margin-bottom:16px}
  .project-card .tech{display:flex;flex-wrap:wrap;gap:8px}
  .project-card .tech span{font-size:0.7rem;padding:4px 12px;border:1px solid var(--border);color:var(--accent);letter-spacing:0.05em}
  footer{padding:80px 0;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px}
  footer .name{font-family:'Playfair Display',Georgia,serif;font-size:1.2rem}
  .footer-links{display:flex;gap:28px}
  .footer-links a{font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted)}
  .footer-links a:hover{color:var(--accent)}
</style>
</head>
<body>
  <section class="hero">
    <p class="overline">${esc(data.title)}</p>
    <h1><em>${esc(data.name)}</em></h1>
    <p class="subtitle">${esc(data.about).slice(0, 150)}${data.about.length > 150 ? "..." : ""}</p>
    <a href="mailto:${esc(data.email)}" class="cta">Get in touch →</a>
  </section>
  <main class="container">
    <section class="section" id="about"><div class="section-header"><span class="num">01</span><h2>About</h2><span class="line"></span></div><p class="about-text">${esc(data.about)}</p></section>
    ${data.experience.length ? `<section class="section" id="experience"><div class="section-header"><span class="num">02</span><h2>Experience</h2><span class="line"></span></div><div class="timeline">${data.experience.map((e) => `<div class="timeline-item"><h3>${esc(e.role)}</h3><p class="meta">${esc(e.company)} · ${esc(e.period)}</p><p>${esc(e.description)}</p></div>`).join("")}</div></section>` : ""}
    ${data.skills.length ? `<section class="section" id="skills"><div class="section-header"><span class="num">04</span><h2>Skills</h2><span class="line"></span></div><div class="skills-list">${data.skills.map((s) => `<span class="skill-item">${esc(s)}</span>`).join("")}</div></section>` : ""}
    ${data.projects.length ? `<section class="section" id="projects"><div class="section-header"><span class="num">05</span><h2>Projects</h2><span class="line"></span></div><div class="projects-grid">${data.projects.map((p) => `<div class="project-card"><h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)}</a>` : esc(p.name)}</h3><p>${esc(p.description)}</p><div class="tech">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>`).join("")}</div></section>` : ""}
  </main>
  <footer><span class="name serif">${esc(data.name)}</span><div class="footer-links">${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ""}${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Website</a>` : ""}</div></footer>
</body>
</html>`;
}

function generateGlass(data: PortfolioData): string {
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
  :root{--bg:#0a0a1a;--fg:#f0f0ff;--muted:#8888aa;--accent:#7c6aef;--accent2:#a78bfa;--glass:rgba(255,255,255,0.05);--glass-border:rgba(255,255,255,0.1)}
  html{scroll-behavior:smooth}
  body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--fg);line-height:1.6;overflow-x:hidden;min-height:100vh}
  body::before{content:'';position:fixed;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(ellipse at 30% 20%,rgba(124,106,239,0.15) 0%,transparent 50%),radial-gradient(ellipse at 70% 80%,rgba(56,189,248,0.1) 0%,transparent 50%);z-index:-1;animation:bgShift 20s ease-in-out infinite alternate}
  @keyframes bgShift{0%{transform:translate(0,0)}100%{transform:translate(-5%,-3%)}}
  a{color:var(--accent2);text-decoration:none;transition:color 0.3s}a:hover{color:var(--accent)}
  .container{max-width:1000px;margin:0 auto;padding:0 24px}
  .glass{background:var(--glass);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);border-radius:16px}
  .hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:60px 24px}
  .hero-card{max-width:700px;padding:60px;text-align:center;margin:0 auto}
  .hero .avatar{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--accent),#38bdf8);margin:0 auto 24px;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700}
  .hero h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:700;margin-bottom:8px}
  .hero .role{font-size:1.1rem;color:var(--accent2);font-weight:500;margin-bottom:16px}
  .hero .bio{color:var(--muted);max-width:500px;margin:0 auto 32px;font-size:0.95rem}
  .hero .actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .btn{padding:12px 28px;border-radius:10px;font-size:0.85rem;font-weight:600;transition:all 0.3s;cursor:pointer;border:none;font-family:inherit}
  .btn-primary{background:var(--accent);color:#fff}.btn-primary:hover{background:var(--accent2);text-decoration:none}
  .btn-outline{background:transparent;border:1px solid var(--glass-border);color:var(--fg)}
  .btn-outline:hover{border-color:var(--accent);color:var(--accent);text-decoration:none}
  .section{padding:80px 0}
  .section-title{font-size:1.5rem;font-weight:700;margin-bottom:40px;display:flex;align-items:center;gap:12px}
  .section-title .dot{width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,var(--accent),#38bdf8)}
  .about-card{padding:40px}.about-card p{color:var(--muted);font-size:1.05rem;line-height:1.8}
  .exp-list{display:flex;flex-direction:column;gap:16px}
  .exp-card{padding:28px 32px;display:flex;gap:24px;align-items:flex-start;transition:all 0.3s}
  .exp-card:hover{border-color:var(--accent)}
  .exp-dot{width:12px;height:12px;border-radius:50%;margin-top:6px;flex-shrink:0;background:linear-gradient(135deg,var(--accent),#38bdf8)}
  .exp-card h3{font-size:1.1rem;font-weight:600;margin-bottom:2px}
  .exp-card .company{color:var(--accent2);font-size:0.85rem;margin-bottom:8px}
  .exp-card p{color:var(--muted);font-size:0.9rem}
  .skills-grid{display:flex;flex-wrap:wrap;gap:10px}
  .skill-chip{padding:8px 18px;border-radius:100px;font-size:0.8rem;font-weight:500;background:var(--glass);border:1px solid var(--glass-border);transition:all 0.3s}
  .skill-chip:hover{border-color:var(--accent);color:var(--accent2)}
  .projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
  .project-card{padding:28px;transition:all 0.3s}
  .project-card:hover{border-color:var(--accent);transform:translateY(-3px)}
  .project-card h3{font-size:1.05rem;font-weight:600;margin-bottom:8px}
  .project-card p{color:var(--muted);font-size:0.88rem;margin-bottom:14px}
  .project-card .tech-tags{display:flex;flex-wrap:wrap;gap:6px}
  .project-card .tech-tags span{font-size:0.7rem;padding:3px 10px;border-radius:100px;background:rgba(124,106,239,0.1);color:var(--accent2)}
  footer{padding:60px 0;border-top:1px solid var(--glass-border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;color:var(--muted);font-size:0.85rem}
  .social-pills{display:flex;gap:10px}
  .social-pills a{padding:8px 16px;border-radius:100px;font-size:0.78rem;border:1px solid var(--glass-border);transition:all 0.3s}
  .social-pills a:hover{border-color:var(--accent);color:var(--accent)}
</style>
</head>
<body>
  <section class="hero"><div class="hero-card glass">
    <div class="avatar">${esc(data.name.charAt(0))}</div>
    <h1>${esc(data.name)}</h1>
    <p class="role">${esc(data.title)}</p>
    <p class="bio">${esc(data.about).slice(0, 140)}${data.about.length > 140 ? "..." : ""}</p>
    <div class="actions"><a href="mailto:${esc(data.email)}" class="btn btn-primary">Contact Me</a>${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank" class="btn btn-outline">GitHub</a>` : ""}${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank" class="btn btn-outline">LinkedIn</a>` : ""}</div>
  </div></section>
  <main class="container">
    <section class="section" id="about"><h2 class="section-title"><span class="dot"></span>About</h2><div class="about-card glass"><p>${esc(data.about)}</p></div></section>
    ${data.experience.length ? `<section class="section" id="experience"><h2 class="section-title"><span class="dot"></span>Experience</h2><div class="exp-list">${data.experience.map((e) => `<div class="exp-card glass"><span class="exp-dot"></span><div><h3>${esc(e.role)}</h3><p class="company">${esc(e.company)} · ${esc(e.period)}</p><p>${esc(e.description)}</p></div></div>`).join("")}</div></section>` : ""}
    ${data.skills.length ? `<section class="section" id="skills"><h2 class="section-title"><span class="dot"></span>Skills</h2><div class="skills-grid">${data.skills.map((s) => `<span class="skill-chip">${esc(s)}</span>`).join("")}</div></section>` : ""}
    ${data.projects.length ? `<section class="section" id="projects"><h2 class="section-title"><span class="dot"></span>Projects</h2><div class="projects-grid">${data.projects.map((p) => `<div class="project-card glass"><h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)}</a>` : esc(p.name)}</h3><p>${esc(p.description)}</p><div class="tech-tags">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>`).join("")}</div></section>` : ""}
  </main>
  <footer><span>${esc(data.name)}</span><div class="social-pills">${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ""}${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Website</a>` : ""}</div></footer>
</body>
</html>`;
}

function generateMono(data: PortfolioData): string {
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
  :root{--bg:#ffffff;--fg:#111111;--muted:#666666;--accent:#111111;--border:#e0e0e0;--surface:#f7f7f7}
  html{scroll-behavior:smooth}
  body{font-family:'Space Grotesk',sans-serif;background:var(--bg);color:var(--fg);line-height:1.6}
  .mono{font-family:'JetBrains Mono',monospace;font-size:0.75em;letter-spacing:0.08em;text-transform:uppercase}
  a{color:var(--fg);text-decoration:none;border-bottom:1px solid var(--fg);transition:opacity 0.3s}a:hover{opacity:0.5}
  .container{max-width:840px;margin:0 auto;padding:0 32px}
  header{padding:80px 0 40px;border-bottom:3px solid var(--fg)}
  header .top-row{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px}
  header h1{font-size:clamp(2.5rem,7vw,5rem);font-weight:700;letter-spacing:-0.04em;line-height:1}
  header .title-block{text-align:right}
  header .title-block .role{font-size:1.1rem;font-weight:500}
  header .title-block .contact{color:var(--muted);margin-top:8px}
  header .title-block .contact a{border-bottom:none;color:var(--muted)}.header .title-block .contact a:hover{color:var(--fg)}
  .section{padding:48px 0}
  .section-label{font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;margin-bottom:28px;display:flex;align-items:center;gap:12px}
  .section-label::after{content:'';flex:1;height:1px;background:var(--border)}
  .about-text{font-size:1.1rem;max-width:600px;color:var(--muted)}
  .exp-table{width:100%}
  .exp-row{display:grid;grid-template-columns:140px 1fr auto;gap:16px;padding:20px 0;border-bottom:1px solid var(--border);align-items:baseline}
  .exp-row:last-child{border-bottom:none}
  .exp-row .company{font-weight:600;font-size:0.95rem}
  .exp-row .role{color:var(--muted);font-size:0.9rem}
  .exp-row .period{font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:var(--muted);text-align:right;white-space:nowrap}
  .skills-wrap{display:flex;flex-wrap:wrap;gap:8px}
  .skill-tag{padding:6px 14px;border:1px solid var(--fg);font-size:0.8rem;font-weight:500;transition:all 0.3s}
  .skill-tag:hover{background:var(--fg);color:var(--bg)}
  .project-item{padding:24px 0;border-bottom:1px solid var(--border);display:grid;grid-template-columns:1fr auto;gap:20px;align-items:start}
  .project-item:last-child{border-bottom:none}
  .project-item h3{font-size:1.1rem;font-weight:600;margin-bottom:6px}
  .project-item h3 a{border-bottom:1px solid var(--fg)}
  .project-item p{color:var(--muted);font-size:0.9rem}
  .project-item .tech-col{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}
  .project-item .tech-col span{font-family:'JetBrains Mono',monospace;font-size:0.65rem;padding:2px 8px;background:var(--surface);color:var(--muted)}
  footer{padding:48px 0;border-top:3px solid var(--fg);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
  footer .name{font-weight:700;font-size:1.1rem}
  .footer-links{display:flex;gap:20px}
  .footer-links a{font-size:0.8rem;border-bottom:none;color:var(--muted)}.footer-links a:hover{color:var(--fg)}
</style>
</head>
<body>
<div class="container">
  <header><div class="top-row">
    <h1>${esc(data.name)}</h1>
    <div class="title-block"><p class="role">${esc(data.title)}</p><p class="contact mono"><a href="mailto:${esc(data.email)}">${esc(data.email)}</a>${data.location ? ` · ${esc(data.location)}` : ""}</p></div>
  </div></header>
  <section class="section"><p class="section-label mono">About</p><p class="about-text">${esc(data.about)}</p></section>
  ${data.experience.length ? `<section class="section"><p class="section-label mono">Experience</p><div class="exp-table">${data.experience.map((e) => `<div class="exp-row"><span class="company">${esc(e.company)}</span><span class="role">${esc(e.role)} — ${esc(e.description)}</span><span class="period">${esc(e.period)}</span></div>`).join("")}</div></section>` : ""}
  ${data.skills.length ? `<section class="section"><p class="section-label mono">Skills</p><div class="skills-wrap">${data.skills.map((s) => `<span class="skill-tag">${esc(s)}</span>`).join("")}</div></section>` : ""}
  ${data.projects.length ? `<section class="section"><p class="section-label mono">Projects</p><div>${data.projects.map((p) => `<div class="project-item"><div><h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)}</a>` : esc(p.name)}</h3><p>${esc(p.description)}</p></div><div class="tech-col">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>`).join("")}</div></section>` : ""}
  <footer><span class="name">${esc(data.name)}</span><div class="footer-links mono">${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ""}${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Website</a>` : ""}</div></footer>
</div>
</body>
</html>`;
}

function generateSunset(data: PortfolioData): string {
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
  :root{--bg:#1a0f0a;--fg:#fef0e6;--muted:#c4a88e;--accent:#ff6b35;--accent2:#f7c59f;--accent3:#e8445a;--surface:#2a1a12;--border:#3d2a1e}
  html{scroll-behavior:smooth}
  body{font-family:'Sora',sans-serif;background:var(--bg);color:var(--fg);line-height:1.6;overflow-x:hidden}
  .mono{font-family:'Fira Code',monospace;font-size:0.72em;letter-spacing:0.06em}
  a{color:var(--accent2);text-decoration:none;transition:color 0.3s}a:hover{color:var(--accent)}
  .container{max-width:960px;margin:0 auto;padding:0 28px}
  .hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;top:-30%;right:-10%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,53,0.2) 0%,rgba(232,68,90,0.1) 40%,transparent 70%);filter:blur(40px)}
  .hero-content{position:relative;z-index:1;max-width:600px}
  .hero .greeting{font-size:0.85rem;color:var(--accent);font-weight:500;margin-bottom:16px;letter-spacing:0.05em}
  .hero h1{font-size:clamp(2.5rem,7vw,4.5rem);font-weight:700;line-height:1.1;letter-spacing:-0.03em;margin-bottom:12px}
  .hero h1 span{background:linear-gradient(135deg,var(--accent),var(--accent3));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .hero .subtitle{font-size:1.15rem;color:var(--muted);margin-bottom:32px;max-width:480px}
  .hero .contacts{display:flex;gap:16px;flex-wrap:wrap}
  .hero .contacts a{padding:10px 22px;border:1px solid var(--border);border-radius:8px;font-size:0.82rem;font-weight:500;transition:all 0.3s}
  .hero .contacts a:hover{border-color:var(--accent);color:var(--accent);text-decoration:none}
  .section{padding:80px 0}
  .section-tag{font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:12px}
  .section-title{font-size:1.8rem;font-weight:600;margin-bottom:40px}
  .about-text{font-size:1.05rem;color:var(--muted);line-height:1.8}
  .exp-cards{display:grid;gap:16px}
  .exp-card{padding:28px 32px;background:var(--surface);border:1px solid var(--border);border-radius:12px;transition:all 0.3s}
  .exp-card:hover{border-color:var(--accent);transform:translateX(4px)}
  .exp-card .exp-top{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px;margin-bottom:8px}
  .exp-card h3{font-size:1.1rem;font-weight:600}
  .exp-card .period{font-family:'Fira Code',monospace;font-size:0.75rem;color:var(--accent)}
  .exp-card .company{color:var(--accent2);font-size:0.9rem;margin-bottom:8px}
  .exp-card p{color:var(--muted);font-size:0.9rem}
  .skills-cloud{display:flex;flex-wrap:wrap;gap:10px}
  .skill-bubble{padding:8px 20px;border-radius:100px;font-size:0.82rem;font-weight:500;background:linear-gradient(135deg,rgba(255,107,53,0.1),rgba(232,68,90,0.1));border:1px solid var(--border);transition:all 0.3s}
  .skill-bubble:hover{border-color:var(--accent);color:var(--accent)}
  .projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}
  .project-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:all 0.4s}
  .project-card:hover{border-color:var(--accent);transform:translateY(-4px)}
  .project-card .card-bar{height:4px;background:linear-gradient(90deg,var(--accent),var(--accent3))}
  .project-card .card-body{padding:28px}
  .project-card h3{font-size:1.05rem;font-weight:600;margin-bottom:8px}
  .project-card p{color:var(--muted);font-size:0.88rem;margin-bottom:16px}
  .project-card .tech-list{display:flex;flex-wrap:wrap;gap:6px}
  .project-card .tech-list span{font-size:0.68rem;padding:3px 10px;border-radius:6px;background:rgba(255,107,53,0.08);color:var(--accent2);font-family:'Fira Code',monospace}
  footer{padding:60px 0;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
  footer .name{font-weight:600;font-size:1.1rem}
  .footer-socials{display:flex;gap:16px}
  .footer-socials a{width:40px;height:40px;border-radius:50%;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:600;transition:all 0.3s}
  .footer-socials a:hover{border-color:var(--accent);color:var(--accent);text-decoration:none}
</style>
</head>
<body>
  <section class="hero"><div class="hero-content container">
    <p class="greeting mono">Hello, I'm</p>
    <h1><span>${esc(data.name)}</span></h1>
    <p class="subtitle">${esc(data.title)} — ${esc(data.about).slice(0, 100)}${data.about.length > 100 ? "..." : ""}</p>
    <div class="contacts"><a href="mailto:${esc(data.email)}">${esc(data.email)}</a>${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ""}${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ""}</div>
  </div></section>
  <main class="container">
    <section class="section" id="about"><p class="section-tag mono">01 // About</p><h2 class="section-title">About Me</h2><p class="about-text">${esc(data.about)}</p></section>
    ${data.experience.length ? `<section class="section" id="experience"><p class="section-tag mono">02 // Experience</p><h2 class="section-title">Work History</h2><div class="exp-cards">${data.experience.map((e) => `<div class="exp-card"><div class="exp-top"><h3>${esc(e.role)}</h3><span class="period">${esc(e.period)}</span></div><p class="company">${esc(e.company)}</p><p>${esc(e.description)}</p></div>`).join("")}</div></section>` : ""}
    ${data.skills.length ? `<section class="section" id="skills"><p class="section-tag mono">04 // Skills</p><h2 class="section-title">Tech Stack</h2><div class="skills-cloud">${data.skills.map((s) => `<span class="skill-bubble">${esc(s)}</span>`).join("")}</div></section>` : ""}
    ${data.projects.length ? `<section class="section" id="projects"><p class="section-tag mono">05 // Projects</p><h2 class="section-title">Featured Work</h2><div class="projects-grid">${data.projects.map((p) => `<div class="project-card"><div class="card-bar"></div><div class="card-body"><h3>${p.url ? `<a href="${esc(p.url)}" target="_blank">${esc(p.name)}</a>` : esc(p.name)}</h3><p>${esc(p.description)}</p><div class="tech-list">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div></div>`).join("")}</div></section>` : ""}
  </main>
  <footer><span class="name">${esc(data.name)}</span><div class="footer-socials">${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank" title="GitHub">GH</a>` : ""}${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank" title="LinkedIn">LI</a>` : ""}${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank" title="Twitter">TW</a>` : ""}${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank" title="Website">WB</a>` : ""}</div></footer>
</body>
</html>`;
}

export const previews: Record<string, string> = {
  minimal: generateMinimal(sampleData),
  creative: generateCreative(sampleData),
  developer: generateDeveloper(sampleData),
  modern: generateModern(sampleData),
  elegant: generateElegant(sampleData),
  glass: generateGlass(sampleData),
  mono: generateMono(sampleData),
  sunset: generateSunset(sampleData),
};

export const templateList = [
  { id: "minimal", name: "Minimal", description: "Clean, elegant design with serif typography and warm tones", thumbnail: "linear-gradient(135deg, #faf8f4 0%, #f0ece4 100%)" },
  { id: "creative", name: "Creative", description: "Bold dark theme with dramatic typography and vibrant accents", thumbnail: "linear-gradient(135deg, #0c0a09 0%, #1c1917 50%, #facc15 150%)" },
  { id: "developer", name: "Developer", description: "GitHub-inspired sidebar layout with terminal aesthetics", thumbnail: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #58a6ff 150%)" },
  { id: "modern", name: "Modern", description: "Contemporary design with soft gradients and refined spacing", thumbnail: "linear-gradient(135deg, #fefefe 0%, #ede9fe 50%, #6d28d9 150%)" },
  { id: "elegant", name: "Elegant", description: "Luxurious dark theme with gold accents and timeline layout", thumbnail: "linear-gradient(135deg, #0f0d0a 0%, #1a1714 50%, #d4a853 150%)" },
  { id: "glass", name: "Glass", description: "Glassmorphism design with frosted panels and animated background", thumbnail: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #7c6aef 150%)" },
  { id: "mono", name: "Mono", description: "Monochrome typographic design with clean tabular layout", thumbnail: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #111111 150%)" },
  { id: "sunset", name: "Sunset", description: "Warm gradient theme with bold typography and glowing accents", thumbnail: "linear-gradient(135deg, #1a0f0a 0%, #2a1a12 50%, #ff6b35 150%)" },
];
