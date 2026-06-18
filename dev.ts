import { spawn, execSync } from "child_process";
import { existsSync } from "fs";

console.log("🚀 Pre-compiling Tailwind CSS...");
try {
  execSync("bunx @tailwindcss/cli -i styles/globals.css -o styles/tailwind-built.css", { stdio: "inherit" });
} catch (e) {
  console.error("⚠️ Pre-compilation failed. Ensuring placeholder exists...");
}

// Ensure the compiled file exists on disk
if (!existsSync("styles/tailwind-built.css")) {
  console.log("Creating blank placeholder...");
  execSync("echo /* empty */ > styles/tailwind-built.css", { shell: true });
}

console.log("🚀 Starting Tailwind CSS compiler in watch mode...");
const tailwind = spawn("bunx", ["@tailwindcss/cli", "-i", "styles/globals.css", "-o", "styles/tailwind-built.css", "--watch"], {
  stdio: "inherit",
  shell: true
});

console.log("🚀 Starting Bun dev server...");
const server = spawn("bun", ["--hot", "src/index.ts"], {
  stdio: "inherit",
  shell: true
});

process.on("SIGINT", () => {
  tailwind.kill();
  server.kill();
  process.exit();
});
