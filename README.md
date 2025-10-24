# 3D Computer Viewer

A modern Next.js website featuring a 3D computer model with interactive controls.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- **Three.js** with React Three Fiber for 3D rendering
- **React Three Drei** for enhanced 3D controls

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js app directory
  - `/components` - React components including the 3D model viewer
  - `page.tsx` - Main page
  - `layout.tsx` - Root layout
  - `globals.css` - Global styles
- `/public/computer` - 3D model files (GLTF format)
- `/computer` - Original 3D model source files

## 3D Model Controls

- **Rotate**: Click and drag to rotate the model
- **Zoom**: Scroll to zoom in/out
- **Auto-rotate**: The model has presentation controls for smooth interaction

## Technologies

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Three.js
- React Three Fiber
- React Three Drei
- Framer Motion

## License

See the license.txt file in the computer folder for 3D model licensing information.


