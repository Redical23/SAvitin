"use client"

import { useState, useEffect } from "react"
import ChatMessage from "./ChatMessage"

export default function ChatContainer({ messages: initialMessages }) {
  const [messages, setMessages] = useState(initialMessages || [])
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Update messages when initialMessages changes
  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages)
    }
  }, [initialMessages])

  // Auto-hide messages after 3 seconds
  const showMessage = (message, isError = false) => {
    if (isError) {
      setError(message)
      setTimeout(() => setError(null), 3000)
    } else {
      setSuccess(message)
      setTimeout(() => setSuccess(null), 3000)
    }
  }

  // Handle delete message
  const handleDeleteMessage = async (messageId) => {
    console.log("Delete requested for message ID:", messageId)

    try {
      const res = await fetch(`/api/message/${messageId}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete message")
      }

      console.log("Delete API response:", data)

      // Update local messages state by filtering out the deleted message
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.filter((msg) => msg._id !== messageId)
        console.log("Updated messages after delete:", updatedMessages)
        return updatedMessages
      })

      showMessage("Message deleted successfully")
    } catch (error) {
      console.error("Error deleting message:", error)
      showMessage(error.message, true)
    }
  }

  // Handle edit message
  const handleEditMessage = async (messageId, newContent) => {
    console.log("Edit requested for message ID:", messageId)
    console.log("New content:", newContent)

    try {
      const res = await fetch(`/api/message/${messageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newContent }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to update message")
      }

      console.log("Edit API response:", data)

      // Update local messages state with the edited content
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, content: newContent } : msg,
        )
        console.log("Updated messages after edit:", updatedMessages)
        return updatedMessages
      })

      showMessage("Message updated successfully")
    } catch (error) {
      console.error("Error updating message:", error)
      showMessage(error.message, true)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 relative">
      {/* Success Message */}
      {success && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg z-50">{success}</div>
      )}

      {/* Error Message */}
      {error && <div className="fixed top-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg z-50">{error}</div>}

      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <ChatMessage
            key={message._id}
            id={message._id.toString()} // Ensure ID is a string
            content={message.content}
            timestamp={message.timestamp}
            isSent={message.from === "currentUserEmail"} // Replace with your logic
            onDelete={handleDeleteMessage}
            onEdit={handleEditMessage}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 py-8">No messages yet</div>
      )}
    </div>
  )
}
