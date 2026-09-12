<div align="center">

<img src="banner.png" alt="NAVRYNT engineering banner" width="100%" />

# NAVRYNT Official Website

**Official product and sales website for NAVRYNT Business Source.**

[**Live Website**](https://kaandevs-ops.github.io/navrynt-website/) ·
[**Public Demo**](https://kaandevs-ops.github.io/navrynt-demo/) ·
[**GitHub Demo**](https://github.com/kaandevs-ops/navrynt-demo) ·
[**Card Purchase**](https://navrynt.lemonsqueezy.com)

</div>

---

## About

This repository contains the public-facing website for **NAVRYNT Business Source** — a self-hosted intelligence, investigation, GEOINT, media-analysis, AI, biometric and model-development platform.

The website is intentionally designed as a **fully static GitHub Pages deployment**. It does not require a commerce backend, database, webhook service, embedded payment processor or server-side runtime.

> **Important:** This repository is the public website source only. It does **not** contain the NAVRYNT commercial source package, Seller Control Kit, private signing key, customer licenses, production secrets, or private customer data.

## Product overview

The website presents the commercial NAVRYNT Business Source edition, including:

- Full first-party source code
- Self-hosted deployment
- Investigation, evidence, graph, timeline and intelligence workflows
- GEOINT and media-forensics surfaces
- AI-assisted analysis
- Plugin and extensibility surfaces
- Six biometric suites: Face, Iris, Fingerprint, Voiceprint, Writer-ID and Gait
- Biometric Workbench
- Model Studio
- Native seller-signed `NVY1` / `.nvylic` product licensing
- Python backend and premium React/Vite frontend
- REST API, CLI, SDK/plugin surfaces and browser extension
- Docker / Docker Compose deployment assets

### Business Source terms shown on the website

- **USD $2,490 — one-time**
- Up to **25 internal authorized users**
- Up to **3 production deployments**
- Perpetual use of lawfully received NAVRYNT 1.x releases
- No resale, redistribution, SaaS resale or OEM redistribution rights

## Purchase options

The website keeps direct purchasing independent from any single marketplace.

### Direct bank transfer

The static purchase center can present intentionally public receiving coordinates for direct USD transfer. A browser-generated `NVY-WEB-...` reference is created locally and the buyer can send payment confirmation and proof of transfer by email.

The generated browser reference is **not** proof of payment, a server-side order, or a product license. Payment is verified manually before delivery and license issuance.

### Procurement / email

Organizations can use the purchase page to prepare a procurement or invoicing request and continue through email.

### Optional card marketplace

Lemon Squeezy appears only as an **external optional storefront link** for buyers who prefer card payment.

It is not required for:

- website availability
- direct bank transfers
- site APIs
- webhooks
- embedded checkout
- product runtime licensing
- order synchronization

## Repository layout

```text
.
├── .github/
│   └── workflows/
│       └── pages.yml
├── docs/
├── site/
│   ├── index.html
│   ├── platform.html
│   ├── biometrics.html
│   ├── architecture.html
│   ├── purchase.html
│   ├── legal/
│   ├── assets/
│   │   ├── brand/
│   │   ├── product/
│   │   └── video/
│   ├── config.js
│   ├── app.js
│   └── styles.css
├── banner.png
├── LICENSE
└── README.md
```

## GitHub Pages

The production site is deployed through GitHub Actions from the `site/` directory.

**Live:** https://kaandevs-ops.github.io/navrynt-website/

The workflow is located at:

```text
.github/workflows/pages.yml
```

A push to `main` triggers a Pages deployment.

## Local preview

```bash
cd site
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Public configuration

Public storefront values live in:

```text
site/config.js
```

This file may contain information intentionally shown to customers, such as the sales contact address, public demo URLs, external marketplace URL and public bank-transfer receiving coordinates.

It must **never** contain:

- online-banking passwords or login credentials
- card numbers or CVV data
- Seller Control Kit
- Ed25519 private signing key
- API or webhook secrets
- customer Business Source ZIPs
- real customer `.nvylic` files
- private customer records

## Security boundary

The commercial NAVRYNT delivery system remains outside this public repository.

After a verified purchase, the seller performs licensed delivery separately and issues the customer-specific seller-signed `.nvylic` using private seller tooling that is **not** stored here.

See [`docs/SECURITY.md`](docs/SECURITY.md) for the public-repository boundary.

## License

The **source code and content of this public website repository** are licensed under the [Apache License 2.0](LICENSE).

The Apache License applies **only to this public website repository**. It does **not** grant rights to the NAVRYNT Business Source commercial product, production backend, proprietary analysis engines, customer source package, Seller Control Kit, private signing infrastructure, model assets, commercial licenses, or other separately distributed NAVRYNT components.

Copyright © 2026 kaandevs-ops.

---

<div align="center">

**NAVRYNT — Self-Hosted Intelligence Infrastructure**

Public website · Full-product showcase · Direct purchase · GitHub Pages

</div>
