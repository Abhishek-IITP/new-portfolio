import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    "/": index,

    // 1. Robots.txt Route
    "/robots.txt": async (req) => {
      try {
        const file = Bun.file("src/public/robots.txt");
        if (await file.exists()) {
          return new Response(file, {
            headers: { "Content-Type": "text/plain" }
          });
        }
      } catch (e) {}
      return new Response("User-agent: *\nAllow: /\n\nSitemap: https://abhiitp.tech/sitemap.xml", {
        headers: { "Content-Type": "text/plain" }
      });
    },

    // 2. Sitemap.xml Route
    "/sitemap.xml": async (req) => {
      try {
        const file = Bun.file("src/public/sitemap.xml");
        if (await file.exists()) {
          return new Response(file, {
            headers: { "Content-Type": "application/xml" }
          });
        }
      } catch (e) {}
      return new Response("", { status: 404 });
    },


    // 4. Hello API
    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },
  },

  async fetch(req) {
    const url = new URL(req.url);

    // 5. Dynamic Hello API
    if (url.pathname.startsWith("/api/hello/")) {
      const name = url.pathname.slice("/api/hello/".length);
      return Response.json({
        message: `Hello, ${name}!`,
      });
    }

    // 6. Serve static files from public directory if they exist
    const publicFile = Bun.file("src/public" + url.pathname);
    if (await publicFile.exists()) {
      return new Response(publicFile);
    }

    // Serve static assets from src directory (like logo.svg or react.svg)
    if (url.pathname.endsWith(".svg") || url.pathname.endsWith(".png") || url.pathname.endsWith(".jpg") || url.pathname.endsWith(".webp")) {
      const srcFile = Bun.file("src" + url.pathname);
      if (await srcFile.exists()) {
        return new Response(srcFile);
      }
    }

    // 7. Fallback: SPA React routing
    // Redirect unmatched standard routes to hash-based paths to support React SPA hash-router
    if (url.pathname !== "/") {
      return Response.redirect(`${url.origin}/#${url.pathname}${url.search}`, 302);
    }

    return new Response("Not Found", { status: 404 });
  },

  development: process.env.NODE_ENV !== "production" && {
    // Disable browser hot reloading in development (forces clean full-page reload on save)
    hmr: false,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
