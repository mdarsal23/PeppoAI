import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import api from './API.jsx';


function App() {
  const [prompt, setPrompt] = useState('')
  const [video, setVideo] = useState(null)       
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const videoRef = useRef(null)

  useEffect(() => {
    return () => {
      if (video) URL.revokeObjectURL(video)
    }
  }, [video])

  const handleSubmit = async () => {
    console.log('Generating video for prompt:', prompt);
    await fetchVideo();
  }

  const fetchVideo = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt first!')
      return
    }
    setIsLoading(true)
    setError('')
    try {
      //calls getVideo.js function
      const response = await api.post(
        '/getVideo',
        { prompt },
        { responseType: 'arraybuffer' }
      )

      const mime =
        typeof response.headers['content-type'] === 'string'
          ? response.headers['content-type']
          : 'video/mp4'
      // converts the ouput format to BLOB
      const bytes = new Uint8Array(response.data)
      const blob = new Blob([bytes], { type: mime })
      const url = URL.createObjectURL(blob)

      if (video) URL.revokeObjectURL(video)
      setVideo(url)
    } catch (err) {
      console.error('Error generating video:', err)
      setError('Failed to generate video. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="container">
      <h1>PeppoAI Video Generator</h1>
      <p>Enter your prompt below to generate a video</p>

      <div className="prompt-section">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e?.target?.value)}
          placeholder="Enter your prompt here..."
        />

        <div>
          <button onClick={fetchVideo} disabled={isLoading}>
            {isLoading ? 'Generating…' : 'Generate Video'}
          </button>
          
        </div>

        {isLoading && <div>Generating video… please wait.</div>}
        {error && <div>{error}</div>}

        <div className="video-preview">
          {video && (
            <video
              ref={videoRef}
              key={video}
              src={video}
              controls
              playsInline
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App