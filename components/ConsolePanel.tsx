"use client";

import { useConsoleStore } from "@/store/consoleStore";
import { IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function ConsolePanel() {
  const { logs, clearLogs } = useConsoleStore();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Console</h2>
        <Button variant="outline" size="sm" onClick={clearLogs}>
          <IconTrash size={16} className="mr-1" />
          Clear
        </Button>
      </div>

      {/* Logs */}
      <div className="flex-1 bg-white rounded shadow-sm p-4 overflow-auto">
        {logs.length === 0 ? (
          <p className="text-gray-400">No output yet.</p>
        ) : (
          <ul className="space-y-2">
            {logs.map((log) => (
              <li
                key={log.id}
                className={`text-sm ${
                  log.type === "error" ? "text-red-600" : "text-gray-800"
                }`}
              >
                {log.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}