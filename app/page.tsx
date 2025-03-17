"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function HomePage() {
  const [boxWidth, setBoxWidth] = useState(500);
  const [boxHeight, setBoxHeight] = useState(300);
  const resizingRef = useRef(false);

  const [leftPanelRatio, setLeftPanelRatio] = useState(50);
  const dividerDraggingRef = useRef(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Box Edge Resize Handlers
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
      if (newWidth < 300) return 300;
      if (newWidth > 1000) return 1000;
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
      if (newHeight < 200) return 200;
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

  // Divider Handlers
  const handleDividerPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dividerDraggingRef.current = true;
    window.addEventListener("pointermove", handleDividerPointerMove);
    window.addEventListener("pointerup", handleDividerPointerUp);
  };

  const handleDividerPointerMove = (e: PointerEvent) => {
    if (!dividerDraggingRef.current) return;
    const box = boxRef.current;
    if (!box) return;

    const rect = box.getBoundingClientRect();
    const newRatio = ((e.clientX - rect.left) / rect.width) * 100;

    if (newRatio < 20) return setLeftPanelRatio(20);
    if (newRatio > 80) return setLeftPanelRatio(80);
    setLeftPanelRatio(newRatio);
  };

  const handleDividerPointerUp = () => {
    dividerDraggingRef.current = false;
    window.removeEventListener("pointermove", handleDividerPointerMove);
    window.removeEventListener("pointerup", handleDividerPointerUp);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        ref={boxRef}
        drag
        dragConstraints={{ top: -300, bottom: 300, left: -500, right: 500 }}
        whileDrag={{ scale: 1.05 }}
        className="relative"
      >
        <Card
          className="shadow-lg"
          style={{ width: boxWidth, height: boxHeight }}
        >
          <CardContent className="flex h-full p-0">
            {/* Left Panel */}
            <div
              className="bg-red-200 h-full"
              style={{ flexBasis: `${leftPanelRatio}%` }}
            >
              <div className="flex items-center justify-center h-full">
                <p>Left Panel</p>
              </div>
            </div>

            {/* Divider */}
            <div
              className={`w-2 ${
                dividerDraggingRef.current ? "bg-gray-800" : "bg-gray-600"
              } cursor-ew-resize transition-colors duration-200`}
              onPointerDown={handleDividerPointerDown}
            ></div>

            {/* Right Panel */}
            <div className="bg-blue-200 flex-1 h-full">
              <div className="flex items-center justify-center h-full">
                <p>Right Panel</p>
              </div>
            </div>
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
