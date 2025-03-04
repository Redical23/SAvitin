"use client"
import React, { useState } from 'react';
import Studentbar from "../../slidebar/studentbar";
import Studentsec from "../internship/studentsec";
import Footer from '../../slidebar/FOOTER';

const Page = () => {
  const [selectedSection, setSelectedSection] = useState("internship");

  return (
    <div>

    <div className="flex">
      <Studentbar setSelectedSection={setSelectedSection} />
      <Studentsec selectedSection={selectedSection} />
    </div>
    <Footer/>
    </div>
  );
};

export default Page;
