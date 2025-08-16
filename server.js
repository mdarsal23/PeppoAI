const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'video-generator/dist')));

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// API endpoint for text-to-video generation
app.post('/api/t2v-mp4', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log(`Generating video for prompt: "${prompt}"`);
    
    // For now, we'll return a mock response
    // In a real implementation, you would:
    // 1. Call an AI video generation service (like Runway, Pika Labs, etc.)
    // 2. Wait for the video to be generated
    // 3. Return the video file
    
    // Mock implementation - create a simple response
    setTimeout(() => {
      // For demonstration, we'll return an error message
      // since we don't have actual video generation set up
      res.status(501).json({ 
        error: 'Video generation service not implemented yet',
        message: 'This is a mock endpoint. Integrate with an AI video service like Runway ML, Pika Labs, or similar.',
        prompt: prompt
      });
    }, 2000); // Simulate processing time

  } catch (error) {
    console.error('Error generating video:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'video-generator/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend: http://localhost:${PORT}`);
  console.log(`API Health: http://localhost:${PORT}/api/health`);
});
