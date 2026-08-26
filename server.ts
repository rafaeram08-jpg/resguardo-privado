import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API Route
  app.post("/api/chat", async (req, res) => {
    try {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        console.error("GEMINI_API_KEY no está configurada.");
        return res.status(500).json({ error: "El servicio de chat no está disponible en este momento. Por favor, configura la GEMINI_API_KEY." });
      }

      const ai = new GoogleGenAI({ apiKey: key });
      const { message, context } = req.body;

      const systemInstruction = `Eres un asistente virtual experto en cumplimiento de la LFPIORPI (Ley Antilavado en México). 
Perteneces a una firma de consultoría que ofrece diagnósticos, redacción de manuales y metodologías de riesgo.
El usuario está viendo actualmente la sección: "${context || 'inicio'}". Utiliza este contexto para dar respuestas más relevantes si aplica.
Responde a sus dudas de forma profesional, clara, concisa y orientada a la prevención de lavado de dinero. 
Mantén tus respuestas breves (máximo 2-3 párrafos cortos). 
Si te preguntan precios o casos muy específicos, sugiere educadamente que soliciten un diagnóstico a través del sitio.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: message,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2,
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: "Hubo un error al procesar tu solicitud." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
