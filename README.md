# Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design with mobile optimization
- Dark mode support
- Project gallery with filtering and search
- Detailed project view with image gallery
- Performance optimized with lazy loading
- Accessibility features
- Smooth animations with Framer Motion

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
  ├── components/
  │   └── projects/
  │       ├── ProjectCard.tsx
  │       ├── ProjectGallery.tsx
  │       └── ProjectDetailModal.tsx
  ├── types/
  │   └── project.ts
  ├── App.tsx
  ├── main.tsx
  └── index.css
```

## Customization

1. Update project data in `ProjectGallery.tsx`
2. Modify theme colors in `index.css`
3. Add your own images to the `public/images` directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
