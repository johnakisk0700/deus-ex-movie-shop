import { defineConfig } from "cypress";
import { env } from "./cypress.env";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  env: {
    ...env,
  },
});
