import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

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

    "/api/views": {
      async GET(req) {
        let views = 452;
        try {
          const file = Bun.file("views.txt");
          if (await file.exists()) {
            const content = await file.text();
            const parsed = parseInt(content.trim(), 10);
            if (!isNaN(parsed)) {
              views = parsed;
            }
          }
        } catch (e) {
          // ignore
        }
        
        views += 1;
        
        try {
          await Bun.write("views.txt", views.toString());
        } catch (e) {
          // ignore
        }
        
        return Response.json({ views });
      }
    },
    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Disable browser hot reloading in development (forces clean full-page reload on save)
    hmr: false,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
