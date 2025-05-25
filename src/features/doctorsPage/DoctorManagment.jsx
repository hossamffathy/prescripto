

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import AvailabilityList from './AvailabilityList';
import PharmaceuticalForm from './PharmaceuticalForm';
import DoctorHeader from './DoctorHeader';
import FactoryForm from './FactoryForm';
import Prescription from './Prescriptions';
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function DoctorManagement() {
  const doctor = useSelector((state) => state.doctor);
  const id = doctor.id;
  const [activeTab, setActiveTab] = useState('patients');

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!id) return; // تأكد أن الـ id موجود

    const fetchAppointments = async () => {
      try {
        const res = await fetch(`/api/v1/appointments/all/${id}`); //
        const data = await res.json();
        setAppointments(data.allAppointments || []);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/reviews/doctor/${id}`); //64b093301f07f3fef0d6872b
        const data = await res.json();
        setReviews(data.data?.reviews || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchAppointments();
    fetchReviews();
  }, [id]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return (
      date.toLocaleDateString() +
      ' - ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

    if (doctor.role !== "Doctor") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50">
        <div className="rounded-lg border border-red-300 bg-white p-6 shadow-md">
          <h1 className="text-xl font-semibold text-red-600">Access Denied</h1>
          <p className="mt-2 text-gray-600">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

if (doctor.status === "pending") {
  return (
    <div className="flex min-h-screen items-center justify-center bg-yellow-50">
      <div className="rounded-lg border border-yellow-300 bg-white p-6 shadow-md">
        <h1 className="text-xl font-semibold text-yellow-600">Pending Approval</h1>
        <p className="mt-2 text-gray-600">
          Your account is under review. You will be notified once it's approved.
        </p>
      </div>
    </div>
  );
}

  return (
    <>
      <DoctorHeader />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mb-6 rounded-lg border border-blue-300 bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold text-blue-600">
            Doctor Management Panel
          </h1>
          <p className="mt-2 text-gray-700">
            Welcome, Doctor. Here you can manage your patients, appointments,
            reviews, and availability.
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {[
            'patients',
            'appointments',
            'reviews',
            'availability',
            "prescriptions",
            'pharmaceuticals',
            'factories',
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded px-4 py-2 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'border bg-white text-blue-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          {activeTab === 'appointments' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Your Appointments</h2>

              {loadingAppointments ? (
                <p className="animate-pulse text-blue-600">
                  Loading appointments...
                </p>
              ) : appointments.length === 0 ? (
                <p className="text-gray-500">No appointments found.</p>
              ) : (
                <div className=" grid max-h-[500px] grid-cols-1 gap-4 overflow-scroll md:grid-cols-2">
                  {appointments.map((appt) => (
                    <div
                      key={appt._id}
                      className={`rounded-lg border-l-4 p-4 shadow ${
                        appt.status === 'booked'
                          ? 'border-green-500 bg-green-50'
                          : 'border-yellow-500 bg-yellow-50'
                      }`}
                    >
                      <p className="font-bold text-gray-800">
                        📅 {formatDate(appt.date)}
                      </p>
                      <p className="text-sm text-gray-700">
                        💳 {appt.paid ? 'Paid' : 'Not Paid'}
                      </p>
                      <p className="text-sm text-gray-700">
                        💰 {appt.price} EGP
                      </p>
                      <p className="text-sm text-gray-700">
                        📌 Status:{' '}
                        <span
                          className={`font-semibold ${
                            appt.status === 'booked'
                              ? 'text-green-700'
                              : 'text-yellow-700'
                          }`}
                        >
                          {appt.status}
                        </span>
                      </p>
                      {appt.patient && (
                        <p className="mt-1 text-sm italic text-gray-600">
                          👤 Patient ID: {appt.patient}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'pharmaceuticals' && <PharmaceuticalForm />}
          {activeTab === 'factories' && <FactoryForm />}
          {activeTab === 'availability' && <AvailabilityList />}
          {activeTab === 'prescriptions' && <Prescription />}

          {activeTab === 'patients' && (
            <div>
              <h2 className="mb-2 text-xl font-semibold">Your Patients</h2>
              <ul className="ml-5 list-disc text-gray-700">
                <li>Ahmed Hassan – Diabetes</li>
                <li>Sara Mostafa – High Blood Pressure</li>
                <li>Youssef Ibrahim – Asthma</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-blue-600">
                Patient Reviews
              </h2>
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-sm text-gray-500">No reviews found.</p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="rounded-xl border border-gray-200 bg-white p-4 shadow transition hover:shadow-md"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="text-lg font-medium text-gray-800">
                          👤 {review.patient?.name || 'Anonymous'}
                        </div>
                        <div className="text-sm text-yellow-500">
                          {'⭐'.repeat(review.rating)}
                        </div>
                      </div>
                      <p className="italic text-gray-700">"{review.comment}"</p>
                      <p className="mt-2 text-xs text-gray-400">
                        🗓 {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
