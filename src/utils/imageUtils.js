// imageUtils.js — validation and normalization helpers for uploaded images.

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024
export const MAX_FILE_SIZE_LABEL = '10 MB'

export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// Object used by react-dropzone's `accept` prop (mime type -> extensions).
export const DROPZONE_ACCEPT = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
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
      error: 'Unsupported file type. Please upload a JPG, PNG or WEBP image.',
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
      return 'Unsupported file type. Please upload a JPG, PNG or WEBP image.'
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
