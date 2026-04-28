import "dotenv/config";
import cors from "cors";
import express from "express";
import { z } from "zod";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: "200kb" }));

const leadSchema = z.object({
  source: z.string(),
  createdAt: z.string(),
  pageUrl: z.string().url(),
  ref: z
    .object({
      propertyId: z.string().optional(),
      propertyTitle: z.string().optional(),
      neighborhood: z.string().optional(),
      operation: z.enum(["buy", "rent", "all"]).optional(),
    })
    .optional(),
  contact: z
    .object({
      name: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  message: z.string().optional(),
});

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post("/leads", (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "invalid_payload" });
  }

  // MVP: por enquanto só registra em log.
  // Próximo passo: persistir no Postgres/Neon e/ou encaminhar pro CRM (RD/Hubspot/Kenlo).
  console.log("[lead]", JSON.stringify(parsed.data));

  return res.status(200).json({ ok: true });
});

const port = Number(process.env.PORT ?? 8787);
app.listen(port, () => {
  console.log(`JTG backend on http://localhost:${port}`);
});

