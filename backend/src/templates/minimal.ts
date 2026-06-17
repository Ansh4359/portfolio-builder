export function generate(data: any, esc: (s: string) => string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,700;1,300&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#faf8f5;--fg:#2c2c2c;--muted:#6b6b6b;--border:#e8e5e0;--accent:#8b7355;--card:#fff}
body{font-family:'DM Mono',monospace;background:var(--bg);color:var(--fg);line-height:1.7;font-size:15px}
h1,h2,h3{font-family:'Cormorant Garamond',serif;font-weight:300;line-height:1.2}
a{color:var(--accent);text-decoration:none;border-bottom:1px solid var(--accent)}
a:hover{opacity:.7}
.container{max-width:720px;margin:0 auto;padding:0 24px}

/* Hero */
.hero{padding:120px 0 80px;text-align:center}
.hero h1{font-size:clamp(2.4rem,5vw,3.6rem);margin-bottom:12px;letter-spacing:-.02em}
.hero .title{font-size:1rem;color:var(--muted);margin-bottom:24px}
.hero .tagline{font-family:'Cormorant Garamond',serif;font-size:clamp(1.1rem,2vw,1.3rem);color:var(--muted);font-style:italic;max-width:480px;margin:0 auto}
.hero .divider{width:40px;height:1px;background:var(--accent);margin:32px auto 0}

/* Sections */
.section{padding:60px 0}
.section-label{font-size:.7rem;text-transform:uppercase;letter-spacing:.15em;color:var(--muted);margin-bottom:32px;font-family:'DM Mono',monospace}
.section h2{font-size:clamp(1.6rem,3vw,2.2rem);margin-bottom:24px}
.section p{color:var(--muted);margin-bottom:16px;max-width:600px}

/* About */
.about-text{font-family:'Cormorant Garamond',serif;font-size:1.15rem;line-height:1.8;color:var(--fg)}

/* Experience & Education */
.timeline{border-left:1px solid var(--border);padding-left:24px;margin-top:24px}
.timeline-item{margin-bottom:32px;position:relative}
.timeline-item::before{content:'';position:absolute;left:-29px;top:6px;width:8px;height:8px;border-radius:50%;background:var(--accent)}
.timeline-item h3{font-size:1.1rem;font-weight:500;margin-bottom:2px}
.timeline-item .meta{font-size:.8rem;color:var(--muted);margin-bottom:6px}
.timeline-item p{font-size:.9rem;color:var(--muted)}

/* Skills */
.skills-grid{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.skill{padding:8px 16px;border:1px solid var(--border);font-size:.8rem;font-family:'DM Mono',monospace;transition:border-color .2s}
.skill:hover{border-color:var(--accent)}

/* Projects */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:24px}
.project-card{border:1px solid var(--border);padding:24px;transition:border-color .2s}
.project-card:hover{border-color:var(--accent)}
.project-card h3{font-size:1.05rem;font-weight:500;margin-bottom:6px}
.project-card p{font-size:.85rem;color:var(--muted);margin-bottom:10px}
.project-tech{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.project-tech span{font-size:.7rem;padding:4px 10px;background:var(--bg);border:1px solid var(--border);font-family:'DM Mono',monospace}

/* Contact */
.contact-list{display:flex;flex-wrap:wrap;gap:16px;margin-top:16px}
.contact-list a,.contact-list span{font-size:.85rem;display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:8px 0}

/* Footer */
.footer{padding:40px 0;border-top:1px solid var(--border);text-align:center;font-size:.75rem;color:var(--muted)}

@media(max-width:768px){
.hero{padding:80px 0 60px}
.section{padding:48px 0}
.projects-grid{grid-template-columns:1fr 1fr}
.timeline{padding-left:20px}
}

@media(max-width:480px){
.hero{padding:60px 0 40px}
.hero h1{font-size:2rem}
.section{padding:36px 0}
.section h2{font-size:1.4rem}
.projects-grid{grid-template-columns:1fr}
.contact-list{flex-direction:column;gap:8px}
.skill{min-height:44px;display:inline-flex;align-items:center}
.project-tech span{min-height:32px;display:inline-flex;align-items:center}
}
</style>
</head>
<body>

<div class="container">

<section class="hero" id="hero">
<h1>${esc(data.name)}</h1>
<div class="title">${esc(data.title)}</div>
${data.about ? `<div class="tagline">${esc(data.about).slice(0,120)}${data.about.length > 120 ? '...' : ''}</div>` : ''}
<div class="divider"></div>
</section>

${data.about ? `
<section class="section" id="about">
<div class="section-label">01 // About</div>
<p class="about-text">${esc(data.about)}</p>
</section>
` : ''}

${data.experience.length > 0 ? `
<section class="section" id="experience">
<div class="section-label">02 // Experience</div>
<div class="timeline">
${data.experience.map((e: any) => `
<div class="timeline-item">
<h3>${esc(e.role)}</h3>
<div class="meta">${esc(e.company)} · ${esc(e.period)}</div>
<p>${esc(e.description)}</p>
</div>
`).join('')}
</div>
</section>
` : ''}

${data.education.length > 0 ? `
<section class="section" id="education">
<div class="section-label">03 // Education</div>
<div class="timeline">
${data.education.map((e: any) => `
<div class="timeline-item">
<h3>${esc(e.degree)}</h3>
<div class="meta">${esc(e.school)} · ${esc(e.period)}</div>
</div>
`).join('')}
</div>
</section>
` : ''}

${data.skills.length > 0 ? `
<section class="section" id="skills">
<div class="section-label">04 // Skills</div>
<div class="skills-grid">
${data.skills.map((s: string) => `<span class="skill">${esc(s)}</span>`).join('')}
</div>
</section>
` : ''}

${data.projects.length > 0 ? `
<section class="section" id="projects">
<div class="section-label">05 // Projects</div>
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

<section class="section" id="contact">
<div class="section-label">Contact</div>
<div class="contact-list">
${data.email ? `<a href="mailto:${esc(data.email)}">${esc(data.email)}</a>` : ''}
${data.phone ? `<span>${esc(data.phone)}</span>` : ''}
${data.location ? `<span>${esc(data.location)}</span>` : ''}
${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ''}
${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ''}
${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ''}
${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Website</a>` : ''}
</div>
</section>

<footer class="footer">
<p>${esc(data.name)} · Built with MyFolio</p>
</footer>

</div>

</body>
</html>`;
}
