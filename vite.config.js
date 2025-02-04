import { sync } from "glob";
import { defineConfig } from "vite";

export default defineConfig({
  base: "https://apleshakov88.github.io/vite-test01/dist",
  appType: "mpa",
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: sync("./src/**/*.html".replace(/\\/g, "/")),
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name][extname]";
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
