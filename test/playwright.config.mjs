import { defineConfig, devices } from '@playwright/test';

const url = `http://127.0.0.1:3000/`;

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  quiet: false,
  timeout: 10 * 1000,
  webServer: {
    command: 'npx serve',
    url,
    reuseExistingServer: false
  },
  use: {
    baseURL: url
  },
  projects: [
    /* Test against desktop browsers */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});
