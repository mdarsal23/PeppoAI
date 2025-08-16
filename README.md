# AI Video Generator

A modern, sleek web application for AI-powered video generation with a design inspired by shadcn/ui and Aceternity UI.

## Features

- 🎨 **Modern UI Design** - Beautiful gradient backgrounds, glassmorphism effects, and smooth animations
- 🤖 **AI-Powered** - Ready to integrate with AI video generation services
- ⚡ **Fast Development** - Built with Vite and React for lightning-fast development
- 🎯 **TypeScript** - Fully typed for better development experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework with custom design system

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React (icons)
- **Backend**: Node.js, Express.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **In another terminal, start the backend server:**
   ```bash
   npm run server
   ```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3001`.

### Production Build

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

## Project Structure

```
video-generator/
├── src/
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   ├── App.tsx               # Main application component
│   ├── index.css             # Global styles and Tailwind imports
│   └── main.tsx              # Application entry point
├── server.js                 # Express backend server
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.ts            # Vite configuration
└── package.json              # Dependencies and scripts
```

## API Integration

The frontend is set up to call `/api/t2v-mp4` endpoint. To integrate with an actual AI video service:

1. **Update `server.js`** - Replace the mock implementation with actual AI service calls
2. **Popular AI Video Services:**
   - Runway ML
   - Pika Labs
   - Stable Video Diffusion
   - OpenAI (when available)

## Customization

The project uses a custom design system. You can customize colors, spacing, typography, and animations in the Tailwind config and CSS files.

## License

This project is licensed under the MIT License.
