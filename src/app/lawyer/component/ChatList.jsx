"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useModelContext } from "../../context/Context";

export const ChatList = () => {
  const { setcurrentchat, email } = useModelContext();
  const [clients, setClients] = useState([]); // This will hold the clients with their usernames and avatars
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      console.warn("Email is not available in context");
      return;
    }

    const fetchClients = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/message?lawyer=${encodeURIComponent(email)}`);
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        console.log("🚀 Clients data received:", data); // Check what data you receive

        if (Array.isArray(data.clients)) {
          // Now fetch the username and avatar for each participant in the conversation
          const clientData = await Promise.all(
            data.clients.map(async (clientEmail) => {
              // Ensure that we're passing only the string email for the client
              const userRes = await fetch(`/api/users?email=${encodeURIComponent(clientEmail)}`);
              const userData = await userRes.json();
              return {
                email: clientEmail,
                username: userData.username || "No Name", // Fallback if no username
                avatar: userData.avatar || "/images/default-avatar.png", // Fallback if no avatar
              };
            })
          );
          setClients(clientData); // Now set the clients array with additional data
        } else {
          throw new Error("Invalid response format from server");
        }
      } catch (err) {
        console.error("Error fetching clients:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [email]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  console.log(clients, "🚀 Clients with data");

  return (
    <div className="w-80 border-r border-gray-700 bg-[#001845] flex flex-col h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search clients"
            className="w-full p-3 pl-10 rounded-lg bg-[#002060] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none transition-all duration-200 hover:bg-[#002875]"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 overflow-y-auto"
      >
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 p-4"
          >
            Loading clients...
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 p-4"
          >
            Error: {error}
          </motion.div>
        ) : clients.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 p-4"
          >
            No clients found.
          </motion.div>
        ) : (
          clients.map((client, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.02, backgroundColor: "#002060" }}
              onClick={() => {
                setcurrentchat(client.email);
                console.log("💬 Chat selected:", client);
              }}
              className="flex items-center gap-3 p-4 cursor-pointer transition-colors"
            >
              <div className="relative">
                {/* Use client's avatar */}
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={client.avatar}
                  alt="Client Avatar"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                />
              </div>
              <div className="flex-1 min-w-0">
                {/* Use client's username */}
                <h3 className="font-semibold text-white truncate">
                  {client.username}
                </h3>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};
