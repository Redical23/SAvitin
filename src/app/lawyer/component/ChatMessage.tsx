"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash, Edit, Check, X } from "lucide-react"

interface ChatMessageProps {
  id: string // This should be the MongoDB ObjectId as a string
  content: string
  timestamp: string
  isSent: boolean
  onDelete?: (id: string) => Promise<void>
  onEdit?: (id: string, newContent: string) => Promise<void>
}

export default function ChatMessage({ id, content, timestamp, isSent, onDelete, onEdit }: ChatMessageProps) {
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const contextMenuRef = useRef<HTMLDivElement>(null)
  const editInputRef = useRef<HTMLTextAreaElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)

  // Handle right click to show context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()

    // Calculate position relative to viewport
    const rect = messageRef.current?.getBoundingClientRect() || { left: 0, top: 0 }

    // Position menu near the message but ensure it stays in viewport
    const x = Math.min(e.clientX, window.innerWidth - 160) // 160px is approx menu width
    const y = Math.min(e.clientY, window.innerHeight - 100) // 100px is approx menu height

    setContextMenuPosition({ x, y })
    setShowContextMenu(true)

    console.log("Right-click detected on message:", id)
  }

  // Handle click outside to close context menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setShowContextMenu(false)
      }
    }

    if (showContextMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showContextMenu])

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [isEditing])

  // Handle delete message
  const handleDelete = async () => {
    if (!onDelete) {
      console.error("Delete handler not provided")
      return
    }

    try {
      setIsDeleting(true)
      setError(null)
      console.log("Deleting message with ID:", id)
      await onDelete(id)
      setShowContextMenu(false)
    } catch (err) {
      console.error("Error in handleDelete:", err)
      setError("Failed to delete message")
    } finally {
      setIsDeleting(false)
    }
  }

  // Handle edit message
  const handleEdit = () => {
    setIsEditing(true)
    setShowContextMenu(false)
    console.log("Editing message with ID:", id)
  }

  // Handle save edited message
  const handleSaveEdit = async () => {
    if (!onEdit) {
      console.error("Edit handler not provided")
      return
    }

    try {
      setIsUpdating(true)
      setError(null)
      console.log("Saving edited message with ID:", id)
      await onEdit(id, editedContent)
      setIsEditing(false)
    } catch (err) {
      console.error("Error in handleSaveEdit:", err)
      setError("Failed to update message")
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedContent(content)
    setError(null)
  }

  return (
    <>
      <motion.div
        ref={messageRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isSent ? "justify-end" : "justify-start"} relative mb-4`}
        onContextMenu={handleContextMenu}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`max-w-[70%] rounded-lg px-4 py-2 shadow-lg ${
            isSent
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
              : "bg-gradient-to-r from-gray-700 to-gray-800 text-white"
          }`}
        >
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea
                ref={editInputRef}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full bg-transparent border border-white/30 rounded p-2 text-white focus:outline-none focus:border-white/50"
                rows={3}
                disabled={isUpdating}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancelEdit}
                  disabled={isUpdating}
                  className="p-1 rounded-full hover:bg-white/10"
                  title="Cancel"
                >
                  <X size={16} />
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={isUpdating || !editedContent.trim()}
                  className="p-1 rounded-full hover:bg-white/10"
                  title="Save"
                >
                  {isUpdating ? "..." : <Check size={16} />}
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="break-words">{content}</p>
              <p className={`text-xs mt-1 ${isSent ? "text-blue-200" : "text-gray-400"}`}>
                {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Context Menu */}
      <AnimatePresence>
        {showContextMenu && (
          <motion.div
            ref={contextMenuRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: "fixed",
              top: contextMenuPosition.y,
              left: contextMenuPosition.x,
              zIndex: 1000,
            }}
            className="bg-[#001845] border border-gray-700 rounded-lg shadow-lg py-1 min-w-[150px]"
          >
            <button
              onClick={handleEdit}
              className="w-full text-left px-4 py-2 hover:bg-blue-700 flex items-center gap-2 text-white"
              disabled={isDeleting}
            >
              <Edit size={16} /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-full text-left px-4 py-2 hover:bg-red-700 flex items-center gap-2 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? (
                "Deleting..."
              ) : (
                <>
                  <Trash size={16} /> Delete
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      {error && <div className="text-red-500 text-sm mt-1 text-center">{error}</div>}
    </>
  )
}
