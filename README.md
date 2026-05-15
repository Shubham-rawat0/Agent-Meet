# AGENTMEET

AI-powered video meeting platform built with Next.js.

AGENTMEET allows users to create AI agents and interact with them through real-time video meetings.  
The platform includes automated meeting summaries, authentication, billing, background workflows, and a modern type-safe full-stack architecture.

---

## Features

### AI Agent Meetings

- Create and manage custom AI agents
- Join real-time video meetings with agents
- Dynamic meeting sessions using unique meeting IDs

### Meeting Intelligence

- Automatic meeting summaries
- AI-generated insights and conversation tracking
- Meeting history and management dashboard

### Authentication

- Secure authentication with Clerk
- User session management
- Protected dashboard and API routes

### Payments & Billing

- Subscription and billing integration using Polar
- Upgrade and checkout flows
- Customer billing portal

### Background Jobs

- Event-driven workflows powered by Inngest
- Webhooks and async processing
- Automated task execution

### Full-Stack Type Safety

- End-to-end type safety with tRPC
- TanStack integration for data fetching and state handling
- Modern App Router architecture using Next.js

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework |
| TypeScript | Type safety |
| Clerk | Authentication |
| Polar | Payments & subscriptions |
| Inngest | Background jobs & workflows |
| tRPC | End-to-end APIs |
| TanStack Query | Data fetching & caching |
| Tailwind CSS | Styling |
| Turbopack | Fast builds and development |

---

## Project Structure

```bash
app/
│── api/
│   ├── billing/
│   ├── checkout/
│   ├── inngest/
│   ├── polar/
│   ├── trpc/
│   └── webhook/
│
│── dashboard/
│── call/
│── sign-in/
│── sign-up/

components/
server/
trpc/
lib/
```

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Shubham-rawat0/Agent-Meet
cd Agent-Meet
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory.

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

POLAR_ACCESS_TOKEN=
POLAR_WEBHOOK_SECRET=

INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

DATABASE_URL=
```

---

## Development

Run the development server:

```bash
npm run dev
```

---

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Deployment

The application can be deployed easily on Vercel.

```bash
npm run build
```

Push your repository to GitHub and import it into Vercel.

Make sure all environment variables are configured in the Vercel dashboard.

---

## API Routes

| Route | Description |
|---|---|
| `/api/trpc` | tRPC API handler |
| `/api/checkout` | Subscription checkout |
| `/api/billing/portal` | Billing portal |
| `/api/webhook` | Webhook handler |
| `/api/inngest` | Inngest background jobs |

---

## Authentication

Authentication is handled using Clerk.

Protected routes include:

- Dashboard
- Meetings
- Agents
- Billing

---

## Future Improvements

- Multi-user meetings
- Live transcription
- Voice customization for agents
- AI memory and persistent context
- Screen sharing support
- Calendar integrations

---

## License

MIT License
