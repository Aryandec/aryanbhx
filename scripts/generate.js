require("dotenv").config({ path: ".env.local" });

const { Redis } = require("@upstash/redis");
const { DirectoryLoader } = require("langchain/document_loaders/fs/directory");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const {
  getEmbeddingsCollection,
  getVectorStore,
} = require("../lib/astradb.js");
const fs = require("fs");

async function generateEmbeddings() {
  await Redis.fromEnv().flushdb();

  const vectorStore = await getVectorStore();
  const collection = await getEmbeddingsCollection();
  await collection.deleteMany({});

  const loader = new DirectoryLoader(
    "./app", // Adjusted path for local use
    {
      ".jsx": (path) => new TextLoader(path),
    },
    true
  );

  const rawData = fs.readFileSync("./data/structured_data.json", "utf-8");
  const structuredEntries = JSON.parse(rawData);

  const structuredDocs = structuredEntries.map((entry) => ({
    pageContent: entry.content,
    metadata: { url: entry.source },
  }));

  const docs = [
    ...structuredDocs,
    ...(await loader.load())
      .filter((doc) => doc.metadata.source.endsWith("page.jsx"))
      .map((doc) => {
        const url =
          doc.metadata.source
            .replace(/\\/g, "/")
            .split("/app")[1]
            .split("/page.")[0] || "/";

        const pageContentTrimmed = doc.pageContent
          .replace(/^import.*$/gm, "")
          .replace(/^export.*$/gm, "") // remove exports
          .replace(/className\s*=\s*{?.*?}?/g, "") // remove classnames
          .replace(/<.*?>/g, "") // remove HTML/JSX tags
          .replace(/const .*?= .*?=> .*?{.*?}/gs, "") // remove arrow functions
          .replace(/function .*?\(.*?\) ?{.*?}/gs, "") // remove function declarations
          .replace(/\s{2,}/g, " ") // normalize whitespace
          .trim();
          
        return {
          pageContent: pageContentTrimmed,
          metadata: { url },
        };
      }),
  ];

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");

  const splitDocs = await splitter.splitDocuments(docs);

  await vectorStore.addDocuments(splitDocs);
}

generateEmbeddings();
