import { Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function AllDoctors({ Doctors = [], onRemove }) {
  const [loadingId, setLoadingId] = useState(null);

  const handlePending = async (id) => {
    try {
      setLoadingId(id);
      const response = await fetch(`${BASE_URL}/api/v1/doctors/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: 'pending' }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Doctor activated:', data);
        onRemove?.(id); // notify parent to update list if provided
      } else {
        console.error('Failed to activate:', data.message);
      }
    } catch (error) {
      console.error('Error activating doctor:', error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleRejected = async (id) => {
    try {
      setLoadingId(id);
      const response = await fetch(`${BASE_URL}/api/v1/doctors/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Doctor activated:', data);
        onRemove?.(id); // notify parent to update list if provided
      } else {
        console.error('Failed to activate:', data.message);
      }
    } catch (error) {
      console.error('Error activating doctor:', error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
      <h3 className="mb-6 text-2xl font-bold text-gray-800">Active Doctors</h3>

      {Doctors.length === 0 ? (
        <p className="text-center text-gray-500">No pending doctors found.</p>
      ) : (
        <ul className="space-y-5">
          {Doctors.map((Doctor) => (
            <li
              key={Doctor._id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 p-4 transition-all hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={Doctor.profilePicture}
                  alt={Doctor.name}
                  className="h-14 w-14 rounded-full border border-gray-200 object-cover shadow-sm"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {Doctor.name}
                  </p>
                  <p className="text-sm font-medium text-blue-600">
                    {Doctor.specialization}
                  </p>
                  <p className="text-sm text-gray-500">{Doctor.email}</p>
                  <span className="mt-1 inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                    {Doctor.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handlePending(Doctor._id)}
                  disabled={loadingId === Doctor._id}
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    loadingId === Doctor._id
                      ? 'cursor-not-allowed bg-blue-200 text-blue-600'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {loadingId === Doctor._id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Pending...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      pending
                    </>
                  )}
                </button>

                {/* <button className="rounded-full bg-red-100 p-2 hover:bg-red-200 transition">
                  <Trash2 className="h-5 w-5 text-red-500" />
                </button> */}

                <button
                  onClick={() => handleRejected(Doctor._id)}
                  disabled={loadingId === Doctor._id}
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    loadingId === Doctor._id
                      ? 'cursor-not-allowed bg-red-200 text-red-600'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {loadingId === Doctor._id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Rejecting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Rejecting
                    </>
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
