import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generate() {
  const svgPath = path.resolve('public/hedgehog-handover.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  // 1. Generate 192x192 standard icon
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile('public/pwa-192x192.png');
  console.log('Created public/pwa-192x192.png');

  // 2. Generate 512x512 standard icon
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/pwa-512x512.png');
  console.log('Created public/pwa-512x512.png');

  // 3. Generate Apple Touch Icon 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');
  console.log('Created public/apple-touch-icon.png');

  // 4. Generate Maskable Icon 512x512 (with 15% safe margin on warm background #fffdf9)
  const innerSize = Math.round(512 * 0.76); // 390px
  const resizedInner = await sharp(svgBuffer)
    .resize(innerSize, innerSize)
    .toBuffer();

  const margin = Math.round((512 - innerSize) / 2);

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 255, g: 253, b: 249, alpha: 1 },
    },
  })
    .composite([
      {
        input: resizedInner,
        top: margin,
        left: margin,
      },
    ])
    .png()
    .toFile('public/pwa-maskable-512x512.png');
  console.log('Created public/pwa-maskable-512x512.png');

  // 5. Also copy to icon.png & favicon.png
  await sharp(svgBuffer)
    .resize(64, 64)
    .png()
    .toFile('public/favicon.png');
  console.log('Created public/favicon.png');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
