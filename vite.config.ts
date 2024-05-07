import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

function getViteEnvironmentVariables(): { [key: string]: string } {
  const viteEnvVars: { [key: string]: string } = {};

  for (const key in process.env) {
    if (key.startsWith("VITE")) {
      viteEnvVars[key.replace("VITE_", "")] = process.env[key]!;
    }
  }

  return viteEnvVars;
}

export default defineConfig({
  server: {
    port: 4210,
    host: "0.0.0.0",
    hmr: {
      path: "__vite_hmr",
    },
  },

  plugins: [react(), tsconfigPaths()],

  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
    },
  },

  define: {
    "process.env": getViteEnvironmentVariables(),
  },
});
