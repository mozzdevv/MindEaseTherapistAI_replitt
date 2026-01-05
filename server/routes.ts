import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";

export async function registerRoutes(app: Express): Promise<Server> {
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

  if (!DEEPSEEK_API_KEY) {
    throw new Error("DEEPSEEK_API_KEY is not set");
  }

  // Server-side DeepSeek Client
  const openai = new OpenAI({
    apiKey: DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com",
  });

  // Proxy endpoint for Chat
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages) {
        return res.status(400).json({ error: 'Messages are required' });
      }

      const modelId = "deepseek-chat";

      // Set up streaming headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const stream = await openai.chat.completions.create({
        model: modelId,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          // Send raw content chunk if simple text streaming, 
          // or formatted SSE data if we want structured events. 
          // Since client expects text accumulation, simplistic text streaming is often enough,
          // but robust clients usually use SSE or NDJSON.
          // Let's stick to simple text chunking for now as the simplest implementation.
          res.write(content);
        }
      }

      res.end();

    } catch (error) {
      console.error("Minimax Proxy Error:", error);
      // If headers sent, we can't send JSON error
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal Server Error forwarding to AI' });
      } else {
        res.end(); // close stream
      }
    }
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'MindEase API is running' });
  });

  const httpServer = createServer(app);
  return httpServer;
}
