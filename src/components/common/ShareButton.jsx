import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from './Button.jsx'
import XIcon from './XIcon.jsx'
import { useToast } from '../toast/ToastProvider.jsx'
import { buildTweetText, openXShare } from '../../utils/shareUtils.js'

/**
 * Opens X (Twitter) in a new tab with the prefilled Hacker House Goa tweet.
 * Shows a brief loading state while the share link is prepared and inherits the
 * Button hover/tap animations. No image is uploaded — text-only share flow.
 */
export default function ShareButton({ className = '', label = 'Share to X', delay = 500 }) {
  const [sharing, setSharing] = useState(false)
  const toast = useToast()

  async function handleShare() {
    if (sharing) return
    setSharing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, delay))
      openXShare({ text: buildTweetText() })
      toast.success('Share link opened in a new tab.')
    } finally {
      setSharing(false)
    }
  }

  return (
    <Button variant="ghost" className={className} disabled={sharing} onClick={handleShare}>
      {sharing ? <Loader2 size={18} className="animate-spin" /> : <XIcon size={18} />}
      {sharing ? 'Preparing…' : label}
    </Button>
  )
}
