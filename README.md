# NAVRYNT Official Website — Static Commerce Edition

This repository contains the official NAVRYNT Business Source product + sales website.

The entire public site is designed to run on **GitHub Pages only**. There is no commerce backend, database, webhook, admin API, email API, embedded card processor, or runtime dependency on Lemon Squeezy.

The website uses a **full Business Source media set rebuilt from the commercial NAVRYNT frontend source and design system**. It does not reuse the public-demo screenshots or the old Store Media preview video.

## Architecture

```text
GitHub Pages
└── site/
    ├── Full NAVRYNT product website
    ├── Full-product screenshots + 63-second full-product interface film
    ├── Direct bank-transfer purchase center
    ├── Browser-generated purchase reference
    ├── Email / procurement purchase flow
    ├── Downloadable + printable order summary
    └── Separate external Lemon Squeezy storefront link
```

There is intentionally **no backend** in this repository.

## Direct purchase flow

1. Buyer enters name/company/email/country in the static purchase page.
2. JavaScript generates a local reference such as `NVY-WEB-20260912-XXXXXXXX` using browser randomness.
3. If verified public bank coordinates are configured, the page displays beneficiary / bank / IBAN / SWIFT and copy controls.
4. Buyer uses the exact reference in the transfer description.
5. Buyer clicks **I completed the transfer**. The website opens the buyer's own email client with a prepared payment-confirmation message.
6. Buyer attaches the transfer receipt and sends the email.
7. Seller verifies the payment manually, then performs licensed delivery and issues the seller-signed `.nvylic` using the private Seller Control Kit kept outside this repository.

The browser-generated reference is **not** proof of payment, a server-side order, or a license activation.

## Optional card marketplace

Lemon Squeezy is used only as a separate external storefront link on `purchase.html` for buyers who prefer card payment.

It is **not** used for:

- site APIs;
- webhooks;
- order synchronization;
- embedded checkout;
- product runtime licensing;
- website availability;
- bank-transfer purchases.

If Lemon Squeezy is unavailable, the official NAVRYNT website and direct bank/email purchase path remain available.

## Product facts represented by the website

- NAVRYNT Business Source — USD $2,490 one-time
- one licensed legal entity
- up to 25 internal authorized users
- up to 3 production deployments
- full first-party source code
- Python backend + premium React/Vite frontend
- REST API, CLI, SDK/plugin surfaces, browser extension
- Docker / Docker Compose deployment assets
- six biometric suites: Face, Iris, Fingerprint, Voiceprint, Writer-ID, Gait
- Biometric Workbench + Model Studio
- perpetual use of lawfully received Navrynt 1.x releases
- seller-signed `NVY1` / `.nvylic` runtime product licensing

## Configure the public purchase page

Edit only the public values in `site/config.js`.

### Contact email

```js
contactEmail: "YOUR-SALES-EMAIL"
```

### Direct bank transfer

Only insert bank details that are intentionally safe to publish to customers:

```js
bankTransfer: {
  enabled: true,
  beneficiary: "VERIFIED BENEFICIARY",
  bankName: "VERIFIED BANK NAME",
  iban: "VERIFIED IBAN",
  swift: "VERIFIED SWIFT/BIC",
  currency: "USD"
}
```

Never place online-banking passwords, login credentials, payment API secrets, seller private signing keys, customer licenses, or customer source packages in `config.js`.

The published static build is now configured with the verified NAVRYNT direct-purchase USD receiving account. Because GitHub Pages is public, these receiving coordinates are intentionally public storefront information. No online-banking credentials or private seller material are present.

For international transfers, the purchase page asks buyers to send **USD** and choose **OUR** fees where their bank supports that option, so intermediary/correspondent charges are paid by the sender rather than deducted from the USD 2,490 purchase amount.

## Local preview

```bash
cd site
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## GitHub Pages

A GitHub Actions Pages workflow is already included at:

```text
.github/workflows/pages.yml
```

It publishes the `site/` directory on pushes to `main`.

See `docs/GITHUB_PAGES.md` for the exact repository setup we can follow when the repo is created.

## Security boundary

The public repository must never contain:

- NAVRYNT Seller Control Kit;
- seller Ed25519 private signing key;
- customer Business Source ZIP;
- real customer `.nvylic` files;
- bank login/password/2FA data;
- payment/API/webhook secrets;
- private customer records.

See `docs/SECURITY.md`.
