import { resolve } from "path";
import { defineConfig } from "vite";

const srcFolder = resolve(".", "src");

export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: "import {h, Fragment} from 'reactfree-jsx';"
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@styles/variables'; @import '@styles/mixins/all';"
      }
    }
  },
  resolve: {
    alias: {
      "@components": resolve(srcFolder, "components"),
      "@routing": resolve(srcFolder, "routing"),
      "@styles": resolve(srcFolder, "styles"),
      "@utils": resolve(srcFolder, "utils"),
    }
  }
});
