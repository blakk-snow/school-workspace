import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ 
      status: 'ok', 
      hasKey: Boolean(apiKey),
      supportedModels: ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-4-argon']
    });
  });

  // Multi-turn chat endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { 
        messages, 
        model = 'gemini-3.8-flash', 
        systemInstruction,
        contextData
      } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      if (!apiKey) {
        return res.status(500).json({ 
          error: 'GEMINI_API_KEY is not configured in the server environment.' 
        });
      }

      // Convert messages to Gemini API format
      const formattedContents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content || '' }],
      }));

      // Combine system instruction with active curriculum context
      let fullSystemInstruction = systemInstruction || 
        'You are an expert pedagogical advisor and NaCCA Ghanaian Standard-Based Curriculum specialist assisting teachers in Ghana.';

      if (contextData) {
        fullSystemInstruction += `\n\nActive Teacher Curriculum Context:\n${typeof contextData === 'string' ? contextData : JSON.stringify(contextData, null, 2)}`;
      }

      const response = await ai.models.generateContent({
        model,
        contents: formattedContents,
        config: {
          systemInstruction: fullSystemInstruction,
        },
      });

      const replyText = response.text || '';
      return res.json({ 
        role: 'assistant', 
        content: replyText,
        modelUsed: model 
      });
    } catch (err: any) {
      console.error('Gemini chat error:', err);
      const errorMessage = err?.message || 'Failed to generate response from Gemini';
      const statusCode = err?.status || 500;
      return res.status(statusCode).json({ error: errorMessage });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';
  const port = process.env.PORT || 3000;

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`NaCCA Curriculum Server running on port ${port} (mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer();
