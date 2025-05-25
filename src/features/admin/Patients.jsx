import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // optional if API returns total count
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/patients?limit=${limit}&page=${page}`);
      const data = await res.json();
      setPatients(data.Patients);
      // If total count is returned by API, calculate total pages:
      // setTotalPages(Math.ceil(data.totalCount / limit));
    } catch (err) {
      console.error("Failed to fetch patients", err);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    // Optional boundary: if totalPages is known
    // if (page < totalPages)
    setPage((prev) => prev + 1);
  };

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50">
     
       <h2 className="m-auto  mb-6 w-full p-4  text-center text-4xl font-bold text-blue-700 shadow-md">
        All <span className="text-gray-900">Patients</span>
      </h2>

      {loading ? (
        <p className="text-blue-500 animate-pulse text-center">Loading patients...</p>
      ) : patients.length === 0 ? (
        <p className="text-gray-600 text-center">No patients found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {patients.map((patient) => (
              <div
                key={patient._id}
                className={`bg-white border rounded-xl shadow-sm p-4 flex flex-col items-center text-center transition-transform hover:scale-[1.02] ${
                  patient.confirmed ? "border-green-400" : "border-red-400"
                }`}
              >
                <img
                  src={patient.profilePicture}
                  alt={patient.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  {patient.name}
                  {patient.confirmed ? (
                    <span className="text-green-600 text-sm">(Confirmed)</span>
                  ) : (
                    <span className="text-red-600 text-sm">(Not Confirmed)</span>
                  )}
                </h3>
                <p className="text-sm text-gray-500 mb-1">{patient.email}</p>
                <p className="text-sm text-gray-600 capitalize">Gender: {patient.gender}</p>
                <p className="text-sm text-gray-600">Weight: {patient.weight} kg</p>
                <p className="text-sm text-gray-600">Height: {patient.height} cm</p>
                <p className="text-sm text-gray-600">Blood Type: {patient.bloodType || "N/A"}</p>
                <button className="mt-3 text-blue-600 text-sm hover:underline">
                  View Profile
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Prev
            </button>

            <span className="text-gray-700 font-semibold text-sm">Page {page}</span>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition bg-white text-gray-700 border hover:bg-gray-100"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
