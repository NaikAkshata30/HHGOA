// imageUtils.js — validation and normalization helpers for uploaded images.

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024
export const MAX_FILE_SIZE_LABEL = '10 MB'

export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']

// Object used by react-dropzone's `accept` prop (mime type -> extensions).
export const DROPZONE_ACCEPT = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/heic': ['.heic'],
  'image/heif': ['.heif'],
}

export function isSupportedImage(file) {
  return file && ACCEPTED_TYPES.includes(file.type)
}

export function isWithinSizeLimit(file) {
  return file && file.size <= MAX_FILE_SIZE_BYTES
}

// Returns { valid, error } for a single file.
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'Please choose a photo to continue.' }
  }
  if (!isSupportedImage(file)) {
    return {
      valid: false,
      error: 'Unsupported file type. Upload a JPG, PNG, WEBP or HEIC photo.',
    }
  }
  if (!isWithinSizeLimit(file)) {
    return {
      valid: false,
      error: `File is too large. Maximum size is ${MAX_FILE_SIZE_LABEL}.`,
    }
  }
  return { valid: true, error: null }
}

// Maps react-dropzone rejection codes to friendly, human-readable messages.
export function getRejectionMessage(fileRejections) {
  const rejection = fileRejections?.[0]
  const firstError = rejection?.errors?.[0]

  if (!firstError) return null

  switch (firstError.code) {
    case 'file-too-large':
      return `File is too large. Maximum size is ${MAX_FILE_SIZE_LABEL}.`
    case 'file-invalid-type':
      return 'Unsupported file type. Upload a JPG, PNG, WEBP or HEIC photo.'
    case 'too-many-files':
      return 'Only one photo at a time, please.'
    default:
      return 'That file could not be accepted. Please try another photo.'
  }
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Calculate the source rectangle for an aspect-ratio-preserving cover crop. */
export function calculateCoverCrop(sourceWidth, sourceHeight, targetWidth, targetHeight, positionX = 50, positionY = 50) {
  if (![sourceWidth, sourceHeight, targetWidth, targetHeight].every((value) => Number.isFinite(value) && value > 0)) {
    throw new Error('Invalid image dimensions.')
  }

  const targetRatio = targetWidth / targetHeight
  const sourceRatio = sourceWidth / sourceHeight
  let cropWidth = sourceWidth
  let cropHeight = sourceHeight

  if (sourceRatio > targetRatio) cropWidth = sourceHeight * targetRatio
  else cropHeight = sourceWidth / targetRatio

  const x = Math.max(0, Math.min(100, Number(positionX) || 50)) / 100
  const y = Math.max(0, Math.min(100, Number(positionY) || 50)) / 100

  return {
    sourceX: (sourceWidth - cropWidth) * x,
    sourceY: (sourceHeight - cropHeight) * y,
    sourceWidth: cropWidth,
    sourceHeight: cropHeight,
  }
}
