export function generate(data: any, esc: (s: string) => string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#fafafa;--fg:#111;--muted:#666;--accent:#111;--card:#fff;--border:#e0e0e0}
body{font-family:'Space Grotesk',sans-serif;background:var(--bg);color:var(--fg);line-height:1.7;font-size:15px}
h1,h2,h3{font-weight:600;line-height:1.2}
a{color:var(--fg);text-decoration:none;border-bottom:1px solid var(--border)}
a:hover{border-color:var(--fg)}
.container{max-width:880px;margin:0 auto;padding:0 clamp(20px,4vw,48px)}

/* Header */
.header{padding:80px 0 60px;display:flex;align-items:flex-end;justify-content:space-between;gap:24px;border-bottom:1px solid var(--border)}
.header h1{font-size:clamp(2rem,4vw,3rem);letter-spacing:-.03em}
.header .title-block{text-align:right}
.header .title{font-size:clamp(.9rem,2vw,1.05rem);color:var(--muted);font-family:'JetBrains Mono',monospace}

/* Sections */
.section{padding:48px 0;border-bottom:1px solid var(--border)}
.section-label{font-size:.7rem;text-transform:uppercase;letter-spacing:.15em;color:var(--muted);margin-bottom:24px;font-family:'JetBrains Mono',monospace}
.section h2{font-size:clamp(1.3rem,3vw,1.6rem);margin-bottom:16px}
.section p{color:var(--muted);margin-bottom:12px;max-width:600px}

/* About */
.about-text{font-size:.95rem;line-height:1.8;color:var(--muted)}

/* Experience - Tabular */
.exp-table{width:100%;margin-top:16px}
.exp-row{display:grid;grid-template-columns:160px 1fr;gap:24px;padding:16px 0;border-bottom:1px solid var(--border)}
.exp-row:last-child{border-bottom:none}
.exp-row .col-role{font-weight:600;font-size:.95rem}
.exp-row .col-role .company{font-weight:400;color:var(--muted);font-size:.85rem;margin-top:2px}
.exp-row .col-role .period{font-weight:400;color:var(--muted);font-size:.75rem;font-family:'JetBrains Mono',monospace;margin-top:4px}
.exp-row .col-desc{font-size:.9rem;color:var(--muted)}

/* Education */
.edu-table{width:100%;margin-top:16px}
.edu-row{display:grid;grid-template-columns:160px 1fr;gap:24px;padding:16px 0;border-bottom:1px solid var(--border)}
.edu-row:last-child{border-bottom:none}
.edu-row .col-degree{font-weight:600;font-size:.95rem}
.edu-row .col-degree .school{font-weight:400;color:var(--muted);font-size:.85rem;margin-top:2px}
.edu-row .col-degree .period{font-weight:400;color:var(--muted);font-size:.75rem;font-family:'JetBrains Mono',monospace;margin-top:4px}

/* Skills */
.skills-list{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.skill{padding:8px 16px;border:1px solid var(--border);font-size:.8rem;font-family:'JetBrains Mono',monospace;min-height:40px;display:inline-flex;align-items:center}

/* Projects */
.projects-list{margin-top:16px}
.project-item{display:grid;grid-template-columns:1fr auto;gap:24px;padding:16px 0;border-bottom:1px solid var(--border)}
.project-item:last-child{border-bottom:none}
.project-item h3{font-size:1rem;margin-bottom:4px}
.project-item p{font-size:.85rem;color:var(--muted)}
.project-item .tech-col{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}
.project-item .tech-col span{font-size:.7rem;padding:4px 10px;border:1px solid var(--border);font-family:'JetBrains Mono',monospace}

/* Footer */
.footer{padding:40px 0;display:flex;justify-content:space-between;align-items:center;font-size:.8rem;color:var(--muted);font-family:'JetBrains Mono',monospace}
.footer .socials{display:flex;gap:20px;flex-wrap:wrap}
.footer .socials a{font-size:.8rem;color:var(--muted);border-bottom:none;min-height:44px;display:inline-flex;align-items:center;padding:8px 0}
.footer .socials a:hover{color:var(--fg)}

@media(max-width:768px){
.header{flex-direction:column;align-items:flex-start;gap:8px}
.header .title-block{text-align:left}
.section{padding:40px 0}
.exp-row{grid-template-columns:1fr;gap:8px}
.edu-row{grid-template-columns:1fr;gap:8px}
.project-item{grid-template-columns:1fr;gap:8px}
.project-item .tech-col{justify-content:flex-start}
}

@media(max-width:480px){
.header{padding:60px 0 40px}
.header h1{font-size:1.8rem}
.section{padding:32px 0}
.section h2{font-size:1.3rem}
.skills-list{gap:6px}
.skill{min-height:44px}
.footer{flex-direction:column;gap:12px;text-align:center}
.footer .socials{justify-content:center}
}
</style>
</head>
<body>

<div class="container">

<header class="header" id="hero">
<h1>${esc(data.name)}</h1>
<div class="title-block">
<div class="title">${esc(data.title)}</div>
</div>
</header>

<section class="section" id="about">
<div class="section-label">About</div>
<p class="about-text">${esc(data.about) || 'A passionate developer building great things.'}</p>
</section>

${data.experience.length > 0 ? `
<section class="section" id="experience">
<div class="section-label">Experience</div>
<div class="exp-table">
${data.experience.map((e: any) => `
<div class="exp-row">
<div class="col-role">
${esc(e.role)}
<div class="company">${esc(e.company)}</div>
<div class="period">${esc(e.period)}</div>
</div>
<div class="col-desc">${esc(e.description)}</div>
</div>
`).join('')}
</div>
</section>
` : ''}

${data.education.length > 0 ? `
<section class="section" id="education">
<div class="section-label">Education</div>
<div class="edu-table">
${data.education.map((e: any) => `
<div class="edu-row">
<div class="col-degree">
${esc(e.degree)}
<div class="school">${esc(e.school)}</div>
<div class="period">${esc(e.period)}</div>
</div>
</div>
`).join('')}
</div>
</section>
` : ''}

${data.skills.length > 0 ? `
<section class="section" id="skills">
<div class="section-label">Skills</div>
<div class="skills-list">
${data.skills.map((s: string) => `<span class="skill">${esc(s)}</span>`).join('')}
</div>
</section>
` : ''}

${data.projects.length > 0 ? `
<section class="section" id="projects">
<div class="section-label">Projects</div>
<div class="projects-list">
${data.projects.map((p: any) => `
<div class="project-item">
<div>
<h3>${esc(p.name)}</h3>
<p>${esc(p.description)}</p>
</div>
${p.tech.length > 0 ? `<div class="tech-col">${p.tech.map((t: string) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
</div>
`).join('')}
</div>
</section>
` : ''}

<footer class="footer" id="contact">
<span>${esc(data.name)} · Built with MyFolio</span>
<div class="socials">
${data.email ? `<a href="mailto:${esc(data.email)}">Email</a>` : ''}
${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ''}
${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ''}
${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ''}
${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Website</a>` : ''}
</div>
</footer>

</div>

</body>
</html>`;
}
