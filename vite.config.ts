import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()] as any,
  test: {
    globals: true,
    environment: 'jsdom',

    // говорим Vitest mock-ать CSS-файлы
    mockReset: true,
    alias: {
      '\\.(css|less|scss|sass)$': './src/__mocks__/styleMock.js',
    },
  },
});
