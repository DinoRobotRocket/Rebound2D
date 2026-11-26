import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'Rebound2D',
      fileName: 'rebound2d'
    }
  }
});
