"use client"

import { useState, useEffect } from "react"
import { Scale, MessageSquareX } from "lucide-react"
import { useModelContext } from "../../context/Context"

export const ChatHeader = () => {
  const { currentchat, setcurrentchat } = useModelContext()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [clearingMessages, setClearingMessages] = useState(false)
  const [clearError, setClearError] = useState(null)
  const [messagesCleared, setMessagesCleared] = useState(false)
  const decodedEmail = currentchat ? decodeURIComponent(currentchat) : null
  console.log(currentchat, "Current chat in header")

  useEffect(() => {
    const fetchUserData = async () => {
      if (!decodedEmail) return
      try {
        const res = await fetch(`/api/users?email=${encodeURIComponent(decodedEmail)}`, { method: "GET" })
        const data = await res.json()
        if (res.ok) {
          setUser(data)
        } else {
          throw new Error(data.error || "Failed to fetch user data")
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        setError(error.message)
      }
    }
    fetchUserData()
  }, [decodedEmail])

  const handleClearMessages = async () => {
    if (!decodedEmail) {
      setClearError("No chat to clear.")
      return
    }
    setClearingMessages(true)
    setClearError(null)
    setMessagesCleared(false)
    try {
      const res = await fetch("/api/message/clear", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lawyer: user.email,
          clientEmail: decodedEmail,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessagesCleared(true)
        console.log("Messages cleared successfully:", data)
        // Auto-hide success message after 3 seconds
        setTimeout(() => setMessagesCleared(false), 3000)
      } else {
        throw new Error(data.error || "Failed to clear messages")
      }
    } catch (error) {
      console.error("Error clearing messages:", error)
      setClearError(error.message)
    } finally {
      setClearingMessages(false)
    }
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>
  }
  if (!user) {
    return <div className="text-gray-400 p-4">Loading...</div>
  }
  const { name, avatar, status, caseNumber, isLawyer } = user

  return (
    <div className="relative flex items-center justify-between p-4 bg-[#001845] border-b border-gray-700">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={avatar || "/placeholder.svg"} alt={name} className="w-10 h-10 rounded-full object-cover" />
          {isLawyer && (
            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
              <Scale className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-white">{name}</h2>
          {caseNumber && <p className="text-xs text-blue-400">Case #{caseNumber}</p>}
          <p className="text-sm text-gray-400">{status}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleClearMessages}
          disabled={clearingMessages}
          className={`p-2 hover:bg-orange-600 rounded-full transition-colors ${clearingMessages ? "opacity-50" : ""}`}
          title="Clear chat messages"
        >
          {clearingMessages ? (
            <span className="text-white text-xs">Clearing...</span>
          ) : (
            <MessageSquareX className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
      {clearError && (
        <div className="absolute top-full left-0 right-0 bg-red-500 text-white p-2 text-sm">{clearError}</div>
      )}
      {messagesCleared && (
        <div className="absolute top-full left-0 right-0 bg-green-500 text-white p-2 text-sm">
          Chat messages cleared successfully!
        </div>
      )}
    </div>
  )
}
