# MyAmbulance

This repository contains the initial Node.js backend architecture for MyAmbulance. Feature implementations are intentionally deferred.

## Backend stack

- Node.js and Express
- MongoDB with Mongoose
- Socket.IO
- Jest, Nodemon, dotenv, cors, express-rate-limit, express-validator, bcryptjs, and jsonwebtoken

## Backend structure

The backend is in `backend/`. Its `src/config` directory holds application configuration; `models`, `controllers`, `services`, and `routes` reserve feature layers; `middleware`, `validators`, `sockets`, `utils`, `jobs`, and `tests` hold cross-cutting modules. `app.js` builds the Express app and `server.js` starts the HTTP server.

## Install and run

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Use `npm start` for production-style startup and `npm test` to run the starter test suite.

## Environment

Copy `backend/.env.example` to `backend/.env` and provide `MONGODB_URI` and `JWT_SECRET` when those features are implemented. Do not commit `.env` or credentials.

## Frontend

The React frontend is located in `frontend/` and uses Vite, Tailwind CSS v4, React Router, Axios, Leaflet, Socket.IO Client, React Context, Recharts, and Lucide React. It currently provides architecture scaffolding only: routes, role-specific layouts, shared components, API and socket clients, and placeholder pages.

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_BASE_URL` and `VITE_SOCKET_URL` in `frontend/.env` for the backend environment. Use `npm run build` to create a production frontend bundle.
