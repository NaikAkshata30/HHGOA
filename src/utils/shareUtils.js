// shareUtils.js — helpers for sharing generated frames on X (Twitter).
// Sharing uses a prefilled tweet only — no images are uploaded to X.

// Hosted URL of the app, appended to the tweet automatically when present.
// Set VITE_APP_URL (e.g. in a .env file) once a deployment URL exists; until
// then the URL parameter is omitted entirely.
export const HOSTED_URL = import.meta.env.VITE_APP_URL || ''

export function buildTweetText() {
  return [
    '🚀 I just created my Hacker House Goa 2026 Builder Identity!',
    '',
    'Build. Ship. Belong.',
    '',
    '#FrameInGoa',
    '#HHGoa2026',
  ].join('\n')
}

export function buildShareUrl({ text = buildTweetText(), url = HOSTED_URL } = {}) {
  const params = new URLSearchParams({ text })
  if (url) params.set('url', url)
  return `https://twitter.com/intent/tweet?${params.toString()}`
}

export function openXShare({ text = buildTweetText(), url = HOSTED_URL } = {}) {
  window.open(buildShareUrl({ text, url }), '_blank', 'noopener,noreferrer')
}
