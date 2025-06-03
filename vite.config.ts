import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import { readFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';

// Plugin to inject mobile optimization meta tags
const mobileOptimizationPlugin = (): Plugin => {
  return {
    name: 'inject-mobile-optimizations',
    transformIndexHtml(html: string) {
      try {
        const mobileMetaTags = readFileSync('./public/mobile-meta.html', 'utf-8');
        return html.replace('</head>', `${mobileMetaTags}\n</head>`);
      } catch (e) {
        console.warn('Could not inject mobile optimization tags: ', e);
        return html;
      }
    }
  };
};

// Plugin to copy script and style files to dist
const copyAssetsPlugin = (): Plugin => {
  return {
    name: 'copy-assets',
    closeBundle() {
      try {
        // Ensure directories exist
        const scriptsDist = path.resolve(__dirname, 'dist/scripts');
        const stylesDist = path.resolve(__dirname, 'dist/styles');
        
        if (!existsSync(scriptsDist)) {
          mkdirSync(scriptsDist, { recursive: true });
        }
        if (!existsSync(stylesDist)) {
          mkdirSync(stylesDist, { recursive: true });
        }
        
        // Copy scripts
        const scriptFiles = [
          'tailwind-theme.js',
          'themeToggle.js',
          'mobile-optimizations.js',
          'browser-compatibility.js'
        ];
        
        scriptFiles.forEach(file => {
          const src = path.resolve(__dirname, `scripts/${file}`);
          const dest = path.resolve(scriptsDist, file);
          if (existsSync(src)) {
            copyFileSync(src, dest);
            console.log(`Copied: ${file} to dist/scripts/`);
          }
        });
        
        // Copy styles
        const styleFiles = [
          'mobile.css',
          'theme.css'
        ];
        
        styleFiles.forEach(file => {
          const src = path.resolve(__dirname, `styles/${file}`);
          const dest = path.resolve(stylesDist, file);
          if (existsSync(src)) {
            copyFileSync(src, dest);
            console.log(`Copied: ${file} to dist/styles/`);
          }
        });
      } catch (e) {
        console.error('Error copying assets:', e);
      }
    }
  };
};

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
          // Ensure single React instance by creating explicit aliases
          'react': path.resolve(__dirname, 'node_modules/react'),
          'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
          'framer-motion': path.resolve(__dirname, 'node_modules/framer-motion'),
        }
      },
      plugins: [
        mobileOptimizationPlugin(),
        copyAssetsPlugin()
      ],
      build: {
        outDir: 'dist',
        minify: 'esbuild',
        rollupOptions: {
          output: {
            // Better code splitting for mobile optimizations
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return 'vendor';
              }
              if (id.includes('mobile') || id.includes('responsive')) {
                return 'mobile';
              }
            }
          }
        }
      },
      optimizeDeps: {
        include: ['react', 'react/jsx-runtime', 'react-dom', 'framer-motion'],
        force: true // Force dependency pre-bundling
      }
    };
});
