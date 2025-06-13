// scripts/load-site.js
import fs from "fs/promises";
import { JSDOM } from "jsdom";
import axios from "axios";
import { Document } from "@langchain/core/documents";
import dotenv from "dotenv";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

dotenv.config();

const baseUrl = "https://aryanbhx.vercel.app"; // ✅ live site, NOT localhost
const pages = ["/", "/blog", "/social"]; // 🔁 Add more routes manually here

async function crawlPage(url) {
  try {
    const res = await axios.get(url);
    const dom = new JSDOM(res.data);
    const text = dom.window.document.body.textContent || "";

    return {
      pageContent: text.trim(),
      metadata: { url },
    };
  } catch (e) {
    console.error("❌ Error crawling:", url, e.message);
    return null;
  }
}

async function run() {
  const docs = [];

  for (const route of pages) {
    const url = baseUrl + route;
    console.log("🌐 Crawling:", url);
    const doc = await crawlPage(url);
    if (doc) docs.push(new Document(doc));
  }

  console.log("📄 Total pages scraped:", docs.length);

  // Save to file (optional for inspection)
  await fs.writeFile("full-site.json", JSON.stringify(docs, null, 2));
  console.log("✅ Saved full-site.json");

  // Upload to AstraDB
  const vectorStore = await AstraDBVectorStore.fromDocuments(
    docs,
    new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      modelName: "embedding-001",
    }),
    {
      collectionName: "website-content",
      token: process.env.ASTRA_DB_APPLICATION_TOKEN,
      endpoint: process.env.ASTRA_DB_API_ENDPOINT,
    }
  );

  console.log("✅ Uploaded to AstraDB");
}

run();
