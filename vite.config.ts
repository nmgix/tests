import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import terser from "@rollup/plugin-terser";
import { VitePWA } from "vite-plugin-pwa";

// @ts-expect-error types mismatch (terser) (versioning problem?)
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      VitePWA({
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
          cacheId: "test-gym",
          mode: "production",
          runtimeCaching: [
            {
              urlPattern: "https://fonts.googleapis.com/.*",
              handler: "CacheFirst",
              method: "GET"
            },
            {
              urlPattern: "https://fonts.gstatic.com/.*",
              handler: "CacheFirst",
              method: "GET"
            }
          ]
        },
        registerType: "autoUpdate",
        includeAssets: ["**/*"],
        devOptions: {
          enabled: true
          // type: "module"
        },
        manifest: {
          name: "test gym",
          short_name: "test gym",
          description: "Test app",
          theme_color: "#FFFFFF",
          background_color: "#FFFFFF",
          display: "standalone",
          start_url: mode === "production" ? "/test-gym/" : "/",
          icons: [
            {
              src: "assets/icons/favicons/512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "assets/icons/favicons/192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "assets/icons/favicons/180.png",
              sizes: "180x180",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "assets/icons/favicons/icon.svg",
              sizes: "32x32",
              type: "image/svg"
            }
          ]
        }
      })
    ],
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
