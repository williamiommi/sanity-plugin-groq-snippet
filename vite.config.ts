import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.config.ts'],
    coverage: {
      enabled: true,
      all: true,
      include: ['src/components/*.{ts,tsx}', 'src/lib/*.{ts,tsx}'],
      provider: 'v8',
      reporter: 'text',
    },
  },
})
