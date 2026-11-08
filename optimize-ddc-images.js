const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.resolve("public");
const backup = path.resolve("DDC-IMAGE-BACKUP");
const tempSuffix = ".ddc-optimized";

async function run() {
  const files = [];

  function scan(dir) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) scan(full);
      else if (/\.(png|jpe?g)$/i.test(item.name)) files.push(full);
    }
  }

  scan(root);

  let processed = 0;
  let saved = 0;

  for (const file of files) {
    const before = fs.statSync(file).size;
    if (before < 500 * 1024) continue;

    const relative = path.relative(root, file);
    const backupFile = path.join(backup, relative);
    const tempFile = file + tempSuffix;

    try {
      fs.mkdirSync(path.dirname(backupFile), { recursive: true });

      if (!fs.existsSync(backupFile)) {
        fs.copyFileSync(file, backupFile);
      }

      let pipeline = sharp(file, { failOn: "none" }).withMetadata();

      if (/\.png$/i.test(file)) {
        pipeline = pipeline.png({
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: false
        });
      } else {
        pipeline = pipeline.jpeg({
          quality: 84,
          mozjpeg: true,
          progressive: true
        });
      }

      await pipeline.toFile(tempFile);
      const after = fs.statSync(tempFile).size;

      if (after < before * 0.95) {
        fs.renameSync(tempFile, file);
        saved += before - after;
        processed++;
      } else {
        fs.unlinkSync(tempFile);
      }
    } catch (error) {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
      console.log("Skipped:", path.basename(file), error.message);
    }
  }

  console.log("\n===== OPTIMIZATION COMPLETE =====");
  console.log("Optimized images:", processed);
  console.log("Space saved:", (saved / 1024 / 1024).toFixed(2), "MB");
  console.log("Original backups:", backup);
}

run().catch(console.error);
