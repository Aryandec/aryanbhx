require("dotenv").config({ path: ".env.local" });

const { Redis } = require("@upstash/redis");
const { DirectoryLoader } = require("langchain/document_loaders/fs/directory");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { getEmbeddingsCollection, getVectorStore } = require("../lib/astradb.js");

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

  const docs = (await loader.load())
    .filter((doc) => doc.metadata.source.endsWith("page.jsx"))
    .map((doc) => {
      const url =
        doc.metadata.source
          .replace(/\\/g, "/")
          .split("/app")[1]
          .split("/page.")[0] || "/";

      const pageContentTrimmed = doc.pageContent
        .replace(/^import.*$/gm, "") // Remove import lines
        .replace(/ className=(["']).*?\1| className={.*?}/g, "") // Remove classNames
        .replace(/^\s*[\r]/gm, "") // Remove empty lines
        .trim();

      return {
        pageContent: pageContentTrimmed,
        metadata: { url },
      };
    });

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");

  const splitDocs = await splitter.splitDocuments(docs);

  await vectorStore.addDocuments(splitDocs);
}

generateEmbeddings();
