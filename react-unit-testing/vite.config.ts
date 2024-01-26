/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
// import { URL, fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/test/setup.ts",
        // you might want to disable it, if you don't have tests that rely on CSS
        // since parsing CSS is slow
        css: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@Component": path.resolve(__dirname, "./src/Component"),
            "@Container": path.resolve(__dirname, "./src/Container"),
            // "@": fileURLToPath(new URL("./src", import.meta.url)),
            // "@Component": fileURLToPath(
            //     new URL("./src/Component", import.meta.url)
            // ),
            // "@Container": fileURLToPath(
            //     new URL("./src/Container", import.meta.url)
            // ),
            // "@UtilsComponent": fileURLToPath(
            //     new URL("./src/Component/Utils", import.meta.url)
            // ),
            // "@Style": fileURLToPath(new URL("./src/Style", import.meta.url)),
            // "@Hooks": fileURLToPath(new URL("./src/Hooks", import.meta.url)),
            // "@Models": fileURLToPath(new URL("./src/Models", import.meta.url)),
            // "@Views": fileURLToPath(new URL("./src/Views", import.meta.url)),
        },
    },
});
