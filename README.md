# Resumind — AI-Powered Resume Analyzer

An AI-powered web application that analyzes resumes against real job postings, delivering ATS scores, structured feedback, and actionable recommendations to increase your chances of getting past automated screening processes.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat&logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

**[Live Demo](https://your-deployment-url.vercel.app)** · **[Portfolio](https://portfolio-sooty-five-67.vercel.app)**

---

## Overview

Resumind lets users upload a PDF resume, provide a job description, and receive detailed AI-generated feedback scored across multiple dimensions: ATS compatibility, tone & style, content quality, structure, and skills alignment.

The app stores resumes and feedback persistently using Puter.js — a client-side cloud platform — meaning there is no backend infrastructure to maintain.

---

## Features

- **AI Resume Analysis** — Sends resume content and job description to an LLM, receives structured JSON feedback with scores and actionable tips per category
- **ATS Score** — Dedicated score measuring how well the resume performs against Applicant Tracking Systems
- **Resume Dashboard** — Score distribution chart (Recharts), average score, top score, and best/worst resume highlights
- **PDF Preview** — Converts uploaded PDFs to images client-side for in-browser preview without a server
- **Delete Resume** — Individual resume deletion with optimistic UI update, no page reload
- **Persistent Storage** — Resumes and feedback stored in Puter KV store and filesystem, surviving page refreshes
- **Dark Theme** — Custom design system built with Tailwind CSS v4 `@theme` tokens

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | React 19 + React Router v7 | File-based routing, loaders, type-safe params |
| Language | TypeScript | End-to-end type safety including API responses |
| Styling | Tailwind CSS v4 | `@theme` custom tokens for a consistent design system |
| Cloud/Auth | Puter.js | Client-side auth, KV store, filesystem — no backend needed |
| AI | Puter AI (LLM) | Resume analysis and structured feedback generation |
| Charts | Recharts | Score distribution visualization |
| PDF | pdf.js | Client-side PDF to image conversion |
| Deployment | Vercel | Zero-config deployment with React Router v7 |

---

## Architecture Decisions

**No backend.** Puter.js provides authentication, a key-value store, and a filesystem entirely client-side. This eliminates infrastructure costs and deployment complexity while keeping user data isolated per account.

**Structured AI output.** The AI prompt explicitly requests JSON with a defined schema. The app parses and validates the response before storing it, preventing UI crashes from malformed feedback.

**Client-side PDF conversion.** PDFs are converted to images in the browser using pdf.js before upload. This allows resume preview without storing rendered images server-side, and gives users an instant visual confirmation of what was analyzed.

**Optimistic UI on delete.** Resume cards are removed from state immediately on delete click, before the async operations complete. This makes the interaction feel instant even if the underlying KV/filesystem calls are slow.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Renzo-rifos/ATS-App.git
cd ATS-App

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

No environment variables required — Puter.js handles auth and storage through its own SDK.

---

## Project Structure

```
app/
├── routes/                # Pages
│   ├── home.tsx           # Resume list & delete
│   ├── upload.tsx         # Upload form & AI trigger
│   ├── resume.tsx         # Feedback detail view
│   ├── dashboard.tsx      # Stats, chart, best/worst
│   └── auth.tsx           # Puter authentication
├── components/            # Reusable UI
│   ├── ResumeCard.tsx     # Card with delete button
│   ├── Summary.tsx        # Score overview + gauge
│   ├── ATS.tsx            # ATS score breakdown
│   ├── Details.tsx        # Accordion feedback per category
│   └── ScoreCircle.tsx    # Circular score indicator
├── lib/
│   ├── puter.ts           # Puter.js store & integration
│   └── pdf2img.ts         # Client-side PDF to image conversion
├── constants/             # AI prompt instructions
└── types/                 # Shared TypeScript interfaces
```

---

## AI Feedback Format

The AI prompt explicitly requests structured JSON, which is validated before storing to prevent UI crashes from malformed responses:

```ts
interface Feedback {
  overallScore: number;
  ATS:          { score: number; tips: Tip[] };
  toneAndStyle: { score: number; tips: Tip[] };
  content:      { score: number; tips: Tip[] };
  structure:    { score: number; tips: Tip[] };
  skills:       { score: number; tips: Tip[] };
}

interface Tip {
  type:        "good" | "improve";
  tip:         string;
  explanation: string;
}
```

---

## Lighthouse Scores

Measured on the auth page in incognito mode:

| Metric | Score |
|---|---|
| Performance | 98 |
| Accessibility | 90 |
| Best Practices | 100 |
| SEO | 100 |

---

## Author

**Renzo Ezequiel Rifos** — Frontend Developer  
[GitHub](https://github.com/Renzo-rifos) · [LinkedIn](https://linkedin.com/in/rifos-ezequiel) · [Portfolio](https://portfolio-sooty-five-67.vercel.app)
