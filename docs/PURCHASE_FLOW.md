# Static Purchase Flow

## Direct bank transfer

The website does not create a remote order. It creates a browser-local reference so the buyer and seller can refer to the same purchase request.

```text
Buyer opens purchase.html
        ↓
Buyer enters purchase/contact details
        ↓
Browser generates NVY-WEB-... reference
        ↓
Published USD beneficiary / IBAN / SWIFT shown with copy controls
        ↓
Buyer sends USD 2,490 with the exact reference (OUR fees where available)
        ↓
Buyer clicks "I completed the transfer"
        ↓
Buyer's email application opens with prepared confirmation
        ↓
Buyer attaches transfer receipt and sends
        ↓
Seller manually verifies bank payment
        ↓
Seller performs licensed delivery + seller-signed .nvylic
```

The website never claims that generating a reference means payment succeeded.

## Email / procurement

The procurement form is also client-side only. It prepares a structured email containing buyer/company/contact information and a local reference.

This path can be used for:

- invoice details;
- purchase-order requirements;
- vendor onboarding;
- request for bank coordinates;
- organization-specific purchasing steps.

## Card marketplace

The card option is intentionally isolated from the site's direct purchase system.

```text
NAVRYNT purchase page
        ↓
Separate "External Marketplace" card
        ↓
Normal outbound link
        ↓
NAVRYNT Lemon Squeezy storefront
```

No Lemon Squeezy API, checkout embed, webhook, secret, or order synchronization is used by this repository.

## Published direct-transfer route

The production static site is configured for a verified Yapı Kredi USD account. International buyers can use the displayed IBAN and `YAPITRISXXX` SWIFT/BIC. The site does not ask for or contain online-banking credentials. If a sending bank requires additional beneficiary-address information, the buyer is instructed to contact the seller by email rather than exposing a private residential address in the public repository.
