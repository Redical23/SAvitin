"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left font-semibold focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isOpen && <div className="px-6 pb-4">{children}</div>}
    </div>
  )
}

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 bg-white shadow-md rounded-lg">

      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <Section title="1. Introduction">
        <p>
          We, at Info Edge (India) Limited and our affiliated companies worldwide (hereinafter collectively referred to
          as "IEIL"), are committed to respecting your online privacy and recognize the need for appropriate protection
          and management of any personally identifiable information you share with us.
        </p>
        {/* Add more content here */}
      </Section>

      <Section title="2. Types of Personal Information collected by IEIL">
        <p>
          "Personal information" (PI) - means any information relating to an identified or identifiable natural person
          including common identifiers such as a name, an identification number, location data, an online identifier or
          one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social
          identity of that natural person and any other information that is so categorized by applicable laws.
        </p>
        {/* Add more content here */}
      </Section>

      <Section title="3. How IEIL may use your Personal Information">
        <p>
          We will only use your personal data in a fair and reasonable manner, and where we have a lawful reason to do
          so.
        </p>
        {/* Add more content here */}
      </Section>

      {/* Add more sections here */}

      <Section title="15. Data Protection Officer/ Grievance Officer">
        <p>
          In case you have any complaints and/or grievances in relation to the processing of your Personal Information
          you can send your complaints via e-mail to our grievance officer:
        </p>
        <p>
          Grievance Officer
          <br />
          Info Edge (India) Limited
          <br />
          Noida
          <br />
          Email: privacy@infoedge.com
        </p>
      </Section>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Cookie Policy</h2>

      <Section title="Introduction">
        <p>
          This Cookie Policy ("Policy") explains that we believe in being open and clear about how we use your
          information. In the spirit of transparency, this Policy provides detailed information about how and when we
          use cookies on our Websites.
        </p>
        {/* Add more content here */}
      </Section>

      {/* Add more cookie policy sections here */}
    </div>
  )
}

export default PrivacyPolicy

