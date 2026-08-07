# FrameInGoa — Hacker House Goa 2026 Builder Identity

The official identity builder for Hacker House Goa 2026. Upload your photo, generate your profile picture frame and Builder ID card, then download them as high-quality PNGs or share directly to X.

## Features

- **Profile Frame** — a 1080×1080 branded frame with a glass caption bar, corner brackets, palm-leaf decorations, and a grain overlay.
- **Builder ID Card** — a "Builder #" badge with your custom title, drawn from the HH Goa builder title list.
- **Randomized builder numbers and titles** — regenerate until it feels right.
- **One-click export** — download your frame, ID card, or both as crisp 2× supersampled PNGs.
- **Share to X** — open a pre-filled tweet with a link back to the app (opt-in via `VITE_APP_URL`).
- **Local-first** — every image is processed in your browser. No uploads to any server, no login, no signup.
- **Accessible & polished** — toast notifications, error boundary, reduced-motion support, keyboard focus styles, and a responsive dark UI.

## Tech Stack

- [React 19](https://react.dev) + [Vite 8](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com) (Vite plugin)
- [react-router-dom 7](https://reactrouter.com)
- [framer-motion 13](https://motion.dev)
- [react-dropzone](https://react-dropzone.js.org)
- [html2canvas](https://html2canvas.hertzen.com) — lazy-loaded on export
- [lucide-react](https://lucide.dev/icons) icons

## Getting Started

### Prerequisites

- Node.js 20.19+ (or 22.12+)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

The production build is output to `dist/`.

### Environment variables

Optional — appends your live URL to shared tweets and encodes it into the Builder ID QR:

```bash
VITE_SITE_URL=https://your-domain.com   # canonical public URL (QR + share)
VITE_APP_URL=https://your-domain.com    # legacy alias for the share link
```

Create a `.env.local` file to keep it local to development (see `.env.example`).

> If `VITE_SITE_URL` is unset, the Builder ID QR falls back to the page's
> current origin. That is correct on the deployed site but wrong on localhost
> (a phone can't reach your dev machine). Set `VITE_SITE_URL` to your deployed
> URL so every QR points at the real public site.

## Deployment

The app is a static SPA and deploys cleanly on Vercel.

1. Push the repo to GitHub/GitLab/Bitbucket and import it into Vercel.
2. Vercel auto-detects Vite: build command `npm run build`, output directory `dist`.
3. `vercel.json` is already included — it rewrites all routes to `index.html` (so client-side routes like `/generator` work on refresh) and adds long-lived cache headers for hashed assets.
4. Once deployed, set the `VITE_APP_URL` environment variable to your production URL (Project → Settings → Environment Variables) and redeploy.
5. Update the `og:url` / `canonical` placeholders in `index.html` with your production domain, and (optionally) replace `og-image.svg` with a 1200×630 PNG for maximum social-sharing compatibility.

### Manual deploy

```bash
npm run build
vercel --prod
```

## Project Structure

```
src/
  components/
    builderCard/   # Builder ID card canvas + wrapper
    frame/         # Profile frame canvas, decorations, generator
    common/        # Buttons, fields, toasts, error boundary, icons
    layout/        # Sidebar, header, footer, app layout
    toast/         # Toast notification system
    upload/        # Photo dropzone + preview
  pages/           # Home, Generator, NotFound (lazy-loaded)
  hooks/           # useCanvasScale, useImageUpload
  utils/           # export, image, share helpers
  data/            # Builder title list
```

## License

For the Hacker House Goa 2026 event. Not for commercial redistribution.
