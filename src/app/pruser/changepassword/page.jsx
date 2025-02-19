"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useModelContext } from "../../context/Context"
import { motion } from "framer-motion"

const ChangePassword = () => {
  const { email } = useModelContext()
  const decodedEmail = email ? decodeURIComponent(email) : null
  const router = useRouter()

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    if (!decodedEmail) {
      setError("User email not found.")
      setLoading(false)
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/changepass", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: decodedEmail,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to update password.")
      }

      setSuccess("Password updated successfully!")
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })

      setTimeout(() => router.push("/pruser/homepage"), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020B2C] to-[#0D1B4A] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Change Password</h2>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 mb-4 text-center">
            {error}
          </motion.p>
        )}
        {success && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 mb-4 text-center">
            {success}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/5 border border-gray-600 rounded-md text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/5 border border-gray-600 rounded-md text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/5 border border-gray-600 rounded-md text-white"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Updating..." : "Change Password"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default ChangePassword

