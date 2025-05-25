import { useState } from "react";
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function ForgetPassword({ onBack, setShowConfirm }) {
  const [resetMessage, setResetMessage] = useState(null);
  const [emailForReset, setEmailForReset] = useState('');
  const [error, setError] = useState(null);
  const [tokenSent, setTokenSent] = useState(false);

  const handleForgotPassword = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/users/forgotPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailForReset }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setResetMessage(data.message || 'Check your email for reset code.');
      setTokenSent(data.message === "Token sent to email!");
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to send reset email.');
      setResetMessage(null);
      setTokenSent(false);
    }
  };

  const handleSendCode = () => {
    setShowConfirm(true); // ✅ this moves forward to confirmation UI
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg border border-blue-300 bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-blue-700">Forgot Password</h2>
        <p className="mb-6 mt-2 text-center text-sm text-gray-500">
          Enter your email to receive a reset token.
        </p>

        <div className="space-y-4">
          <input
            type="email"
            value={emailForReset}
            onChange={(e) => setEmailForReset(e.target.value)}
            placeholder="Your email"
            required
            className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={handleForgotPassword}
            className="w-full rounded-md bg-yellow-500 py-2 text-white hover:bg-yellow-600"
          >
            Send Reset Email
          </button>

          {resetMessage && (
            <p className="text-sm text-center text-green-600">{resetMessage}</p>
          )}
          {error && (
            <p className="text-sm text-center text-red-600">{error}</p>
          )}

          {tokenSent && (
            <button
              onClick={handleSendCode}
              className="w-full mt-2 rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700"
            >
              Send Code
            </button>
          )}

          <button
            onClick={onBack}
            className="w-full text-sm text-blue-600 hover:underline mt-4"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
