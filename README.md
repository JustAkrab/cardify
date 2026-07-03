# Cardify

An AI-powered flashcard creation and studying platform — generate study decks from YouTube videos, plain text, or PDFs, then review them with a Quizlet-style flip-card interface.

## Overview

Cardify lets users turn raw source material into study-ready flashcards using AI, organize them into decks, and review them with spaced, flip-card-style studying. The app is pre-launch, with a marketing landing page and email waitlist in front of the product dashboard.

## Features

- **Landing page & waitlist** — a marketing page (animated with Framer Motion) collects emails into a Supabase `waitlist` table ahead of launch.
- **AI flashcard generation from multiple sources:**
  - **YouTube** — paste a video URL, and the app pulls the video's transcript (`ytdl-core`) and generates a flashcard deck from it via Google Gemini (`@ai-sdk/google`).
  - **Text** — paste any block of text and generate a deck directly from it.
  - **PDF** — upload a PDF (via drag-and-drop with `react-dropzone`) to extract its content (`pdf-to-img`, `pdfjs-dist`) and generate flashcards from it.
  - **Manual creation** — build a deck by hand without AI assistance.
- **Deck management dashboard** — view recently created decks, create new ones, and jump into review mode, gated behind Supabase authentication.
- **Flashcard review/study mode** — flip-card studying UI powered by `react-quizlet-flashcard`.
- **Tagging** — flashcards can be tagged for organization (`tags` table, linked to individual flashcards).
- **Subscriptions & billing** — Stripe integration (`stripe`, `@stripe/stripe-js`, `use-shopping-cart`) with a `subscriptions` table tracking plan, status, and start/end dates, suggesting a freemium/paid-tier model.
- **PWA support** — Workbox is wired in for offline caching and installability.
- **Dark mode** — theme switching via `next-themes`.

## Tech Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **AI:** Vercel AI SDK (`ai`), `@ai-sdk/google` (Gemini)
- **Auth & Database:** Supabase (`@supabase/ssr`, `@supabase/supabase-js`) — Postgres, auth, middleware-based session handling
- **Payments:** Stripe
- **PDF/Video processing:** `pdfjs-dist`, `pdf-to-img`, `ytdl-core`
- **UI:** Tailwind CSS, MUI, Radix UI primitives, Headless UI, Framer Motion, `react-quizlet-flashcard`, Sonner (toasts), `swapy` (drag-to-reorder), `next-themes`
- **PWA:** Workbox (precaching, routing, expiration strategies)

## Project Structure

```
├── app/
│   ├── page.tsx                       # Landing page with waitlist signup
│   ├── dashboard/
│   │   ├── page.tsx                     # Dashboard overview (recent decks)
│   │   ├── layout.tsx                    # Dashboard shell + sidebar
│   │   ├── create/
│   │   │   ├── page.tsx                    # Choose a creation method
│   │   │   ├── youtube/page.tsx              # Generate deck from a YouTube URL
│   │   │   ├── text/page.tsx                  # Generate deck from pasted text
│   │   │   ├── pdf/page.tsx                    # Generate deck from an uploaded PDF
│   │   │   ├── manual/                          # Manual deck/card creation
│   │   │   └── actions.ts                        # Server actions: flashcardsFromYoutube, generateFromText, OCR
│   │   └── review/                                # Deck review / study mode
│   └── api/                                         # API routes (Stripe, etc.)
├── components/
│   ├── flashcards/                                    # Flashcard rendering components
│   ├── Sidebar.tsx, Navbar.tsx                          # Dashboard/marketing navigation
│   ├── file-upload.tsx                                    # Drag-and-drop PDF upload
│   ├── cards-carousel.tsx, CardsDemo.tsx                    # Landing page feature showcase
│   └── ui/                                                   # Design-system primitives (Radix/shadcn-style)
├── config/, hooks/, lib/, utils/supabase/                      # App config, custom hooks, Supabase client helpers
├── database.types.ts                                             # Generated Supabase schema types
├── middleware.ts                                                   # Supabase session refresh middleware
└── public/                                                           # Static assets
```

## Data Model (Supabase)

- **`decks`** — `id`, `name`, `description`, `user_id`, `created_at`
- **`flashcards`** — `id`, `deck_id`, `question`, `answer`, `is_public`, `created_at`, `updated_at`
- **`tags`** — `id`, `flashcard_id`, `name`, `created_at`
- **`subscriptions`** — `id`, `user_id`, `plan`, `status`, `start_date`, `end_date`
- **`waitlist`** — `id`, `email`, `created_at`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

## Status / Notes

Cardify is under active development. The PDF-generation flow (`app/dashboard/create/pdf/page.tsx`) currently has an early `return` in its file-upload handler ahead of the OCR/generation call, so PDF-to-flashcard generation isn't fully wired up yet — YouTube and text-based generation are functional end to end.

## Attribution

Built with [Next.js](https://nextjs.org/), [Supabase](https://supabase.com/), and the [Vercel AI SDK](https://sdk.vercel.ai/).
