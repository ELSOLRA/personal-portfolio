"use client";

import { useEffect, useState } from "react";
import { createClient } from "next-sanity";
import config from "@/sanity.config";

export default function SanityTest() {
  const [connectionStatus, setConnectionStatus] = useState<string>(
    "Testing connection..."
  );

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2025-03-11",
    useCdn: false,
  });

  useEffect(() => {
    async function testConnection() {
      try {
        // Simple query to test connection
        const result = await client.fetch(
          `*[_type == "system.group" && _id == "siteSettings"][0]`
        );
        setConnectionStatus("Connected successfully to Sanity!");
        console.log("Connection test result:", result);
      } catch (error) {
        console.error("Sanity connection error:", error);
        setConnectionStatus(
          `Connection failed: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    testConnection();
  }, [client]);

  return (
    <div className="p-4 m-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Sanity Connection Test</h2>
      <p className="mb-2">
        Status:{" "}
        <span
          className={
            connectionStatus.includes("success")
              ? "text-green-600"
              : "text-red-600"
          }>
          {connectionStatus}
        </span>
      </p>
      <p>
        Project ID:{" "}
        {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
          ? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.substring(0, 2) + "xxxx"
          : "Not set"}
      </p>
      <p>Project Title: {config.title || "Not set"}</p>
      <p>Project Name: {config.name || "Not set"}</p>
      <p>Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET || "Not set"}</p>
    </div>
  );
}
