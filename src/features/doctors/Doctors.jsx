
import { useLoaderData } from "react-router-dom";
import Footer from "../home/Footer";
import React, { useState } from "react";
import { CalendarCheck, UserCircle } from "lucide-react";
import {Link} from "react-router-dom"
export default function Doctors() {
    const { allDoctors, specialists } = useLoaderData();
    const [selectedSpec, setSelectedSpec] = useState("All");
  
    const filteredSpecialists = specialists.filter(spec =>
      allDoctors.some(doc => doc.specialization === spec)
    );
  
    const filteredDoctors =
      selectedSpec === "All"
        ? allDoctors
        : allDoctors.filter((doc) => doc.specialization === selectedSpec);
  
    return (
      <main className="p-6 bg-gradient-to-b from-blue-50 via-white to-white min-h-screen">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 lg:w-1/5 bg-white rounded-xl p-4 shadow">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Filter by Specialization
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedSpec("All")}
                className={`w-full px-4 py-2 text-left rounded-lg transition-all duration-300 border border-gray-200 hover:bg-blue-100 ${
                  selectedSpec === "All"
                    ? "bg-blue-600 text-white font-semibold"
                    : ""
                }`}
              >
                All
              </button>
              {filteredSpecialists.map((spec, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSpec(spec)}
                  className={`w-full px-4 py-2 text-left rounded-lg transition-all duration-300 border border-gray-200 hover:bg-blue-100 ${
                    selectedSpec === spec
                      ? "bg-blue-600 text-white font-semibold"
                      : ""
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </aside>
  
          {/* Doctors Grid */}
          <section className="w-full md:w-3/4 lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doc, index) => (
              <Link to={`/profile/${doc._id}`}
                key={index}
                className="border rounded-2xl p-4 shadow-md hover:shadow-xl transition bg-white relative flex flex-col justify-between"
              >
                <span className="left-3 text-green-600 text-sm font-medium flex items-center">
                  ● Available
                </span>
  
                <img
                  src={doc.profilePicture}
                  alt={doc.name}
                  className="w-full h-[300px] object-cover rounded-xl mb-4"
                />
  
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <UserCircle size={18} />
                    {doc.name}
                  </h3>
                  <p className="text-sm text-gray-600">{doc.specialization}</p>
                </div>
  
                <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <CalendarCheck size={18} />
                  Book Appointment
                </button>
              </Link>
            ))}
          </section>
        </div>
  
        <Footer />
      </main>
    );
  }
  export async function allDoctors() {
    const res1 = await fetch("/api/v1/doctors?limit=999999&page=1");
    const doctorsData = await res1.json();
  
    const res2 = await fetch("/api/v1/doctors/specialists");
    const specialistsData = await res2.json();
  
    return {
      allDoctors: doctorsData.allDoctors,
      specialists: specialistsData.specialists,
    }}