import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import { loadEnv } from "vite";

const {
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
  PUBLIC_SITE_URL,
} = loadEnv(
  process.env.NODE_ENV ?? "development",
  process.cwd(),
  "",
);
const sanityProjectId = PUBLIC_SANITY_PROJECT_ID || "4rsr93ao";
const sanityDataset = PUBLIC_SANITY_DATASET || "production";
const deploymentUrl =
  PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.URL ||
  "http://localhost:4321";
const siteUrl = deploymentUrl.startsWith("http")
  ? deploymentUrl
  : `https://${deploymentUrl}`;

export default defineConfig({
  site: siteUrl,
  integrations: [
    tailwind(),
    sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: "2026-07-23",
      useCdn: false,
    }),
  ],
  devToolbar: {
    enabled: false,
  },
});
