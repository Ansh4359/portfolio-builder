const VERCEL_API = "https://api.vercel.com";
const CUSTOM_DOMAIN = "myfolio.codes";

function getAuthToken(): string {
  const token = process.env.VERCEL_TOKEN;
  if (!token) throw new Error("VERCEL_TOKEN not configured in .env");
  return token;
}

function getTeamQuery(): string {
  const tid = process.env.VERCEL_TEAM_ID;
  return tid ? `?teamId=${tid}` : "";
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function checkProjectExists(
  projectName: string
): Promise<boolean> {
  const token = getAuthToken();
  const res = await fetch(
    `${VERCEL_API}/v9/projects/${projectName}${getTeamQuery()}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.ok;
}

async function waitForDeployment(
  deploymentId: string
): Promise<void> {
  const token = getAuthToken();
  const maxAttempts = 30;

  console.log("\n  ⏳ Polling deployment status…");

  for (let i = 0; i < maxAttempts; i++) {
    await sleep(2000);

    const res = await fetch(
      `${VERCEL_API}/v13/deployments/${deploymentId}${getTeamQuery()}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) {
      console.log(`    attempt ${i + 1}: status check failed (${res.status})`);
      continue;
    }

    const data = await res.json();
    const state: string = data.readyState ?? "UNKNOWN";

    console.log(`    attempt ${i + 1}: ${state}`);

    if (state === "READY") return;

    if (state === "ERROR" || state === "CANCELED") {
      const msg =
        data.errorMessage ??
        data.error?.message ??
        `Deployment ended in ${state}`;
      throw new Error(`Deployment failed: ${msg}`);
    }
  }

  throw new Error("Deployment timed out after 60 seconds");
}

export async function addCustomDomain(
  projectName: string,
  domain: string
): Promise<void> {
  const token = getAuthToken();
  const res = await fetch(
    `${VERCEL_API}/v9/projects/${projectName}/domains${getTeamQuery()}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: domain }),
    }
  );

  if (res.ok) {
    console.log(`  🌐 Custom domain added: ${domain}`);
    return;
  }

  const data = await res.json().catch(() => ({}));
  if (res.status === 409) {
    console.log(`  🌐 Custom domain already exists: ${domain}`);
    return;
  }

  console.error(`  ⚠️ Failed to add custom domain ${domain}:`, data);
  throw new Error(`Failed to add custom domain: ${JSON.stringify(data)}`);
}

export async function removeCustomDomain(
  projectName: string,
  domain: string
): Promise<void> {
  const token = getAuthToken();
  const res = await fetch(
    `${VERCEL_API}/v9/projects/${projectName}/domains/${domain}${getTeamQuery()}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (res.ok || res.status === 404) {
    console.log(`  🌐 Custom domain removed: ${domain}`);
    return;
  }

  console.error(`  ⚠️ Failed to remove custom domain ${domain}`);
}

export async function deployToVercel(
  projectName: string,
  files: Record<string, string>,
  subdomain?: string
): Promise<{ url: string; deploymentId: string }> {
  const token = getAuthToken();
  const name = subdomain || projectName;

  const inlineFiles = Object.entries(files).map(([pathname, content]) => ({
    file: pathname,
    data: content,
    encoding: "utf-8" as const,
  }));

  console.log(`\n  📄 Files: ${inlineFiles.length}`);
  for (const f of inlineFiles) {
    console.log(`     ${f.file}  ${f.data.length} chars`);
  }

  const payload = {
    name,
    files: inlineFiles,
    projectSettings: { framework: null },
    target: "production",
  };

  console.log(`\n  🚀 Creating deployment "${name}"…`);

  const res = await fetch(
    `${VERCEL_API}/v13/deployments${getTeamQuery()}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const rawBody = await res.text();
  let data: any;

  try {
    data = JSON.parse(rawBody);
  } catch {
    throw new Error(
      `Unexpected Vercel response (${res.status}): ${rawBody}`
    );
  }

  if (!res.ok) {
    throw new Error(
      `Deployment creation failed (${res.status}): ` +
        JSON.stringify(data, null, 2)
    );
  }

  const deploymentId: string = data.id;
  console.log(`  ✅ Deployment created: ${deploymentId}`);

  await waitForDeployment(deploymentId);

  const customDomain = `${name}.${CUSTOM_DOMAIN}`;
  try {
    await addCustomDomain(name, customDomain);
  } catch (err) {
    console.error(`  ⚠️ Could not add custom domain, deployment still live on .vercel.app`, err);
  }

  const url = `https://${customDomain}`;
  console.log(`\n  🎉 Live at ${url}\n`);

  return { url, deploymentId };
}

export function sanitizeProjectName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 63);
}
