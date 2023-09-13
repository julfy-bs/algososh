import { defineConfig } from 'cypress';
import { TEST_URL } from './src/constants/tests/general';

export default defineConfig({
  e2e: {
    baseUrl: TEST_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
