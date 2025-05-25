import { Users, CalendarCheck, UserCheck, Clock9 } from 'lucide-react';
import { useState ,useEffect} from 'react';
import { useLoaderData } from 'react-router-dom';
import AllDoctors from './DashboardItems/AllDoctors';
import PendingDoctor from './DashboardItems/PendingDoctor';
import PatientsItems from './DashboardItems/PatientsItems';

export default function Dashboard() {
  const { Doctors, Appointments, Patients, PendingDoctors } = useLoaderData();

  const [activeTab, setActiveTab] = useState('');

  // 💡 حالات مستقلة لكل item
  const [doctorList, setDoctorList] = useState(Doctors.allDoctors);
  const [patientsList, setPatientsList] = useState(Patients.Patients);
  const [unactivatedDoctors, setUnactivatedDoctors] = useState(
    PendingDoctors.pendingDoctors
  );



useEffect(() => {
  const reloadData = async () => {
    const [res1, res2, res3] = await Promise.all([
      fetch('/api/v1/doctors?limit=999999&page=1'),
      fetch('/api/v1/patients?limit=999999&page=1'),
      fetch('/api/v1/doctors/pending'),
    ]);

    const newDoctors = await res1.json();
    const newPatients = await res2.json();
    const newPending = await res3.json();

    setDoctorList(newDoctors.allDoctors);
    setPatientsList(newPatients.Patients);
    setUnactivatedDoctors(newPending.pendingDoctors);
  };

  reloadData();
}, [doctorList, patientsList, unactivatedDoctors]);



  const stats = [
    {
      label: 'Doctors',
      value: doctorList.length,
      icon: Users,
      color: 'bg-gradient-to-tr from-blue-500 to-indigo-500',
    },
    {
      label: 'Appointments',
      value: Appointments.results,
      icon: CalendarCheck,
      color: 'bg-gradient-to-tr from-pink-500 to-red-500',
    },
    {
      label: 'Patients',
      value: patientsList.length,
      icon: UserCheck,
      color: 'bg-gradient-to-tr from-green-500 to-emerald-500',
    },
    {
      label: 'Pending Doctors',
      value: unactivatedDoctors.length,
      icon: Clock9,
      color: 'bg-gradient-to-tr from-yellow-400 to-yellow-600 text-black',
    },
  ];

  return (
    <main className="items-top flex w-full justify-center bg-gradient-to-br from-[#f7faff] to-[#eef2f6] px-4">
      <div className="w-full max-w-6xl py-10">
        {/* Stats Buttons */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <button
              key={label}
              onClick={() => setActiveTab(activeTab !== label ? label : '')}
              className={`rounded-2xl p-6 shadow-lg ${color} flex items-center justify-between transition-all duration-300 hover:scale-[1.02] ${
                activeTab === label ? 'ring-4 ring-white/70' : ''
              }`}
            >
              <div>
                <p className="text-sm font-light">{label}</p>
                <h2 className="text-3xl font-bold">{value}</h2>
              </div>
              <Icon size={32} />
            </button>
          ))}
        </div>

        {/* Display Components */}
        {activeTab === 'Pending Doctors' && (
          <PendingDoctor
            PendingDoctors={unactivatedDoctors}
            onActivate={(id) =>
              setUnactivatedDoctors((prev) =>
                prev.filter((doc) => doc._id !== id)
              )
            }
          />
        )}

        {activeTab === 'Doctors' && (
          <AllDoctors
            Doctors={doctorList}
            onRemove={(id) =>
              setDoctorList((prev) => prev.filter((doc) => doc._id !== id))
            }
          />
        )}

        {activeTab === 'Patients' && (
          <PatientsItems
            Patients={patientsList}
            onRemove={(id) =>
              setPatientsList((prev) =>
                prev.filter((patient) => patient._id !== id)
              )
            }
          />
        )}
      </div>
    </main>
  );
}

export async function dashboardLoader() {
  const [res1, res2, res3, res4] = await Promise.all([
    fetch('/api/v1/doctors'),
    fetch('/api/v1/appointments'),
    fetch('/api/v1/patients?limit=999999&page=1'),

    fetch('/api/v1/doctors/pending'),
  ]);

  const allDoctors = await res1.json();
  const allAppointments = await res2.json();
  const allPatients = await res3.json();
  const pendingDoctors = await res4.json();

  return {
    Doctors: allDoctors,
    Appointments: allAppointments,
    Patients: allPatients,
    PendingDoctors: pendingDoctors,
  };
}
