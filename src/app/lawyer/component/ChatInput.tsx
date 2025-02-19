"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import type React from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await onSendMessage(message.trim());
      setMessage("");
      setError("");
    } catch (err) {
      console.error("❌ Error sending message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <motion.form 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 bg-[#001845] p-4 border-t border-gray-700"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className="flex-1 p-3 rounded-full bg-[#002060] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none transition-all duration-200 hover:bg-[#002875]"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
        disabled={!message.trim()}
      >
        <Send className="w-5 h-5 text-white" />
      </motion.button>
      {error && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm absolute bottom-16 left-4"
        >
          {error}
        </motion.p>
      )}
    </motion.form>
  );
}