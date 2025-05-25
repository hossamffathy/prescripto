import { Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function PatientsItems({ Patients = [], onActivate }) {
  const [loadingId, setLoadingId] = useState(null);
  console.log(Patients);

  const handleActivate = async (id) => {
    try {
      setLoadingId(id);
      const response = await fetch(`${BASE_URL}/api/v1/doctors/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: 'accepted' }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Doctor activated:', data);
        onActivate?.(id); // notify parent to update list if provided
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
        onActivate?.(id); // notify parent to update list if provided
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
      <h3 className="mb-6 text-2xl font-bold text-gray-800">patients</h3>

      {Patients.length === 0 ? (
        <p className="text-center text-gray-500">No pending doctors found.</p>
      ) : (
        <ul className="space-y-5">
          {Patients.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 p-4 transition-all hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.profilePicture}
                  alt={item.name}
                  className="h-14 w-14 rounded-full border border-gray-200 object-cover shadow-sm"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm font-medium text-blue-600">
                    {item.specialization}
                  </p>
                  <p className="text-sm text-gray-500">{item.email}</p>
                  <span className="mt-1 inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleActivate(item._id)}
                  disabled={loadingId === item._id}
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    loadingId === item._id
                      ? 'cursor-not-allowed bg-emerald-200 text-emerald-600'
                      : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  }`}
                >
                  {loadingId === item._id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Activating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Activate
                    </>
                  )}
                </button>

                {/* <button className="rounded-full bg-red-100 p-2 hover:bg-red-200 transition">
                  <Trash2 className="h-5 w-5 text-red-500" />
                </button> */}

                <button
                  onClick={() => handleRejected(item._id)}
                  disabled={loadingId === item._id}
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    loadingId === item._id
                      ? 'cursor-not-allowed bg-red-200 text-red-600'
                      : 'bg-red-100 text-red-700 hover:bg-emerald-200'
                  }`}
                >
                  {loadingId === item._id ? (
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
