import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  
  return {
    base: isDev ? '/' : '/live-preview/',
    plugins: [vue(), tailwindcss()],
    root: '.',
    publicDir: 'public',
    
    // Build configuration optimized for GitHub Pages
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: isDev,
      minify: !isDev,
      
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        },
        
        // Single bundle for GitHub Pages compatibility
        output: {
          inlineDynamicImports: true,
          
          // Clean asset naming
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.') || [];
            const ext = info[info.length - 1];
            if (/css/i.test(ext || '')) {
              return `assets/style-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/main-[hash].js'
        }
      }
    },
    
    // Development server
    server: {
      port: 8000,
      host: true,
      open: true
    },
    
    // Path aliases for clean imports
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@/types': path.resolve(__dirname, 'src/types'),
        '@/utils': path.resolve(__dirname, 'src/utils'),
        '@/components': path.resolve(__dirname, 'src/components')
      }
    },

    // CSS processing handled by Tailwind Vite plugin

    // Vue configuration
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: isDev
    },

    // Dependency optimization
    optimizeDeps: {
      include: ['vue']
    }
  };
});