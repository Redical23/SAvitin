import React from 'react';

const Studentbar = ({ setSelectedSection }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2 cursor-pointer hover:text-gray-400" onClick={() => setSelectedSection("internship")}>
          Internship
        </li>
        <li className="mb-2 cursor-pointer hover:text-gray-400" onClick={() => setSelectedSection("course")}>
          Course
        </li>
        <li className="mb-2 cursor-pointer hover:text-gray-400" onClick={() => setSelectedSection("consiling")}>
          Consiling
        </li>
      </ul>
    </div>
  );
};

export default Studentbar;
