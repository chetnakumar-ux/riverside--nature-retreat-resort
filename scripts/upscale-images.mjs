/**
 * Image Upscaler & Optimizer for Vrindavan Gopala Resort
 * Uses sharp (bundled with Next.js) to:
 * 1. Upscale small images to 1920px wide minimum
 * 2. Apply Lanczos3 sharpening for HD quality
 * 3. Output optimized JPEG at 85% quality
 * 4. Generate WebP versions for modern browsers
 */

import sharp from 'sharp'
import { readdir, stat, mkdir } from 'fs/promises'
import { join } from 'path'

const INPUT_DIR = join(process.cwd(), 'public/images/resort')
const OUTPUT_DIR = join(process.cwd(), 'public/images/resort-hd')
const TARGET_WIDTH = 1920
const JPEG_QUALITY = 88
const WEBP_QUALITY = 85

async function processImage(filename) {
  const inputPath = join(INPUT_DIR, filename)
  const baseName = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '')

  try {
    const metadata = await sharp(inputPath).metadata()
    const currentWidth = metadata.width || 0
    const currentHeight = metadata.height || 0

    // Calculate target dimensions
    let targetWidth = TARGET_WIDTH
    let targetHeight = Math.round((TARGET_WIDTH / currentWidth) * currentHeight)

    // If image is already large enough, just optimize without upscaling
    const needsUpscale = currentWidth < TARGET_WIDTH
    if (!needsUpscale) {
      targetWidth = currentWidth
      targetHeight = currentHeight
    }

    const pipeline = sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        kernel: 'lanczos3',       // Best quality interpolation
        withoutEnlargement: false, // Allow upscaling
        fit: 'cover',
      })
      .sharpen({
        sigma: needsUpscale ? 1.2 : 0.8,  // More sharpening for upscaled images
        m1: 1.0,
        m2: 0.7,
      })
      .modulate({
        brightness: 1.02,   // Slight brightness boost
        saturation: 1.08,    // Slight saturation boost for vibrancy
      })

    // Output optimized JPEG
    await pipeline
      .clone()
      .jpeg({
        quality: JPEG_QUALITY,
        mozjpeg: true,       // Best compression without quality loss
        chromaSubsampling: '4:4:4', // Full color fidelity
      })
      .toFile(join(OUTPUT_DIR, `${baseName}.jpg`))

    // Output WebP (better quality at smaller size)
    await pipeline
      .clone()
      .webp({
        quality: WEBP_QUALITY,
        effort: 6,           // Higher effort = better compression
        smartSubsample: true,
      })
      .toFile(join(OUTPUT_DIR, `${baseName}.webp`))

    const outputStat = await stat(join(OUTPUT_DIR, `${baseName}.jpg`))
    const webpStat = await stat(join(OUTPUT_DIR, `${baseName}.webp`))

    console.log(
      `  ✓ ${filename.padEnd(25)} ${currentWidth}x${currentHeight} → ${targetWidth}x${targetHeight}` +
      `  JPEG: ${Math.round(outputStat.size / 1024)}KB` +
      `  WebP: ${Math.round(webpStat.size / 1024)}KB` +
      (needsUpscale ? '  [UPSCALED]' : '  [optimized]')
    )
  } catch (err) {
    console.error(`  ✗ ${filename}: ${err.message}`)
  }
}

async function main() {
  console.log('\n🖼  Vrindavan Gopala Resort — Image Upscaler & Optimizer\n')
  console.log(`  Input:  ${INPUT_DIR}`)
  console.log(`  Output: ${OUTPUT_DIR}`)
  console.log(`  Target: ${TARGET_WIDTH}px wide, JPEG ${JPEG_QUALITY}%, WebP ${WEBP_QUALITY}%\n`)

  await mkdir(OUTPUT_DIR, { recursive: true })

  const files = await readdir(INPUT_DIR)
  const images = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))

  console.log(`  Found ${images.length} images to process\n`)

  for (const img of images) {
    await processImage(img)
  }

  console.log('\n  ✅ All images processed!\n')
}

main().catch(console.error)
