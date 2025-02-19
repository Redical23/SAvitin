'use client';

import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Terms of Service</h1>
        
        <p className="text-gray-700 mb-4">
          Welcome to ProperAid! By accessing or using our services, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">1. Acceptance of Terms</h2>
        <p className="text-gray-700 mb-4">
          By using ProperAid, you acknowledge that you have read and agree to these terms. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">2. User Responsibilities</h2>
        <p className="text-gray-700 mb-4">
          Users are responsible for providing accurate information when using ProperAid’s services. Any misuse or fraudulent activities will result in immediate termination of access.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">3. Legal Disclaimer</h2>
        <p className="text-gray-700 mb-4">
          ProperAid is a lawyer referral service. We do not provide legal advice or representation. Users should consult a professional lawyer for legal matters.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">4. Modifications</h2>
        <p className="text-gray-700 mb-4">
          ProperAid reserves the right to update or modify these terms at any time. Users are encouraged to review this page periodically.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">5. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about our terms, please contact us at <strong>info@ProperAid.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
