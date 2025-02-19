"use client"
import { useState } from "react";

export default function CreatePage() {
  const [formData, setFormData] = useState({
    applicationNo: "",
    fileddate: "",
    courtNo: "",
    inWhichCourt: "", // added inWhichCourt option
    Delivereddate: "",
    applicant: "",
    counselForApplicant: "",
    oppositeParty: "",
    counselForOppositeParty: "",
    "Equivalent citations": "",
    fulldetails: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");
    
    const response = await fetch("/api/consitution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      setMessage("Data created successfully!");
      setFormData({
        applicationNo: "",
        fileddate: "",
        courtNo: "",
        inWhichCourt: "", // reset inWhichCourt option
        Delivereddate: "",
        applicant: "",
        counselForApplicant: "",
        oppositeParty: "",
        counselForOppositeParty: "",
        "Equivalent citations": "",
        fulldetails: "",
      });
    } else {
      setMessage("Error: " + result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}
