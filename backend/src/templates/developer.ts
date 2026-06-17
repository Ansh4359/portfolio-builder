export function generate(data: any, esc: (s: string) => string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0d1117;--fg:#c9d1d9;--muted:#8b949e;--accent:#58a6ff;--green:#3fb950;--card:#161b22;--border:#30363d}
body{font-family:'IBM Plex Sans',sans-serif;background:var(--bg);color:var(--fg);line-height:1.7;font-size:15px}
h1,h2,h3{font-family:'JetBrains Mono',monospace;font-weight:700;line-height:1.2}
a{color:var(--accent);text-decoration:none}
a:hover{opacity:.7}

.layout{display:grid;grid-template-columns:280px 1fr;min-height:100vh}

/* Sidebar */
.sidebar{background:var(--card);border-right:1px solid var(--border);padding:40px 24px;position:sticky;top:0;height:100vh;overflow-y:auto;display:flex;flex-direction:column}
.sidebar .avatar{width:80px;height:80px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:var(--bg);margin-bottom:20px}
.sidebar h1{font-size:1.2rem;margin-bottom:4px}
.sidebar .title{font-size:.85rem;color:var(--accent);margin-bottom:16px;font-family:'IBM Plex Sans',sans-serif}
.sidebar .bio{font-size:.85rem;color:var(--muted);margin-bottom:24px;line-height:1.6}
.sidebar nav{margin-bottom:24px}
.sidebar nav a{display:block;padding:8px 0;font-size:.85rem;color:var(--muted);font-family:'JetBrains Mono',monospace;min-height:44px;display:flex;align-items:center}
.sidebar nav a:hover{color:var(--accent)}
.sidebar .socials{margin-top:auto;display:flex;flex-wrap:wrap;gap:12px}
.sidebar .socials a{font-size:.8rem;color:var(--muted);min-height:44px;display:inline-flex;align-items:center;padding:8px 0}
.sidebar .socials a:hover{color:var(--accent)}

/* Main */
.main{padding:48px 48px 80px}
.section{margin-bottom:64px}
.section-label{font-size:.7rem;text-transform:uppercase;letter-spacing:.15em;color:var(--green);margin-bottom:20px;font-family:'JetBrains Mono',monospace}
.section h2{font-size:clamp(1.4rem,3vw,1.8rem);margin-bottom:20px}
.section p{color:var(--muted);margin-bottom:16px;max-width:600px}

/* Info Grid */
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:32px}
.info-item{background:var(--card);border:1px solid var(--border);padding:16px;font-family:'JetBrains Mono',monospace;font-size:.8rem}
.info-item .label{color:var(--muted);font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px}
.info-item .value{color:var(--fg)}

/* About */
.about-text{font-size:.95rem;line-height:1.8;color:var(--muted)}

/* Experience */
.exp-list{display:grid;gap:20px}
.exp-item{background:var(--card);border:1px solid var(--border);border-left:3px solid var(--accent);padding:20px}
.exp-item h3{font-size:1rem;margin-bottom:4px}
.exp-item .meta{font-size:.8rem;color:var(--accent);margin-bottom:4px}
.exp-item .period{font-size:.75rem;color:var(--muted);margin-bottom:10px}
.exp-item p{font-size:.85rem;color:var(--muted)}

/* Education */
.edu-list{display:grid;gap:16px}
.edu-item{background:var(--card);border:1px solid var(--border);padding:20px}
.edu-item h3{font-size:1rem;margin-bottom:4px}
.edu-item .school{font-size:.85rem;color:var(--accent);margin-bottom:2px}
.edu-item .period{font-size:.75rem;color:var(--muted)}

/* Skills */
.skills-list{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.skill{padding:8px 16px;background:var(--card);border:1px solid var(--border);font-size:.8rem;font-family:'JetBrains Mono',monospace;min-height:40px;display:inline-flex;align-items:center}

/* Projects */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.project-card{background:var(--card);border:1px solid var(--border);padding:24px;transition:border-color .2s}
.project-card:hover{border-color:var(--accent)}
.project-card h3{font-size:1rem;margin-bottom:8px}
.project-card p{font-size:.85rem;color:var(--muted);margin-bottom:12px}
.project-tech{display:flex;flex-wrap:wrap;gap:6px}
.project-tech span{font-size:.7rem;padding:4px 10px;background:var(--bg);border:1px solid var(--border);font-family:'JetBrains Mono',monospace}

/* Footer */
.footer{padding:40px 0;border-top:1px solid var(--border);font-size:.75rem;color:var(--muted);text-align:center}

@media(max-width:768px){
.layout{grid-template-columns:1fr}
.sidebar{position:relative;height:auto;border-right:none;border-bottom:1px solid var(--border);padding:32px 24px}
.main{padding:32px 24px 60px}
.projects-grid{grid-template-columns:1fr 1fr}
}

@media(max-width:480px){
.sidebar{padding:24px 16px}
.sidebar .avatar{width:60px;height:60px;font-size:1.5rem}
.main{padding:24px 16px 48px}
.section{margin-bottom:48px}
.section h2{font-size:1.3rem}
.projects-grid{grid-template-columns:1fr}
.info-grid{grid-template-columns:1fr}
.exp-item{padding:16px}
.project-card{padding:16px}
.skill{min-height:44px}
}
</style>
</head>
<body>

<div class="layout">

<aside class="sidebar" id="hero">
<div class="avatar">${esc(data.name).charAt(0) || 'D'}</div>
<h1>${esc(data.name)}</h1>
<div class="title">${esc(data.title)}</div>
<div class="bio">${esc(data.about).slice(0, 150)}${data.about.length > 150 ? '...' : ''}</div>
<nav>
<a href="#about">About</a>
${data.experience.length > 0 ? '<a href="#experience">Experience</a>' : ''}
${data.education.length > 0 ? '<a href="#education">Education</a>' : ''}
${data.skills.length > 0 ? '<a href="#skills">Skills</a>' : ''}
${data.projects.length > 0 ? '<a href="#projects">Projects</a>' : ''}
</nav>
<div class="socials">
${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank">GitHub</a>` : ''}
${data.socials.linkedin ? `<a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a>` : ''}
${data.socials.twitter ? `<a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a>` : ''}
${data.socials.website ? `<a href="${esc(data.socials.website)}" target="_blank">Website</a>` : ''}
</div>
</aside>

<main class="main">

<div class="info-grid">
${data.email ? `<div class="info-item"><div class="label">Email</div><div class="value">${esc(data.email)}</div></div>` : ''}
${data.location ? `<div class="info-item"><div class="label">Location</div><div class="value">${esc(data.location)}</div></div>` : ''}
${data.phone ? `<div class="info-item"><div class="label">Phone</div><div class="value">${esc(data.phone)}</div></div>` : ''}
</div>

<section class="section" id="about">
<div class="section-label">// About</div>
<h2>About Me</h2>
<p class="about-text">${esc(data.about) || 'A passionate developer building great things.'}</p>
</section>

${data.experience.length > 0 ? `
<section class="section" id="experience">
<div class="section-label">// Experience</div>
<h2>Work History</h2>
<div class="exp-list">
${data.experience.map((e: any) => `
<div class="exp-item">
<h3>${esc(e.role)}</h3>
<div class="meta">${esc(e.company)}</div>
<div class="period">${esc(e.period)}</div>
<p>${esc(e.description)}</p>
</div>
`).join('')}
</div>
</section>
` : ''}

${data.education.length > 0 ? `
<section class="section" id="education">
<div class="section-label">// Education</div>
<h2>Education</h2>
<div class="edu-list">
${data.education.map((e: any) => `
<div class="edu-item">
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
<div class="section-label">// Skills</div>
<h2>Tech Stack</h2>
<div class="skills-list">
${data.skills.map((s: string) => `<span class="skill">${esc(s)}</span>`).join('')}
</div>
</section>
` : ''}

${data.projects.length > 0 ? `
<section class="section" id="projects">
<div class="section-label">// Projects</div>
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

<footer class="footer">
${esc(data.name)} · Built with MyFolio
</footer>

</main>
</div>

</body>
</html>`;
}
