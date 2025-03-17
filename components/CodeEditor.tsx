"use client";

import { useEffect, useRef, useCallback, useImperativeHandle } from "react";
import { EditorView, basicSetup } from "@codemirror/basic-setup";
import { javascript } from "@codemirror/lang-javascript";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { useConsoleStore } from "@/store/consoleStore";

export default function CodeEditor({ onRunRef }: { onRunRef?: React.RefObject<() => void> }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const addLog = useConsoleStore((state) => state.addLog);
  const clearLogs = useConsoleStore((state) => state.clearLogs);

  const minimalTheme = EditorView.theme({
    "&": {
      color: "#111827",
      backgroundColor: "#ffffff",
      fontFamily: "Menlo, monospace",
      fontSize: "14px",
    },
    ".cm-content": {
      caretColor: "#111827",
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#111827",
    },
    ".cm-gutters": {
      backgroundColor: "#f9fafb",
      color: "#9ca3af",
      border: "none",
    },
  });

  const handleRunCommand = useCallback(() => {
    const currentView = viewRef.current;
    if (!currentView) return;

    clearLogs();
    const code = currentView.state.doc.toString();

    const customConsole = {
      log: (...args) => addLog(args.join(" "), "log"),
      error: (...args) => addLog(args.join(" "), "error"),
      warn: (...args) => addLog(args.join(" "), "log"),
      info: (...args) => addLog(args.join(" "), "log"),
    };

    const wrappedCode = `(function(console) {
      ${code}
    })(customConsole);`;

    try {
      const result = eval(wrappedCode);
      if (result !== undefined) {
        addLog(String(result), "log");
      }
    } catch (err) {
      addLog((err as Error).message, "error");
    }
  }, [addLog, clearLogs]);

  useEffect(() => {
    if (!editorRef.current) return;

    const customKeymap = keymap.of([
      ...defaultKeymap,
      {
        key: "Mod-Enter",
        run: handleRunCommand,
      },
    ]);

    const view = new EditorView({
      parent: editorRef.current,
      extensions: [
        basicSetup,
        javascript(),
        minimalTheme,
        customKeymap,
      ],
      doc: `console.log("Hello, world!");`,
    });

    viewRef.current = view;

    return () => view.destroy();
  }, [handleRunCommand]);

  useImperativeHandle(onRunRef, () => handleRunCommand, [handleRunCommand]);

  return <div ref={editorRef} className="h-full w-full" />;
}