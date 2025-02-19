"use client";

import { motion } from "framer-motion";

interface ChatMessageProps {
  content: string;
  timestamp: string;
  isSent: boolean;
}

export default function ChatMessage({ content, timestamp, isSent }: ChatMessageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isSent ? "justify-end" : "justify-start"}`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`max-w-[70%] rounded-lg px-4 py-2 shadow-lg ${
          isSent 
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" 
            : "bg-gradient-to-r from-gray-700 to-gray-800 text-white"
        }`}
      >
        <p className="break-words">{content}</p>
        <p className={`text-xs mt-1 ${isSent ? "text-blue-200" : "text-gray-400"}`}>
          {new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </motion.div>
    </motion.div>
  );
}