// hooks/useKeyboardShortcut.js
import { useEffect } from "react";

export default function useKeyboardShortcut(keys = [], callback) {
  useEffect(() => {
    const handler = (event) => {
      const match =
        keys.every((key) => {
          switch (key) {
            case "ctrl":
              return event.ctrlKey;
            case "cmd":
              return event.metaKey;
            case "alt":
              return event.altKey;
            case "shift":
              return event.shiftKey;
            default:
              return event.key.toLowerCase() === key.toLowerCase();
          }
        });

      if (match) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [keys, callback]);
}
