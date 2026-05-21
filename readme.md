# Study Notebook

Personal productivity web app for product/TPM case interview practice, daily habits, and progress tracking.

## Tech Stack

- **Frontend:** React 18 + Vite, Tailwind CSS, Recharts
- **API:** Azure Static Web Apps Functions (Node.js v18)
- **Database:** Azure Cosmos DB
- **AI:** Azure OpenAI (gpt-4o-mini)

## Setup

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your Azure values in `.env`.

2. Install dependencies:
   ```bash
   npm install
   cd api && npm install
   ```

3. Run locally:
   ```bash
   npm run dev
   ```

4. Deploy: Push to GitHub. Azure Static Web Apps auto-deploys. Add all env variables in Azure Portal → Static Web App → Configuration.

## Routes

| Path | Page |
|------|------|
| `/` | Redirects to `/product-case` |
| `/product-case` | Product case practice |
| `/tpm-case` | TPM case practice |
| `/habits` | Daily habits |
| `/progress` | Dashboard |
