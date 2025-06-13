"use client";

import { LuBot } from "react-icons/lu";
import { useState } from "react";
import AIChatBox from "./AIChatBox";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <button onClick={() => setChatBoxOpen(true)}>
        <LuBot size={24} />
      </button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
}
