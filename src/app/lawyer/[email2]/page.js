"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useModelContext } from "../../context/Context";

export default function EmailPage({ params }) {
  const router = useRouter();
  const { email, setclientemail } = useModelContext();
  const [user, setUser] = useState(null); // To store fetched user data (avatar, username)
  const [error, setError] = useState(null); // To handle errors

  console.log("🚀 EmailPage Mounted");
  console.log("🔍 Params:", params);

  // Ensure params exist and extract email2 properly
  const email2 = params?.email2 ? decodeURIComponent(params.email2) : null;
  console.log("📩 Extracted email2:", email2);

  // Fetch user data (avatar, username) for the provided email
  const fetchUserData = async (email2) => {
    try {
      const res = await fetch(`/api/users?email=${encodeURIComponent(email2)}`);
      const data = await res.json();

      if (res.ok) {
        setUser(data); // Store the user data in state
        console.log("👤 Fetched user data for email2:", data);
      } else {
        setError(data.error); // Handle errors
        console.error("❌ Error fetching user data:", data.error);
      }
    } catch (error) {
      setError("Failed to fetch user data");
      console.error("❌ Error fetching user data:", error);
    }
  };

  // Initialize conversation with the fetched user data
  const initializeConversation = async (email, email2, user) => {
    if (!email2 || !user) return; // Wait for user data before initializing conversation

    console.log("📡 Initializing conversation...");
    console.log("Lawyer:", email, "Client:", email2);

    try {
      // Ensure avatar and username are set
      const avatar = user.avatar || "/images/default-avatar.png";
      const username = user.username || "Client";

      if (!user.avatar) {
        console.warn("⚠️ User avatar is missing, using default.");
      }

      if (!user.username) {
        console.warn("⚠️ User username is missing, using 'Client' as default.");
      }

      const messageContent = `Hello, ${username}!`;

      const res = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: email,
          to: email2,
          content: messageContent,
          avatar: avatar, // Send user's avatar if available
          username: username, // Send user's username if available
        }),
      });

      const data = await res.json();
      console.log("📨 Server Response:", data);

      if (!res.ok) {
        console.error("❌ Failed to initialize conversation. Status:", res.status);
      } else {
        console.log("✅ Conversation initialized successfully. Redirecting...");
        router.push("/lawyer/chats");
      }
    } catch (error) {
      console.error("❌ Error initializing conversation:", error);
    }
  };

  // When email2 changes, fetch the user data and initialize conversation
  useEffect(() => {
    if (!email2) {
      console.warn("⚠️ No email2 provided in params. Skipping...");
      return;
    }

    setclientemail(email2);
    console.log("✅ Client email set in context:", email2);

    // Fetch user data and then initialize the conversation
    fetchUserData(email2);
  }, [email2, setclientemail]);

  useEffect(() => {
    if (user) {
      initializeConversation(email, email2, user);
    }
  }, [user, email, email2]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#001845]">
      <div className="bg-[#001230] p-8 rounded-lg shadow-lg">
        <p className="text-white text-lg">Setting up your chat...</p>
      </div>
    </div>
  );
}
