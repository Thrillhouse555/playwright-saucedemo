import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com/v1',
    screenshot: 'only-on-failure'
  },
  testDir: './tests',
});
