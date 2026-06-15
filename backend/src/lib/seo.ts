import type { PortfolioData } from "../types/index.js";

function escAttr(s: string): string {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function truncate(s: string, max: number): string {
  if (!s) return "";
  return s.length > max ? s.slice(0, max) + "..." : s;
}

export function generateMetaTags(
  data: PortfolioData,
  url: string
): string {
  const description = escAttr(
    truncate(
      data.about || `${data.name} - ${data.title}. View projects, skills, and experience.`,
      160
    )
  );
  const title = escAttr(`${data.name} — Portfolio`);
  const name = escAttr(data.name);
  const jobTitle = escAttr(data.title);
  const email = escAttr(data.email);
  const location = data.location ? escAttr(data.location) : "";
  const skills = data.skills?.length
    ? data.skills.map((s) => `"${escAttr(s)}"`).join(", ")
    : "";
  const linkedin = data.socials?.linkedin ? escAttr(data.socials.linkedin) : "";
  const github = data.socials?.github ? escAttr(data.socials.github) : "";
  const website = data.socials?.website ? escAttr(data.socials.website) : "";

  const sameAs: string[] = [];
  if (linkedin) sameAs.push(`"${linkedin}"`);
  if (github) sameAs.push(`"${github}"`);
  if (website) sameAs.push(`"${website}"`);

  return `
    <meta name="description" content="${description}">
    <meta name="author" content="${name}">
    ${skills ? `<meta name="keywords" content="${data.skills?.join(", ")}">` : ""}

    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${escAttr(url)}">
    <meta property="og:site_name" content="${name}'s Portfolio">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">

    <link rel="canonical" href="${escAttr(url)}">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "${name}",
      "jobTitle": "${jobTitle}",
      "url": "${escAttr(url)}",
      "email": "${email}"${location ? `,\n      "address": { "@type": "PostalAddress", "addressLocality": "${location}" }` : ""}${skills ? `,\n      "knowsAbout": [${skills}]` : ""}${sameAs.length ? `,\n      "sameAs": [${sameAs.join(", ")}]` : ""},
      "description": "${description}"
    }
    </script>`;
}

export function generateTrackingScript(
  portfolioId: string,
  apiBase: string
): string {
  return `
    <script>
      (function() {
        try {
          fetch('${apiBase}/api/analytics/view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ portfolioId: '${portfolioId}' }),
            keepalive: true
          }).catch(function() {});
        } catch(e) {}
      })();
    </script>`;
}
