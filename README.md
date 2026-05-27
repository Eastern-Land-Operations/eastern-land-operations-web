# Eastern Land Operations — Website

Production website for Eastern Land Operations. Built with Next.js 14, TypeScript, Tailwind CSS, and Resend for email.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Email | Resend |
| Fonts | Space Grotesk + Inter (Google Fonts) |
| Deployment | Vercel |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — Hero, What We Do, Owner Solutions, Pipeline, Partner Lane, CTA |
| `/sell-your-property` | Seller-focused page with situations and process |
| `/partner-with-us` | Buyer / investor buy box intake |
| `/operations` | Full operating model detail |
| `/about` | Company background and values |
| `/contact` | Contact info + inline outreach form |
| `/submit-opportunity` | Full outreach form (primary CTA) |
| `/api/outreach` | POST endpoint — validates and sends email via Resend |

---

## Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd eastern-land-operations
npm install
```

### 2. Configure environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=contact@easternlandoperations.com
FROM_EMAIL=notifications@easternlandoperations.com
NEXT_PUBLIC_SITE_URL=https://easternlandoperations.com
```

### 3. Get a Resend API key

1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys** → **Create API Key**
3. Copy the key into `RESEND_API_KEY`

### 4. Configure your From email

For development and testing, you can use Resend's sandbox address:
```
FROM_EMAIL=onboarding@resend.dev
```

For production, you must verify your domain in Resend:
1. Go to Resend → **Domains** → **Add Domain**
2. Add `easternlandoperations.com`
3. Add the DNS records Resend provides
4. Once verified, use `notifications@easternlandoperations.com` (or your preferred address)

### 5. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Lead Intake System

The site uses one shared intake backend with two primary production questionnaires:

- Seller / Warm Lead Property Intake: `src/app/sell-your-property/page.tsx`
- Buyer / Investor Buy Box Intake: `src/app/partner-with-us/page.tsx`

Shared plumbing:

- Reusable field component: `src/components/forms/FormField.tsx`
- Shared schemas and types: `src/lib/outreachSchemas.ts`
- Submission handler: `src/app/api/outreach/route.ts`
- Email delivery and CRM handoff point: `src/lib/email.ts`

### Where submissions go

Current behavior:

1. Browser submits to `/api/outreach`
2. API validates payload with Zod
3. API sends structured email to `CONTACT_EMAIL`
4. Optional seller photo uploads are attached to that email

### Where to connect CRM later

If you later want Podio, Salesforce, HubSpot, Airtable, Notion, or another CRM, connect it in
`src/app/api/outreach/route.ts` after validation. Keep `src/lib/email.ts` as the email fallback.

## Testing Form Submissions

### Option A: Local with real Resend sandbox

With `FROM_EMAIL=onboarding@resend.dev` set:
1. Fill out the form at `/submit-opportunity`
2. Submit
3. Check the Resend dashboard at [resend.com/emails](https://resend.com/emails) to see the sent email

Note: When using `onboarding@resend.dev`, emails can only be sent to the account email used to register with Resend during testing.

### Option B: Test with curl

```bash
curl -X POST http://localhost:3000/api/outreach \
  -H "Content-Type: application/json" \
  -d '{
    "submissionType": "property-owner",
    "fullName": "Test Owner",
    "email": "test@example.com",
    "phone": "3025550000",
    "propertyAddress": "123 Test Street",
    "propertyCity": "Wilmington",
    "propertyState": "DE",
    "propertyZip": "19801",
    "reasonForReaching": "Testing the form submission"
  }'
```

Expected response: `{"success": true}`

### Option C: Check Resend logs

All emails sent through Resend are logged in your [Resend dashboard](https://resend.com/emails) with full content, delivery status, and timestamps.

---

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-org/eastern-land-operations.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Framework preset will auto-detect as **Next.js**

### 3. Add environment variables

In Vercel project settings → **Environment Variables**, add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `RESEND_API_KEY` | `re_xxx...` | Production, Preview |
| `CONTACT_EMAIL` | `contact@easternlandoperations.com` | Production, Preview |
| `FROM_EMAIL` | `notifications@easternlandoperations.com` | Production |
| `FROM_EMAIL` | `onboarding@resend.dev` | Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://easternlandoperations.com` | Production |

### 4. Deploy

Click **Deploy**. Vercel will build and deploy automatically.

For subsequent deployments, pushing to `main` triggers automatic redeployment.

---

## Custom Domain

1. In Vercel → project → **Settings** → **Domains**
2. Add `easternlandoperations.com` and `www.easternlandoperations.com`
3. Update your domain DNS records as instructed by Vercel

---

## Email Attachment Support

The form supports file uploads (photos, documents). Files are:
- Accepted: images, PDF, DOC/DOCX
- Limit: 5 files, 10MB each
- Attached to the email via Resend's attachment API

---

## Rate Limiting

The `/api/outreach` endpoint includes basic in-memory rate limiting:
- 5 submissions per IP per hour
- Resets on cold starts (suitable for low-volume use)
- For high-volume, replace with Redis-backed limiting (Upstash recommended)

---

## Spam Protection

- Honeypot field (`_hp`) — hidden from real users, bots fill it in and get silently rejected
- Server-side validation with Zod
- Rate limiting per IP

---

## Brand Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Carbon Black | `#0B0D0F` | Primary background |
| Graphite | `#171A1F` | Section backgrounds |
| Pit Wall Gray | `#232831` | Cards, borders |
| Soft White | `#F4F4F2` | Primary text |
| Track Silver | `#A9B0B8` | Secondary text |
| Racing Blue | `#3F6C8F` | CTAs, highlights |
| Champagne Steel | `#B7A67A` | Accents, dividers |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx               # Root layout, fonts, SEO
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Tailwind + custom styles
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── operations/page.tsx
│   ├── partner-with-us/page.tsx
│   ├── sell-your-property/page.tsx
│   ├── submit-opportunity/page.tsx
│   └── api/
│       └── outreach/
│           └── route.ts         # POST handler — validation + email
├── components/
│   ├── Navigation.tsx           # Fixed nav with mobile menu
│   ├── Footer.tsx               # Footer with links + contact
│   └── OutreachForm.tsx         # Full outreach form (client component)
└── lib/
    └── email.ts                 # Resend integration + email templates
```

---

## Contact

Eastern Land Operations  
Email: contact@easternlandoperations.com  
Phone: 302-689-3912
