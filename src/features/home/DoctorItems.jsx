import { Link, useLoaderData } from "react-router-dom";
import DoctorItem from "./DoctorItem";
import { useState } from "react";
import StarRating from "../doctors/StarRating";

export default function DoctorItems() {
  const doctors = useLoaderData();
  const [visibleCount, setVisibleCount] = useState(8);
  const handleLoadMore = () => setVisibleCount((prev) => prev + 8);
  const visibleDoctors = doctors.slice(0, visibleCount);
  const hasMore = visibleCount < doctors.length;
console.log(doctors)
  return (
    <div className="px-4 max-w-[1480px] mx-auto mt-16">
      {/* <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
        Meet Our Top Doctors
      </h1> */}

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
        {visibleDoctors.map((doctor) => (
          <Link
            key={doctor._id}
            to={`/profile/${doctor._id}`}
            className="transform transition duration-300 hover:scale-[1.03] hover:shadow-xl"
          >
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white hover:bg-indigo-50 transition-all duration-300 p-4">
              <div className="h-[400px] w-full overflow-hidden rounded-lg bg-indigo-100 flex items-center justify-center">
                <img
                  src={doctor.profilePicture}
                  alt={doctor.username}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800 capitalize">
                  {doctor.username.startsWith("Dr.") ? doctor.username : `Dr. ${doctor.username}`}
                </h2>
                <p className="text-sm text-gray-500">{doctor.specialization}</p>
                <div className="flex justify-center">

                <StarRating  className="m-auto" avgRating={doctor.averageRating}/>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-14">
          <button
            onClick={handleLoadMore}
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-semibold tracking-wide text-indigo-700 bg-indigo-100 rounded-full shadow-md transition duration-300 hover:bg-indigo-200 hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 transform scale-0 bg-indigo-500 group-hover:scale-100 opacity-20 rounded-full"></span>
            Show More
          </button>
        </div>
      )}
    </div>
  );
}


export async function fetchDoctors() {
  const res = await fetch("/api/v1/doctors?limit=999999&page=1"); ///api/v1/doctors/topdoctors
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to load doctors.");
  return data.allDoctors ; //data.topDoctors
}
