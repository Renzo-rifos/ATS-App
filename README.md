
# 🧠 ATS App — AI-Powered Applicant Tracking System

A full-stack AI-powered resume analyzer built with React, React Router v7, TypeScript, and Puter.js. Upload your resume, get real-time AI feedback, and track your job applications — all in one place.

> 🚧 **Work in progress** — actively being built.

---

## ✨ Features

- 🔐 **Authentication** via Puter.js (no backend required)
- 📄 **Resume Upload** — PDF support with file uploader component
- 🤖 **AI Feedback** — detailed analysis powered by Puter's AI API
- 📊 **Score Breakdown** — overall score + categories: ATS, Tone & Style, Content, Structure, Skills
- 🖼️ **PDF to Image Conversion** — visual preview of uploaded resumes
- 🗂️ **Application Tracker** — view all your submitted resumes and ratings
- ☁️ **Cloud Storage** — files stored via Puter.js, no external database needed
- 🚀 **Deployed with Puter** — serverless deployment

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router v7 | File-based routing & navigation |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Puter.js | Auth, cloud storage & AI |
| Vite | Build tool |

---

## 📁 Project Structure

```
app/
├── components/        # Reusable UI components
│   ├── Navbar.tsx
│   ├── ResumeCard.tsx
│   └── ScoreCircle.tsx
├── routes/            # File-based routes (React Router v7)
│   ├── home.tsx
│   ├── auth.tsx
│   └── ...
├── lib/
│   └── puter.ts       # Puter.js store & integration
├── constants.ts       # Shared constants & AI prompt config
└── types/             # TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Renzo-rifos/ATS-App.git
cd ATS-App

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🤖 AI Feedback Format

The AI analyzes resumes across 5 categories and returns structured JSON feedback:

```ts
interface Feedback {
  overallScore: number;       // 0–100
  ATS: { score: number; tips: Tip[] };
  toneAndStyle: { score: number; tips: Tip[] };
  content: { score: number; tips: Tip[] };
  structure: { score: number; tips: Tip[] };
  skills: { score: number; tips: Tip[] };
}
```

Each tip includes a `type` (`"good"` or `"improve"`), a short title, and a detailed explanation.

---

## 📌 Roadmap

- [x] Project setup & routing 
- [x] Homepage & Resume Card
- [x] Authentication with Puter.js
- [ ] Upload form & file uploader
- [ ] PDF to image conversion
- [ ] AI feedback integration
- [ ] Resume feedback page
- [ ] Fetch real data from Puter storage
- [ ] Deployment

---

## 👤 Author

**Ezequiel Rifos**
- GitHub: [@Renzo-rifos](https://github.com/Renzo-rifos)
- LinkedIn: [rifos-ezequiel](https://linkedin.com/in/rifos-ezequiel)

---

## 📄 License

MIT
