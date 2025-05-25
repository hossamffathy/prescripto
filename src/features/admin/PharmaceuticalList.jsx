import { useEffect, useState } from 'react';
import {
  DollarSign,
  Calendar,
  Factory,
  Package,
  Trash2,
  Loader2,
} from 'lucide-react';
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function PharmaceuticalList() {
  const [medicines, setMedicines] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [editId, setEditId] = useState('');
  const [editData, setEditData] = useState({});
  const [loadingId, setLoadingId] = useState('');
  

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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pharmaceutical?'))
      return;

    setLoadingId(id);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/pharmaceuticals/by-id/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      setMedicines((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId('');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/pharmaceuticals/by-id/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setMedicines((prev) =>
        prev.map((m) => (m._id === id ? updated.data : m))
      );
      setEditId('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-blue-50 to-white px-4 pb-4">
      <h2 className="mb-6 w-full p-4 text-center text-4xl font-bold text-blue-700 shadow-md">
        Our <span className="text-gray-900">Pharmaceuticals</span>
      </h2>

      {/* Filters */}
      <div className="mb-8 w-full max-w-6xl rounded-2xl bg-white p-6 shadow-md">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md border border-gray-300 p-2"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-md border border-gray-300 p-2"
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="discontinued">Discontinued</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <select
            value={dosageForm}
            onChange={(e) => setDosageForm(e.target.value)}
            className="rounded-md border border-gray-300 p-2"
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
            placeholder="🏠 Manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="rounded-md border border-gray-300 p-2"
          />
          <select
            value={includeExpired}
            onChange={(e) => setIncludeExpired(e.target.value === 'true')}
            className="rounded-md border border-gray-300 p-2"
          >
            <option value="false">Exclude Expired</option>
            <option value="true">Include Expired</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {medicines.map((med) =>
          editId === med._id ? (
            <div
              key={med._id}
              className="rounded-xl border-l-4 border-blue-500 bg-white p-4 shadow"
            >
              <input
                className="mb-2 w-full rounded border  px-3 text-sm"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder="Name"
              />
              <input
                className="mb-2 w-full rounded border px-3  text-sm"
                value={editData.genericName}
                onChange={(e) =>
                  setEditData({ ...editData, genericName: e.target.value })
                }
                placeholder="Generic Name"
              />
              <input
                className="mb-2 w-full rounded border px-3  text-sm"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                placeholder="Description"
              />
              <input
                className="mb-2 w-full rounded border  px-3 text-sm"
                value={editData.dosageForm}
                onChange={(e) =>
                  setEditData({ ...editData, dosageForm: e.target.value })
                }
                placeholder="Dosage Form"
              />
              <input
                className="mb-2 w-full rounded border px-3  text-sm"
                value={editData.strength}
                onChange={(e) =>
                  setEditData({ ...editData, strength: e.target.value })
                }
                placeholder="Strength"
              />
              <input
                className="mb-2 w-full rounded border  px-3 text-sm"
                value={editData.manufacturer}
                onChange={(e) =>
                  setEditData({ ...editData, manufacturer: e.target.value })
                }
                placeholder="Manufacturer"
              />
              <input
                type="number"
                className="mb-2 w-full rounded border  px-3 text-sm"
                value={editData.price}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    price: parseFloat(e.target.value),
                  })
                }
                placeholder="Price"
              />
              <input
                type="number"
                className="mb-2 w-full rounded border px-3 text-sm"
                value={editData.stock}
                onChange={(e) =>
                  setEditData({ ...editData, stock: parseInt(e.target.value) })
                }
                placeholder="Stock"
              />
              <input
                className="mb-2 w-full rounded border  px-3 text-sm"
                value={editData.batchNumber}
                onChange={(e) =>
                  setEditData({ ...editData, batchNumber: e.target.value })
                }
                placeholder="Batch Number"
              />
              <input
                type="date"
                className="mb-4 w-full rounded border px-3  text-sm"
                value={editData.expiryDate.split('T')[0]}
                onChange={(e) =>
                  setEditData({ ...editData, expiryDate: e.target.value })
                }
              />
              <input
                type="number"
                className="mb-4 w-full rounded border  px-3 text-sm"
                value={editData.reorderLevel}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    reorderLevel: parseInt(e.target.value),
                  })
                }
                placeholder="Reorder Level"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditId('')}
                  className="rounded bg-gray-200  px-4 text-sm text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdate(med._id)}
                  className="rounded bg-blue-600 px-4 text-sm text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div
              key={med._id}
              className="relative rounded-2xl border-l-4 border-blue-500 bg-white p-6 shadow-lg"
            >
              <h2 className="mb-1 text-2xl font-semibold text-blue-700">
                {med.name}
              </h2>
              <p className="mb-2 text-sm text-gray-600">{med.genericName}</p>
              <span
                className={`mb-2 inline-block rounded-full px-2 py-1 text-xs font-medium ${
                  med.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : med.status === 'discontinued'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {med.status || 'Unknown'}
              </span>
              <p className="text-sm text-gray-600">
                <strong>Form:</strong>{' '}
                <span className="capitalize">{med.dosageForm}</span>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Strength:</strong> {med.strength}
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-600">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span>
                  <strong>Price:</strong> ${med.price.toFixed(2)}
                </span>
              </p>
              <p
                className={`flex items-center gap-1 text-sm font-medium ${
                  med.stock <= med.reorderLevel
                    ? 'text-red-500'
                    : 'text-green-600'
                }`}
              >
                <Package className="h-4 w-4" />
                <span>Stock: {med.stock}</span>
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  <strong>Expiry:</strong>{' '}
                  {new Date(med.expiryDate).toLocaleDateString()}
                </span>
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-600">
                <Factory className="h-4 w-4" />
                <span>
                  <strong>Manufacturer:</strong> {med.manufacturer}
                </span>
              </p>
              {med.description && (
                <p className="mt-3 line-clamp-3 text-sm italic text-gray-500">
                  {med.description}
                </p>
              )}
              <div className="mt-2 rounded-xl bg-gray-50 p-1 text-center text-sm">
                {med._id}
              </div>
              <div className="absolute right-4 top-4 flex space-x-2">
                <button
                  onClick={() => {
                    setEditId(med._id);
                    setEditData(med);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(med._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  {loadingId === med._id ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Trash2 />
                  )}
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-4 pt-6">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="rounded-lg border bg-white px-3  text-sm hover:bg-gray-100 disabled:opacity-50"
        >
          ⬅ Prev
        </button>
        <span className="rounded-lg bg-blue-600 px-3  text-sm font-semibold text-white">
          {page}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * limit >= total}
          className="rounded-lg border bg-white px-3  text-sm hover:bg-gray-100 disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
