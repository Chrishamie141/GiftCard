# Prestine Pros Cleaning Gift Certificates

Production-ready Next.js App Router app for selling cleaning service gift certificates with Stripe Checkout, PDF generation, and email fulfillment.

## Features
- Mobile-first gift certificate purchase page at `/gift-card`
- Gift certificate options: $100 / $200 / $300
- Purchaser and recipient information capture with validation
- Stripe Checkout redirect flow
- Stripe webhook order finalization
- Prisma + SQLite order persistence
- Polished PDF gift certificate generation
- Purchaser email with attached PDF certificate and receipt details
- Owner notification email for every successful purchase

## Environment Variables
Create `.env.local` and configure:
- `RESEND_API_KEY`
- `OWNER_EMAIL`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_100`
- `STRIPE_PRICE_200`
- `STRIPE_PRICE_300`
- `RESEND_FROM_EMAIL`
- `DATABASE_URL`

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run database setup:
   ```bash
   npx prisma migrate dev --name init
   ```
3. Start local development:
   ```bash
   npm run dev
   ```

## Stripe
- Configure product prices and map them to `STRIPE_PRICE_100`, `STRIPE_PRICE_200`, `STRIPE_PRICE_300`.
- Configure webhook endpoint: `/api/webhooks/stripe`
- Subscribe to event: `checkout.session.completed`

## Build
```bash
npm run build
```
