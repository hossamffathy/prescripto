import { useState } from 'react';

export default function PharmaceuticalForm() {
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    description: '',
    dosageForm: '',
    strength: '',
    manufacturer: '',
    price: '',
    stock: '',
    batchNumber: '',
    expiryDate: '',
    reorderLevel: '',
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/pharmaceuticals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          reorderLevel: parseInt(formData.reorderLevel),
        }),
      });

      if (res.ok) {
        setMessage({
          type: 'success',
          text: 'Pharmaceutical created successfully.',
        });
        setFormData({
          name: '',
          genericName: '',
          description: '',
          dosageForm: '',
          strength: '',
          manufacturer: '',
          price: '',
          stock: '',
          batchNumber: '',
          expiryDate: '',
          reorderLevel: '',
        });
      } else {
        const err = await res.json();
        throw new Error(err.message || 'Error creating pharmaceutical.');
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-12 flex flex-col items-center">
  <div className="text-center mb-10">
    <h2 className="text-4xl font-extrabold text-blue-800 mb-2">Add New Pharmaceutical</h2>
    <p className="text-lg text-gray-700 max-w-xl mx-auto">
      Enter the details of the new pharmaceutical product to add it to the system.
    </p>
  </div>

  <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
    {message && (
      <div
        className={`mb-6 text-center font-semibold rounded-xl p-3 ${
          message.type === 'success'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {message.text}
      </div>
    )}

    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { name: 'name', label: 'Name' },
        { name: 'genericName', label: 'Generic Name' },
        { name: 'description', label: 'Description' },
       
        { name: 'strength', label: 'Strength' },
        { name: 'manufacturer', label: 'Manufacturer' },
        { name: 'price', label: 'Price', type: 'number' },
        { name: 'stock', label: 'Stock', type: 'number' },
        { name: 'batchNumber', label: 'Batch Number' },
        { name: 'expiryDate', label: 'Expiry Date', type: 'date' },
        { name: 'reorderLevel', label: 'Reorder Level', type: 'number' },
      ].map(({ name, label, type = 'text' }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
      ))}
<div>
  <label className="block text-sm font-medium text-gray-700">Dosage Form</label>
  <select
    name="dosageForm"
    value={formData.dosageForm}
    onChange={handleChange}
    required
    className="mt-1 block w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="" disabled>Select dosage form</option>
    {['tablet', 'capsule', 'liquid', 'injection', 'cream', 'ointment', 'other'].map((form) => (
      <option key={form} value={form}>
        {form}
      </option>
    ))}
  </select>
</div>

      <div className="md:col-span-2 text-center mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          Create Pharmaceutical
        </button>
      </div>
    </form>
  </div>
</div>

  );
}
