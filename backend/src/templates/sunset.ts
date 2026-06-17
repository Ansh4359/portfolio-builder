export function generate(data: any, esc: (s: string) => string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0f0a0a;--fg:#f5efe6;--muted:#a89888;--accent:#ff6b35;--accent2:#e84393;--card:#1a1412;--border:#2a2220}
body{font-family:'Sora',sans-serif;background:var(--bg);color:var(--fg);line-height:1.7;font-size:15px;overflow-x:hidden}
h1,h2,h3{font-weight:700;line-height:1.15}
a{color:var(--accent);text-decoration:none}
a:hover{opacity:.7}
.container{max-width:900px;margin:0 auto;padding:0 clamp(20px,4vw,48px)}

/* Hero */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;position:relative;padding:80px 0 60px}
.hero::before{content:'';position:absolute;top:20%;right:10%;width:300px;height:300px;background:radial-gradient(circle,var(--accent) 0%,transparent 70%);opacity:.15;filter:blur(40px);pointer-events:none}
.hero::after{content:'';position:absolute;bottom:20%;left:5%;width:250px;height:250px;background:radial-gradient(circle,var(--accent2) 0%,transparent 70%);opacity:.12;filter:blur(30px);pointer-events:none}
.hero h1{font-size:clamp(2.6rem,6vw,4.2rem);margin-bottom:12px;letter-spacing:-.03em;position:relative;z-index:1}
.hero .title{font-size:clamp(1rem,2vw,1.2rem);color:var(--accent);margin-bottom:8px;position:relative;z-index:1}
.hero .subtitle{font-size:clamp(.9rem,2vw,1rem);color:var(--muted);max-width:500px;margin-bottom:32px;position:relative;z-index:1}
.hero .cta-row{display:flex;gap:12px;flex-wrap:wrap;position:relative;z-index:1}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;border-radius:8px;font-size:.9rem;font-weight:500;min-height:44px;transition:all .2s;cursor:pointer}
.btn-primary{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border:none}
.btn-primary:hover{opacity:.9}
.btn-ghost{background:transparent;border:1px solid var(--border);color:var(--fg)}
.btn-ghost:hover{border-color:var(--accent)}

/* Sections */
.section{padding:80px 0}
.section-tag{font-family:'Fira Code',monospace;font-size:.7rem;color:var(--accent);margin-bottom:12px;letter-spacing:.1em}
.section h2{font-size:clamp(1.6rem,3.5vw,2.2rem);margin-bottom:20px}
.section p{color:var(--muted);margin-bottom:16px;max-width:600px}

/* About */
.about-grid{display:grid;grid-template-columns:2fr 1fr;gap:40px;margin-top:24px}
.about-text{font-size:.95rem;line-height:1.8;color:var(--muted)}
.stat-cards{display:grid;gap:12px}
.stat-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center}
.stat-card .value{font-size:1.4rem;font-weight:700;color:var(--accent)}
.stat-card .label{font-size:.7rem;color:var(--muted);text-transform:uppercase;letter-spacing:.1em}

/* Experience */
.exp-grid{display:grid;gap:16px;margin-top:24px}
.exp-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:24px;border-left:3px solid var(--accent);transition:border-color .2s}
.exp-card:hover{border-color:var(--accent)}
.exp-card h3{font-size:1.05rem;margin-bottom:4px}
.exp-card .company{font-size:.85rem;color:var(--accent);margin-bottom:2px}
.exp-card .period{font-size:.75rem;color:var(--muted);margin-bottom:10px;font-family:'Fira Code',monospace}
.exp-card p{font-size:.9rem;color:var(--muted)}

/* Education */
.edu-grid{display:grid;gap:16px;margin-top:24px}
.edu-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.edu-card h3{font-size:1rem;margin-bottom:4px}
.edu-card .school{font-size:.85rem;color:var(--accent);margin-bottom:2px}
.edu-card .period{font-size:.75rem;color:var(--muted);font-family:'Fira Code',monospace}

/* Skills */
.skills-wrap{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
.skill{padding:10px 18px;border-radius:100px;font-size:.8rem;font-weight:500;min-height:44px;display:inline-flex;align-items:center;background:linear-gradient(135deg,rgba(255,107,53,0.12),rgba(232,67,147,0.12));border:1px solid rgba(255,107,53,0.2);color:var(--accent)}

/* Projects */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:24px}
.project-card{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:border-color .2s}
.project-card:hover{border-color:var(--accent)}
.project-card-bar{height:3px;background:linear-gradient(90deg,var(--accent),var(--accent2))}
.project-card-body{padding:24px}
.project-card h3{font-size:1.05rem;margin-bottom:8px}
.project-card p{font-size:.85rem;color:var(--muted);margin-bottom:12px}
.project-tech{display:flex;flex-wrap:wrap;gap:6px}
.project-tech span{font-size:.7rem;padding:4px 10px;border-radius:100px;background:rgba(255,255,255,0.05);border:1px solid var(--border);font-family:'Fira Code',monospace}

/* Footer */
.footer{padding:60px 0;border-top:1px solid var(--border);text-align:center}
.footer .socials{display:flex;justify-content:center;gap:16px;margin-bottom:20px;flex-wrap:wrap}
.footer .socials a{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;background:var(--card);border:1px solid var(--border);font-size:.75rem;font-weight:600;color:var(--muted);transition:all .2s}
.footer .socials a:hover{border-color:var(--accent);color:var(--accent)}
.footer p{font-size:.75rem;color:var(--muted)}

@media(max-width:768px){
.hero{min-height:auto;padding:100px 0 60px}
.hero::before,.hero::after{opacity:.08}
.section{padding:60px 0}
.about-grid{grid-template-columns:1fr;gap:24px}
.stat-cards{grid-template-columns:repeat(3,1fr)}
.projects-grid{grid-template-columns:1fr 1fr}
}

@media(max-width:480px){
.hero{padding:60px 0 40px}
.hero h1{font-size:2rem}
.section{padding:48px 0}
.section h2{font-size:1.4rem}
.stat-cards{grid-template-columns:1fr 1fr 1fr}
.projects-grid{grid-template-columns:1fr}
.exp-card{padding:20px}
.project-card-body{padding:20px}
.btn{width:100%;justify-content:center}
.hero .cta-row{flex-direction:column}
.skill{min-height:44px}
.footer .socials a{width:48px;height:48px}
}
</style>
</head>
<body>

<div class="container">

<section class="hero" id="hero">
<h1>${esc(data.name)}</h1>
<div class="title">${esc(data.title)}</div>
<div class="subtitle">${esc(data.about).slice(0, 120)}${data.about.length > 120 ? '...' : ''}</div>
<div class="cta-row">
${data.email ? `<a href="mailto:${esc(data.email)}" class="btn btn-primary">Get in Touch</a>` : ''}
${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank" class="btn btn-ghost">GitHub</a>` : ''}
</div>
</section>

<section class="section" id="about">
<div class="section-tag">// About</div>
<h2>About Me</h2>
<div class="about-grid">
<p class="about-text">${esc(data.about) || 'A passionate developer building great things.'}</p>
<div class="stat-cards">
${data.experience.length > 0 ? `<div class="stat-card"><div class="value">${data.experience.length}</div><div class="label">Roles</div></div>` : ''}
${data.projects.length > 0 ? `<div class="stat-card"><div class="value">${data.projects.length}</div><div class="label">Projects</div></div>` : ''}
${data.skills.length > 0 ? `<div class="stat-card"><div class="value">${data.skills.length}</div><div class="label">Skills</div></div>` : ''}
</div>
</div>
</section>

${data.experience.length > 0 ? `
<section class="section" id="experience">
<div class="section-tag">// Experience</div>
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
<div class="section-tag">// Education</div>
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
<div class="section-tag">// Skills</div>
<h2>Tech Stack</h2>
<div class="skills-wrap">
${data.skills.map((s: string) => `<span class="skill">${esc(s)}</span>`).join('')}
</div>
</section>
` : ''}

${data.projects.length > 0 ? `
<section class="section" id="projects">
<div class="section-tag">// Projects</div>
<h2>Featured Work</h2>
<div class="projects-grid">
${data.projects.map((p: any) => `
<div class="project-card">
<div class="project-card-bar"></div>
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
${data.email ? `<a href="mailto:${esc(data.email)}" title="Email">@</a>` : ''}
${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank" title="GitHub">GH</a>` : ''}
${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank" title="LinkedIn">LI</a>` : ''}
${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank" title="Twitter">TW</a>` : ''}
${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank" title="Website">WB</a>` : ''}
</div>
<p>${esc(data.name)} · Built with MyFolio</p>
</footer>

</div>

</body>
</html>`;
}
