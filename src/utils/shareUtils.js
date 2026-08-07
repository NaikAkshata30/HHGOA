// shareUtils.js — Twitter/X sharing flow.
//
// Browsers cannot reliably attach images to a Twitter post programmatically, so
// the flow separates the two concerns:
//   1. OPEN X IMMEDIATELY — the compose window is opened synchronously from the
//      user's click event (a genuine user gesture) using the intent URL with
//      the EXACT existing share text, properly URL-encoded. Nothing async —
//      fonts, html2canvas, QR, PNG conversion — is waited on first.
//   2. THEN generate + download the Profile Frame and Builder ID PNGs.
//   3. Show the attach-images instruction toast.
//
// Downloading the images + opening compose counts as success; a real error is
// only raised if image generation/download fails.

import { EXPORT_SPECS, downloadBlob, elementToFile } from './exportImage.js'

// Hosted URL of the app, appended to the tweet automatically when present.
// Set VITE_APP_URL (e.g. in a .env file) once a deployment URL exists; until
// then the URL parameter is omitted entirely.
export const HOSTED_URL = import.meta.env.VITE_APP_URL || ''

// The exact existing pre-filled share text. Do not modify.
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

// X (Twitter) intent URL using the EXACT existing share text, URL-encoded with
// encodeURIComponent:
//   https://twitter.com/intent/tweet?text=<encoded>
export function buildShareUrl({ text = buildTweetText(), url = HOSTED_URL } = {}) {
  let intro = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  if (url) intro += `&url=${encodeURIComponent(url)}`
  return intro
}

/**
 * Opens the X compose page NOW, synchronously, from the user's click gesture.
 * This is the only place `window.open` is used — we never open a blank tab and
 * redirect later (that caused the blank-screen behaviour).
 *
 * @returns {{ tweetUrl: string, opened: boolean }}
 */
export function openXCompose({ text = buildTweetText(), url = HOSTED_URL } = {}) {
  const tweetUrl = buildShareUrl({ text, url })
  // Debug/verify the generated URL before opening (STEP 2).
  // eslint-disable-next-line no-console
  console.debug('[Share] Opening X compose with URL:', tweetUrl)
  let opened = false
  try {
    opened = !!window.open(tweetUrl, '_blank', 'noopener,noreferrer')
  } catch (error) {
    console.error('[Share] window.open failed:', error)
    opened = false
  }
  return { url: tweetUrl, opened }
}

/**
 * Renders the generated assets into ready-to-download PNG Files.
 * Only nodes that are present/ready are included (falls back gracefully).
 */
export async function generateShareFiles({ frameNode, builderNode }) {
  const files = []
  if (frameNode) files.push(await elementToFile(frameNode, EXPORT_SPECS.frame))
  if (builderNode) files.push(await elementToFile(builderNode, EXPORT_SPECS.builder))
  return files
}

/**
 * Triggers the browser download for each PNG File.
 */
export function downloadShareFiles(files) {
  for (const file of files) downloadBlob(file, file.name)
}

/**
 * Generates and downloads the Profile Frame + Builder ID PNGs. This runs AFTER
 * X has already been opened (see ShareButton), so slow image work never delays
 * the compose window.
 *
 * @param {{ frameNode, builderNode }} nodes
 * @returns {Promise<{ ok: true, files: File[] }>}
 * @throws only if image generation or download actually fails
 */
export async function generateAndDownloadAssets({ frameNode, builderNode }) {
  const files = await generateShareFiles({ frameNode, builderNode })
  downloadShareFiles(files)
  return { ok: true, files }
}