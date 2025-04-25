import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen p-20" style={{ backgroundColor: '#F6ECF5' }}>
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-pink-800 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-6">Effective Date: April 20, 2025</p>

        <section className="mb-6">
          <p className="text-gray-700 mb-4">
            We value your privacy. This Sentiment Analysis Web App does not collect, store, or share any personal data submitted by users.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-pink-700 mb-2">What We Collect</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Only the text input you provide for sentiment analysis</li>
            <li>No personal info, IP addresses, or cookies are stored</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-pink-700 mb-2">How Your Data Is Used</h2>
          <p className="text-gray-700">Text is only processed temporarily to generate results. Nothing is saved or logged.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-pink-700 mb-2">Third-Party Services</h2>
          <p className="text-gray-700">We don’t use ads or analytics. Any external APIs used don’t save your data.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-700 mb-2">Your Consent</h2>
          <p className="text-gray-700">By using this app, you agree to this privacy policy.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
