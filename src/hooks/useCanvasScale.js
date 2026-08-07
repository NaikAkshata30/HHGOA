import { useEffect, useRef, useState } from 'react'

/**
 * Scales a fixed-size canvas (used by html2canvas exports) down to fit the
 * container width. Returns a ref to attach to the wrapper and the current scale.
 */
export default function useCanvasScale(canvasWidth) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => setScale(el.clientWidth / canvasWidth)
    update()

    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [canvasWidth])

  return { containerRef, scale }
}
