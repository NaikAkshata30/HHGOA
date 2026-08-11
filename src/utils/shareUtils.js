import { EXPORT_SPECS, downloadBlob, elementToFile } from './exportImage.js'

export const HOSTED_URL = import.meta.env.VITE_APP_URL || import.meta.env.VITE_SITE_URL || ''

export function buildTweetText() {
  return ['Just framed my HH Goa 2026 builder identity \uD83C\uDF34', '', 'Build. Ship. Belong.', '', '#FrameInGoa'].join('\n')
}

export function buildShareUrl({ text = buildTweetText(), url = HOSTED_URL } = {}) {
  let intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  if (url) intent += `&url=${encodeURIComponent(url)}`
  return intent
}

export function openXCompose({ text = buildTweetText(), url = HOSTED_URL } = {}) {
  const tweetUrl = buildShareUrl({ text, url })
  try { return { url: tweetUrl, opened: Boolean(window.open(tweetUrl, '_blank', 'noopener,noreferrer')) } }
  catch { return { url: tweetUrl, opened: false } }
}

export async function generateShareFiles({ frameNode, builderNode }) {
  const files = []
  if (frameNode) files.push(await elementToFile(frameNode, EXPORT_SPECS.frame))
  if (builderNode) files.push(await elementToFile(builderNode, EXPORT_SPECS.builder))
  return files
}

export function downloadShareFiles(files) { files.forEach((file) => downloadBlob(file, file.name)) }

export async function generateAndDownloadAssets(nodes) {
  const files = await generateShareFiles(nodes)
  if (!files.length) throw new Error('Generated image is not ready.')
  downloadShareFiles(files)
  return { ok: true, files }
}
