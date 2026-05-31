# Contributing to react-premium-gate

PRs welcome. Here's how to get started.

## Setup

```bash
git clone https://github.com/iamadhitya1/react-premium-gate
cd react-premium-gate
```

No build step — the library is plain React source files in `src/`. Import directly.

## Project structure

```
src/
  index.js          # exports
  PremiumGate.jsx   # paywall blocker component
  PricingModal.jsx  # bottom-sheet pricing UI
  usePro.js         # localStorage + server verification hook
templates/
  api/
    create-subscription.js   # Vercel serverless — Razorpay subscription
    verify-payment.js        # Vercel serverless — HMAC signature check
    verify-subscription.js   # Vercel serverless — active subscription check
```

## What's in scope

- Bug fixes
- New props for customization
- Support for other payment providers (Stripe, PayU, etc.)
- Accessibility improvements
- Documentation fixes
- Improvements to the Vercel API templates

## Guidelines

- **Zero runtime dependencies** in `src/` — keep it that way
- Match existing code style: plain JS, inline styles, no CSS files
- The `templates/` folder is intentionally minimal — keep serverless functions simple
- Test your change in a real Vite/React app with Razorpay test mode before submitting
- One feature or fix per PR

## Submitting a PR

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature-name`
3. Make your change
4. Open a PR against `main` with a clear title and description of what changed and why

---

MIT © 2025 M Adhitya · [Rewrite Labs](https://rewritelabs.vercel.app)
