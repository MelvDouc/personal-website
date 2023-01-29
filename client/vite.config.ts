import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "",
    jsxInject: "import { h } from 'reactfree-jsx';"
  }
});