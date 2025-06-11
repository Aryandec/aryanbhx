// components/Terminal.jsx
"use client";
import { useState } from "react";

const files = {
  root: {
    projects: {
      aryanbhx: "Aryanbhx is my portfolio website",
      bookmarkManager: "Bookmark Manager is a web app to manage bookmarks",
    },
    journey: {
        education: "High School Junior"
    },
    achievements: {
        tenth_board: "10th Board - 93%",
    },
    skills: {
      programming: "JavaScript, Python",
      webDevelopment: "HTML, CSS, React, Next.js",
      databases: "Postgress, Supabase",
    },
     about: "Hi I am Aryan who wants to learn stuff and build things.",

     contact: {
        email: "aryanbh480@gmail.com"
     }
}
};

function getPath(fs, path) {
  return path.reduce((acc, dir) => acc?.[dir], fs);
}

export default function Terminal() {
  const [history, setHistory] = useState([`Aryan OS - type 'help'`]);
  const [input, setInput] = useState("");
  const [path, setPath] = useState(["root"]);

  const handleCommand = (cmd) => {
    let newHistory = [...history, `> ${cmd}`];
    const args = cmd.trim().split(" ");
    const command = args[0];
    const current = getPath(files, path);

    switch (command) {
      case "ls":
        newHistory.push(Object.keys(current).join("  "));
        break;
      case "cd":
        if (current[args[1]]) setPath([...path, args[1]]);
        else newHistory.push(`No such directory: ${args[1]}`);
        break;
      case "back":
        if (path.length > 1) setPath(path.slice(0, -1));
        else newHistory.push("Already at root.");
        break;
      case "open":
        if (current[args[1]]) newHistory.push(current[args[1]]);
        else newHistory.push(`Cannot open ${args[1]}`);
        break;
      case "help":
        newHistory.push("Commands: ls, cd <dir>, back, open <item>, clear");
        break;
      case "clear":
        newHistory = [];
        break;
      default:
        newHistory.push(`Unknown command: ${cmd}`);
    }

    setHistory(newHistory);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="bg-black text-green-400 p-4 font-mono h-screen w-screen flex flex-col overflow-y-auto">
      {history.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
      <div className="flex">
        <span className="text-white">{`aryan@os:${path.join("/")}$ `}</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="bg-black border-none text-green-400 outline-none w-full"
        />
      </div>
    </div>
  );
}
