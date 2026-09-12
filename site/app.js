(() => {
  'use strict';

  const cfg = window.NAVRYNT_CONFIG || {};
  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => [...root.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  qsa('[data-demo-link]').forEach(a => { if (cfg.publicDemoUrl) a.href = cfg.publicDemoUrl; });
  qsa('[data-github-link]').forEach(a => { if (cfg.githubDemoUrl) a.href = cfg.githubDemoUrl; });
  qsa('[data-lemon-store-link]').forEach(a => { if (cfg.lemonSqueezyStoreUrl) a.href = cfg.lemonSqueezyStoreUrl; });
  qsa('[data-contact-link]').forEach(a => { if (cfg.contactEmail) a.href = `mailto:${cfg.contactEmail}`; });

  const header = qs('.site-header');
  const progress = qs('#page-progress-bar');
  const updateScroll = () => {
    const y = scrollY;
    header?.classList.toggle('scrolled', y > 18);
    if (progress) {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      progress.style.width = `${Math.min(100, y / max * 100)}%`;
    }
  };
  addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  const menu = qs('.menu-button');
  const nav = qs('#primary-nav');
  menu?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(Boolean(open)));
  });
  qsa('#primary-nav a').forEach(a => a.addEventListener('click', () => {
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  }));

  const revealEls = qsa('.reveal, .stagger-group');
  if ('IntersectionObserver' in window && !reduced) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .08, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  qsa('[data-tilt]').forEach(wrapper => {
    const frame = qs('.visual-frame', wrapper);
    if (!frame || reduced) return;
    wrapper.addEventListener('pointermove', e => {
      if (matchMedia('(pointer: coarse)').matches) return;
      const r = wrapper.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - .5) * -2.4;
      const ry = ((e.clientX - r.left) / r.width - .5) * 3.2;
      frame.style.transform = `rotateX(${1 + rx}deg) rotateY(${-2 + ry}deg) translateY(-2px)`;
    });
    wrapper.addEventListener('pointerleave', () => {
      frame.style.transform = 'rotateY(-2deg) rotateX(1deg)';
    });
  });

  const storySteps = qsa('.story-step');
  const storyStage = qs('#story-stage');
  const storyImage = qs('#story-image');
  const storyTitle = qs('#story-title');
  const activateStory = step => {
    if (!step) return;
    storySteps.forEach(s => {
      const on = s === step;
      s.classList.toggle('active', on);
      s.setAttribute('aria-selected', String(on));
    });
    const src = step.dataset.image;
    if (!src || !storyImage) return;
    storyStage?.classList.add('switching');
    const preload = new Image();
    preload.onload = () => {
      storyImage.src = src;
      storyImage.alt = `NAVRYNT ${step.dataset.title || 'product'} full product screen`;
      if (storyTitle) storyTitle.textContent = step.dataset.title || 'NAVRYNT';
      requestAnimationFrame(() => setTimeout(() => storyStage?.classList.remove('switching'), 60));
    };
    preload.src = src;
  };
  storySteps.forEach(step => step.addEventListener('click', () => activateStory(step)));
  if ('IntersectionObserver' in window && storySteps.length && innerWidth > 860) {
    const storyObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top - innerHeight * .42) - Math.abs(b.boundingClientRect.top - innerHeight * .42));
      if (visible[0]) activateStory(visible[0].target);
    }, { rootMargin: '-25% 0px -52% 0px', threshold: [0, .2, .55] });
    storySteps.forEach(s => storyObserver.observe(s));
  }

  const rail = qs('#gallery-rail');
  qs('[data-gallery-prev]')?.addEventListener('click', () => rail?.scrollBy({
    left: -Math.min(560, innerWidth * .78),
    behavior: reduced ? 'auto' : 'smooth'
  }));
  qs('[data-gallery-next]')?.addEventListener('click', () => rail?.scrollBy({
    left: Math.min(560, innerWidth * .78),
    behavior: reduced ? 'auto' : 'smooth'
  }));

  const dialog = qs('#image-dialog');
  if (dialog) {
    const img = qs('img', dialog);
    qsa('.gallery-card').forEach(card => card.addEventListener('click', () => {
      if (img) {
        img.src = card.dataset.full || '';
        img.alt = `${qs('span', card)?.textContent || 'NAVRYNT'} full product screenshot`;
      }
      dialog.showModal();
    }));
    qs('.dialog-close', dialog)?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  }

  let toastTimer;
  const toast = message => {
    const el = qs('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
  };

  // ---- Static GitHub Pages purchase center ----
  // Static purchase center: no server calls or hidden commerce integration.
  const bank = cfg.bankTransfer || {};
  const bankReady = Boolean(bank.enabled && bank.beneficiary && bank.bankName && bank.iban && bank.swift);
  const currency = cfg.currency || bank.currency || 'USD';
  const price = Number(cfg.priceUsd || 2490);
  let currentOrder = null;

  const makeReference = () => {
    const bytes = new Uint8Array(4);
    if (crypto?.getRandomValues) crypto.getRandomValues(bytes);
    else for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
    const code = [...bytes].map(v => v.toString(16).padStart(2, '0')).join('').slice(0, 8).toUpperCase();
    const day = new Date().toISOString().slice(0, 10).replaceAll('-', '');
    return `NVY-WEB-${day}-${code}`;
  };

  const collectForm = form => {
    const fd = new FormData(form);
    return {
      name: String(fd.get('name') || '').trim(),
      company: String(fd.get('company') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      country: String(fd.get('country') || '').trim(),
      vatId: String(fd.get('vat_id') || '').trim(),
      notes: String(fd.get('notes') || '').trim()
    };
  };

  const validPurchaseContact = data => data.name && data.email && data.country;

  const orderLines = order => [
    'NAVRYNT BUSINESS SOURCE — PURCHASE SUMMARY',
    '==========================================',
    `Reference: ${order.reference}`,
    `Created: ${order.createdAt}`,
    `Product: ${cfg.productName || 'Navrynt Business Source'}`,
    `Version: ${cfg.productVersion || '1.0'}`,
    `Amount: ${currency} ${price.toLocaleString('en-US')}`,
    `Purchase path: ${order.method}`,
    '',
    `Name: ${order.name}`,
    `Company: ${order.company || '—'}`,
    `Email: ${order.email}`,
    `Country: ${order.country}`,
    `VAT / Tax ID: ${order.vatId || '—'}`,
    `Notes: ${order.notes || '—'}`,
    '',
    'License scope:',
    '- one licensed legal entity',
    '- up to 25 internal authorized users',
    '- up to 3 production deployments',
    '- perpetual use of lawfully received Navrynt 1.x releases',
    '- full first-party source code',
    '',
    'Important: this browser-generated reference is a purchase reference only.',
    'It is not proof of payment and does not activate a license.',
    'A seller-signed .nvylic is issued only after payment is verified.'
  ];

  const openMail = (subject, lines) => {
    const address = String(cfg.contactEmail || '').trim();
    if (!address) {
      toast('Contact email is not configured');
      return;
    }
    location.href = `mailto:${encodeURIComponent(address)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const setText = (id, value) => {
    const el = qs(`#${id}`);
    if (el) el.textContent = value || '—';
  };

  const renderOrder = order => {
    currentOrder = order;
    setText('order-reference', order.reference);
    setText('order-created', order.createdAt);
    setText('order-customer', order.name);
    setText('order-company', order.company || '—');
    setText('order-email', order.email);
    setText('order-country', order.country);
    setText('order-amount', `${currency} ${price.toLocaleString('en-US')}`);
    setText('order-method', order.method);
    setText('bank-beneficiary', bankReady ? bank.beneficiary : 'Sent by email after request');
    setText('bank-name', bankReady ? bank.bankName : 'Not published yet');
    setText('bank-iban', bankReady ? bank.iban : 'Not published yet');
    setText('bank-swift', bankReady ? bank.swift : 'Not published yet');
    setText('bank-country', bankReady ? (bank.country || 'Türkiye') : 'Not published yet');
    setText('bank-currency', bankReady ? (bank.currency || currency) : currency);
    setText('bank-amount', `${currency} ${price.toLocaleString('en-US')}`);
    setText('bank-reference', order.reference);
    const result = qs('#direct-order-result');
    if (result) result.hidden = false;
    result?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const directForm = qs('#direct-purchase-form');
  directForm?.addEventListener('submit', e => {
    e.preventDefault();
    const data = collectForm(directForm);
    const status = qs('.form-status', directForm);
    if (!validPurchaseContact(data)) {
      if (status) status.textContent = 'Name, email and country are required.';
      return;
    }
    const order = {
      ...data,
      method: bankReady ? 'Direct bank transfer' : 'Bank transfer request by email',
      reference: makeReference(),
      createdAt: new Date().toISOString()
    };
    renderOrder(order);
    if (status) {
      status.textContent = bankReady
        ? `Reference ${order.reference} generated locally in your browser.`
        : `Reference ${order.reference} generated. Bank details will be requested by email.`;
    }
    toast('Purchase reference created');
  });

  qs('#email-bank-request')?.addEventListener('click', () => {
    if (!currentOrder) return toast('Generate a purchase reference first');
    const tail = bankReady
      ? [
          '',
          'I have a question about the direct USD bank-transfer instructions for this purchase reference.',
          `Published beneficiary: ${bank.beneficiary}`,
          `Published bank: ${bank.bankName}`,
          `Published IBAN: ${bank.iban}`,
          `Published SWIFT/BIC: ${bank.swift}`
        ]
      : [
          '',
          'Please reply with the verified beneficiary / IBAN / SWIFT details for this purchase reference.'
        ];
    openMail(`NAVRYNT bank transfer question — ${currentOrder.reference}`, [
      ...orderLines(currentOrder),
      ...tail
    ]);
  });

  qs('#email-payment-confirmation')?.addEventListener('click', () => {
    if (!currentOrder) return toast('Generate a purchase reference first');
    openMail(`NAVRYNT payment confirmation — ${currentOrder.reference}`, [
      ...orderLines(currentOrder),
      '',
      'I have completed the bank transfer for the reference above.',
      bankReady ? `Transfer destination: ${bank.bankName} / ${bank.iban} / ${bank.swift}` : 'Transfer destination: bank details supplied by seller.',
      'I will attach the transfer receipt to this email before sending.',
      '',
      'Please verify the payment and send the licensed delivery instructions.'
    ]);
  });

  const procurementForm = qs('#procurement-form');
  procurementForm?.addEventListener('submit', e => {
    e.preventDefault();
    const data = collectForm(procurementForm);
    const status = qs('.form-status', procurementForm);
    if (!validPurchaseContact(data)) {
      if (status) status.textContent = 'Name, email and country are required.';
      return;
    }
    const order = {
      ...data,
      method: 'Email / procurement inquiry',
      reference: makeReference(),
      createdAt: new Date().toISOString()
    };
    if (status) status.textContent = `Opening your email app with reference ${order.reference}.`;
    openMail(`NAVRYNT procurement request — ${order.reference}`, [
      ...orderLines(order),
      '',
      'Please reply with the next procurement, invoice, vendor-onboarding or purchase steps.'
    ]);
  });

  qsa('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const target = qs(btn.dataset.copy);
    const value = target?.textContent?.trim();
    if (!value || value === '—' || value === 'Not published yet') return toast('Value is not configured yet');
    try {
      await navigator.clipboard.writeText(value);
      toast('Copied');
    } catch {
      toast('Select and copy the value manually');
    }
  }));

  qs('#download-order-summary')?.addEventListener('click', () => {
    if (!currentOrder) return toast('Generate a purchase reference first');
    const blob = new Blob([`${orderLines(currentOrder).join('\n')}\n`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentOrder.reference}-NAVRYNT-purchase-summary.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  });

  qs('#print-order-summary')?.addEventListener('click', () => {
    if (!currentOrder) return toast('Generate a purchase reference first');
    document.body.classList.add('print-order');
    window.print();
    setTimeout(() => document.body.classList.remove('print-order'), 250);
  });

  const bankState = qs('#bank-public-state');
  if (bankState) {
    bankState.dataset.ready = String(bankReady);
    const title = qs('strong', bankState);
    const text = qs('p', bankState);
    if (bankReady) {
      if (title) title.textContent = 'Direct USD bank transfer is ready';
      if (text) text.textContent = 'Generate a purchase reference below, then send USD 2,490 to the published Yapı Kredi USD account and use the exact reference in your transfer description.';
    } else {
      if (title) title.textContent = 'Direct bank transfer is available by email request';
      if (text) text.textContent = 'Verified public IBAN / SWIFT values have not been inserted into this repository yet. Generate a reference and request the bank details by email.';
    }
  }
})();
