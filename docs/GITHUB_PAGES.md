# GitHub Pages Deployment

The website is fully static and needs no server deployment.

## Repository setup

When the repository is created:

1. Push this project to the repository's `main` branch.
2. Open **GitHub → repository → Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. The included `.github/workflows/pages.yml` workflow publishes the `site/` directory.
5. After the workflow finishes, GitHub displays the Pages URL.

The project includes `site/.nojekyll` so GitHub Pages serves the static files directly.

## Before public launch

Review `site/config.js` and set only verified public values:

- contact email;
- public demo URL;
- GitHub demo URL;
- optional Lemon Squeezy store URL;
- verified bank beneficiary / bank / IBAN / SWIFT if direct public bank transfer is enabled.

Do not commit any seller private key, Seller Control Kit, customer ZIP, customer license, online-banking credential, or private customer data.

## Local preview

```bash
cd site
python3 -m http.server 4173
```

Open `http://localhost:4173`.
