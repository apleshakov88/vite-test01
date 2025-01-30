import { sync } from "glob";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: sync("./src/**/*.html".replace(/\\/g, "/"))
    },
  },
});
