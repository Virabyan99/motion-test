"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* Box Container */}
      <motion.div drag>
  <Card className="w-64 h-64 shadow-lg">
    <CardContent className="flex items-center justify-center h-full">
      <p className="text-lg font-medium">Drag Me!</p>
    </CardContent>
  </Card>
</motion.div>

    </main>
  );
}
