import {
  DataAPIClient
} from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";
const geminiApiKey = process.env.GOOGLE_API_KEY || "";

if (!token || !endpoint || !collection || !geminiApiKey) {
  throw new Error(
    "Please set ASTRA_DB_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_COLLECTION, and GEMINI_API_KEY"
  );
}

// Initialize client via DataAPIClient
const client = new DataAPIClient({ logging: "all" });
const db = client.db(endpoint, { token });

export async function getVectorStore() {
  return AstraDBVectorStore.fromExistingIndex(
    new GoogleGenerativeAIEmbeddings({
      apiKey: geminiApiKey,
      modelName: "embedding-001"
    }),
    {
      token,
      endpoint,
      collection,
      collectionOptions: {
        vector: { dimension: 768, metric: "cosine" },
      },
    }
  );
}

export async function getEmbeddingsCollection() {
  return db.collection(collection);
}
