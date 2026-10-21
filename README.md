# MaxUp — Workout Client

MaxUp is a fitness web app for following guided workouts, taking on multi-day challenges, building your own workout routines, and tracking your progress over time. This repository is the **frontend**, built with Next.js 14 (App Router), TypeScript and Tailwind CSS. It talks to a separate MaxUp REST + Socket.IO backend.

## Features

- **Authentication**: email/password sign-up with an emailed verification PIN, plus Google sign-in through NextAuth.
- **Onboarding**: a step-by-step profile setup (gender → age → goal → fitness level → weight) that runs after sign-up.
- **Workout library**: workouts grouped by category and focus area, with a preview of every exercise before you start.
- **Guided workout player**:
  - a 15-second "ready" countdown before the first exercise
  - timed exercises with a countdown timer, and rep-based exercises you mark as done
  - automatic rest periods between exercises
  - audio cues (bell, whistle, countdown)
  - your place in the workout is saved to `localStorage`, so a refresh doesn't restart it
- **Workout feedback**: when you finish, you rate the workout (too hard / just right / too easy) and log your weight in kg or lb.
- **X-day challenges**: multi-day programmes you can start, pin and work through day by day, with progress tracking.
- **Personalized workouts**: build a custom routine by picking exercises and reordering them with drag and drop. You can then edit it, delete it, or invite people you follow to join it.
- **Stats & reports**: on your profile, a monthly activity calendar, totals, a list of recent workouts and a radar chart of your recent activity.
- **Streaks**: current streak, longest streak and total workouts, shown in a streak style you choose.
- **Daily energy battery**: four charges per day, and each workout you log today uses one.
- **Social**: search for users, follow and unfollow them, see followers and following, and view other people's profiles.
- **Real-time notifications**: workout invites and other alerts arrive over Socket.IO.

## Tech Stack

| Area             | Libraries                                                                 |
| ---------------- | ------------------------------------------------------------------------- |
| Framework        | [Next.js 14](https://nextjs.org/) (App Router), React 18, TypeScript      |
| Styling          | Tailwind CSS, `tailwind-merge`, `clsx`, `tailwind-scrollbar`              |
| UI components    | MUI, Headless UI, Lucide & React Icons                                    |
| Server state     | React Query v3                                                            |
| Client state     | Redux Toolkit (auth + socket/notification state)                          |
| Auth             | NextAuth (Google provider) + token-based auth against the MaxUp API       |
| Forms            | React Hook Form + Yup                                                     |
| Charts           | Nivo (calendar, radar, pie)                                               |
| Drag & drop      | dnd-kit                                                                   |
| Animation        | GSAP, `react-countup`, `react-circular-progressbar`                       |
| Realtime         | `socket.io-client`                                                        |
| HTTP             | Axios                                                                     |
| Misc             | Moment, `timeago.js`, `react-datepicker`, `react-hot-toast`, `react-responsive-carousel` |

## Getting Started

### Prerequisites

- **Node.js 18.17 or later** (required by Next.js 14)
- npm (a `package-lock.json` is committed)
- A running MaxUp backend. The example env file points at the hosted instance.
- A Google OAuth client, if you want Google sign-in to work locally.

### 1. Clone and install

```bash
git clone https://github.com/olamidemoraks/workout-client.git
cd workout-client
npm install
```

### 2. Configure environment variables

Copy the example file and fill in the blanks:

```bash
cp .env.example .env.local
```

| Variable                 | Description                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SERVER_URI` | Base URL of the MaxUp REST API, including the version prefix (e.g. `https://<host>/api/v1`). |
| `NEXT_PUBLIC_SOCKET_URI` | Base URL of the Socket.IO server used for real-time notifications.         |
| `SECRET`                 | Secret NextAuth uses to sign and encrypt session tokens. Generate one with `openssl rand -base64 32`. |
| `GOOGLE_CLIENT_ID`       | OAuth client ID from the Google Cloud Console.                              |
| `GOOGLE_CLIENT_SECRET`   | OAuth client secret from the Google Cloud Console.                          |

For Google sign-in, add this as an authorized redirect URI on your OAuth client:

```
http://localhost:3000/api/auth/callback/google
```

When you deploy, add your production domain's equivalent and set `NEXTAUTH_URL` to your site's URL.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Pages that need a signed-in user send you to `/login` until you sign in.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create a production build            |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint (`next lint`)             |

## Project Structure

```
.
├── public/
│   ├── assets/            # Logos, illustrations, onboarding images
│   └── audio/             # Sound cues for the workout player
├── src/
│   ├── api/               # Axios calls to the MaxUp API, grouped by domain
│   │   ├── activity.ts    #   activity logs, reports, notifications
│   │   ├── challenge.ts   #   X-day challenges
│   │   ├── custom.workout.ts # personalized workouts & invites
│   │   ├── user.ts        #   auth, profile, streaks, follow/unfollow
│   │   └── workout.ts     #   workouts, categories, exercises
│   ├── app/               # Next.js App Router routes (see below)
│   ├── components/        # UI, grouped by feature (Exercise, Challenges, Profile, …)
│   ├── hooks/             # Data hooks (useProfile, useStreak, …) and the Protected route guard
│   ├── libs/              # Shared helpers (`cn`, server actions)
│   ├── pages/api/auth/    # NextAuth API route (Google provider)
│   ├── redux/             # Redux store + auth and socket slices
│   └── utils/             # Static data, quotes, localStorage helpers
├── types/                 # Global TypeScript interfaces (IUser, IWorkout, IExercise, …)
├── next.config.js         # Allows remote images from res.cloudinary.com
└── tailwind.config.ts
```

Imports use the `@/*` alias, which maps to `src/*`.

### Routes

| Route                          | Purpose                                                                |
| ------------------------------ | ---------------------------------------------------------------------- |
| `/`                            | Home dashboard: challenges, focus areas, personalized workouts, recent activity |
| `/login`, `/signup`            | Sign in / create an account                                            |
| `/signup/verify-account`       | Enter the emailed verification PIN                                     |
| `/configure-profile`           | Onboarding profile setup                                               |
| `/workouts`                    | Workout library grouped by category                                    |
| `/workouts/[name]`             | Workouts for a single category or focus area                           |
| `/workouts/preview/[id]`       | Exercise list for a workout before starting                            |
| `/workouts/create`             | Build a personalized workout                                           |
| `/workouts/edit/[id]`          | Edit a personalized workout                                            |
| `/workout/[id]`                | View a personalized workout                                            |
| `/exercise/[id]?type=…`        | Workout player. `type` is `default`, `challenge` or `customize`        |
| `/challenge`                   | All X-day challenges                                                   |
| `/challenge/preview/[id]`      | Challenge overview before joining                                      |
| `/challenge/[id]`              | Challenge progress view                                                |
| `/challenge/started/[id]`      | An in-progress challenge day                                           |
| `/profile`                     | Your profile with Stats and Workouts tabs (`?tab=report` / `?tab=workouts`) |
| `/profile/[id]`                | Another user's profile                                                 |
| `/search`                      | Find users to follow                                                   |
| `/logout`                      | Sign out                                                               |

## How It Works

- **Auth flow**: email/password login and sign-up go straight to the MaxUp API, which returns a token. The client stores that token in `localStorage` under `userTK` and sends it as a `Bearer` header on API requests. Google sign-in goes through NextAuth. After it succeeds, the `Protected` wrapper ([src/hooks/protected.tsx](src/hooks/protected.tsx)) exchanges the Google session for a MaxUp token by calling the API's `social-auth` endpoint.
- **Route protection**: authenticated pages are wrapped in `Protected`. It loads the user's profile, shows an onboarding/loading screen while that happens, and redirects to `/login` if there is no valid token.
- **Real-time**: once the profile has loaded, `Protected` opens a Socket.IO connection to `NEXT_PUBLIC_SOCKET_URI`, registers the user with `add-user`, and stores the socket in Redux. Other components then use it, for example to emit `send-notification` when inviting friends to a workout.
- **Data fetching**: all server data goes through React Query hooks that call the functions in `src/api/`.

## Deployment

The app is a standard Next.js project and deploys cleanly to [Vercel](https://vercel.com/) or any Node host:

1. Set the environment variables listed above, plus `NEXTAUTH_URL`, in your hosting provider.
2. Add the production Google OAuth redirect URI (`https://<your-domain>/api/auth/callback/google`).
3. Build and start the app:

   ```bash
   npm run build
   npm run start
   ```

## Contributing

1. Fork the repo and create a feature branch: `git checkout -b feature/my-change`
2. Make your changes and run `npm run lint`
3. Commit and push, then open a pull request against `main`
