import { useEffect, useState } from 'react';
import { DollarSign, Calendar, Factory, Package } from 'lucide-react';
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function Pharmaceuticals() {
  const [medicines, setMedicines] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [dosageForm, setDosageForm] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [includeExpired, setIncludeExpired] = useState(false);

  const fetchData = async () => {
    const params = new URLSearchParams({
      page,
      limit,
      search,
      status,
      dosageForm,
      manufacturer,
      includeExpired,
    });

    const response = await fetch(`${BASE_URL}/api/v1/pharmaceuticals?${params.toString()}`);
    const data = await response.json();
    setMedicines(data.data);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchData();
  }, [page, search, status, dosageForm, manufacturer, includeExpired]);

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 pb-4 flex flex-col items-center">
      <h2 className="text-4xl  p-4 w-full text-center  m-auto font-bold mb-6 shadow-md text-blue-700">
         Our <span className='text-gray-900'>Pharmaceuticals</span>
      </h2>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-6xl mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="discontinued">Discontinued</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <select
            value={dosageForm}
            onChange={(e) => setDosageForm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Dosage Form</option>
            <option value="tablet">Tablet</option>
            <option value="capsule">Capsule</option>
            <option value="liquid">Liquid</option>
            <option value="injection">Injection</option>
            <option value="cream">Cream</option>
            <option value="ointment">Ointment</option>
            <option value="other">Other</option>
          </select>
          <input
            placeholder="🏭 Manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <select
            value={includeExpired}
            onChange={(e) => setIncludeExpired(e.target.value === 'true')}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="false">Exclude Expired</option>
            <option value="true">Include Expired</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      {medicines.length === 0 ? (
        <p className="text-gray-600">No pharmaceuticals found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {medicines.map((med) => (
            <div
              key={med.batchNumber}
              className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 relative"
            >
              <h2 className="text-2xl font-semibold text-blue-700 mb-1">{med.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{med.genericName}</p>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full mb-2 inline-block ${
                  med.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : med.status === 'discontinued'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {med.status || 'Unknown'}
              </span>

              <p className="text-sm text-gray-600"><strong>Form:</strong> <span className="capitalize">{med.dosageForm}</span></p>
              <p className="text-sm text-gray-600"><strong>Strength:</strong> {med.strength}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span><strong>Price:</strong> ${med.price.toFixed(2)}</span>
              </p>
              <p
                className={`text-sm flex items-center gap-1 font-medium ${
                  med.stock <= med.reorderLevel ? 'text-red-500' : 'text-green-600'
                }`}
              >
                <Package className="h-4 w-4" />
                <span>Stock: {med.stock}</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span><strong>Expiry:</strong> {new Date(med.expiryDate).toLocaleDateString()}</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Factory className="h-4 w-4" />
                <span><strong>Manufacturer:</strong> {med.manufacturer}</span>
              </p>

              {med.description && (
                <p className="text-sm text-gray-500 mt-3 italic line-clamp-3">
                  {med.description}
                </p>
              )}
              <div className='bg-gray-50 p-1 mt-2 rounded-xl text-sm text-center'>{med._id}</div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center pt-6 space-x-4">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          ⬅ Prev
        </button>
        <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">{page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * limit >= total}
          className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
    </>
  );
}
