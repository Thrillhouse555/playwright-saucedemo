import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure'
  },
  testDir: './tests',
});
