'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: "What is ProperAid?",
    answer: "ProperAid is a legal services platform connecting individuals with top-tier lawyers across various fields.",
  },
  {
    question: "How do I find a lawyer?",
    answer: "You can browse our lawyer directory and filter by practice area to find the right lawyer for your needs.",
  },
  {
    question: "Is ProperAid free to use?",
    answer: "Yes, browsing lawyers and resources is free. However, lawyer consultation fees may apply.",
  },
  {
    question: "How do I join ProperAid as a lawyer?",
    answer: "You can apply through the 'Join Our Network' page by submitting your credentials.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <button 
                className="w-full text-left flex justify-between items-center text-lg font-medium text-gray-800"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-gray-500">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && <p className="text-gray-700 mt-2">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
