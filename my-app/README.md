# Sudhaar - Smart City Issue Management Platform

A Next.js application for citizens to report civic infrastructure issues and track resolutions.

## Tech Stack

- **Frontend**: Next.js 15, React 18, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MySQL + Prisma ORM
- **Auth**: JWT with httpOnly cookies
- **Testing**: Cucumber (BDD) + Playwright

---

## Environment Setup

Create a `.env` file in the root directory:

```env
# Database (MySQL)
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/civicIndia"

# JWT Secret (change in production!)
JWT_SECRET=your-super-secure-jwt-secret-key-change-this-in-production

# App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Google Maps API (optional - for location features)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Environment
NODE_ENV=development
```

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ Yes |
| `NEXT_PUBLIC_BASE_URL` | App URL for links | ✅ Yes |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | ❌ Optional |

---

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- MySQL 8.0+

### Installation

```bash
# Install dependencies
bun install

# Create MySQL database
mysql -u root -p -e "CREATE DATABASE civicIndia;"

# Run Prisma migrations
bunx prisma migrate dev

# Generate Prisma client
bunx prisma generate

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Default Admin Credentials

- **Email**: admin@civic.com
- **Password**: admin@123

---

## Testing Architecture

End-to-end (E2E) tests use **Cucumber** (Gherkin BDD) with **Playwright** (Chromium) and **TypeScript**.

### Stack

| Layer        | Technology |
|-------------|------------|
| Runner      | Cucumber (cucumber-js) |
| Language    | Gherkin (`.feature`) + TypeScript (step definitions) |
| Browser     | Playwright (Chromium) |
| Config      | `cucumber.js`, `tsconfig.cucumber.json`, `playwright.config.ts` |
| Reports     | JSON → HTML via `cucumber-html-reporter` |

### Flow

```
Feature files (.feature)  →  Cucumber  →  Step definitions (.ts)  →  Playwright  →  Browser (Chromium)
        ↑                                      ↑
   tests/features/                      tests/steps/
   tests/support/ (world, hooks)
```

- **Features** define scenarios in Given/When/Then.
- **Steps** implement those sentences with Playwright (navigate, fill, click, assert).
- **World** holds one shared `page` (and browser/context) per scenario.
- **Hooks** start the browser before each scenario and close it after.

### Folder structure

```
tests/
├── features/           # Gherkin feature files
│   └── login.feature
├── steps/              # TypeScript step definitions (Playwright)
│   └── login.steps.ts
└── support/            # Shared setup
    ├── world.ts        # Custom World (browser, context, page)
    └── hooks.ts        # Before: launch browser; After: close browser

reports/                # Generated (gitignored)
├── cucumber-report.json
└── cucumber-report.html

scripts/
└── generate-html-report.js   # JSON → HTML report
```

### Key config files

| File | Purpose |
|------|--------|
| `cucumber.js` | Loads ts-node, features, steps, support; writes JSON report to `reports/`. |
| `tsconfig.cucumber.json` | TypeScript config for Cucumber (CommonJS, includes `tests/**`). |
| `playwright.config.ts` | Base URL (e.g. `http://localhost:3000`), headless, viewport. |

---

## How to Run Tests

### Prerequisites

- Node.js and npm installed.
- App running at **http://localhost:3000** (e.g. `npm run dev` in another terminal).

### Commands

| Command | Description |
|--------|--------------|
| `bun run test:e2e` | Run E2E tests (Cucumber + Playwright). Writes `reports/cucumber-report.json`. |
| `bun run report:e2e` | Generate HTML report from the last run. Creates `reports/cucumber-report.html`. |
| `bun run test:e2e:report` | Run tests then generate the HTML report. |

### 1. Run E2E tests

```bash
# Terminal 1: start the app
bun run dev

# Terminal 2: run tests
bun run test:e2e
```

Optional: set base URL via env:

```bash
BASE_URL=http://localhost:3000 bun run test:e2e
```

### 2. Generate HTML report (after tests have run)

```bash
bun run report:e2e
```

Open `reports/cucumber-report.html` in a browser.

### 3. Run tests and generate report in one go

```bash
bun run test:e2e:report
```

