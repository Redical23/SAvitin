import React, { useState, useEffect } from "react";
import {  Scale,  Trash } from "lucide-react";
import { useModelContext } from "../../context/Context";

export const ChatHeader = () => {
  const { currentchat } = useModelContext();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleted, setDeleted] = useState(false); // Track if chat was deleted
  const decodedEmail = currentchat ? decodeURIComponent(currentchat) : null;
console.log(currentchat,"dsadassa")
  useEffect(() => {
    const fetchUserData = async () => {
      if (!decodedEmail) return;

      try {
        const res = await fetch(`/api/users?email=${encodeURIComponent(decodedEmail)}`, {
          method: 'GET',
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data); // Store user data in state
        } else {
          throw new Error(data.error || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message); // Set error message if fetch fails
      }
    };

    fetchUserData(); // Call the function to fetch data
  }, [decodedEmail]);

  const handleDelete = async () => {
    if (!decodedEmail) {
      setDeleteError("No chat to delete.");
      return;
    }

    setDeleting(true);
    setDeleteError(null);

    try {
      const res = await fetch("/api/message", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lawyer: user.email, // Assuming lawyer is the logged-in user
          clientEmail: decodedEmail, // The client being discussed in this chat
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Chat deleted successfully
        setDeleted(true); // Mark chat as deleted
        console.log("Chat deleted successfully:", data);
      } else {
        throw new Error(data.error || "Failed to delete chat");
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
      setDeleteError(error.message);
    } finally {
      setDeleting(false);
    }
  };

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-gray-400 p-4">Loading...</div>;
  }

  const { name, avatar, status, caseNumber, isLawyer } = user;

  return (
    <div className="flex items-center justify-between p-4 bg-[#001845] border-b border-gray-700">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
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
      <div className="flex items-center gap-4">
      

        {/* Delete Button */}
        <button 
          onClick={handleDelete} 
          disabled={deleting} 
          className={`p-2 hover:bg-[#B00020] rounded-full transition-colors ${deleting ? "opacity-50" : ""}`}
        >
          {deleting ? (
            <span className="text-white">Deleting...</span>
          ) : (
            <Trash className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {deleteError && <div className="text-red-500 p-2">{deleteError}</div>}
      
      {/* Display message to refresh the page if chat is deleted */}
      {deleted && (
        <div className="text-green-500 p-2">
          Chat deleted successfully! Please refresh the page.
        </div>
      )}
    </div>
  );
};
