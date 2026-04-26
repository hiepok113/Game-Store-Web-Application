# GameVault Game Store

GameVault is a full-stack digital game store built with a Next.js frontend and a NestJS API. Users can browse games, search by title, manage a cart, place orders, and complete checkout through VNPay.

## Tech Stack

Frontend:
- Next.js 16
- React 19
- TypeScript
- Axios
- Framer Motion
- Lucide React

Backend:
- NestJS 11
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- Swagger API docs
- VNPay payment return verification

## Features

- Register, login, logout
- JWT-protected cart and order APIs
- Admin-only management for games, categories, users, and all orders
- Game listing, detail pages, and title search
- Cart checkout with VNPay payment URL generation
- Server-side VNPay checksum verification and order status update
- SEO-friendly global metadata and semantic storefront markup

## Setup

Install client dependencies:

```bash
cd client
npm install
cp .env.example .env.local
```

Install backend dependencies:

```bash
cd sever
npm install
cp .env.example .env
```

Update `sever/.env` with your MongoDB and VNPay credentials.

## Run

Start the backend API:

```bash
cd sever
npm run start:dev
```

The API runs on `http://localhost:3001` by default and Swagger is available at `http://localhost:3001/api`.

Start the frontend:

```bash
cd client
npm run dev
```

The web app runs on `http://localhost:3000`.
