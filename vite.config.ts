// vite.config.js
import { resolve } from 'pathe';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'src/cvt.d.ts', dest: 'types' },
      ]
    }),
    dts({
      insertTypesEntry: true,
      exclude: ['src/tests', '**/*.test.*'],
    }),
    react(),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'routing',
      // the proper extensions will be added
      fileName: 'routing',
      formats: ['es', 'cjs', 'umd', 'iife'],
    },
    rollupOptions: {
      external: ["react", "react-dom",  "react/jsx-runtime"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    }
  },
});
