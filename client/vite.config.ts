import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: "import {h, Fragment} from 'reactfree-jsx';"
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "../../../public/scss/mixins/index";'
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(".", "src")
    }
  }
});
