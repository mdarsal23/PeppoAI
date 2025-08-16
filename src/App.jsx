import { useState } from 'react'
import './App.css'

export default  function App() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) {
      alert('Please enter a prompt first!')
      return
    }

    setIsLoading(true)
    
    try {
      // This will connect to your backend API
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate video')
      }

      // Handle the response (video blob)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      // You can add video display logic here
      console.log('Video generated:', url)
      
    } catch (error) {
      console.error('Error generating video:', error)
      alert('Error generating video. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e)
    }
  }

  return (
    <div className="app-container">
      <div className="container">
        <h1 className="title">Video Generator</h1>
        
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-container">
            <textarea 
              className="prompt-input" 
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={5}
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            className={`submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Video'}
          </button>
        </form>
      </div>
    </div>
  )
}

