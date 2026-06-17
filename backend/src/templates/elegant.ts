export function generate(data: any, esc: (s: string) => string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(data.name)} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0f0f0f;--fg:#e8e4de;--muted:#8a8580;--accent:#c9a96e;--card:#1a1917;--border:#2a2825}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--fg);line-height:1.7;font-size:15px}
h1,h2,h3{font-family:'Playfair Display',serif;font-weight:400;line-height:1.15}
a{color:var(--accent);text-decoration:none}
a:hover{opacity:.7}
.container{max-width:900px;margin:0 auto;padding:0 clamp(20px,4vw,48px)}

/* Hero */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative;padding:80px 0}
.hero::before{content:'';position:absolute;top:60px;left:50%;transform:translateX(-50%);width:1px;height:80px;background:linear-gradient(transparent,var(--accent))}
.hero::after{content:'';position:absolute;bottom:60px;left:50%;transform:translateX(-50%);width:1px;height:80px;background:linear-gradient(var(--accent),transparent)}
.hero h1{font-size:clamp(2.4rem,5vw,3.8rem);margin-bottom:16px;letter-spacing:-.02em}
.hero .title{font-size:clamp(1rem,2vw,1.2rem);color:var(--accent);margin-bottom:12px;font-family:'Inter',sans-serif;font-weight:300}
.hero .tagline{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(1rem,2vw,1.15rem);color:var(--muted);max-width:480px;margin-bottom:32px}
.hero .line{width:40px;height:1px;background:var(--accent);margin:0 auto 24px}
.hero .cta{display:inline-flex;align-items:center;gap:8px;padding:12px 32px;border:1px solid var(--accent);color:var(--accent);font-size:.85rem;min-height:44px;transition:all .2s}
.hero .cta:hover{background:var(--accent);color:var(--bg)}

/* Sections */
.section{padding:80px 0}
.section-header{display:flex;align-items:baseline;gap:16px;margin-bottom:32px}
.section-num{font-family:'Playfair Display',serif;font-size:1.4rem;color:var(--accent);opacity:.5}
.section h2{font-size:clamp(1.6rem,3vw,2.2rem)}
.section p{color:var(--muted);margin-bottom:16px;max-width:600px}

/* About */
.about-text{font-size:1rem;line-height:1.9;color:var(--muted);max-width:640px}

/* Experience - Timeline */
.timeline{position:relative;padding-left:32px;margin-top:24px}
.timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:var(--border)}
.timeline-item{position:relative;margin-bottom:36px;padding-left:20px}
.timeline-item::before{content:'';position:absolute;left:-36px;top:6px;width:10px;height:10px;border-radius:50%;border:2px solid var(--accent);background:var(--bg)}
.timeline-item h3{font-size:1.1rem;margin-bottom:4px}
.timeline-item .meta{font-size:.85rem;color:var(--accent);margin-bottom:4px}
.timeline-item .period{font-size:.75rem;color:var(--muted);margin-bottom:8px}
.timeline-item p{font-size:.9rem;color:var(--muted)}

/* Education */
.edu-list{margin-top:24px}
.edu-item{margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid var(--border)}
.edu-item:last-child{border-bottom:none}
.edu-item h3{font-size:1.05rem;margin-bottom:4px}
.edu-item .school{font-size:.85rem;color:var(--accent);margin-bottom:2px}
.edu-item .period{font-size:.75rem;color:var(--muted)}

/* Skills */
.skills-grid{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
.skill{padding:10px 20px;border:1px solid var(--border);font-size:.8rem;font-family:'Inter',sans-serif;font-weight:500;min-height:44px;display:inline-flex;align-items:center;transition:border-color .2s}
.skill:hover{border-color:var(--accent)}

/* Projects */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:24px}
.project-card{background:var(--card);border:1px solid var(--border);padding:28px;transition:border-color .2s}
.project-card:hover{border-color:var(--accent)}
.project-card h3{font-size:1.05rem;margin-bottom:8px}
.project-card p{font-size:.85rem;color:var(--muted);margin-bottom:12px}
.project-tech{display:flex;flex-wrap:wrap;gap:6px}
.project-tech span{font-size:.7rem;padding:4px 12px;border:1px solid var(--border);font-family:'Inter',sans-serif}

/* Contact */
.contact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-top:24px}
.contact-item{padding:16px 0;border-bottom:1px solid var(--border)}
.contact-item .label{font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:4px}
.contact-item a,.contact-item span{font-size:.9rem;color:var(--fg);min-height:44px;display:inline-flex;align-items:center}

/* Footer */
.footer{padding:40px 0;border-top:1px solid var(--border);text-align:center;font-size:.75rem;color:var(--muted)}

@media(max-width:768px){
.hero{min-height:auto;padding:100px 0 60px}
.hero::before,.hero::after{display:none}
.section{padding:60px 0}
.projects-grid{grid-template-columns:1fr 1fr}
.timeline{padding-left:24px}
}

@media(max-width:480px){
.hero{padding:60px 0 40px}
.hero h1{font-size:2rem}
.section{padding:48px 0}
.section h2{font-size:1.5rem}
.projects-grid{grid-template-columns:1fr}
.contact-grid{grid-template-columns:1fr}
.timeline-item{padding-left:12px}
.skill{min-height:44px}
.project-card{padding:20px}
.hero .cta{width:100%;justify-content:center}
}
</style>
</head>
<body>

<div class="container">

<section class="hero" id="hero">
<h1>${esc(data.name)}</h1>
<div class="title">${esc(data.title)}</div>
<div class="tagline">${esc(data.about).slice(0, 120)}${data.about.length > 120 ? '...' : ''}</div>
<div class="line"></div>
${data.email ? `<a href="mailto:${esc(data.email)}" class="cta">Get in Touch</a>` : ''}
</section>

<section class="section" id="about">
<div class="section-header">
<span class="section-num">01</span>
<h2>About</h2>
</div>
<p class="about-text">${esc(data.about) || 'A passionate developer building great things.'}</p>
</section>

${data.experience.length > 0 ? `
<section class="section" id="experience">
<div class="section-header">
<span class="section-num">02</span>
<h2>Experience</h2>
</div>
<div class="timeline">
${data.experience.map((e: any) => `
<div class="timeline-item">
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
<div class="section-header">
<span class="section-num">03</span>
<h2>Education</h2>
</div>
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
<div class="section-header">
<span class="section-num">04</span>
<h2>Skills</h2>
</div>
<div class="skills-grid">
${data.skills.map((s: string) => `<span class="skill">${esc(s)}</span>`).join('')}
</div>
</section>
` : ''}

${data.projects.length > 0 ? `
<section class="section" id="projects">
<div class="section-header">
<span class="section-num">05</span>
<h2>Projects</h2>
</div>
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
<div class="section-header">
<span class="section-num">06</span>
<h2>Contact</h2>
</div>
<div class="contact-grid">
${data.email ? `<div class="contact-item"><div class="label">Email</div><a href="mailto:${esc(data.email)}">${esc(data.email)}</a></div>` : ''}
${data.phone ? `<div class="contact-item"><div class="label">Phone</div><span>${esc(data.phone)}</span></div>` : ''}
${data.location ? `<div class="contact-item"><div class="label">Location</div><span>${esc(data.location)}</span></div>` : ''}
${data.socials.github ? `<div class="contact-item"><div class="label">GitHub</div><a href="${esc(data.socials.github)}" target="_blank">GitHub</a></div>` : ''}
${data.socials.linkedin ? `<div class="contact-item"><div class="label">LinkedIn</div><a href="${esc(data.socials.linkedin)}" target="_blank">LinkedIn</a></div>` : ''}
${data.socials.twitter ? `<div class="contact-item"><div class="label">Twitter</div><a href="${esc(data.socials.twitter)}" target="_blank">Twitter</a></div>` : ''}
${data.socials.website ? `<div class="contact-item"><div class="label">Website</div><a href="${esc(data.socials.website)}" target="_blank">Website</a></div>` : ''}
</div>
</section>

<footer class="footer">
<p>${esc(data.name)} · Built with MyFolio</p>
</footer>

</div>

</body>
</html>`;
}
