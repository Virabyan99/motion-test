"use client";

import { useRef } from "react";
import CodeEditor from "@/components/CodeEditor";
import ConsolePanel from "@/components/ConsolePanel";
import EditorToolbar from "@/components/EditorToolbar";
import { IconCode, IconTerminal, IconDeviceDesktop } from "@tabler/icons-react";

export default function HomePage() {
  const onRunRef = useRef<() => void>(null);

  return (
    <div className="flex flex-col h-[100vh]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <IconDeviceDesktop size={20} />
          <h1 className="text-lg font-semibold">Online JS Editor</h1>
        </div>
      </header>

      {/* Workspace */}
      <main className="flex flex-1">
        {/* Left Panel - Editor */}
        <section className="flex-1 bg-white p-4 border-r border-gray-300">
          <div className="flex items-center gap-2 mb-2">
            <IconCode size={20} />
            <h2 className="text-xl font-semibold">Editor</h2>
          </div>
          <EditorToolbar onRun={() => onRunRef.current?.()} />
          <div className="flex-1 rounded shadow-sm overflow-auto h-screen">
            <CodeEditor onRunRef={onRunRef} />
          </div>
        </section>

        {/* Right Panel - Console */}
        <section className="flex-[0_0_400px] bg-gray-50 p-4 max-w-sm">
          <div className="flex items-center gap-2 mb-2">
            <IconTerminal size={20} />
            <h2 className="text-xl font-semibold">Console</h2>
          </div>
          <div className="flex-1 bg-white rounded shadow-sm p-4 overflow-auto">
            <ConsolePanel />
          </div>
        </section>
      </main>
    </div>
  );
}