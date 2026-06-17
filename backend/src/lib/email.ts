import { Resend } from "resend";

function getResendClient(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL || "MyFolio <noreply@myfolio.codes>";
}

export async function sendDeploymentEmail(
  to: string,
  name: string,
  url: string
): Promise<void> {
  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: getFromEmail(),
      to,
      subject: "Your portfolio is live! 🎉",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #1c1c1c; font-size: 28px; margin: 0 0 8px;">Your portfolio is live!</h1>
            <p style="color: #5f5f5d; margin: 0;">Share it with the world</p>
          </div>
          <div style="background: #f7f4ed; border: 1px solid #eceae4; border-radius: 12px; padding: 32px; margin-bottom: 32px;">
            <p style="color: #1c1c1c; margin: 0 0 16px;">Hi ${name},</p>
            <p style="color: #5f5f5d; margin: 0 0 24px; line-height: 1.6;">
              Your portfolio has been successfully deployed and is now accessible to anyone with the link. Share it with potential employers, clients, or on your social media profiles.
            </p>
            <a href="${url}" style="display: inline-block; padding: 12px 24px; background: #1c1c1c; color: #fcfbf8; text-decoration: none; border-radius: 6px; font-weight: 500;">
              View Your Portfolio →
            </a>
          </div>
          <div style="text-align: center; padding-top: 24px; border-top: 1px solid #eceae4;">
            <p style="color: #5f5f5d; font-size: 13px; margin: 0;">
              —  The MyFolio Team
            </p>
          </div>
        </div>
      `,
    });
    console.log(`[email] Deployment email sent to ${to}`);
  } catch (error) {
    console.error("[email] Failed to send deployment email:", error);
  }
}

export async function sendMilestoneEmail(
  to: string,
  name: string,
  url: string,
  views: number
): Promise<void> {
  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: getFromEmail(),
      to,
      subject: `Your portfolio hit ${views} views! 🎉`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #1c1c1c; font-size: 28px; margin: 0 0 8px;">${views} views and counting!</h1>
            <p style="color: #5f5f5d; margin: 0;">Your portfolio is getting noticed</p>
          </div>
          <div style="background: #f7f4ed; border: 1px solid #eceae4; border-radius: 12px; padding: 32px; margin-bottom: 32px;">
            <p style="color: #1c1c1c; margin: 0 0 16px;">Hi ${name},</p>
            <p style="color: #5f5f5d; margin: 0 0 24px; line-height: 1.6;">
              Great news! Your portfolio has been viewed <strong style="color: #1c1c1c;">${views} times</strong>. 
              Keep sharing it to grow your reach and attract more opportunities.
            </p>
            <a href="${url}" style="display: inline-block; padding: 12px 24px; background: #1c1c1c; color: #fcfbf8; text-decoration: none; border-radius: 6px; font-weight: 500;">
              View Your Portfolio →
            </a>
          </div>
          <div style="text-align: center; padding-top: 24px; border-top: 1px solid #eceae4;">
            <p style="color: #5f5f5d; font-size: 13px; margin: 0;">
              — The MyFolio Team
            </p>
          </div>
        </div>
      `,
    });
    console.log(`[email] Milestone email sent to ${to} (${views} views)`);
  } catch (error) {
    console.error("[email] Failed to send milestone email:", error);
  }
}

export async function sendMagicLinkEmail(
  to: string,
  link: string
): Promise<void> {
  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: getFromEmail(),
      to,
      subject: "Your sign-in link for MyFolio",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Sign in to MyFolio</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f7f4ed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;">

          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f7f4ed; padding: 48px 16px;">
            <tr>
              <td align="center">

                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #fcfbf8; border: 1px solid #eceae4; border-radius: 16px; overflow: hidden;">

                  <!-- Header -->
                  <tr>
                    <td style="background-color: #1c1c1c; padding: 28px 40px; text-align: center;">
                      <span style="font-size: 13px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #a8a49e;">MyFolio</span>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 48px 40px 36px;">
                      <p style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #1c1c1c; line-height: 1.3;">
                        Here's your sign-in link
                      </p>
                      <p style="margin: 0 0 32px; font-size: 15px; color: #5f5f5d; line-height: 1.6;">
                        Click the button below to sign in to your MyFolio account. This link expires in 15 minutes.
                      </p>

                      <!-- CTA -->
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td>
                            <a href="${link}"
                              style="display: block; text-align: center; padding: 14px 24px; background-color: #1c1c1c; color: #fcfbf8; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: 600; letter-spacing: 0.01em;">
                              Sign In to MyFolio →
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin: 28px 0 0; font-size: 13px; color: #a8a49e; line-height: 1.5;">
                        If you didn't request this link, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; border-top: 1px solid #eceae4; text-align: center;">
                      <p style="margin: 0 0 8px; font-size: 13px; color: #a8a49e;">
                        Questions? Reply to this email anytime — we actually read them.
                      </p>
                      <p style="margin: 0; font-size: 12px; color: #c4c1bb;">
                        © 2026 MyFolio ·
                        <a href="https://myfolio.codes" style="color: #a8a49e; text-decoration: underline;">myfolio.codes</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>

        </body>
        </html>
      `,
    });
    console.log(`[email] Magic link email sent to ${to}`);
  } catch (error) {
    console.error("[email] Failed to send magic link email:", error);
    throw error;
  }
}

export async function sendWelcomeEmail(
  to: string,
  name: string
): Promise<void> {
  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: getFromEmail(),
      to,
      subject: "Your portfolio is one step away ✦",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to MyFolio</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f7f4ed; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;">

          <!-- Outer wrapper -->
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f7f4ed; padding: 48px 16px;">
            <tr>
              <td align="center">

                <!-- Card -->
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #fcfbf8; border: 1px solid #eceae4; border-radius: 16px; overflow: hidden;">

                  <!-- Header band -->
                  <tr>
                    <td style="background-color: #1c1c1c; padding: 28px 40px; text-align: center;">
                      <span style="font-size: 13px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #a8a49e;">MyFolio</span>
                    </td>
                  </tr>

                  <!-- Main content -->
                  <tr>
                    <td style="padding: 48px 40px 36px;">

                      <!-- Greeting -->
                      <p style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #1c1c1c; line-height: 1.3;">
                        Hey ${name}, you're in. 👋
                      </p>
                      <p style="margin: 0 0 32px; font-size: 15px; color: #5f5f5d; line-height: 1.6;">
                        Your account is ready. In the next few minutes you can go from a blank page to a live portfolio that actually represents you — no design experience needed.
                      </p>

                      <!-- Divider -->
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
                        <tr>
                          <td style="border-top: 1px solid #eceae4;"></td>
                        </tr>
                      </table>

                      <!-- Steps -->
                      <p style="margin: 0 0 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #a8a49e;">
                        How it works
                      </p>

                      <!-- Step 1 -->
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                        <tr>
                          <td width="36" valign="top">
                            <div style="width: 28px; height: 28px; background-color: #1c1c1c; border-radius: 50%; text-align: center; line-height: 28px; font-size: 12px; font-weight: 700; color: #fcfbf8;">1</div>
                          </td>
                          <td valign="top" style="padding-left: 8px;">
                            <p style="margin: 0 0 2px; font-size: 14px; font-weight: 600; color: #1c1c1c;">Upload your resume or fill in your details</p>
                            <p style="margin: 0; font-size: 13px; color: #5f5f5d; line-height: 1.5;">We'll parse it automatically and pre-fill everything for you.</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Step 2 -->
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                        <tr>
                          <td width="36" valign="top">
                            <div style="width: 28px; height: 28px; background-color: #1c1c1c; border-radius: 50%; text-align: center; line-height: 28px; font-size: 12px; font-weight: 700; color: #fcfbf8;">2</div>
                          </td>
                          <td valign="top" style="padding-left: 8px;">
                            <p style="margin: 0 0 2px; font-size: 14px; font-weight: 600; color: #1c1c1c;">Pick a template — or describe one to our AI</p>
                            <p style="margin: 0; font-size: 13px; color: #5f5f5d; line-height: 1.5;">You get 2 free AI generations. Make them count.</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Step 3 -->
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 36px;">
                        <tr>
                          <td width="36" valign="top">
                            <div style="width: 28px; height: 28px; background-color: #1c1c1c; border-radius: 50%; text-align: center; line-height: 28px; font-size: 12px; font-weight: 700; color: #fcfbf8;">3</div>
                          </td>
                          <td valign="top" style="padding-left: 8px;">
                            <p style="margin: 0 0 2px; font-size: 14px; font-weight: 600; color: #1c1c1c;">Publish and get your live link instantly</p>
                            <p style="margin: 0; font-size: 13px; color: #5f5f5d; line-height: 1.5;">Share it on LinkedIn, in job applications, or on your business card.</p>
                          </td>
                        </tr>
                      </table>

                      <!-- CTA -->
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td>
                            <a href="https://myfolio.codes/create"
                              style="display: block; text-align: center; padding: 14px 24px; background-color: #1c1c1c; color: #fcfbf8; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: 600; letter-spacing: 0.01em;">
                              Build my portfolio →
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Tip banner -->
                

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 40px; border-top: 1px solid #eceae4; text-align: center;">
                      <p style="margin: 0 0 8px; font-size: 13px; color: #a8a49e;">
                        Questions? Reply to this email anytime — we actually read them.
                      </p>
                      <p style="margin: 0; font-size: 12px; color: #c4c1bb;">
                        © 2026 MyFolio · 
                        <a href="https://myfolio.codes/unsubscribe" style="color: #a8a49e; text-decoration: underline;">Unsubscribe</a>
                      </p>
                    </td>
                  </tr>

                </table>
                <!-- End card -->

              </td>
            </tr>
          </table>
          <!-- End outer wrapper -->

        </body>
        </html>
      `,
    });
    console.log(`[email] Welcome email sent to ${to}`);
  } catch (error) {
    console.error("[email] Failed to send welcome email:", error);
  }
}
