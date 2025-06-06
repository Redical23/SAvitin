"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteDocument } from "./action"
import EditForm from "./edit-form"

interface AdminControlsProps {
  documentId: string
  documentData: any
}

export default function AdminControls({ documentId, documentData }: AdminControlsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const router = useRouter()

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteDocument(documentId)
      if (result.success) {
        showNotification("success", "Document deleted successfully")
        setTimeout(() => {
          router.push("/constitution") // Redirect to constitution list
        }, 1000)
      } else {
        showNotification("error", result.error || "Failed to delete document")
        setIsDeleteDialogOpen(false)
      }
    } catch (error) {
      showNotification("error", "An unexpected error occurred")
      setIsDeleteDialogOpen(false)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="relative">
      {/* Admin Badge */}
      <div className="absolute -top-8 right-0 bg-green-500 text-white px-2 py-1 rounded text-xs">Admin Access</div>

      {/* Notification */}
      {notification && (
        <div
          className={`absolute top-0 right-0 -mt-16 p-3 rounded-md shadow-md text-white z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex gap-2">
        {/* Edit Button */}
        <button
          onClick={() => setIsEditOpen(true)}
          className="flex items-center px-3 py-1 text-sm bg-transparent border border-white rounded-md text-white hover:bg-white hover:text-slate-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={() => setIsDeleteDialogOpen(true)}
          className="flex items-center px-3 py-1 text-sm bg-red-600 border border-red-600 rounded-md text-white hover:bg-red-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          Delete
        </button>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Edit Constitution Document</h2>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <EditForm
                documentId={documentId}
                documentData={documentData}
                onClose={() => setIsEditOpen(false)}
                showNotification={showNotification}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Are you absolutely sure?</h2>
            <p className="mb-6 text-gray-600">
              This action cannot be undone. This will permanently delete the constitution document with Application No:{" "}
              <strong>{documentData.applicationNo}</strong>.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
