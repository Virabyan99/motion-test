"use client";

import { IconPlayerPlay } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

type Props = {
  onRun: () => void;
};

export default function EditorToolbar({ onRun }: Props) {
  return (
    <div className="flex justify-end mb-2">
      <Button variant="outline" size="sm" onClick={onRun}>
        <IconPlayerPlay size={16} className="mr-1" />
        Run
      </Button>
    </div>
  );
}