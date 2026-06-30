import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = __dirname;

console.log("In-Place Image Optimizer starting...");

// Ensure sharp is available
let sharp;
try {
  const mod = await import("sharp");
  sharp = mod.default;
} catch (e) {
  console.error("Sharp is not installed. Please install it first or run with bun.");
  process.exit(1);
}

const files = fs.readdirSync(publicDir);

console.log("\nDeleting all generated .webp files to clean up public folder...");
for (const file of files) {
  if (file.endsWith(".webp")) {
    try {
      fs.unlinkSync(path.join(publicDir, file));
      console.log(`  Deleted: ${file}`);
    } catch (err) {
      console.error(`  Error deleting ${file}:`, err.message);
    }
  }
}

console.log("\nCompressing original PNG and JPG files in-place...\n");

const targetExtensions = [".png", ".jpg", ".jpeg"];

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!targetExtensions.includes(ext) || file.endsWith(".webp")) continue;

  const filePath = path.join(publicDir, file);
  const tempPath = path.join(publicDir, `temp-${file}`);

  const stat = fs.statSync(filePath);
  const originalSizeKB = (stat.size / 1024).toFixed(1);

  // Skip files that are already small (e.g. < 50KB) to avoid re-compression overhead
  if (stat.size < 50 * 1024 && !file.includes("me.png") && !file.includes("logo")) {
    console.log(`- Skipping ${file} (already small: ${originalSizeKB} KB)`);
    continue;
  }

  try {
    let pipeline = sharp(filePath);
    const metadata = await pipeline.metadata();

    // Resize if too large (e.g. width > 1920px) to prevent massive memory usage on client
    if (metadata.width && metadata.width > 1920) {
      pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
    }

    // Compress based on extension
    if (ext === ".png") {
      await pipeline.png({ quality: 80, compressionLevel: 9, palette: true }).toFile(tempPath);
    } else {
      await pipeline.jpeg({ quality: 80, progressive: true }).toFile(tempPath);
    }

    // Replace original file with compressed one
    fs.renameSync(tempPath, filePath);

    const outStat = fs.statSync(filePath);
    const compressedSizeKB = (outStat.size / 1024).toFixed(1);
    const savings = (((stat.size - outStat.size) / stat.size) * 100).toFixed(1);

    console.log(`✓ Optimized ${file} in-place: ${originalSizeKB} KB -> ${compressedSizeKB} KB | Saved: ${savings}%`);
  } catch (err) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.error(`✗ Error processing ${file}:`, err.message);
  }
}

console.log("\nIn-place optimization complete! Public directory is clean and optimized.");
process.exit(0);
