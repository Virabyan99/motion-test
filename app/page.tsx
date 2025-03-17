"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function HomePage() {
  const [boxWidth, setBoxWidth] = useState(256);
  const [boxHeight, setBoxHeight] = useState(256);
  const resizingRef = useRef(false);

  const handlePointerDownRight = (e: React.PointerEvent) => {
    e.preventDefault();
    resizingRef.current = true;
    window.addEventListener("pointermove", handlePointerMoveRight);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMoveRight = (e: PointerEvent) => {
    if (!resizingRef.current) return;
    setBoxWidth((prevWidth) => {
      const newWidth = prevWidth + e.movementX;
      if (newWidth < 150) return 150;
      if (newWidth > 800) return 800;
      return newWidth;
    });
  };

  const handlePointerDownBottom = (e: React.PointerEvent) => {
    e.preventDefault();
    resizingRef.current = true;
    window.addEventListener("pointermove", handlePointerMoveBottom);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMoveBottom = (e: PointerEvent) => {
    if (!resizingRef.current) return;
    setBoxHeight((prevHeight) => {
      const newHeight = prevHeight + e.movementY;
      if (newHeight < 150) return 150;
      if (newHeight > 800) return 800;
      return newHeight;
    });
  };

  const handlePointerUp = () => {
    resizingRef.current = false;
    window.removeEventListener("pointermove", handlePointerMoveRight);
    window.removeEventListener("pointermove", handlePointerMoveBottom);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        drag
        dragConstraints={{ top: -300, bottom: 300, left: -500, right: 500 }}
        whileDrag={{ scale: 1.05 }}
        className="relative"
      >
        <Card
          className="shadow-lg"
          style={{ width: boxWidth, height: boxHeight }}
        >
          <CardContent className="flex items-center justify-center h-full">
            <p className="text-lg font-medium">Resize Me!</p>
          </CardContent>

          {/* Resize Handle - Right */}
          <div
            className="absolute top-0 right-0 h-full w-2 cursor-ew-resize bg-blue-500 opacity-50"
            onPointerDown={handlePointerDownRight}
          ></div>

          {/* Resize Handle - Bottom */}
          <div
            className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize bg-green-500 opacity-50"
            onPointerDown={handlePointerDownBottom}
          ></div>
        </Card>
      </motion.div>
    </main>
  );
}
