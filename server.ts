import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("leads.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    ip TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Ensure IP column exists if table was created before
try {
  db.exec("ALTER TABLE leads ADD COLUMN ip TEXT");
} catch (e) {
  // Column already exists or other error
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.set('trust proxy', true);
  app.use(express.json());

  // API Routes
  app.get("/api/check-submission", (req, res) => {
    const ip = req.ip;
    try {
      const existing = db.prepare("SELECT id FROM leads WHERE ip = ?").get(ip);
      res.json({ submitted: !!existing });
    } catch (err) {
      res.status(500).json({ error: "Failed to check submission" });
    }
  });

  app.post("/api/leads", (req, res) => {
    const { name, email, phone } = req.body;
    const ip = req.ip;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Check if IP already submitted
      const existing = db.prepare("SELECT id FROM leads WHERE ip = ?").get(ip);
      if (existing) {
        return res.json({ id: existing.id, alreadySubmitted: true });
      }

      const stmt = db.prepare("INSERT INTO leads (name, email, phone, ip) VALUES (?, ?, ?, ?)");
      const result = stmt.run(name, email, phone, ip);

      // Keep only latest 30 records
      db.prepare(`
        DELETE FROM leads 
        WHERE id NOT IN (
          SELECT id FROM leads 
          ORDER BY created_at DESC 
          LIMIT 30
        )
      `).run();

      res.json({ id: result.lastInsertRowid });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  app.get("/api/leads", (req, res) => {
    try {
      const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
      res.json(leads);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch leads" });
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
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
