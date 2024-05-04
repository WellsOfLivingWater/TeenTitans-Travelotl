import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/activities': {
        target: 'http://localhost:3000',
      },
    }
  },
  root: './',
  build: {
    outDir: 'dist',
  },
};