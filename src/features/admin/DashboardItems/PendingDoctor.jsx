import { Trash2, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function PendingDoctor({ PendingDoctors = [], onActivate }) {
  const [loadingId, setLoadingId] = useState(null);




  const handleActivate = async (id) => {
    try {
      setLoadingId(id);
      const response = await fetch(`/api/v1/doctors/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: "accepted" }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Doctor activated:", data);
        onActivate?.(id); // notify parent to update list if provided
      } else {
        console.error("Failed to activate:", data.message);
      }
    } catch (error) {
      console.error("Error activating doctor:", error);
    } finally {
      setLoadingId(null);
    }
  };












  const handleRejected = async (id) => {
    try {
      setLoadingId(id);
      const response = await fetch(`/api/v1/doctors/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: "rejected" }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Doctor activated:", data);
        onActivate?.(id); // notify parent to update list if provided
      } else {
        console.error("Failed to activate:", data.message);
      }
    } catch (error) {
      console.error("Error activating doctor:", error);
    } finally {
      setLoadingId(null);
    }
  };



















  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl border border-gray-100">
      <h3 className="mb-6 text-2xl font-bold text-gray-800">
        Pending Doctors
      </h3>

      {PendingDoctors.length === 0 ? (
        <p className="text-gray-500 text-center">No pending doctors found.</p>
      ) : (
        <ul className="space-y-5">
          {PendingDoctors.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 p-4 transition-all hover:shadow-md hover:border-gray-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.profilePicture}
                  alt={item.name}
                  className="h-14 w-14 rounded-full object-cover border border-gray-200 shadow-sm"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    {item.specialization}
                  </p>
                  <p className="text-sm text-gray-500">{item.email}</p>
                  <span className="mt-1 inline-block text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">
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
                      ? "bg-emerald-200 text-emerald-600 cursor-not-allowed"
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
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
                      ? "bg-red-200 text-red-600 cursor-not-allowed"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
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
