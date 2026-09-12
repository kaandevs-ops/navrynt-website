window.NAVRYNT_CONFIG = Object.freeze({
  productName: "Navrynt Business Source",
  productVersion: "1.0",
  priceUsd: 2490,
  currency: "USD",
  contactEmail: "kaantekin06@icloud.com",
  publicDemoUrl: "https://kaandevs-ops.github.io/navrynt-demo/",
  githubDemoUrl: "https://github.com/kaandevs-ops/navrynt-demo",

  // Lemon Squeezy is intentionally NOT integrated into the site.
  // This URL is used only by the separate optional marketplace card on purchase.html.
  lemonSqueezyStoreUrl: "https://navrynt.lemonsqueezy.com",

  // Public payment coordinates only. These values are intentionally visible to
  // customers because this is a static GitHub Pages storefront. Never place
  // online-banking passwords, login credentials, seller private keys, API
  // secrets, card data, or private customer data here.
  bankTransfer: Object.freeze({
    enabled: true,
    beneficiary: "Nihat Kaan Tekin",
    bankName: "Yapı ve Kredi Bankası A.Ş.",
    iban: "TR440006701000000318959168",
    swift: "YAPITRISXXX",
    country: "Türkiye",
    currency: "USD",
    paymentNote: "Use the generated NAVRYNT purchase reference in the transfer description. For international SWIFT transfers, select OUR fees where available so the full USD 2,490 reaches the beneficiary."
  })
});
