# LucenEdge Core

LucenEdge is a next-generation enterprise AI solutions provider. This repository contains the core Next.js application for the LucenEdge web platform, featuring multi-page routing, animated 3D components, and immersive modern web design.

## Features

- **Next.js App Router**: Utilizing the latest App router framework layout.
- **Three.js & React Three Fiber**: Interactive 3D hero banners, animated particles, and interactive orb components.
- **Framer Motion & GSAP**: High-performance animations and custom scrolling architectures.
- **Responsive & Modern Design**: 'Dark-tech' aesthetic with custom cursor styling, glassmorphism, and neon gradients.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Next.js (14.2+)
- React 18
- Tailwind CSS
- Three.js
- Framer Motion
- GSAP & Lenis (for Smooth Scrolling)

## Architecture

- `src/app/`: Multi-page directory structure containing Home, About, Services, Case Studies, Careers, and Contact components.
- `src/components/`: Reusable React components including UI navigation, loaders, and 3D scenes.
- `src/lib/`: Essential lib abstractions.
