import { Loader2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function Factories() {
  const [factories, setFactories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState('');
  const [editId, setEditId] = useState('');
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  // Fetch factories with pagination
  const fetchFactories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/factories?page=${page}&limit=${limit}`);
      const data = await res.json();
      setFactories(data.data || []);
      setTotalPages(Math.ceil(data.total / limit) || 1);
    } catch (error) {
      console.error('Failed to fetch factories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFactories();
  }, [page]);

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this factory?'))
      return;
    setLoadingId(id);
    try {
      const res = await fetch(`/api/v1/factories/by-id/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      setFactories((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      alert('Error deleting factory');
      console.error(err);
    } finally {
      setLoadingId('');
    }
  };

  // PATCH
  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/factories/by-id/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setFactories((prev) =>
        prev.map((f) => (f._id === id ? updated.data : f))
      );
      setEditId('');
      alert('Factory updated successfully');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  // UI
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-blue-50 to-white px-4 py-12">
      <h2 className="mb-6 w-full text-center text-4xl font-bold text-blue-700 shadow-md">
        Pharmaceutical <span className="text-gray-900">Factories</span>
      </h2>
      {loading ? (
        <p className="animate-pulse text-blue-600">Loading factories...</p>
      ) : factories.length === 0 ? (
        <p className="text-gray-600">No factories found.</p>
      ) : (
        <div className="grid  w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {factories.map((factory) =>
            editId === factory._id ? (
              <div
                key={factory._id}
                className="rounded-2xl border-l-4 border-blue-500 bg-white p-6 shadow-lg"
              >
                {[
                  ['name', 'Factory Name'],
                  ['location', 'Location'],
                  ['licenseNumber', 'License Number'],
                  ['status', 'Status'],
                  ['productionCapacity', 'Production Capacity', 'number'],
                ].map(([field, placeholder, type = 'text']) => (
                  <input
                    key={field}
                    type={type}
                    value={editData[field] || ''}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        [field]:
                          type === 'number'
                            ? Number(e.target.value)
                            : e.target.value,
                      }))
                    }
                    placeholder={placeholder}
                    className="mb-2 w-full rounded border px-3 py-2"
                  />
                ))}
                <input
                  type="email"
                  value={editData.contactInfo?.email || ''}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      contactInfo: {
                        ...prev.contactInfo,
                        email: e.target.value,
                      },
                    }))
                  }
                  placeholder="Email"
                  className="mb-2 w-full rounded border px-3 py-2"
                />
                <input
                  type="text"
                  value={editData.contactInfo?.phone || ''}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      contactInfo: {
                        ...prev.contactInfo,
                        phone: e.target.value,
                      },
                    }))
                  }
                  placeholder="Phone"
                  className="mb-4 w-full rounded border px-3 py-2"
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setEditId('')}
                    className="rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdate(factory._id)}
                    className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={factory._id}
                className="relative rounded-2xl border-l-4 border-blue-500 bg-white p-6 shadow-lg"
              >
                <div class="absolute right-4 top-4 flex space-x-2">
                  <button   onClick={() => {
                      setEditId(factory._id);
                      setEditData(factory) }} >✏️</button>
                    <button
                  onClick={() => handleDelete(factory._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  {loadingId === factory._id ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Trash2 />
                  )}
                </button>
                </div>

                <h2 className="mb-2 text-2xl font-semibold text-blue-700">
                  {factory.name}
                </h2>
                <p className="mb-1 text-sm text-gray-600">
                  <strong>Location:</strong> {factory.location}
                </p>
                <p className="mb-1 text-sm text-gray-600">
                  <strong>License:</strong> {factory.licenseNumber}
                </p>
                <p className="mb-1 text-sm text-gray-600">
                  <strong>Status:</strong>{' '}
                  <span className="font-medium capitalize text-green-700">
                    {factory.status}
                  </span>
                </p>
                <p className="mb-1 text-sm text-gray-600">
                  <strong>Capacity:</strong>{' '}
                  {factory.productionCapacity.toLocaleString()} units
                </p>
                <p className="mb-4 text-sm text-gray-600">
                  <strong>Contact:</strong> {factory.contactInfo?.email} |{' '}
                  {factory.contactInfo?.phone}
                </p>

                <div className="rounded-xl bg-gray-50 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    Pharmaceuticals
                  </h3>
                  {factory.pharmaceuticals?.length > 0 ? (
                    <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
                      {factory.pharmaceuticals.map((p) => (
                        <li key={p._id}>
                          <strong>{p.name}</strong> – {p.genericName} (
                          {p.strength})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No pharmaceuticals listed.
                    </p>
                  )}
                </div>

                <div className="mt-4 rounded-xl bg-green-50 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-green-700">
                    Certifications
                  </h3>
                  {factory.certifications?.length > 0 ? (
                    <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
                      {factory.certifications.map((cert) => (
                        <li key={cert._id}>
                          {cert.name} – Status:{' '}
                          <span className="font-medium capitalize">
                            {cert.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No certifications available.
                    </p>
                  )}
                </div>

             
              </div>
            )
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && factories.length > 0 && (
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
