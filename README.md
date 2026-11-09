# CineSouth – South Indian Movie Review Platform
MERN stack: React+Vite+Tailwind, Express, MongoDB, JWT, bcrypt. Languages: Tamil, Telugu, Malayalam, Kannada.

## Run locally (VS Code terminal)
    cd backend && npm install && cp .env.example .env     # Windows: copy .env.example .env ; then edit MONGO_URI/JWT_SECRET
    npm run seed && npm run dev          # API on :5000, admin: admin@example.com / Admin@123
    cd ../frontend && npm install && cp .env.example .env && npm run dev   # site on :5173

## Deploy
1. MongoDB Atlas: create free cluster, add DB user, allow IP 0.0.0.0/0, copy connection string.
2. Backend (Render): New Web Service from GitHub, root `backend`, build `npm install`, start `npm start`. Env: MONGO_URI, JWT_SECRET, CLIENT_URL (frontend URL), NODE_ENV=production. Run `npm run seed` once locally with the Atlas URI.
3. Frontend (Vercel/Netlify): root `frontend`, build `npm run build`, output `dist`, env `VITE_API_URL=https://<render-app>/api`. SPA rewrite files are included.
4. GitHub: git init && git add . && git commit -m "init" && git remote add origin <url> && git push -u origin main

## API (prefix /api)
Auth: POST /auth/register, /auth/login, /auth/forgot, /auth/reset/:token; GET/PUT /auth/me
Movies: GET /movies?q&genre&year&language&sort=newest|rating|popular&page; GET /movies/:id; POST/PUT/DELETE /movies (admin)
Reviews: GET /movies/:id/reviews?sort=newest|oldest|helpful; POST /movies/:id/reviews {rating,reviewText}; DELETE /reviews/:id; POST /reviews/:id/like
Watchlist: POST /movies/:id/watchlist (toggle); GET /me/watchlist, /me/reviews
Admin: GET /admin/stats, /admin/users, /admin/reviews; PUT/DELETE /admin/users/:id
