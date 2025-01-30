import { sync } from "glob";
import { defineConfig } from "vite";

export default defineConfig({
  base: "https://apleshakov88.github.io/vite-test01/",
  appType: "mpa",
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: sync("./src/**/*.html".replace(/\\/g, "/")),
    },
  },
});
