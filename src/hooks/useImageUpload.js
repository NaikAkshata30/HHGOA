import { useCallback, useEffect, useRef, useState } from 'react'
import { validateImageFile, getRejectionMessage } from '../utils/imageUtils.js'

/**
 * Manages the lifecycle of a single uploaded image file.
 *
 * Returns:
 *  - file:       the currently selected File object (or null)
 *  - previewUrl: a local object URL for the image ("" when no file)
 *  - error:      a friendly error message (or null)
 *  - handleDrop: dropzone-compatible handler (acceptedFiles, fileRejections)
 *  - removeImage: clears the current file and releases its object URL
 */
export default function useImageUpload() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState(null)

  // Tracks the live object URL so it can be revoked safely (StrictMode-safe).
  const urlRef = useRef('')

  const releaseUrl = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current)
      urlRef.current = ''
    }
  }, [])

  // Revoke any lingering object URL on unmount.
  useEffect(() => releaseUrl, [releaseUrl])

  const setImageFile = useCallback(
    (nextFile) => {
      setError(null)

      if (!nextFile) {
        setFile(null)
        setPreviewUrl('')
        releaseUrl()
        return
      }

      const { valid, error: validationError } = validateImageFile(nextFile)
      if (!valid) {
        setError(validationError)
        return
      }

      releaseUrl()
      const nextUrl = URL.createObjectURL(nextFile)
      urlRef.current = nextUrl

      setFile(nextFile)
      setPreviewUrl(nextUrl)
    },
    [releaseUrl],
  )

  // Signature matches react-dropzone's onDrop.
  const handleDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      const rejectionMessage = getRejectionMessage(fileRejections)
      if (rejectionMessage) {
        setError(rejectionMessage)
        return
      }

      const nextFile = acceptedFiles?.[0]
      if (nextFile) {
        setImageFile(nextFile)
      }
    },
    [setImageFile],
  )

  const removeImage = useCallback(() => setImageFile(null), [setImageFile])

  return { file, previewUrl, error, handleDrop, removeImage }
}
