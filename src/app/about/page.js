'use client';

import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About ProperAid</h1>
        <p className="text-lg text-gray-700">
          ProperAid is a trusted legal services platform that connects individuals with top-tier lawyers across 
          various legal fields. Our mission is to make legal assistance **accessible, reliable, and efficient** for everyone.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">🔹 What We Do</h2>
          <ul className="text-gray-700 space-y-2">
            <li>✔️ **Lawyer Directory** – Find verified lawyers based on your legal needs.</li>
            <li>✔️ **Legal Resources** – Access guides & insights on legal matters.</li>
            <li>✔️ **Consultation Services** – Get expert legal advice quickly.</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">⭐ Why Choose ProperAid?</h2>
          <ul className="text-gray-700 space-y-2">
            <li>✔️ **Verified Lawyers** – We list only experienced professionals.</li>
            <li>✔️ **Easy Access** – Find legal help effortlessly.</li>
            <li>✔️ **Confidential & Secure** – Your privacy is our priority.</li>
          </ul>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>
        <p className="text-gray-700">Have questions? Contact us at <strong>info@ProperAid.com</strong></p>
      </div>
    </div>
  );
};

export default AboutUs;
