# Study Notebook

A personal AI-powered interview prep and habit tracking tool built during an active PM and TPM job search.

The four tabs in this tool map to the four things a serious job seeker has to do consistently to compete: practice product case interviews, practice TPM case interviews, apply to enough companies every day, and maintain outreach to recruiters and hiring managers. Each tab solves a distinct part of the same problem.

---

## What It Does

**Interview Practice**

Walkthrough mode shows an ideal interview conversation structured into four distinct, non-overlapping layers to ensure high pedagogical value:
- **Reasoning:** The candidate's internal decision process when facing a fork in the road (the options available and why one was chosen).
- **Common Slip:** A plain, case-specific callout of the specific mistake a weaker candidate would make at this exact moment.
- **Said:** The exact words spoken out loud to the interviewer.
- **Interview Tip:** A universally applicable, transferable technique the learner can use in any interview.

Live mode puts the AI in the interviewer seat. You answer, it probes, and at the end it scores your performance across all 8 framework dimensions. Sessions adapt to your weak areas over time.

Both Product Manager and TPM tracks are supported. Each session pairs a walkthrough case and a practice case on the same problem type but in different industries, so you learn the pattern from one context and apply it independently in another.

**Habit Tracking**

Daily boolean tracking for four habits: five job applications, two recruiter or hiring manager outreach messages, a product practice session, and a TPM practice session. Streak tracking shows current and longest streaks per habit. A 90-day activity heatmap shows consistency at a glance.

**Progress Dashboard** (`/progress`)

- **Where you stand:** level badge, session count, 8-step skill radar (after 3+ live sessions)
- **Score over time:** product vs TPM case scores by session number, with step-level insights
- **Habits & consistency:** 90-day heatmap, streak table, and consistency score

Data loads from `GET /api/progress`; all chart math runs client-side in `src/utils/progressMetrics.js`.

**Daily Summary**

After 5pm, **End My Day** in the bottom strip opens a full-page review: today’s habits, optional practice recap, cumulative reminders, and AI **Tomorrow’s Focus** via `POST /api/generateSummary`.

**Review Bank** (`/review-bank`)

Browse saved live and walkthrough sessions (newest 50). Filter by type or score band; expand cards for step bars, learnings, and full conversation modal. `GET /api/sessions`.

**Responsive Breakpoint System**

The entire application dynamically adapts across three unified breakpoints using Tailwind and CSS properties:
- **Desktop (960px and above):** Full-sized layout with a 60px wide/18-ring spiral binding, full tab labels, side-by-side grids, and 280px chart heights.
- **Tablet (600px to 959px):** Optimized layout with a 40px wide/12-ring spiral binding, slightly smaller fonts, 2x2 habit streak cards, and 260px chart heights.
- **Mobile (below 600px):** Ultra-streamlined layout with a 24px wide/8-ring spiral (10px ring diameter), no red margin line offset (content padded 12px), icon-only nav tabs with a small 9px label, stacked bottom strip, 220px charts, a compact 30-day heatmap (with 12px tap targets), single-column cards, sticky chat inputs, and full-width stacked scoring feedback.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Hosting | Azure Static Web Apps (free tier) |
| API | Azure Functions (built into Static Web Apps) |
| Database | Azure Cosmos DB (serverless) |
| AI Generation | Azure OpenAI GPT-4o-mini |
| AI Interviewer and Scoring | Azure OpenAI GPT-4o |
| CI/CD | GitHub Actions |

---

## Prerequisites

- Node.js 20 LTS (`nvm install 20 && nvm use 20`)
- An Azure subscription
- A GitHub account

---

## Azure Resources Required

**1. Azure OpenAI**
- Create an Azure OpenAI resource (East US 2 recommended)
- In Azure AI Foundry, deploy `gpt-4o-mini` with deployment name `gpt-4o-mini`
- In Azure AI Foundry, deploy `gpt-4o` with deployment name `gpt-4o`
- Copy the endpoint URL and API key from the resource's Keys and Endpoint page

**2. Azure Cosmos DB**
- Create a Cosmos DB account with serverless capacity mode
- Create a database named `studynotebook`
- Create these 5 containers with partition key `/id` on each: `practice_sessions`, `habits`, `streaks`, `learning_profile`, `daily_summaries`
- Copy the connection string from the Keys page

**3. Azure Static Web Apps** (for deployment only)
- Create a Static Web App connected to this GitHub repo
- Branch: `main`, framework: React, app location: `/`, output location: `dist`, API location: `api`

---

## Local Setup

**1. Clone the repo**
```bash
git clone https://github.com/your-username/study-notebook.git
cd study-notebook
```

**2. Install dependencies**
```bash
npm install
cd api && npm install && cd ..
```

**3. Configure environment variables**

Create `.env` in the root:
```
VITE_API_BASE_URL=/api
```

Create `api/local.settings.json`:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AZURE_COSMOS_CONNECTION_STRING": "your-connection-string",
    "AZURE_COSMOS_DATABASE": "studynotebook",
    "AZURE_OPENAI_ENDPOINT": "https://your-resource.openai.azure.com/",
    "AZURE_OPENAI_API_KEY": "your-key",
    "AZURE_OPENAI_DEPLOYMENT_FAST": "gpt-4o-mini",
    "AZURE_OPENAI_DEPLOYMENT_SMART": "gpt-4o"
  }
}
```

**4. Run locally**
```bash
# Frontend only (Phase 1 and 2)
npm run dev

# Frontend and API together (Phase 3 onwards)
npm install -g @azure/static-web-apps-cli
swa start
```

---

## Project Structure

```
study-notebook/
├── src/
│   ├── components/
│   │   ├── layout/          # NotebookLayout, NavTabs, PageHeading
│   │   ├── habits/          # HabitCard, HabitHeatmap, StreakCard
│   │   ├── cases/           # WalkthroughView, LiveSession, ScoringScreen
│   │   └── dashboard/       # RadarChart, ScoreTrendLine, DailySummary
│   ├── pages/
│   │   ├── ProductCase.jsx
│   │   ├── TPMCase.jsx
│   │   ├── Habits.jsx
│   │   ├── Dashboard.jsx
│   │   └── ReviewBank.jsx
│   ├── services/
│   │   ├── cosmosService.js
│   │   ├── aiService.js
│   │   └── streakService.js
│   ├── hooks/
│   │   ├── useHabits.js
│   │   ├── useStreaks.js
│   │   └── useLearningProfile.js
│   ├── constants/
│   │   └── caseFramework.js
│   └── utils/
│       ├── dateUtils.js
│       └── scoringUtils.js
├── api/
│   ├── generateCase/
│   ├── conductInterview/
│   ├── evaluateSession/
│   ├── generateSummary/
│   ├── getProgress/
│   ├── getSessions/
│   ├── habits/
│   ├── streaks/
│   └── host.json
├── .github/
│   └── workflows/
├── .env.example
├── staticwebapp.config.json
└── package.json
```

---

## Deployment

Deployment is automatic. Every push to `main` triggers GitHub Actions, which builds and deploys to Azure Static Web Apps in about two minutes.

Before the first deployment, add environment variables in the Azure Portal:

```
Azure Portal -> Static Web App -> Settings -> Environment Variables
```

Add every key from `api/local.settings.json` Values section, plus `VITE_API_BASE_URL` set to `/api`.

---

## The 8-Step Interview Framework

All case practice is structured around this framework. It governs case generation, the interviewer's behavior during a session, scoring, and adaptive targeting.

| Step | Name | What it tests |
|---|---|---|
| 1 | Clarify Objective | Do you define the problem before solving it? |
| 2 | Define User and Pain Point | Can you segment, pick one, and describe real friction? |
| 3 | Diagnose Root Cause | Do you investigate before proposing solutions? |
| 4 | Prioritize Ruthlessly | Can you make a defensible trade-off decision? |
| 5 | Design the Solution | Is your solution specific, realistic, and tied to the root cause? |
| 6 | Define Success Metrics | Do you know what good looks like and how to measure it? |
| 7 | Discuss Risks and Trade-offs | Can you reason through second-order effects? |
| 8 | Make a Recommendation | Do you commit to a clear, justified conclusion? |

---

## Scoring Bands

| Band | Score Range | What it means |
|---|---|---|
| Exceptional | 4.5 to 5.0 | Ready to interview. Demonstrates senior-level judgment. |
| Strong | 3.5 to 4.4 | Solid foundation with a few areas to sharpen. |
| Developing | 2.5 to 3.4 | Framework present but lacking depth or specificity. |
| Weak | 1.0 to 2.4 | Significant gaps. Focus on the lowest-scoring steps first. |

---

## Environment Variables Reference

| Variable | Used by | Description |
|---|---|---|
| `VITE_API_BASE_URL` | Frontend | Base path for API calls |
| `AZURE_COSMOS_CONNECTION_STRING` | API | Cosmos DB connection string |
| `AZURE_COSMOS_DATABASE` | API | Database name |
| `AZURE_OPENAI_ENDPOINT` | API | Azure OpenAI resource endpoint |
| `AZURE_OPENAI_API_KEY` | API | Azure OpenAI API key |
| `AZURE_OPENAI_DEPLOYMENT_FAST` | API | GPT-4o-mini deployment name |
| `AZURE_OPENAI_DEPLOYMENT_SMART` | API | GPT-4o deployment name |

---

## Security Notes

- API keys never reach the browser. All OpenAI and Cosmos DB calls go through Azure Functions.
- `.env` and `api/local.settings.json` are gitignored. Do not commit either file.
- Cosmos DB and Azure OpenAI network access is restricted to Azure services and your home IP.
- Azure Static Web Apps enforces HTTPS automatically.

---

## Local Development Notes

- Run `nvm use` when opening a new terminal in this project. The `.nvmrc` file pins Node 20.
- Use the SWA CLI from Phase 3 onwards to run the frontend and Azure Functions together locally.
- Cosmos DB changes made locally write to your real Azure database. There is no separate dev database.
- If the Functions do not start, check that `api/local.settings.json` exists and all values are filled in.

---

## License

Personal use only. Not licensed for redistribution.
