// backend/server.js

import express from 'express'
import cors from 'cors'
//import prompt from '../backend/routes/Prompt.js'
import textToVideoController from './controller/prompt.js';
const app = express();
const PORT = 5000;



const allowed = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app",
  /\.vercel\.app$/  // preview deployments
]

app.use(cors({ 
   origin: (origin, cb) => {
    if (!origin) return cb(null, true)
    const ok = allowed.some(o => o instanceof RegExp ? o.test(origin) : o === origin)
    cb(ok ? null : new Error("Not allowed by CORS"), ok)
  },
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.json({ message: "hello there, this is backend!" });
});
app.post("/api/give", async (req, res) => {
  try {
    console.log("Received API request with prompt:", req.body.prompt);
    await textToVideoController(req, res);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/about", (req, res) => {
  res.json({ message: "this is shit" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



