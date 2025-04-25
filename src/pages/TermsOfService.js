import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen p-20" style={{ backgroundColor: '#F6ECF5' }}>
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-pink-800 mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-6">Effective Date: April 20, 2025</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-pink-700 mb-2">1. Usage</h2>
          <p className="text-gray-700">
            This app is for educational and demo purposes. Don’t misuse or try to break its functionality.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-pink-700 mb-2">2. Accuracy</h2>
          <p className="text-gray-700">
            Sentiment predictions might not always be accurate. Use with discretion.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-pink-700 mb-2">3. Limitation of Liability</h2>
          <p className="text-gray-700">
            We’re not liable for any issues caused by using or misusing the app.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-pink-700 mb-2">4. Changes</h2>
          <p className="text-gray-700">
            We may update these terms. Continuing to use the app means you accept any changes.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
