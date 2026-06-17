export function generate(data: any, esc: (s: string) => string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#faf9f7;--fg:#1a1a1a;--muted:#6b6b6b;--accent:#4f46e5;--accent-bg:#eef2ff;--card:#fff;--border:#e5e5e5}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--fg);line-height:1.7;font-size:15px}
h1,h2,h3{font-family:'Instrument Serif',serif;font-weight:400;line-height:1.15}
a{color:var(--accent);text-decoration:none}
a:hover{opacity:.7}
.container{max-width:960px;margin:0 auto;padding:0 clamp(20px,4vw,48px)}

/* Nav */
.nav{position:sticky;top:0;z-index:10;background:rgba(250,249,247,0.85);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 24px}
.nav-inner{max-width:960px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:56px}
.nav-brand{font-family:'Instrument Serif',serif;font-size:1.1rem}
.nav-links{display:flex;gap:24px}
.nav-links a{font-size:.85rem;color:var(--muted);min-height:44px;display:inline-flex;align-items:center}
.nav-links a:hover{color:var(--fg)}

/* Hero */
.hero{padding:100px 0 80px}
.hero .eyebrow{font-size:.75rem;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:16px}
.hero h1{font-size:clamp(2.4rem,5vw,3.8rem);margin-bottom:16px;letter-spacing:-.02em}
.hero h1 em{font-style:italic;color:var(--accent)}
.hero .subtitle{font-size:clamp(1rem,2vw,1.15rem);color:var(--muted);max-width:520px;margin-bottom:32px}
.hero .cta-row{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;font-family:'DM Sans',sans-serif;font-size:.9rem;border-radius:8px;min-height:44px;transition:all .2s;cursor:pointer}
.btn-primary{background:var(--accent);color:#fff;border:none}
.btn-primary:hover{opacity:.9}
.btn-secondary{background:transparent;border:1px solid var(--border);color:var(--fg)}
.btn-secondary:hover{border-color:var(--accent)}

/* Sections */
.section{padding:80px 0}
.section-label{font-size:.7rem;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:12px}
.section h2{font-size:clamp(1.8rem,4vw,2.4rem);margin-bottom:20px}
.section p{color:var(--muted);margin-bottom:16px;max-width:600px}

/* About */
.about-text{font-size:1rem;line-height:1.8;color:var(--muted)}

/* Experience */
.exp-grid{display:grid;gap:16px;margin-top:24px}
.exp-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:24px;transition:border-color .2s}
.exp-card:hover{border-color:var(--accent)}
.exp-card h3{font-size:1.1rem;margin-bottom:4px}
.exp-card .company{font-size:.85rem;color:var(--accent);margin-bottom:2px}
.exp-card .period{font-size:.75rem;color:var(--muted);margin-bottom:10px}
.exp-card p{font-size:.9rem;color:var(--muted)}

/* Education */
.edu-grid{display:grid;gap:16px;margin-top:24px}
.edu-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.edu-card h3{font-size:1rem;margin-bottom:4px}
.edu-card .school{font-size:.85rem;color:var(--accent);margin-bottom:2px}
.edu-card .period{font-size:.75rem;color:var(--muted)}

/* Skills */
.skills-wrap{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.skill{padding:8px 18px;background:var(--accent-bg);color:var(--accent);border-radius:100px;font-size:.8rem;font-weight:500;min-height:40px;display:inline-flex;align-items:center}

/* Projects */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:24px}
.project-card{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:border-color .2s}
.project-card:hover{border-color:var(--accent)}
.project-card-body{padding:24px}
.project-card h3{font-size:1.05rem;margin-bottom:8px}
.project-card p{font-size:.85rem;color:var(--muted);margin-bottom:12px}
.project-tech{display:flex;flex-wrap:wrap;gap:6px}
.project-tech span{font-size:.7rem;padding:4px 10px;background:var(--accent-bg);color:var(--accent);border-radius:100px}

/* Footer */
.footer{padding:60px 0;border-top:1px solid var(--border);text-align:center}
.footer .socials{display:flex;justify-content:center;gap:24px;margin-bottom:20px;flex-wrap:wrap}
.footer .socials a{font-size:.85rem;color:var(--muted);min-height:44px;display:inline-flex;align-items:center;padding:8px}
.footer .socials a:hover{color:var(--fg)}
.footer p{font-size:.75rem;color:var(--muted)}

@media(max-width:768px){
.hero{padding:60px 0 48px}
.section{padding:60px 0}
.nav-links{display:none}
.projects-grid{grid-template-columns:1fr 1fr}
}

@media(max-width:480px){
.hero{padding:48px 0 36px}
.hero h1{font-size:2rem}
.section{padding:48px 0}
.section h2{font-size:1.5rem}
.projects-grid{grid-template-columns:1fr}
.exp-card{padding:20px}
.project-card-body{padding:20px}
.btn{width:100%;justify-content:center}
.hero .cta-row{flex-direction:column}
.skill{min-height:44px}
}
</style>
</head>
<body>

<nav class="nav">
<div class="nav-inner">
<span class="nav-brand">${esc(data.name)}</span>
<div class="nav-links">
<a href="#about">About</a>
${data.experience.length > 0 ? '<a href="#experience">Experience</a>' : ''}
${data.projects.length > 0 ? '<a href="#projects">Projects</a>' : ''}
<a href="#contact">Contact</a>
</div>
</div>
</nav>

<div class="container">

<section class="hero" id="hero">
<div class="eyebrow">Hello, I'm</div>
<h1>${esc(data.name)}<em>.</em></h1>
<div class="subtitle">${esc(data.title)}</div>
<div class="cta-row">
${data.email ? `<a href="mailto:${esc(data.email)}" class="btn btn-primary">Get in Touch</a>` : ''}
${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank" class="btn btn-secondary">GitHub</a>` : ''}
</div>
</section>

<section class="section" id="about">
<div class="section-label">About</div>
<h2>About Me</h2>
<p class="about-text">${esc(data.about) || 'A passionate developer building great things.'}</p>
</section>

${data.experience.length > 0 ? `
<section class="section" id="experience">
<div class="section-label">Experience</div>
<h2>Work History</h2>
<div class="exp-grid">
${data.experience.map((e: any) => `
<div class="exp-card">
<h3>${esc(e.role)}</h3>
<div class="company">${esc(e.company)}</div>
<div class="period">${esc(e.period)}</div>
<p>${esc(e.description)}</p>
</div>
`).join('')}
</div>
</section>
` : ''}

${data.education.length > 0 ? `
<section class="section" id="education">
<div class="section-label">Education</div>
<h2>Education</h2>
<div class="edu-grid">
${data.education.map((e: any) => `
<div class="edu-card">
<h3>${esc(e.degree)}</h3>
<div class="school">${esc(e.school)}</div>
<div class="period">${esc(e.period)}</div>
</div>
`).join('')}
</div>
</section>
` : ''}

${data.skills.length > 0 ? `
<section class="section" id="skills">
<div class="section-label">Skills</div>
<h2>Tech Stack</h2>
<div class="skills-wrap">
${data.skills.map((s: string) => `<span class="skill">${esc(s)}</span>`).join('')}
</div>
</section>
` : ''}

${data.projects.length > 0 ? `
<section class="section" id="projects">
<div class="section-label">Projects</div>
<h2>Featured Work</h2>
<div class="projects-grid">
${data.projects.map((p: any) => `
<div class="project-card">
<div class="project-card-body">
<h3>${esc(p.name)}</h3>
<p>${esc(p.description)}</p>
${p.tech.length > 0 ? `<div class="project-tech">${p.tech.map((t: string) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
</div>
</div>
`).join('')}
</div>
</section>
` : ''}

<footer class="footer" id="contact">
<div class="socials">
${data.email ? `<a href="mailto:${esc(data.email)}">Email</a>` : ''}
${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ''}
${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ''}
${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ''}
${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Website</a>` : ''}
</div>
<p>${esc(data.name)} · Built with MyFolio</p>
</footer>

</div>

</body>
</html>`;
}
