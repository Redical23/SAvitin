"use client";

import { useState } from "react";

export default function AdminPage() {
  // State for News Data form
  const [newsFormData, setNewsFormData] = useState({
    headline: "",
    description: "",
    content: "",
    date: "",
    image: "",
    category: "",
    readTime: "",
    role: "",
  });
  const [newsResponseMessage, setNewsResponseMessage] = useState("");

  // State for Constitution Data form
  const [constitutionFormData, setConstitutionFormData] = useState({
    applicationNo: "",
    fileddate: "",
    courtNo: "",
    inWhichCourt: "",
    Delivereddate: "",
    applicant: "",
    counselForApplicant: "",
    oppositeParty: "",
    counselForOppositeParty: "",
    "Equivalent citations": "",
    fulldetails: "",
  });
  const [constitutionMessage, setConstitutionMessage] = useState("");

  // Handlers for News Data form
  const handleNewsChange = (e) => {
    setNewsFormData({ ...newsFormData, [e.target.name]: e.target.value });
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    setNewsResponseMessage("Submitting...");
    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newsFormData),
    });
    const data = await res.json();
    if (res.ok) {
      setNewsResponseMessage(`Success! Created ID: ${data.createdId}`);
      setNewsFormData({
        headline: "",
        description: "",
        content: "",
        date: "",
        image: "",
        category: "",
        readTime: "",
        role: "",
      });
    } else {
      setNewsResponseMessage(`Error: ${data.message}`);
    }
  };

  // Handlers for Constitution Data form
  const handleConstitutionChange = (e) => {
    setConstitutionFormData({
      ...constitutionFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConstitutionSubmit = async (e) => {
    e.preventDefault();
    setConstitutionMessage("Submitting...");
    const res = await fetch("/api/consitution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(constitutionFormData),
    });
    const result = await res.json();
    if (res.ok) {
      setConstitutionMessage("Data created successfully!");
      setConstitutionFormData({
        applicationNo: "",
        fileddate: "",
        courtNo: "",
        inWhichCourt: "",
        Delivereddate: "",
        applicant: "",
        counselForApplicant: "",
        oppositeParty: "",
        counselForOppositeParty: "",
        "Equivalent citations": "",
        fulldetails: "",
      });
    } else {
      setConstitutionMessage("Error: " + result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* News Data Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create News Data</h2>
            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <div>
                <label htmlFor="headline" className="block text-sm font-medium text-gray-700">
                  Headline:
                </label>
                <input
                  type="text"
                  id="headline"
                  name="headline"
                  value={newsFormData.headline}
                  onChange={handleNewsChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newsFormData.description}
                  onChange={handleNewsChange}
                  required
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content:
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newsFormData.content}
                  onChange={handleNewsChange}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date:
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newsFormData.date}
                  onChange={handleNewsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL:
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={newsFormData.image}
                  onChange={handleNewsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={newsFormData.category}
                  onChange={handleNewsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="readTime" className="block text-sm font-medium text-gray-700">
                  Read Time:
                </label>
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={newsFormData.readTime}
                  onChange={handleNewsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role:
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={newsFormData.role}
                  onChange={handleNewsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Create News Data
              </button>
            </form>
            {newsResponseMessage && (
              <p className="mt-4 text-center text-sm text-gray-600">{newsResponseMessage}</p>
            )}
          </div>

          {/* Constitution Data Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create Constitution Data</h2>
            <form onSubmit={handleConstitutionSubmit} className="space-y-4">
              {Object.keys(constitutionFormData).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={constitutionFormData[key]}
                    onChange={handleConstitutionChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Submit Constitution Data
              </button>
            </form>
            {constitutionMessage && (
              <p className="mt-4 text-center text-sm text-red-500">{constitutionMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
