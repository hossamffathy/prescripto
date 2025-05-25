import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function FactoryList() {
  const [factories, setFactories] = useState([]);
  const [loading, setLoading] = useState(true);
const myId=useSelector(state=>state.doctor.id)
console.log(myId)
console.log(factories)
  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const res = await fetch('/api/v1/factories');
        const data = await res.json();
        setFactories(data.data || []);
      } catch (error) {
        console.error('Failed to fetch factories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFactories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 pb-12 flex flex-col items-center">
<h2 className="text-4xl  p-4 w-full text-center  m-auto font-bold mb-6 shadow-md text-blue-700">
         Pharmaceutical <span className='text-gray-900'>Factories</span>
      </h2>
      {loading ? (
        <p className="text-blue-600 animate-pulse">Loading factories...</p>
      ) : factories.length === 0 ? (
        <p className="text-gray-600">No factories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          {factories.map((factory) => (
            <div
              key={factory._id}
              className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500"
            >
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">{factory.name}</h2>
              <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {factory.location}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>License:</strong> {factory.licenseNumber}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Status:</strong> <span className="capitalize text-green-700 font-medium">{factory.status}</span></p>
              <p className="text-sm text-gray-600 mb-1"><strong>Capacity:</strong> {factory.productionCapacity.toLocaleString()} units</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Contact:</strong> {factory.contactInfo?.email} | {factory.contactInfo?.phone}</p>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Pharmaceuticals</h3>
                {factory.pharmaceuticals?.length > 0 ? (
                  <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
                    {factory.pharmaceuticals.map((p) => (
                      <li key={p._id}><strong>{p.name}</strong> – {p.genericName} ({p.strength})</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No pharmaceuticals listed.</p>
                )}
              </div>

              <div className="mt-4 bg-green-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-green-700 mb-2">Certifications</h3>
                {factory.certifications?.length > 0 ? (
                  <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
                    {factory.certifications.map((cert) => (
                      <li key={cert._id}>{cert.name} – Status: <span className="capitalize font-medium">{cert.status}</span></li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No certifications available.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
