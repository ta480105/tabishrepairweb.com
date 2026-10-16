import express, { Request, Response } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { processInquiry } from "./src/server/inquiryService.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);
  const isProd = process.env.NODE_ENV === "production";

  // Parse JSON bodies
  app.use(express.json({ limit: "1mb" }));

  // Security headers
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // API Route: Health Check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "healthy",
      agency: "Tabish Web",
      service: "Agency Inquiries API",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    });
  });

  // API Route: Inquiries (POST only)
  app.post("/api/inquiries", async (req: Request, res: Response) => {
    const timestamp = new Date().toISOString();
    try {
      const clientIp =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
        req.socket.remoteAddress ||
        "127.0.0.1";

      const result = await processInquiry(req.body, clientIp, process.env);
      console.log(
        `[${timestamp}] [API_INQUIRIES] Status: ${result.statusCode} | Success: ${result.success} | DB: ${result.details?.dbSaved} | Email: ${result.details?.emailSent}`
      );
      res.status(result.statusCode).json(result);
    } catch (err: any) {
      console.error(`[${timestamp}] [API_INQUIRIES_ERROR]:`, err?.message || err);
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: "An internal server error occurred while processing your request.",
      });
    }
  });

  // Reject unsupported HTTP methods on /api/inquiries
  app.all("/api/inquiries", (_req: Request, res: Response) => {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      success: false,
      statusCode: 405,
      message: "Method Not Allowed. Only POST requests are supported on /api/inquiries.",
    });
  });

  // Frontend integration: Vite middleware in development, static files in production
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Tabish Web Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
