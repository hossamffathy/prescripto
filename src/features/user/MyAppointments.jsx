import React from 'react';

const appointments = [
  {
    id: 1,
    doctorName: 'Dr. Richard James',
    specialization: 'General physician',
    address: '57th Cross, Richmond Circle, Church Road, London',
    dateTime: '25, July, 2024 | 8:30 PM',
    status: 'unpaid',
  },
  {
    id: 2,
    doctorName: 'Dr. Richard James',
    specialization: 'General physician',
    address: '57th Cross, Richmond Circle, Church Road, London',
    dateTime: '25, July, 2024 | 8:30 PM',
    status: 'unpaid',
  },
  {
    id: 3,
    doctorName: 'Dr. Richard James',
    specialization: 'General physician',
    address: '57th Cross, Richmond Circle, Church Road, London',
    dateTime: '25, July, 2024 | 8:30 PM',
    status: 'paid',
  },
];

function MyAppointments() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-6">My Appointments</h2>

      <div className="space-y-4">
        {appointments.map((app) => (
          <div
            key={app.id}
            className="flex items-start justify-between border p-4 rounded-md shadow-sm"
          >
            {/* Doctor info */}
            <div className="flex gap-4">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/19/56/doctor-1295563_1280.png"
                alt="Doctor"
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{app.doctorName}</h3>
                <p className="text-sm text-gray-600">{app.specialization}</p>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Address:</span> {app.address}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Date & Time:</span>{' '}
                  {app.dateTime}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 items-end">
              {app.status === 'unpaid' && (
                <button className="bg-[#5F6FFF] text-white px-4 py-2 rounded hover:bg-[#4b59d9] transition">
                  Pay here
                </button>
              )}
              {app.status === 'paid' && (
                <button className="bg-[#5F6FFF] text-white px-4 py-2 rounded" disabled>
                  Paid
                </button>
              )}
              <button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100 transition">
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
