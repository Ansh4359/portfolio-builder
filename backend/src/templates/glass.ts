export function generate(data: any, esc: (s: string) => string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0a0f;--fg:#e8e8ed;--muted:#8888a0;--accent:#7c5bf5;--glass:rgba(255,255,255,0.04);--glass-border:rgba(255,255,255,0.08)}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--fg);line-height:1.7;font-size:15px;overflow-x:hidden;position:relative}
a{color:var(--accent);text-decoration:none}
a:hover{opacity:.7}
.container{max-width:900px;margin:0 auto;padding:0 clamp(20px,4vw,48px);position:relative;z-index:1}

/* Animated BG */
body::before{content:'';position:fixed;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle at 30% 40%,rgba(124,91,245,0.08) 0%,transparent 50%),radial-gradient(circle at 70% 60%,rgba(91,187,245,0.06) 0%,transparent 50%);animation:bgShift 20s ease-in-out infinite alternate;z-index:0}
@keyframes bgShift{0%{transform:translate(0,0)}100%{transform:translate(-5%,-5%)}}

/* Glass */
.glass{background:var(--glass);border:1px solid var(--glass-border);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:16px}
@media(prefers-reduced-motion:reduce){body::before{animation:none}}

/* Hero */
.hero{padding:100px 0 60px}
.hero-card{text-align:center;padding:clamp(32px,6vw,60px)}
.hero .avatar{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--accent),#5ea8ff);display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:#fff;margin:0 auto 20px}
.hero h1{font-size:clamp(1.8rem,4vw,2.6rem);margin-bottom:8px;font-weight:700}
.hero .title{font-size:clamp(.9rem,2vw,1.05rem);color:var(--accent);margin-bottom:16px}
.hero .bio{font-size:.9rem;color:var(--muted);max-width:480px;margin:0 auto 24px}
.hero .btn-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:10px;font-size:.85rem;font-weight:500;min-height:44px;transition:all .2s;cursor:pointer}
.btn-primary{background:var(--accent);color:#fff;border:none}
.btn-primary:hover{opacity:.9}
.btn-ghost{background:transparent;border:1px solid var(--glass-border);color:var(--fg)}
.btn-ghost:hover{border-color:var(--accent)}

/* Sections */
.section{padding:60px 0}
.section-label{font-size:.7rem;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:20px;font-weight:600}
.section h2{font-size:clamp(1.5rem,3vw,2rem);margin-bottom:16px;font-weight:700}
.section p{color:var(--muted);margin-bottom:16px;max-width:600px}
.section-card{padding:clamp(24px,4vw,36px)}

/* About */
.about-text{font-size:.95rem;line-height:1.8;color:var(--muted)}

/* Experience */
.exp-grid{display:grid;gap:16px;margin-top:20px}
.exp-card{padding:20px;position:relative;padding-left:28px}
.exp-card::before{content:'';position:absolute;left:12px;top:28px;width:6px;height:6px;border-radius:50%;background:var(--accent)}
.exp-card h3{font-size:1rem;margin-bottom:4px}
.exp-card .company{font-size:.85rem;color:var(--accent);margin-bottom:2px}
.exp-card .period{font-size:.75rem;color:var(--muted);margin-bottom:8px}
.exp-card p{font-size:.85rem;color:var(--muted)}

/* Education */
.edu-grid{display:grid;gap:16px;margin-top:20px}
.edu-card{padding:20px}
.edu-card h3{font-size:1rem;margin-bottom:4px}
.edu-card .school{font-size:.85rem;color:var(--accent);margin-bottom:2px}
.edu-card .period{font-size:.75rem;color:var(--muted)}

/* Skills */
.skills-wrap{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.skill{padding:8px 18px;border-radius:100px;font-size:.8rem;font-weight:500;min-height:40px;display:inline-flex;align-items:center;background:rgba(124,91,245,0.1);color:var(--accent);border:1px solid rgba(124,91,245,0.15)}

/* Projects */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:20px}
.project-card{padding:24px;transition:border-color .2s}
.project-card:hover{border-color:rgba(124,91,245,0.3)}
.project-card h3{font-size:1rem;margin-bottom:8px}
.project-card p{font-size:.85rem;color:var(--muted);margin-bottom:12px}
.project-tech{display:flex;flex-wrap:wrap;gap:6px}
.project-tech span{font-size:.7rem;padding:4px 10px;border-radius:100px;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border)}

/* Footer */
.footer{padding:40px 0;text-align:center}
.footer .socials{display:flex;justify-content:center;gap:20px;margin-bottom:20px;flex-wrap:wrap}
.footer .socials a{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;background:var(--glass);border:1px solid var(--glass-border);font-size:.8rem;color:var(--muted);transition:all .2s}
.footer .socials a:hover{border-color:var(--accent);color:var(--accent)}
.footer p{font-size:.75rem;color:var(--muted)}

@media(max-width:768px){
.hero{padding:60px 0 40px}
.section{padding:48px 0}
.projects-grid{grid-template-columns:1fr 1fr}
body::before{animation-duration:30s}
}

@media(max-width:480px){
.hero-card{padding:24px}
.hero .avatar{width:60px;height:60px;font-size:1.5rem}
.section{padding:36px 0}
.section h2{font-size:1.4rem}
.section-card{padding:20px}
.projects-grid{grid-template-columns:1fr}
.btn{width:100%;justify-content:center}
.hero .btn-row{flex-direction:column}
.skill{min-height:44px}
.exp-card{padding:16px;padding-left:24px}
}
</style>
</head>
<body>

<div class="container">

<section class="hero" id="hero">
<div class="glass hero-card">
<div class="avatar">${esc(data.name).charAt(0) || 'U'}</div>
<h1>${esc(data.name)}</h1>
<div class="title">${esc(data.title)}</div>
<div class="bio">${esc(data.about).slice(0, 150)}${data.about.length > 150 ? '...' : ''}</div>
<div class="btn-row">
${data.email ? `<a href="mailto:${esc(data.email)}" class="btn btn-primary">Contact Me</a>` : ''}
${data.socials.github ? `<a href="${esc(data.socials.github)}" target="_blank" class="btn btn-ghost">GitHub</a>` : ''}
</div>
</div>
</section>

<section class="section" id="about">
<div class="glass section-card">
<div class="section-label">About</div>
<h2>About Me</h2>
<p class="about-text">${esc(data.about) || 'A passionate developer building great things.'}</p>
</div>
</section>

${data.experience.length > 0 ? `
<section class="section" id="experience">
<div class="glass section-card">
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
</div>
</section>
` : ''}

${data.education.length > 0 ? `
<section class="section" id="education">
<div class="glass section-card">
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
</div>
</section>
` : ''}

${data.skills.length > 0 ? `
<section class="section" id="skills">
<div class="glass section-card">
<div class="section-label">Skills</div>
<h2>Tech Stack</h2>
<div class="skills-wrap">
${data.skills.map((s: string) => `<span class="skill">${esc(s)}</span>`).join('')}
</div>
</div>
</section>
` : ''}

${data.projects.length > 0 ? `
<section class="section" id="projects">
<div class="glass section-card">
<div class="section-label">Projects</div>
<h2>Featured Work</h2>
<div class="projects-grid">
${data.projects.map((p: any) => `
<div class="glass project-card">
<h3>${esc(p.name)}</h3>
<p>${esc(p.description)}</p>
${p.tech.length > 0 ? `<div class="project-tech">${p.tech.map((t: string) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
</div>
`).join('')}
</div>
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
