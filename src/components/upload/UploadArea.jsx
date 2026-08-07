import { memo } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { ImagePlus, AlertCircle, X, RefreshCw, FileImage, Upload } from 'lucide-react'
import { Button } from '../common/Button.jsx'
import {
  DROPZONE_ACCEPT,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_LABEL,
  formatFileSize,
} from '../../utils/imageUtils.js'

/**
 * Reusable drag-and-drop upload card (controlled component).
 *
 * Props (all from a shared useImageUpload() instance):
 *  - file:        the currently selected File object (or null)
 *  - error:       a friendly validation message (or null)
 *  - handleDrop:  dropzone-compatible drop handler
 *  - removeImage: clears the selected file
 *  - className:   optional extra classes for the outer wrapper
 */
export default memo(function UploadArea({ file, error, handleDrop, removeImage, className = '' }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, open } = useDropzone({
    onDrop: handleDrop,
    accept: DROPZONE_ACCEPT,
    maxSize: MAX_FILE_SIZE_BYTES,
    multiple: false,
    noClick: true,
  })

  const surfaceStyles = isDragReject
    ? 'border-rose bg-rose/10'
    : isDragActive
      ? 'border-forest bg-forest/10'
      : 'border-dashed border-sand bg-gradient-to-b from-card to-cream-soft hover:border-forest/60'

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        {...getRootProps()}
        initial={false}
        role="button"
        aria-label="Upload your photo — drag and drop, or press Enter to browse files"
        className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2rem] border-2 px-6 text-center transition-colors ${surfaceStyles} ${
          file ? 'py-8' : 'py-16'
        }`}
      >
        <input {...getInputProps()} aria-label="Upload a photo" />

        {file ? (
          <>
            <span className="grid size-14 place-items-center rounded-full border-2 border-dashed border-forest/40 bg-forest/10 text-forest">
              <FileImage size={24} />
            </span>
            <div className="mt-4 max-w-xs">
              <p className="truncate text-sm font-semibold text-coal">{file.name}</p>
              <p className="mt-1 font-mono text-xs text-stone">
                {formatFileSize(file.size)} · {file.type.replace('image/', '').toUpperCase()}
              </p>
            </div>
            <p className="mt-3 font-hand text-xl text-forest">drag a new one to replace it</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={(event) => {
                  event.stopPropagation()
                  open()
                }}
              >
                <RefreshCw size={15} />
                Replace
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={(event) => {
                  event.stopPropagation()
                  removeImage()
                }}
              >
                <X size={15} />
                Remove
              </Button>
            </div>
          </>
        ) : (
          <>
            <span className="grid size-16 place-items-center rounded-full gradient-yellow text-coal shadow-gold ring-4 ring-gold/20">
              <Upload size={26} strokeWidth={2.2} />
            </span>
            <p className="mt-6 font-editorial text-2xl font-bold tracking-tight text-coal">
              Drop your photo
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.24em] text-stone">
              JPG · PNG · WEBP — up to {MAX_FILE_SIZE_LABEL}
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mt-7"
              onClick={(event) => {
                event.stopPropagation()
                open()
              }}
            >
              <ImagePlus size={16} />
              Browse files
            </Button>
          </>
        )}
      </motion.div>

      {error && (
        <motion.p
          role="alert"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose"
        >
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </motion.p>
      )}
    </div>
  )
})
