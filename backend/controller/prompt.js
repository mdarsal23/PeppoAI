import { InferenceClient } from '@huggingface/inference';
import dotenv from 'dotenv';
dotenv.config();




async function textToVideoController(req, res) {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing required field: prompt" });
    }

    const token = (process.env.HF_TOKEN || "").trim();
    const client = new InferenceClient(token);

    const result = await client.textToVideo({
      model: "Wan-AI/Wan2.2-T2V-A14B",
      inputs: prompt,
    });

    
    let uint8array;
    if (result instanceof Uint8Array) {
      uint8array = result;
    } else if (typeof result?.arrayBuffer === "function") {
      const ab = await result.arrayBuffer();
      uint8array = new Uint8Array(ab);
    } else if (Array.isArray(result)) {
      uint8array = new Uint8Array(result);
    } else {
      uint8array = new Uint8Array(result);
    }

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", 'attachment; filename="generated.mp4"');
    res.status(200).send(Buffer.from(uint8array));

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err?.message || err) });
  }
}

export default textToVideoController;
