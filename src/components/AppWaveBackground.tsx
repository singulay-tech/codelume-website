import { useEffect, useRef } from 'react'

// Match the three layers in the App's AuroraParameters.welcome.
const waveColors = [
  'rgba(217, 102, 33, 0.35)',
  'rgba(217, 33, 179, 0.35)',
  'rgba(33, 179, 217, 0.35)',
]

export function AppWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    function draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const scale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * scale)
      canvas.height = Math.round(height * scale)
      context.setTransform(scale, 0, 0, scale, 0, 0)

      const wavelength = Math.max(24, width / Math.PI)
      const amplitude = height * 65 / 300
      const drift = height * 10 / 300
      const step = Math.max(2, wavelength / 40)

      waveColors.forEach((color, layer) => {
        const baseline = height * 0.5 + Math.sin(layer) * drift
        const y = (x: number) => baseline + Math.sin(x / wavelength + layer) * amplitude

        context.beginPath()
        context.moveTo(0, y(0))
        for (let x = step; x < width; x += step) {
          context.lineTo(x, y(x))
        }
        context.lineTo(width, y(width))
        context.lineTo(width, height)
        context.lineTo(0, height)
        context.closePath()
        context.fillStyle = color
        context.fill()
      })
    }

    draw(canvas, context)
    const observer = new ResizeObserver(() => draw(canvas, context))
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 block h-full w-full blur-[20px]"
    />
  )
}
