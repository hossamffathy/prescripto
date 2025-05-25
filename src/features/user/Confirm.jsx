import { useState } from "react";
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function Confirm({ onBack }) {
  const [pin, setPin] = useState('');
  const [pinMessage, setPinMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleConfirmPin = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/users/emailConfirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Invalid PIN');

      setPinMessage(data.message || 'Email confirmed.');
      setError(null);
    } catch (err) {
      setPinMessage(null);
      setError(err.message || 'Invalid PIN.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg border border-blue-300 bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-blue-700">Confirm Email</h2>
        <p className="mb-6 mt-2 text-center text-sm text-gray-500">
          Enter the PIN you received via email to confirm your account.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter email confirmation PIN"
            className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
          />
          <button
            onClick={handleConfirmPin}
            className="w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-600"
          >
            Confirm Email
          </button>

          {pinMessage && (
            <p className="text-sm text-center text-green-600">{pinMessage}</p>
          )}
          {error && (
            <p className="text-sm text-center text-red-600">{error}</p>
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
