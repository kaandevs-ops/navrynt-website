# NAVRYNT Official Website — Security Boundary

## Public by design

The `site/` directory is a static GitHub Pages website. Everything committed under it must be safe to publish to the internet.

Allowed public material includes:

- official NAVRYNT full-product marketing screenshots;
- official product film;
- product descriptions and public documentation;
- public contact email;
- intentionally published beneficiary / bank / IBAN / SWIFT coordinates;
- public demo and external marketplace links.

## Never commit

- NAVRYNT seller Ed25519 private signing key
- Seller Control Kit
- customer Business Source ZIP
- customer `.nvylic` files
- bank login/password/2FA credentials
- payment API secrets
- marketplace API or webhook secrets
- private customer records
- internal seller-only documents

## No commerce backend

This repository contains no commerce server, API, database, webhook receiver, email API, admin endpoint, or customer-account backend.

Purchase-form values are processed only in the buyer's browser. The site may generate a local reference, prepare a `.txt` summary, open the browser print dialog, or build a `mailto:` message.

## Bank transfer

Beneficiary / bank / IBAN / SWIFT coordinates are payment destination identifiers, not online-banking credentials. Publish them only when the seller has intentionally verified and approved them for customer-facing use.

## Email

The website does not send email itself. It opens the buyer's own email client using a `mailto:` URL. The buyer chooses whether to send the message and whether to attach a transfer receipt.

## External marketplace

The optional external card marketplace is linked as a normal outbound URL only. There is no embed, API, webhook, secret, order sync, or runtime licensing coupling.
