import { forwardRef, memo } from 'react'
import useCanvasScale from '../../hooks/useCanvasScale.js'
import FrameCanvas, { FRAME_SIZE, CENTER } from './FrameCanvas.jsx'

/**
 * Responsive wrapper that renders FrameCanvas at its fixed 1080x1080 size
 * while scaling it down to fit the container width. The inner canvas keeps its
 * native size, which is what html2canvas will capture later.
 *
 * The forwarded ref points at the inner FrameCanvas element (the export target).
 *
 * Props:
 *  - previewUrl:     object URL of the uploaded photo
 *  - name, stack, title: identity fields rendered on the frame
 *  - imagePosition:  optional focus point { x, y } percentages for manual
 *                    repositioning (defaults to center)
 *  - className:      optional extra classes
 */
const FrameGenerator = forwardRef(function FrameGenerator(
  { previewUrl, name, stack, title, imagePosition = CENTER, className = '' },
  ref,
) {
  const { containerRef, scale } = useCanvasScale(FRAME_SIZE)

  if (!previewUrl) return null

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <div className="relative mx-auto animate-fade-in" style={{ height: FRAME_SIZE * scale }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <FrameCanvas
            ref={ref}
            previewUrl={previewUrl}
            name={name}
            stack={stack}
            title={title}
            imagePosition={imagePosition}
          />
        </div>
      </div>
    </div>
  )
})

export default memo(FrameGenerator)
