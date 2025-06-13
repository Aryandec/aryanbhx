import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { getVectorStore } from "@/lib/astradb";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const chatHistory = messages.slice(0, -1).map((m) =>
      m.role === "user"
        ? new HumanMessage(m.content)
        : new AIMessage(m.content)
    );
    const currentMessageContent = messages[messages.length - 1].content;

    const retriever = (await getVectorStore()).asRetriever();
    const modelName = "gemini-1.5-flash";

    // Rephrasing Model (non-streaming)
    const rephrasingModel = new ChatGoogleGenerativeAI({
      model: modelName,
      verbose: true,
      cache: false,
    });

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      [
        "user",
        "Given the above conversation and the question: {input}, generate a search query to retrieve relevant information.",
      ],
    ]);

    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: rephrasingModel,
      retriever,
      rephrasePrompt,
    });

    const systemPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a chatbot for a personal portfolio website. Answer based on context. Use markdown.\n\nContext:\n{context}",
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const streamingModel = new ChatGoogleGenerativeAI({
      model: modelName,
      streaming: true,
    });

    const combineDocsChain = await createStuffDocumentsChain({
      llm: streamingModel,
      prompt: systemPrompt,
      documentPrompt: PromptTemplate.fromTemplate(
        "Page URL: {url}\n\nPage content:\n{page_content}"
      ),
      documentSeparator: "\n--------\n",
    });

    const retrievalChain = await createRetrievalChain({
      retriever: historyAwareRetrieverChain,
      combineDocsChain,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          const stream = await retrievalChain.stream({
            input: currentMessageContent,
            chat_history: chatHistory,
          });

          for await (const chunk of stream) {
            const text = chunk.answer ?? "";

            if (text) {
              const data = `data: ${JSON.stringify({ content: text })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }

          // Finish the stream with the expected SSE "done" signal
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        } catch (err) {
          console.error("Streaming error:", err);
          const errorData = `data: ${JSON.stringify({
            error: err.message || "Unknown error",
          })}\n\n`;
          controller.enqueue(encoder.encode(errorData));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
