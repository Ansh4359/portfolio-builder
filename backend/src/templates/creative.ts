export function generate(data: any, esc: (s: string) => string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0a0a;--fg:#f0f0f0;--muted:#888;--accent:#c8ff00;--card:#141414;--border:#222}
body{font-family:'Space Mono',monospace;background:var(--bg);color:var(--fg);line-height:1.7;font-size:15px;overflow-x:hidden}
h1,h2,h3{font-family:'Syne',sans-serif;font-weight:700;line-height:1.1}
a{color:var(--accent);text-decoration:none}
a:hover{opacity:.7}
.container{max-width:900px;margin:0 auto;padding:0 24px}

/* Hero */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:80px 0 60px}
.hero .eyebrow{font-size:.75rem;text-transform:uppercase;letter-spacing:.2em;color:var(--accent);margin-bottom:16px}
.hero h1{font-size:clamp(2.8rem,7vw,5rem);font-weight:800;margin-bottom:16px;background:linear-gradient(135deg,var(--fg) 0%,var(--accent) 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.hero .subtitle{font-size:clamp(1rem,2vw,1.2rem);color:var(--muted);max-width:500px;margin-bottom:32px}
.hero .cta-row{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;font-family:'Space Mono',monospace;font-size:.85rem;border:1px solid var(--accent);color:var(--accent);min-height:44px;transition:all .2s}
.btn:hover{background:var(--accent);color:var(--bg)}

/* Sections */
.section{padding:80px 0}
.section-label{font-size:.7rem;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:24px;font-family:'Space Mono',monospace}
.section h2{font-size:clamp(1.8rem,4vw,2.6rem);margin-bottom:20px}
.section p{color:var(--muted);margin-bottom:16px;max-width:600px}

/* About */
.about-text{font-size:1rem;line-height:1.8;color:var(--muted)}

/* Experience */
.exp-grid{display:grid;gap:20px;margin-top:24px}
.exp-card{background:var(--card);border:1px solid var(--border);padding:24px;transition:border-color .2s}
.exp-card:hover{border-color:var(--accent)}
.exp-card h3{font-size:1.05rem;margin-bottom:4px}
.exp-card .company{font-size:.85rem;color:var(--accent);margin-bottom:4px}
.exp-card .period{font-size:.75rem;color:var(--muted);margin-bottom:10px}
.exp-card p{font-size:.85rem;color:var(--muted)}

/* Education */
.edu-grid{display:grid;gap:16px;margin-top:24px}
.edu-card{background:var(--card);border:1px solid var(--border);padding:20px}
.edu-card h3{font-size:1rem;margin-bottom:4px}
.edu-card .school{font-size:.85rem;color:var(--accent);margin-bottom:2px}
.edu-card .period{font-size:.75rem;color:var(--muted)}

/* Skills */
.skills-wrap{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
.skill{padding:10px 18px;border:1px solid var(--border);font-size:.8rem;font-family:'Space Mono',monospace;min-height:44px;display:inline-flex;align-items:center;transition:border-color .2s}
.skill:hover{border-color:var(--accent)}

/* Projects */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:24px}
.project-card{background:var(--card);border:1px solid var(--border);padding:24px;transition:border-color .2s}
.project-card:hover{border-color:var(--accent)}
.project-card h3{font-size:1.05rem;margin-bottom:8px}
.project-card p{font-size:.85rem;color:var(--muted);margin-bottom:12px}
.project-tech{display:flex;flex-wrap:wrap;gap:6px}
.project-tech span{font-size:.7rem;padding:4px 10px;border:1px solid var(--border);font-family:'Space Mono',monospace}

/* Footer */
.footer{padding:60px 0;border-top:1px solid var(--border);text-align:center}
.footer .socials{display:flex;justify-content:center;gap:24px;margin-bottom:20px;flex-wrap:wrap}
.footer .socials a{font-size:.85rem;min-height:44px;display:inline-flex;align-items:center;padding:8px}
.footer p{font-size:.75rem;color:var(--muted)}

@media(max-width:768px){
.hero{min-height:auto;padding:100px 0 60px}
.section{padding:60px 0}
.projects-grid{grid-template-columns:1fr 1fr}
}

@media(max-width:480px){
.hero{padding:60px 0 40px}
.hero h1{font-size:2.4rem}
.section{padding:48px 0}
.section h2{font-size:1.6rem}
.projects-grid{grid-template-columns:1fr}
.exp-card{padding:20px}
.project-card{padding:20px}
.btn{width:100%;justify-content:center}
.hero .cta-row{flex-direction:column}
}
</style>
</head>
<body>

<div class="container">

<section class="hero" id="hero">
<div class="eyebrow">Hello, I'm</div>
<h1>${esc(data.name)}</h1>
<div class="subtitle">${esc(data.title)}</div>
<div class="cta-row">
${data.email ? `<a href="mailto:${esc(data.email)}" class="btn">Get in Touch</a>` : ''}
${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank" class="btn">GitHub</a>` : ''}
</div>
</section>

<section class="section" id="about">
<div class="section-label">01 // About</div>
<h2>About Me</h2>
<p class="about-text">${esc(data.about) || 'A passionate developer building great things.'}</p>
</section>

${data.experience.length > 0 ? `
<section class="section" id="experience">
<div class="section-label">02 // Experience</div>
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
<div class="section-label">03 // Education</div>
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
<div class="section-label">04 // Skills</div>
<h2>Tech Stack</h2>
<div class="skills-wrap">
${data.skills.map((s: string) => `<span class="skill">${esc(s)}</span>`).join('')}
</div>
</section>
` : ''}

${data.projects.length > 0 ? `
<section class="section" id="projects">
<div class="section-label">05 // Projects</div>
<h2>Featured Work</h2>
<div class="projects-grid">
${data.projects.map((p: any) => `
<div class="project-card">
<h3>${esc(p.name)}</h3>
<p>${esc(p.description)}</p>
${p.tech.length > 0 ? `<div class="project-tech">${p.tech.map((t: string) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
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
