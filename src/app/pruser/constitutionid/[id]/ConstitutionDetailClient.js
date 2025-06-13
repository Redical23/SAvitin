"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Footer from "../../../slidebar/FOOTER"
import { useModelContext } from "../../../context/Context"

export default function ConstitutionDetailClient({ userData }) {
  const { email } = useModelContext()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(userData || {})
  const [loading, setLoading] = useState(false)

  // Check admin status
  useEffect(() => {
    if (email) {
      fetch(`/api/users?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("User data:", data)
          setIsAdmin(data.admin)
        })
        .catch((err) => console.error(err))
    }
  }, [email])

  // Update editData when userData changes
  useEffect(() => {
    if (userData) {
      setEditData(userData)
    }
  }, [userData])

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/consitution?id=${userData._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        alert("Document deleted successfully!")
        router.push("/constitution") // Redirect to constitution list page
      } else {
        const error = await response.json()
        alert(`Failed to delete document: ${error.error}`)
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("An error occurred while deleting the document.")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/consitution?id=${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      })

      if (response.ok) {
        const updatedData = await response.json()
        alert("Document updated successfully!")
        setIsEditing(false)
        // You might want to refresh the page or update the userData prop
        window.location.reload()
      } else {
        const error = await response.json()
        alert(`Failed to update document: ${error.error}`)
      }
    } catch (error) {
      console.error("Update error:", error)
      alert("An error occurred while updating the document.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditData(userData)
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Document Not Found</h1>
          <p className="text-lg text-slate-300">The legal document you're looking for does not exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-slate-800 text-white p-6 sm:p-8">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Application No:{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.applicationNo || ""}
                        onChange={(e) => handleInputChange("applicationNo", e.target.value)}
                        className="bg-slate-700 text-white px-2 py-1 rounded border border-slate-600"
                      />
                    ) : (
                      userData.applicationNo
                    )}
                  </h1>
                  <p className="text-slate-300">
                    Filed on:{" "}
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.fileddate || ""}
                        onChange={(e) => handleInputChange("fileddate", e.target.value)}
                        className="bg-slate-700 text-white px-2 py-1 rounded border border-slate-600 ml-2"
                      />
                    ) : (
                      userData.fileddate || "N/A"
                    )}
                  </p>
                </div>

                {/* Admin Action Buttons */}
                {isAdmin && (
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={loading}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleEdit}
                          disabled={loading}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          disabled={loading}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {loading ? "Deleting..." : "Delete"}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Court Information */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Court Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Court No</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.courtNo || ""}
                        onChange={(e) => handleInputChange("courtNo", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-base font-medium">{userData.courtNo || "N/A"}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Delivered Date</p>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.Delivereddate || ""}
                        onChange={(e) => handleInputChange("Delivereddate", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-base font-medium">{userData.Delivereddate || "N/A"}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Parties Information */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Parties Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-500">Applicant</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.applicant || ""}
                        onChange={(e) => handleInputChange("applicant", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                      />
                    ) : (
                      <p className="text-base font-medium">{userData.applicant || "N/A"}</p>
                    )}
                    <p className="text-sm text-slate-500 mt-2">Counsel</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.counselForApplicant || ""}
                        onChange={(e) => handleInputChange("counselForApplicant", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                      />
                    ) : (
                      <p className="text-base font-medium">{userData.counselForApplicant || "N/A"}</p>
                    )}
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-500">Opposite Party</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.oppositeParty || ""}
                        onChange={(e) => handleInputChange("oppositeParty", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                      />
                    ) : (
                      <p className="text-base font-medium">{userData.oppositeParty || "N/A"}</p>
                    )}
                    <p className="text-sm text-slate-500 mt-2">Counsel</p>
                    {isEditing ? (
                      <textarea
                        value={
                          Array.isArray(editData.counselForOppositeParty)
                            ? editData.counselForOppositeParty.join(", ")
                            : editData.counselForOppositeParty || ""
                        }
                        onChange={(e) => handleInputChange("counselForOppositeParty", e.target.value.split(", "))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                        rows="2"
                      />
                    ) : (
                      <p className="text-base font-medium">
                        {Array.isArray(userData.counselForOppositeParty)
                          ? userData.counselForOppositeParty.join(", ")
                          : userData.counselForOppositeParty || "N/A"}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Citations */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Citations</h2>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-500">Equivalent Citations</p>
                  {isEditing ? (
                    <textarea
                      value={
                        Array.isArray(editData["Equivalent citations"])
                          ? editData["Equivalent citations"].join(", ")
                          : editData["Equivalent citations"] || ""
                      }
                      onChange={(e) => handleInputChange("Equivalent citations", e.target.value.split(", "))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                      rows="2"
                    />
                  ) : (
                    <p className="text-base font-medium">
                      {Array.isArray(userData["Equivalent citations"])
                        ? userData["Equivalent citations"].join(", ")
                        : userData["Equivalent citations"] || "N/A"}
                    </p>
                  )}
                </div>
              </section>

              {/* Full Details */}
              {userData.fulldetails && Array.isArray(userData.fulldetails) && (
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Full Details</h2>
                  <div className="space-y-4">
                    {(isEditing ? editData.fulldetails || [] : userData.fulldetails).map((detail, index) => (
                      <div key={index} className="bg-slate-50 p-4 rounded-lg">
                        {isEditing ? (
                          <textarea
                            value={detail}
                            onChange={(e) => {
                              const newDetails = [...(editData.fulldetails || [])]
                              newDetails[index] = e.target.value
                              handleInputChange("fulldetails", newDetails)
                            }}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                          />
                        ) : (
                          <p className="text-base">{detail}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
