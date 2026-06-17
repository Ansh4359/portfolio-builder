<p align="center">
  <!-- Upload logo.png to a GitHub Release and paste the raw URL below -->
  <img src="https://github.com/YOUR_USERNAME/portfolio-builder/releases/download/v1.0-screenshots/logo.png" alt="MyFolio Logo" width="120" />
</p>

<h1 align="center">MyFolio</h1>

<p align="center">
  <strong>Build and deploy a stunning developer portfolio in minutes — no code required.</strong>
</p>

<p align="center">
  <a href="https://myfolio.codes">🚀 Live Demo</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</p>

---

<p align="center">
  <!-- Upload hero.png to the same GitHub Release and paste the raw URL below -->
  <img src="https://github.com/YOUR_USERNAME/portfolio-builder/releases/download/v1.0-screenshots/hero.png" alt="MyFolio Landing Page" width="100%" />
</p>

## About

**MyFolio** is a full-stack web application that lets developers create, customize, and deploy professional portfolio websites in minutes. Upload your resume and let AI pre-fill your portfolio, pick from 8 beautifully designed templates (or generate a custom one with AI), choose a subdomain, and deploy — all in a single flow.

🔗 **Live at [myfolio.codes](https://myfolio.codes)**

---

## ✨ Features

| Feature | Description |
|---|---|
| **AI Resume Parsing** | Upload a PDF, DOCX, or TXT resume and MiMo AI auto-extracts your details — name, skills, experience, education, projects, and socials. |
| **8 Pre-Built Templates** | Minimal, Creative, Developer, Modern, Elegant, Glass, Mono, and Sunset — each with a distinct visual style. |
| **AI Template Builder** | Describe a template style in plain text and AI generates a complete, self-contained HTML portfolio. |
| **One-Click Deploy** | Generates final HTML with SEO meta tags and deploys to Vercel with a custom subdomain. |
| **Custom Subdomains** | Every portfolio gets a subdomain at `yourname.myfolio.codes` with availability checking. |
| **Portfolio Dashboard** | Create multiple portfolios, edit existing ones, track deployment status and view counts. |
| **View Analytics** | Tracks views with milestone emails at 10, 50, 100, 500, and 1,000 views. |
| **Email Notifications** | Welcome emails, magic link sign-in, deployment confirmations, and milestone celebrations via Resend. |
| **Passwordless Auth** | Magic link (email) sign-in and Google OAuth powered by Firebase Authentication. |
| **User Profiles** | Persistent profile data that pre-fills the portfolio creation form on every visit. |
| **Free & Pro Tiers** | Free tier with 2 AI generations/day and 3 deploys/day. Pro tier ($9/mo) for unlimited usage. |
| **Dark / Light Theme** | Full theme support with persistent user preference. |

---

## 📸 Screenshots

<!-- Upload all screenshots to a GitHub Release and paste the raw URLs below.
     See the "Adding Screenshots" section at the bottom of this README for instructions. -->

| Landing Page | Dashboard |
|:---:|:---:|
| ![Landing Page](https://github.com/YOUR_USERNAME/portfolio-builder/releases/download/v1.0-screenshots/landing.png) | ![Dashboard](https://github.com/YOUR_USERNAME/portfolio-builder/releases/download/v1.0-screenshots/dashboard.png) |

| Template Selection | Deploy Page |
|:---:|:---:|
| ![Template Selection](https://github.com/YOUR_USERNAME/portfolio-builder/releases/download/v1.0-screenshots/templates.png) | ![Deploy Page](https://github.com/YOUR_USERNAME/portfolio-builder/releases/download/v1.0-screenshots/deploy.png) |

---

## 🚀 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite 8** | Build tool and dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **React Router 7** | Client-side routing |
| **Firebase SDK** | Authentication (Google + magic link) |
| **OGL** | WebGL aurora shader background effect |
| **React Hot Toast** | Toast notifications |

### Backend

| Technology | Purpose |
|---|---|
| **Express 4** | HTTP server |
| **TypeScript** | Type safety |
| **Mongoose** | MongoDB ODM |
| **Firebase Admin** | Server-side auth verification |
| **Resend** | Transactional email service |
| **Multer** | File upload handling (resume) |
| **pdf-parse / Mammoth** | PDF and DOCX text extraction |
| **Helmet** | Security headers |

### External Services

| Service | Purpose |
|---|---|
| **Firebase** | Authentication (magic link + Google OAuth) |
| **MongoDB Atlas** | Database (users, profiles, portfolios, AI templates) |
| **Vercel** | Portfolio hosting and deployment via API |
| **Xiaomi MiMo AI** | Resume parsing and AI template generation |
| **Resend** | Transactional emails |

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** v18+ or **Bun** v1.3+
- **MongoDB** instance (local or [Atlas](https://www.mongodb.com/atlas))
- **Firebase** project with Authentication enabled
- **Vercel** account with an API token
- **Xiaomi MiMo** API key
- **Resend** API key

### Clone the Repository

```bash
git clone https://github.com/your-username/portfolio-builder.git
cd portfolio-builder
```

### Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### Environment Variables

**Frontend** — create `frontend/.env`:

```env
VITE_API_BASE=http://localhost:3001/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Backend** — create `backend/.env`:

```env
PORT=3001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/myfolio
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
VERCEL_TOKEN=your_vercel_token
VERCEL_TEAM_ID=your_team_id            # optional
MIMO_API_URL=https://api.mimo.ai/v1
MIMO_API_KEY=your_mimo_api_key
MIMO_MODEL=mimo-v2.5-pro               # optional, defaults to mimo-v2.5-pro
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
MAGIC_LINK_REDIRECT_URL=http://localhost:5173/finish-sign-in
API_URL=http://localhost:3001
```

### Run the Development Servers

```bash
# Terminal 1 — Backend (http://localhost:3001)
cd backend
npm run dev

# Terminal 2 — Frontend (http://localhost:5173)
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
portfolio-builder/
├── frontend/                        # React + Vite SPA
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── AdminRoute.tsx
│   │   │   ├── StepIndicator.tsx
│   │   │   ├── TemplateCard.tsx
│   │   │   ├── SubdomainInput.tsx
│   │   │   ├── UpgradeModal.tsx
│   │   │   ├── CreditsBadge.tsx
│   │   │   └── SoftAurora.tsx       # WebGL shader background
│   │   ├── contexts/                # React contexts
│   │   │   ├── AuthContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── config/
│   │   │   └── firebase.ts
│   │   ├── data/
│   │   │   └── templateGenerators.ts
│   │   ├── pages/                   # Route pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── FormPage.tsx
│   │   │   ├── TemplatePage.tsx
│   │   │   ├── DeployPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── PricingPage.tsx
│   │   │   ├── AdminPage.tsx
│   │   │   └── UnsubscribePage.tsx
│   │   ├── App.tsx                  # Route definitions
│   │   ├── api.ts                   # API client
│   │   └── types.ts                 # TypeScript interfaces
│   ├── index.html
│   └── vite.config.ts
│
├── backend/                         # Express.js API server
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts          # MongoDB connection
│   │   │   └── firebase.ts          # Firebase Admin init
│   │   ├── middleware/
│   │   │   ├── auth.ts              # JWT verification
│   │   │   └── admin.ts             # Admin guard
│   │   ├── models/                  # Mongoose schemas
│   │   │   ├── User.ts
│   │   │   ├── Profile.ts
│   │   │   ├── Portfolio.ts
│   │   │   └── AITemplate.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── profile.ts
│   │   │   ├── portfolio.ts
│   │   │   ├── template.ts
│   │   │   ├── deploy.ts
│   │   │   ├── analytics.ts
│   │   │   ├── sitemap.ts
│   │   │   └── admin.ts
│   │   ├── services/
│   │   │   └── mimo.ts              # MiMo AI integration
│   │   ├── lib/
│   │   │   ├── vercel.ts            # Vercel API client
│   │   │   ├── email.ts             # Resend email client
│   │   │   └── seo.ts               # SEO meta generation
│   │   ├── templates/               # Portfolio HTML generators
│   │   │   ├── index.ts
│   │   │   ├── minimal.ts
│   │   │   ├── creative.ts
│   │   │   ├── developer.ts
│   │   │   ├── modern.ts
│   │   │   ├── elegant.ts
│   │   │   ├── glass.ts
│   │   │   ├── mono.ts
│   │   │   └── sunset.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts                 # Server entry point
│   └── tsconfig.json
│
└── README.md
```

---

## 🎨 Templates

MyFolio ships with 8 professionally designed portfolio templates:

| Template | Style |
|---|---|
| **Minimal** | Clean serif typography, warm tones, timeless design |
| **Creative** | Dark background, bold colors, vibrant personality |
| **Developer** | GitHub-inspired sidebar, code-friendly layout |
| **Modern** | Soft gradients, refined typography, polished look |
| **Elegant** | Dark theme with gold accents, timeline layout |
| **Glass** | Glassmorphism, frosted panels, translucent effects |
| **Mono** | Monochrome, tabular layout, monospace font |
| **Sunset** | Warm gradients, glowing accents, inviting feel |

> Can't find what you want? Use the **AI Template Builder** to describe your ideal style in plain text and get a custom template generated instantly.

---

## 🔌 API Reference

All endpoints are prefixed with `/api`. Authenticated routes require a Firebase ID token in the `Authorization: Bearer <token>` header.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/send-magic-link` | No | Send magic link email |
| `GET` | `/api/auth/me` | Yes | Get current user |
| `PUT` | `/api/auth/me` | Yes | Update user |
| `GET` | `/api/auth/me/export` | Yes | Export user data |
| `DELETE` | `/api/auth/me` | Yes | Delete account |
| `POST` | `/api/auth/unsubscribe` | Yes | Update email prefs |

### Profile

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/profile` | Yes | Get user profile |
| `PUT` | `/api/profile` | Yes | Save user profile |
| `POST` | `/api/profile/resume` | Yes | Upload & parse resume |

### Portfolios

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/portfolios` | Yes | List user portfolios |
| `POST` | `/api/portfolios` | Yes | Create portfolio |
| `GET` | `/api/portfolios/:id` | Yes | Get portfolio |
| `PUT` | `/api/portfolios/:id` | Yes | Update portfolio |
| `DELETE` | `/api/portfolios/:id` | Yes | Delete portfolio |

### Templates

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/templates` | No | List all templates |
| `GET` | `/api/templates/:id` | No | Get template metadata |
| `GET` | `/api/templates/:id/preview` | No | Get template preview |
| `POST` | `/api/templates/generate` | Yes | Generate AI template |
| `GET` | `/api/templates/ai-usage` | Yes | Get AI usage stats |
| `GET` | `/api/templates/ai-history` | Yes | Get AI template history |
| `GET` | `/api/templates/ai/:id` | Yes | Get specific AI template |

### Deploy

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/deploy/preview` | Yes | Generate HTML preview |
| `POST` | `/api/deploy` | Yes | Deploy to Vercel |
| `GET` | `/api/deploy/check/:subdomain` | No | Check subdomain availability |

### Analytics

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/analytics/view` | No | Track portfolio view |
| `GET` | `/api/analytics/:portfolioId` | Yes | Get view count |

### Admin

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/admin/stats` | Admin | Platform statistics |
| `GET` | `/api/admin/users` | Admin | List/search users |
| `GET` | `/api/admin/users/:id` | Admin | Get user details |
| `PUT` | `/api/admin/users/:id/tier` | Admin | Change user tier |

---

## 💰 Pricing

| | Free | Pro ($9/mo) |
|---|---|---|
| AI Resume Parsing | ✅ | ✅ |
| Pre-Built Templates | ✅ 8 templates | ✅ 8 templates |
| AI Template Builder | 2 generations/day | Unlimited |
| Portfolio Deploys | 3/day | Unlimited |
| Custom Subdomain | ✅ | ✅ |
| View Analytics | ✅ | ✅ |
| Email Notifications | ✅ | ✅ |
| Priority Support | — | ✅ |

---

## 🚢 Deployment

### Frontend (Vercel)

The frontend is a standard Vite SPA. Connect your repo to [Vercel](https://vercel.com) and set the root directory to `frontend/`. The `vercel.json` includes SPA rewrite rules.

### Backend

Deploy the backend to any Node.js hosting platform (Railway, Render, Fly.io, a VPS, etc.). Make sure to:

1. Set all environment variables from the backend `.env` table above.
2. Ensure MongoDB Atlas allows connections from your hosting IP.
3. Set `MAGIC_LINK_REDIRECT_URL` to your production frontend URL.

### Deployed Portfolios

Each portfolio is deployed to Vercel automatically via the Vercel API and served at `<subdomain>.myfolio.codes`.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please make sure your code follows the existing style and passes linting.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🖼️ Adding Screenshots

Screenshots are hosted on GitHub Releases so they don't bloat the repo. To add or update them:

1. Go to **Releases** → **Draft a new release** (or edit an existing one)
2. Tag it `v1.0-screenshots` (or any tag you prefer)
3. Upload these images as release assets:
   - `logo.png` — App logo/icon
   - `hero.png` — Full-width landing page hero
   - `landing.png` — Landing page overview
   - `dashboard.png` — Authenticated dashboard
   - `templates.png` — Template selection page
   - `deploy.png` — Deploy confirmation page
4. Copy each asset's **raw download URL** (right-click → Copy link)
5. Replace the `https://github.com/YOUR_USERNAME/...` URLs in this README with the actual URLs
6. Commit the updated README

> **Tip:** You can also drag-and-drop images directly into a GitHub Issue or PR comment to get permanent CDN URLs.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/your-username">Your Name</a>
</p>
