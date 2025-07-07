import { mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, {
  test: {
    include: ['**/*.test.tsx'],
    environment: 'jsdom',
    setupFilesAfterEnv: ['./vitest.setup.ts'],
  },
});
