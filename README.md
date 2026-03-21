# Pharmacy E-commerce

A full-stack pharmacy e-commerce application with a React frontend and a Node.js REST API backend. Users can browse and filter pharmaceutical products, add items to a persistent cart, and complete purchases through a PayPal-powered checkout flow.

---

## Features

- **Product catalogue** — search, category filter, and price range filter
- **Product detail** — full description, stock, and related products carousel
- **Shopping cart** — persisted in `localStorage`, synced across tabs
- **Checkout** — shipping + billing forms (pre-filled from saved profile), PayPal integration
- **Authentication** — register, login, JWT session via HTTP-only cookies
- **Order history** — list and detail view for past orders
- **Customer profile** — update personal data and billing address
- **Internationalisation** — Spanish (default) and English, switchable at runtime
- **Responsive UI** — mobile-first layout, collapsible filters, hamburger menu

---

## Tech Stack

### Frontend (`/` — this repo)

| Layer | Library |
|-------|---------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Routing | React Router 7 |
| Server state | TanStack Query (React Query) 5 |
| Client state | Zustand 5 |
| Forms | react-hook-form + Zod |
| HTTP | Axios (with auth interceptor) |
| Styling | Tailwind CSS 4 |
| i18n | i18next + react-i18next |
| Notifications | Sonner |
| Payments | PayPal JS SDK |
| Testing | Vitest + Testing Library + MSW |

### Backend (`../ecomerce-backend`)

| Layer | Library |
|-------|---------|
| Runtime | Node.js 22 |
| Framework | Express 5 |
| Language | TypeScript |
| ORM | Prisma 7 (`@prisma/adapter-pg`) |
| Database | PostgreSQL |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Validation | Zod |
| Security | Helmet + CORS |
| Payments | PayPal Server SDK |
| Testing | Vitest + Supertest |

---

## Prerequisites

- **Node.js 22+** (`node -v` must show `v22.x.x`)
- **PostgreSQL** running locally (default port 5432)
- **npm** 10+

> Node 22 is required. Older versions are not compatible with the `rolldown` bundler used by Vite 8.

---

## Quick Start

### 1. Clone the repositories

Both the frontend and backend need to be cloned separately:

```bash
# Frontend
git clone <your-frontend-repo-url> ecomerce
cd ecomerce
npm install

# Backend (in a parallel directory)
git clone <your-backend-repo-url> ecomerce-backend
cd ecomerce-backend
npm install
```

### 2. Create the database

```bash
createdb farmacia_db
```

### 3. Configure environment variables

**Backend** — copy and fill in `ecomerce-backend/.env`:

```bash
cd ecomerce-backend
cp .env.example .env
```

```env
PORT=4000
DATABASE_URL=postgresql://postgres@localhost:5432/farmacia_db
JWT_SECRET=a_long_random_secret_string
PAYPAL_CLIENT_ID=test_paypal_client_id   # use this value for mock/dev mode
PAYPAL_SECRET=not_needed_in_dev
FRONTEND_URL=http://localhost:5173
```

> Setting `PAYPAL_CLIENT_ID=test_paypal_client_id` activates **mock payment mode** — no real PayPal account needed during development. A yellow "Simulate payment" button replaces the real PayPal button.

**Frontend** — the defaults in `.env` already point to the local backend:

```env
VITE_API_URL=http://localhost:4000/api
VITE_PAYPAL_CLIENT_ID=test_paypal_client_id
```

### 4. Run database migrations and seed data

```bash
cd ecomerce-backend
npx prisma migrate deploy    # or: npx prisma migrate dev
npm run seed                 # loads 5 categories + 15 sample products
```

### 5. Start both servers

**Terminal 1 — Backend:**

```bash
cd ecomerce-backend
npm run dev    # starts on http://localhost:4000
```

**Terminal 2 — Frontend:**

```bash
cd ecomerce
npm run dev    # starts on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Running Tests

**Frontend:**

```bash
npm test               # run once
npm run test:watch     # watch mode
```

**Backend:**

```bash
cd ecomerce-backend
npm test
```

---

## Project Structure

### Frontend

```
src/
├── app/              # Root component, router, providers
├── domains/          # Feature modules (business logic lives here)
│   ├── auth/         # Login, register, auth store + JWT handling
│   ├── products/     # Catalogue, filters, product detail
│   ├── cart/         # Cart store (Zustand + localStorage)
│   ├── checkout/     # Shipping/billing forms, PayPal button
│   ├── orders/       # Order list and detail
│   └── customer/     # Profile and billing address management
├── pages/            # Route-level page components
├── components/
│   ├── ui/           # Reusable primitives: Button, Input, Modal, Spinner…
│   └── layout/       # Header, Footer, PrivateRoute, navigation
├── lib/              # Axios instance, React Query client
└── i18n/             # Translation files (es.json, en.json)
```

Each domain folder follows a consistent pattern:

```
domains/<name>/
├── <name>.types.ts       # TypeScript types and Zod schemas
├── <name>.service.ts     # API calls (via lib/axios.ts)
├── <name>.store.ts       # Zustand store (if client state needed)
├── <name>.queries.ts     # React Query hooks
├── use<Name>.ts          # Composition hook used by components
└── <Component>.tsx       # UI components
```

### Backend

```
src/
├── controllers/      # Request handlers (thin — delegate to services)
├── routes/           # Express routers + route tests
├── services/         # Business logic (auth, orders, PayPal, customer)
├── middlewares/      # Auth guard (verifyToken), error handler
├── lib/              # Prisma client, env validation, JWT helpers
└── types/            # Shared TypeScript types
prisma/
├── schema.prisma     # Database models
└── seed.ts           # Sample data
```

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Log in (sets cookie) |
| POST | `/api/auth/logout` | — | Clear session cookie |
| GET | `/api/products` | — | List products (filters: `search`, `category`, `minPrice`, `maxPrice`) |
| GET | `/api/products/:slug` | — | Single product |
| GET | `/api/products/featured` | — | Featured products for homepage |
| GET | `/api/categories` | — | All categories |
| POST | `/api/orders` | optional | Create order + PayPal order |
| POST | `/api/orders/:id/capture` | optional | Capture PayPal payment |
| GET | `/api/orders` | required | User's order history |
| GET | `/api/orders/:id` | required | Order detail |
| GET | `/api/customer/profile` | required | Get profile |
| PUT | `/api/customer/profile` | required | Update profile |
| GET | `/api/customer/billing-address` | required | Get billing address |
| PUT | `/api/customer/billing-address` | required | Save billing address |

---

## Database Schema

```
User ──< Order ──< OrderItem >── Product >── Category
  │
  └── BillingAddress

Order ──── ShippingAddress
```

**Models:** `User`, `BillingAddress`, `Category`, `Product`, `Order`, `OrderItem`, `ShippingAddress`

**Order statuses:** `PENDING` → `PAID` → `SHIPPED` → `DELIVERED` (or `CANCELLED`)

---

## Deployment

GitHub Pages is **only suitable for the frontend** — it serves static files and cannot run a Node.js server. The backend requires a platform that supports persistent processes and a PostgreSQL database.

### Recommended setup

| Part | Platform | Free tier |
|------|----------|-----------|
| Frontend | **Vercel** or **Netlify** | Yes |
| Backend + DB | **Railway** | Yes (hobby plan) |

---

### Deploy frontend to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo.
3. Vercel auto-detects Vite — no build config needed.
4. Add environment variables:
   - `VITE_API_URL` → your backend URL (e.g. `https://your-api.railway.app/api`)
   - `VITE_PAYPAL_CLIENT_ID` → your PayPal sandbox client ID

> Vercel handles client-side routing automatically for SPAs.

---

### Deploy frontend to Netlify

1. Push to GitHub, connect repo in [app.netlify.com](https://app.netlify.com).
2. Build command: `npm run build` — publish directory: `dist`.
3. Add a `public/_redirects` file so client-side routing works:

```
/*  /index.html  200
```

4. Set the same env vars as above in **Site settings → Environment variables**.

---

### Deploy frontend to GitHub Pages

GitHub Pages works but requires two extra steps because this is a SPA:

1. Install the `gh-pages` package:

```bash
npm install -D gh-pages
```

2. Add a `base` to `vite.config.ts`:

```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

3. Add these scripts to `package.json`:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

4. Handle SPA routing — create `public/404.html` that redirects to `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
</html>
```

5. Add this script to the `<head>` of `index.html`:

```html
<script>
  (function(){
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

6. Deploy:

```bash
npm run deploy
```

> GitHub Pages is the most manual option. **Vercel or Netlify are strongly recommended** for a SPA.

---

### Deploy backend to Railway

1. Push the `ecomerce-backend` folder to its own GitHub repo.
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub.
3. Add a **PostgreSQL** plugin from the Railway dashboard (it injects `DATABASE_URL` automatically).
4. Set the remaining environment variables:

```
PORT=4000
JWT_SECRET=<a_long_random_string>
PAYPAL_CLIENT_ID=<your_paypal_sandbox_client_id>
PAYPAL_SECRET=<your_paypal_sandbox_secret>
FRONTEND_URL=<your_vercel_or_netlify_url>
```

5. Railway will detect the `npm run build` + `npm start` scripts and deploy automatically.
6. After the first deploy, run migrations via the Railway shell:

```bash
npx prisma migrate deploy
npm run seed
```

---

## PayPal Setup (for production)

1. Create a developer account at [developer.paypal.com](https://developer.paypal.com).
2. Create a sandbox application → copy **Client ID** and **Secret**.
3. Set `VITE_PAYPAL_CLIENT_ID` (frontend) and `PAYPAL_CLIENT_ID` + `PAYPAL_SECRET` (backend) to the sandbox values.
4. Test the full checkout flow in sandbox mode.
5. When ready for production, switch to live credentials.

---

## Contributing

1. Follow the domain-driven structure described above.
2. Every new feature must include tests (Vitest + Testing Library).
3. No hardcoded strings — all user-visible text goes through `t('key')`.
4. Component files must not exceed 60 lines; extract logic to custom hooks.
5. Run `npm test` and `npm run lint` before opening a pull request.
