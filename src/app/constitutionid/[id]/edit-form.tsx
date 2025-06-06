"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateDocument } from "./action"

interface EditFormProps {
  documentId: string
  documentData: any
  onClose: () => void
  showNotification: (type: "success" | "error", message: string) => void
}

export default function EditForm({ documentId, documentData, onClose, showNotification }: EditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    applicationNo: documentData.applicationNo || "",
    fileddate: documentData.fileddate || "",
    courtNo: documentData.courtNo || "",
    Delivereddate: documentData.Delivereddate || "",
    applicant: documentData.applicant || "",
    counselForApplicant: documentData.counselForApplicant || "",
    oppositeParty: documentData.oppositeParty || "",
    counselForOppositeParty: Array.isArray(documentData.counselForOppositeParty)
      ? documentData.counselForOppositeParty
      : [documentData.counselForOppositeParty || ""],
    equivalentCitations: Array.isArray(documentData["Equivalent citations"])
      ? documentData["Equivalent citations"]
      : [documentData["Equivalent citations"] || ""],
    fulldetails: Array.isArray(documentData.fulldetails) ? documentData.fulldetails : [documentData.fulldetails || ""],
  })

  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], ""],
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: any, i: number) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await updateDocument(documentId, {
        ...formData,
        "Equivalent citations": formData.equivalentCitations.filter(Boolean),
        counselForOppositeParty: formData.counselForOppositeParty.filter(Boolean),
        fulldetails: formData.fulldetails.filter(Boolean),
      })

      if (result.success) {
        showNotification("success", "Document updated successfully")
        router.refresh()
        onClose()
      } else {
        showNotification("error", result.error || "Failed to update document")
      }
    } catch (error) {
      showNotification("error", "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white border rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium mb-4 border-b pb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="applicationNo" className="block text-sm font-medium text-gray-700 mb-1">
              Application No
            </label>
            <input
              id="applicationNo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.applicationNo}
              onChange={(e) => handleInputChange("applicationNo", e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="fileddate" className="block text-sm font-medium text-gray-700 mb-1">
              Filed Date
            </label>
            <input
              id="fileddate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.fileddate}
              onChange={(e) => handleInputChange("fileddate", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="courtNo" className="block text-sm font-medium text-gray-700 mb-1">
              Court No
            </label>
            <input
              id="courtNo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.courtNo}
              onChange={(e) => handleInputChange("courtNo", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Delivereddate" className="block text-sm font-medium text-gray-700 mb-1">
              Delivered Date
            </label>
            <input
              id="Delivereddate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.Delivereddate}
              onChange={(e) => handleInputChange("Delivereddate", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Parties Information */}
      <div className="bg-white border rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium mb-4 border-b pb-2">Parties Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="applicant" className="block text-sm font-medium text-gray-700 mb-1">
              Applicant
            </label>
            <input
              id="applicant"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.applicant}
              onChange={(e) => handleInputChange("applicant", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="counselForApplicant" className="block text-sm font-medium text-gray-700 mb-1">
              Counsel for Applicant
            </label>
            <input
              id="counselForApplicant"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.counselForApplicant}
              onChange={(e) => handleInputChange("counselForApplicant", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="oppositeParty" className="block text-sm font-medium text-gray-700 mb-1">
              Opposite Party
            </label>
            <input
              id="oppositeParty"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.oppositeParty}
              onChange={(e) => handleInputChange("oppositeParty", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Counsel for Opposite Party</label>
          {formData.counselForOppositeParty.map((counsel: string, index: number) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={counsel}
                onChange={(e) => handleArrayChange("counselForOppositeParty", index, e.target.value)}
                placeholder="Enter counsel name"
              />
              <button
                type="button"
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                onClick={() => removeArrayItem("counselForOppositeParty", index)}
                disabled={formData.counselForOppositeParty.length === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={() => addArrayItem("counselForOppositeParty")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Counsel
          </button>
        </div>
      </div>

      {/* Citations */}
      <div className="bg-white border rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium mb-4 border-b pb-2">Citations</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Equivalent Citations</label>
          {formData.equivalentCitations.map((citation: string, index: number) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={citation}
                onChange={(e) => handleArrayChange("equivalentCitations", index, e.target.value)}
                placeholder="Enter citation"
              />
              <button
                type="button"
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                onClick={() => removeArrayItem("equivalentCitations", index)}
                disabled={formData.equivalentCitations.length === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={() => addArrayItem("equivalentCitations")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Citation
          </button>
        </div>
      </div>

      {/* Full Details */}
      <div className="bg-white border rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium mb-4 border-b pb-2">Full Details</h3>
        {formData.fulldetails.map((detail: string, index: number) => (
          <div key={index} className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Detail {index + 1}</label>
              <button
                type="button"
                className="flex items-center px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                onClick={() => removeArrayItem("fulldetails", index)}
                disabled={formData.fulldetails.length === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={detail}
              onChange={(e) => handleArrayChange("fulldetails", index, e.target.value)}
              placeholder="Enter detail"
              rows={4}
            />
          </div>
        ))}
        <button
          type="button"
          className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
          onClick={() => addArrayItem("fulldetails")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Detail
        </button>
      </div>

      <hr className="my-6" />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Update Document"}
        </button>
      </div>
    </form>
  )
}
