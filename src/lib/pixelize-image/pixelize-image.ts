import { palette as defaultPalette } from './palette'

/**
 * Modified version of pixelit
 * @author José Moreira @ <https://github.com/giventofly/pixelit>
 **/
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function pixelizeImage({
  to,
  from,
  pixels = 8,
  colors = defaultPalette
}) {
  if (!to || !from) throw new Error('Missing to or from parameters')
  if (pixels <= 0 || pixels > 50)
    throw new Error('pixels must be between 0 - 50')

  const destination: HTMLCanvasElement = to
  const source: HTMLImageElement = from
  let scale = pixels * 0.01
  const palette: number[][] = colors
  const ctx = destination.getContext('2d')
  draw()

  function draw() {
    if (!ctx) return
    destination.width = source.width
    destination.height = source.height
    ctx.drawImage(source, 0, 0)
    pixelate()
    convertPalette()
  }

  function getSimilarColor(actualColor: number[]): number[] {
    let selectedColor = [] as number[]
    let currentSim = getColorSimilarity(actualColor, palette[0])
    palette.forEach((color) => {
      if (getColorSimilarity(actualColor, color) <= currentSim) {
        selectedColor = color
        currentSim = getColorSimilarity(actualColor, color)
      }
    })
    return selectedColor
  }

  function pixelate() {
    destination.width = source.naturalWidth
    destination.height = source.naturalHeight

    let scaledW = destination.width * scale
    let scaledH = destination.height * scale

    const tempCanvas = document.createElement('canvas')

    if (destination.width > 800 || destination.width > 800) {
      scale *= 0.25
      scaledW = destination.width * scale
      scaledH = destination.height * scale
      tempCanvas.width = Math.max(scaledW, scaledH) + 50
      tempCanvas.height = Math.max(scaledW, scaledH) + 50
    }
    const tempContext = tempCanvas.getContext('2d')
    tempContext?.drawImage(source, 0, 0, scaledW, scaledH)
    document.body.appendChild(tempCanvas)

    if (!ctx) return
    ctx.imageSmoothingEnabled = false

    ctx.drawImage(
      tempCanvas,
      0,
      0,
      scaledW,
      scaledH,
      0,
      0,
      source.naturalWidth,
      source.naturalHeight
    )
    tempCanvas.remove()
  }

  function convertPalette() {
    if (!ctx) return
    const w = destination.width
    const h = destination.height
    const imgPixels = ctx.getImageData(0, 0, w, h)
    for (let y = 0; y < imgPixels.height; y++) {
      for (let x = 0; x < imgPixels.width; x++) {
        const i = y * 4 * imgPixels.width + x * 4
        const finalcolor = getSimilarColor([
          imgPixels.data[i],
          imgPixels.data[i + 1],
          imgPixels.data[i + 2]
        ])
        imgPixels.data[i] = finalcolor[0]
        imgPixels.data[i + 1] = finalcolor[1]
        imgPixels.data[i + 2] = finalcolor[2]
      }
    }
    ctx.putImageData(
      imgPixels,
      0,
      0,
      0,
      0,
      imgPixels.width,
      imgPixels.height
    )
  }
}

function getColorSimilarity(
  rgbColor: number[],
  compareColor: number[]
): number {
  let d = 0
  for (let i = 0, max = rgbColor.length; i < max; i++) {
    d += (rgbColor[i] - compareColor[i]) * (rgbColor[i] - compareColor[i])
  }
  return Math.sqrt(d)
}
