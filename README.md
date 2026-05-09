# AI Career Path

AI Career Path is a full-stack web app that helps users discover careers, take quizzes, generate personalized learning paths, and track progress across skills and roadmap tasks.

It is split into two apps:

- Frontend: React + Vite SPA
- Backend: Node.js + Express REST API
- Database: MongoDB via Mongoose

## Features

- Career browsing with detailed roadmaps, tools, companies, and resources
- Career-matching quiz that recommends a suitable path
- Personalized generated paths stored per authenticated user
- JWT-based authentication with login and registration
- Protected dashboard and generated-path detail pages
- Progress tracking with visual summaries and completion metrics
- Resource filtering by career, type, and difficulty
- Fallback-friendly UI so the app can still render useful content when API data is limited

## Tech Stack

### Frontend

- React 19
- React Router DOM
- Framer Motion
- React Icons
- React CountUp
- Vite

### Backend

- Node.js
- Express
- Mongoose
- JWT authentication
- bcryptjs for password hashing
- CORS and dotenv

## Repository Structure

```text
ai-career-path/
├─ backend/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ seed/
│  ├─ services/
│  ├─ server.js
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ data/
│  │  ├─ pages/
│  │  ├─ services/
│  │  └─ utils/
│  └─ package.json
├─ AUTHENTICATION_AND_DASHBOARD_UPDATE.md
└─ PROJECT_ARCHITECTURE_AND_DESIGN.md
```

## Setup

### Prerequisites

- Node.js and npm
- MongoDB connection string

### 1) Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=replace_with_a_long_random_secret
PORT=5000
```

Optional, only if you plan to wire in Gemini-backed generation later:

```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

Start the API:

```bash
npm start
```

### 2) Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:5000/api` by default. If you run the API elsewhere, update `frontend/src/services/api.js`.

## Available Scripts

### Backend

- `npm start` - starts the Express server

### Frontend

- `npm run dev` - starts the Vite dev server
- `npm run build` - builds the production bundle
- `npm run lint` - runs ESLint
- `npm run preview` - previews the production build locally

## Environment Variables

### Backend

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - secret used to sign access tokens
- `PORT` - server port, defaults to `5000`
- `GOOGLE_GEMINI_API_KEY` - optional, currently only needed if you extend the Gemini service path

## API Overview

### Public endpoints

- `GET /api/health`
- `GET /api/careers`
- `GET /api/careers/:slug`
- `GET /api/resources`
- `GET /api/quiz`
- `POST /api/quiz/results`

### Authentication endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Protected path endpoints

These routes require a valid JWT in the `Authorization: Bearer <token>` header:

- `POST /api/paths/generate`
- `GET /api/paths/user/me`
- `GET /api/paths/:pathId`
- `PUT /api/paths/:pathId`
- `DELETE /api/paths/:pathId`

## Frontend Routes

- `/` - Home
- `/login` - login and registration
- `/careers` - career catalog
- `/careers/:slug` - career detail page
- `/careers/:slug/quiz` - career-specific quiz
- `/resources` - learning resources
- `/quiz` - general career quiz
- `/dashboard` - protected progress dashboard
- `/path/:pathId` - protected generated-path detail page

## Authentication Flow

1. User creates an account or logs in from `/login`.
2. The backend returns a JWT and user profile.
3. The frontend stores the token in localStorage.
4. Protected API requests attach the token automatically.
5. Dashboard and generated-path pages are only available to authenticated users.

## Related Documentation

- [Authentication & Dashboard Update](AUTHENTICATION_AND_DASHBOARD_UPDATE.md)
- [Project Architecture & Design](PROJECT_ARCHITECTURE_AND_DESIGN.md)

## Notes

- Dashboard progress for career tracks is tracked on the frontend.
- Generated path progress is persisted on the backend per authenticated user.
- The app currently uses a deterministic/template-based path generation flow with seeded fallback data, so core functionality still works even when richer AI generation is unavailable.
