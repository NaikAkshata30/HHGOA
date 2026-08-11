import { forwardRef, memo } from 'react'
import useCanvasScale from '../../hooks/useCanvasScale.js'
import BuilderCardCanvas, { BUILDER_CARD, CENTER } from './BuilderCardCanvas.jsx'

/**
 * Responsive wrapper that renders BuilderCardCanvas at its fixed 1080x1350 size
 * while scaling it down to fit the container width. The inner canvas keeps its
 * native size, which is what html2canvas will capture later.
 *
 * The forwarded ref points at the inner BuilderCardCanvas element (the export
 * target).
 *
 * Props:
 *  - previewUrl:     object URL of the uploaded photo
 *  - name, stack, title: identity fields rendered on the card
 *  - imagePosition:  optional focus point { x, y } percentages (defaults center)
 *  - className:      optional extra classes
 */
const BuilderCard = forwardRef(function BuilderCard(
  { previewUrl, name, role, stack, title, phrase, location, imagePosition = CENTER, className = '' },
  ref,
) {
  const { containerRef, scale } = useCanvasScale(BUILDER_CARD.width)

  if (!previewUrl) return null

  return (
    <div ref={containerRef} className={`w-full overflow-hidden ${className}`}>
      <div
        className="relative mx-auto animate-fade-in"
        style={{ width: BUILDER_CARD.width * scale, height: BUILDER_CARD.height * scale }}
      >
        <div className="absolute left-0 top-0" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <BuilderCardCanvas
            ref={ref}
            previewUrl={previewUrl}
            name={name}
            role={role}
            stack={stack}
            title={title}
            phrase={phrase}
            location={location}
            imagePosition={imagePosition}
          />
        </div>
      </div>
    </div>
  )
})

export default memo(BuilderCard)
