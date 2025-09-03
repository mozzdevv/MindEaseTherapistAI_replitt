import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'MindEase API is running' });
  });

  // OpenAI API proxy to protect API key
  // Note: client will directly use OpenAI API in this implementation
  // If you want to proxy OpenAI requests through server, implement here

  const httpServer = createServer(app);

  return httpServer;
}
