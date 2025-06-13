"use client";

import { cn } from "@/lib/utils";
import { useCustomChat } from "@/hooks/useCustomChat";
import { LuBot, LuSendHorizontal, LuTrash } from "react-icons/lu";
import { GoXCircle } from "react-icons/go";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function AIChatBox({ open, onClose }) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useCustomChat();

  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div
      className={cn(
        "bottom-0 right-0 z-50 w-full max-w-[500px] p-1 xl:right-36",
        open ? "fixed" : "hidden"
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <GoXCircle size={30} className="rounded-full bg-white" />
      </button>

      <div className="flex h-[600px] flex-col rounded border bg-white shadow-xl">
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}

          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                id: "loading",
                role: "assistant",
                content: "Thinking...",
              }}
            />
          )}

          {error && (
            <ChatMessage
              message={{
                id: "error",
                role: "assistant",
                content: "Something went wrong. Please try again!",
              }}
            />
          )}

          {!error && messages.length === 0 && (
            <div className="mx-8 flex h-full flex-col items-center justify-center gap-3 text-center">
              <LuBot size={28} />
              <p className="text-lg font-medium">
                Send a message to start the AI chat!
              </p>
              <p>
                You can ask the chatbot any question about me and it will find
                the relevant information on this website.
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <button
            type="button"
            className="flex w-10 flex-none items-center justify-center"
            title="Clear chat"
            onClick={() => setMessages([])}
          >
            <LuTrash size={24} />
          </button>

          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            className="grow rounded border bg-background px-3 py-2"
            ref={inputRef}
          />

          <button
            type="submit"
            className="flex w-10 flex-none items-center justify-center disabled:opacity-50"
            disabled={input.length === 0}
            title="Submit message"
          >
            <LuSendHorizontal size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ message }) {
  const { role, content } = message;
  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end"
      )}
    >
      {isAiMessage && <LuBot className="mr-2 flex-none" />}
      <div
        className={cn(
          "rounded-md border px-3 py-2",
          isAiMessage ? "bg-background" : "bg-foreground text-background"
        )}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={props.href ?? ""}
                className="text-primary hover:underline"
              />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="mt-3 first:mt-0" />
            ),
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                className="mt-3 list-inside list-disc first:mt-0"
              />
            ),
            li: ({ node, ...props }) => <li {...props} className="mt-1" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
