import { copyFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "child_process";

const outdir = path.join(process.cwd(), "dist");
await rm(outdir, { recursive: true, force: true });

console.log("Building Tailwind CSS...");
spawnSync("bunx", ["@tailwindcss/cli", "-i", "styles/globals.css", "-o", "styles/tailwind-built.css", "--minify"], {
  stdio: "inherit",
  shell: true
});

const entrypoints = [...new Bun.Glob("src/**/*.html").scanSync()];

const result = await Bun.build({
  entrypoints,
  outdir,
  minify: true,
  target: "browser",
  sourcemap: "linked",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

const publicFiles = [...new Bun.Glob("src/public/**").scanSync()].filter((filePath) => !filePath.endsWith("/"));

for (const filePath of publicFiles) {
  const relativePath = path.relative(path.join(process.cwd(), "src/public"), filePath);
  const destinationPath = path.join(outdir, relativePath);
  await mkdir(path.dirname(destinationPath), { recursive: true });
  await copyFile(filePath, destinationPath);
}

for (const output of result.outputs) {
  console.log(` ${path.relative(process.cwd(), output.path)}  ${(output.size / 1024).toFixed(1)} KB`);
}
