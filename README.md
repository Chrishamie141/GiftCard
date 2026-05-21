# Prestine Pros Cleaning Gift Certificates

Production-oriented Next.js App Router app for selling cleaning service gift certificates.

## Features
- Mobile-first gift certificate landing page at `/gift-card`
- Dedicated QR helper/admin page at `/qr` with downloadable PNG QR and copy-URL action
- Gift certificate tiers: $100 / $200 / $300
- Stripe Checkout for payment
- Stripe webhook to finalize order
- Prisma + SQLite order persistence
- PDF gift certificate generation
- Resend email delivery for receipt + certificate PDF
- Apple Wallet placeholder route for `.pkpass`

## QR Flow
- Generate/manage QR at `/qr`
- QR encodes your public landing page URL (`https://yourdomain.com/gift-card`)
- Customer scan flow: **Scan QR → opens `/gift-card`**

## Apple Wallet Important Note
Apple Wallet support will **NOT work** until you provision real Apple Developer PassKit certificates and IDs. This repository includes placeholders/instructions only.

## Setup
1. Install deps:
   ```bash
   npm install
   ```
2. Configure env:
   ```bash
   cp .env.example .env
   ```
3. Set your Stripe, Resend, and Apple Wallet env vars.
4. Run database setup:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start app:
   ```bash
   npm run dev
   ```

## Stripe
- Create 3 Stripe Prices and map them to:
  - `STRIPE_PRICE_100`
  - `STRIPE_PRICE_200`
  - `STRIPE_PRICE_300`
- Configure webhook endpoint: `/api/webhooks/stripe`
- Subscribe to `checkout.session.completed`

## PassKit setup placeholders
Add cert files before implementing real pass generation:
- `certs/AppleWWDRCA.pem`
- `certs/signerCert.pem`
- `certs/signerKey.pem`

Then configure:
- `APPLE_TEAM_IDENTIFIER`
- `APPLE_PASS_TYPE_IDENTIFIER`
- `APPLE_SIGNER_KEY_PASSPHRASE`

## Build
```bash
npm run build
```
