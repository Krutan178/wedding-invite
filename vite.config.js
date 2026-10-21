import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // On GitHub Pages the site is under /<repo-name>/ — derived automatically
  // inside GitHub Actions (GITHUB_REPOSITORY); plain "/" locally. Override via VITE_BASE if needed.
  base: process.env.VITE_BASE ||
    (process.env.GITHUB_REPOSITORY
      ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`
      : "/"),
  build: {
    outDir: "dist",
    assetsInlineLimit: 100000,
  },
});
