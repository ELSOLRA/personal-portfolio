import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: process.env.NODE_ENV === "production", // CDN only in production
  apiVersion: "2025-03-12",
  ...(process.env.SANITY_API_TOKEN
    ? { token: process.env.SANITY_API_TOKEN }
    : {}),
};

export const client = createClient(config);

const data = await client.fetch<number>(`count(*)`);

console.log(`Number of documents: ${data}`);
