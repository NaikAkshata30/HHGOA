import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from './Button.jsx'
import XIcon from './XIcon.jsx'
import { useToast } from '../toast/ToastProvider.jsx'
import {
  buildTweetText,
  generateAndDownloadAssets,
  openXCompose,
} from '../../utils/shareUtils.js'

const SUCCESS_MESSAGE =
  'Your card has been downloaded. Attach the PNG to your X post before sharing.'

const POPUP_BLOCKED_MESSAGE =
  "X couldn't be opened automatically. Your card will still download so you can attach it manually."

/**
 * "Share to X" opens the X compose page immediately from the
 * click gesture) with the existing pre-filled share text, then generates and
 * downloads the Profile Frame + Builder ID PNGs and shows an instruction toast.
 *
 * Opening X is never gated on fonts / html2canvas / QR generation / PNG
 * conversion — those run afterwards so the compose window feels instant.
 *
 * Props:
 *  - frameRef:    ref to the Profile Frame canvas element (may be null)
 *  - builderRef:  ref to the Builder ID card element (may be null)
 *  - disabled:    disable until assets are ready
 */
export default function ShareButton({
  className = '',
  label = 'Share to X',
  delay = 400,
  frameRef = null,
  builderRef = null,
  disabled = false,
}) {
  const [sharing, setSharing] = useState(false)
  const toast = useToast()

  async function handleShare() {
    if (sharing) return
    setSharing(true)

    try {
      // Open X immediately, synchronously, while this is still a user
      // gesture. Nothing async is waited on here.
      const compose = openXCompose({ text: buildTweetText() })

      if (!compose.opened) {
        toast.info(POPUP_BLOCKED_MESSAGE)
      }

      // Small delay keeps the UI from feeling jumpy while assets render. This
      // only affects image generation (X is already open).
      if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay))

      // Generate and download the selected image after X has opened.
      await generateAndDownloadAssets({
        frameNode: frameRef?.current ?? null,
        builderNode: builderRef?.current ?? null,
      })

      // Download triggered; X stays open.
      if (compose.opened) {
        toast.success(SUCCESS_MESSAGE)
      }
    } catch (error) {
      // Only a genuine image generation/download failure reaches here. X must
      // stay open; we log the actual error and tell the user.
      console.error('[Share] Could not generate or download assets:', error)
      toast.error('Could not generate the downloads. Please try again.')
    } finally {
      setSharing(false)
    }
  }

  return (
    <Button
      variant="ghost"
      className={className}
      disabled={sharing || disabled}
      onClick={handleShare}
    >
      {sharing ? <Loader2 size={18} className="animate-spin" /> : <XIcon size={18} />}
      {sharing ? 'Preparing…' : label}
    </Button>
  )
}
