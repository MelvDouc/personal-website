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
        additionalData: "@use '@styles/variables' as vars; @use '@styles/mixins/all' as mixins;"
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
