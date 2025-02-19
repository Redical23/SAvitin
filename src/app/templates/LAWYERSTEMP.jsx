"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LAWYERSTEMP = ({ users }) => {
  const router = useRouter();
  const [shuffledUsers, setShuffledUsers] = useState([]);

  // Shuffle on client-side only
  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = array.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    setShuffledUsers(shuffleArray(users));
  }, [users]);

  const handleCardClick = (user) => {
    router.push(`/userid/${user._id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {shuffledUsers.map((user) => (
        <div
          key={user._id}
          onClick={() => handleCardClick(user)}
          className="cursor-pointer bg-gray-700 rounded-xl shadow-md overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg"
        >
          <div className="relative">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="User avatar"
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
              {user.location}
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-gray-300 text-sm mt-2">{user.specialization}</p>
            <div className="flex justify-between text-sm text-gray-400 mt-3">
              <span>{user.yearsexp} Years Experience</span>
              <span>${user.charge}/hour</span>
            </div>
            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-all">
              Schedule Consultation
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LAWYERSTEMP;
