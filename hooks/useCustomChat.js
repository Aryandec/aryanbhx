import { useState, useRef, useCallback } from "react";

export function useCustomChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    controllerRef.current = controller;

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
      signal: controller.signal,
    });

    if (!response.ok) {
      setError("Something went wrong.");
      setIsLoading(false);
      return;
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";
    let assistantContent = "";

    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const jsonStr = line.replace("data: ", "").trim();
          if (jsonStr === "[DONE]") {
            setIsLoading(false);
            return;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            if (parsed.content) {
              assistantContent += parsed.content;

              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.id === "streaming") {
                  return [
                    ...prev.slice(0, -1),
                    { ...last, content: assistantContent },
                  ];
                } else {
                  return [
                    ...prev,
                    {
                      id: "streaming",
                      role: "assistant",
                      content: parsed.content,
                    },
                  ];
                }
              });
            }
          } catch (e) {
            console.warn("Parse error:", e);
          }
        }
      }
    }

    setIsLoading(false);
  }, [input, messages]);

  return {
    messages,
    input,
    isLoading,
    error,
    setInput,
    setMessages,
    handleInputChange: (e) => setInput(e.target.value),
    handleSubmit: (e) => {
      e.preventDefault();
      sendMessage();
    },
  };
}
