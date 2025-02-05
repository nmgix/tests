import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import terser from "@rollup/plugin-terser";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        src: "/src"
      }
    },
    build: {
      minify: "terser",
      rollupOptions: {
        plugins: [
          terser({
            format: {
              comments: false
            },
            mangle: {
              keep_classnames: false,
              reserved: []
            }
          })
        ]
      }
    },
    ...(mode === "production" && {
      esbuild: {
        drop: ["console", "debugger"]
      }
    })
  };
});
