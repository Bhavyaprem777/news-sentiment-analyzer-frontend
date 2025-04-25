import React, { useState } from 'react';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError('Please enter both name and email.');
      return;
    }

    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F6ECF5' }}>
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 relative">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-medium mb-2">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
            placeholder="e.g., Bhavya"
          />

          <label className="block text-gray-700 font-medium mb-2">Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="e.g., bhavya@example.com"
          />

          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="text-pink-600 hover:underline font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

        {showPopup && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-2xl transition-all">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-pink-700">Hello {name} 👋</h3>
              <p className="text-gray-600 mt-2">Welcome to Sentiment App!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
