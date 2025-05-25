import React, { useState } from 'react';
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const STATUSES = ['active', 'inactive', 'suspended'];
const CERTIFICATION_STATUSES = ['valid', 'expired', 'pending'];

export default function FactoryForm() {
    const[submitMessage,setSubmitMessage]=useState("")
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    licenseNumber: '',
    status: 'active',
    productionCapacity: 0,
    currentProduction: 0,
    utilizationRate: 0,
    pharmaceuticals: [''],
    certifications: [
      {
        name: '',
        issuedDate: '',
        expiryDate: '',
        status: 'valid',
      },
    ],
    contactInfo: {
      email: '',
      phone: '',
      address: '',
    },
  });

  const handleInput = (e, path) => {
    const { name, value } = e.target;
    if (path) {
      setFormData((prev) => ({
        ...prev,
        [path]: {
          ...prev[path],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCertificationChange = (index, e) => {
    const { name, value } = e.target;
    const newCerts = [...formData.certifications];
    newCerts[index][name] = value;
    setFormData((prev) => ({ ...prev, certifications: newCerts }));
  };

  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { name: '', issuedDate: '', expiryDate: '', status: 'valid' },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/v1/factories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(!res.ok)throw new Error(data.message)
      setSubmitMessage('✅ Factory Added Successfully!');
    } catch (error) {
      setSubmitMessage(`❌ ${error.message}`)
    }
  };









   









  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-50 to-white px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-extrabold text-blue-800">
          Register a New Factory
        </h1>
        <p className="mx-auto max-w-xl text-lg text-gray-700">
          Add a pharmaceutical manufacturing facility and manage production
          details, certifications, and contact information all in one place.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-4xl grid-cols-1 gap-6 rounded-2xl bg-white p-8 shadow-xl md:grid-cols-2"
      >
        {/* Basic Fields */}
        {[
          ['Factory Name', 'name', 'text', 'e.g., MediPharma Inc.'],
          ['Location', 'location', 'text', '123 Industrial Zone'],
          ['License Number', 'licenseNumber', 'text', 'LI8123496'],
          ['Production Capacity', 'productionCapacity', 'number', '10000'],
          ['Current Production', 'currentProduction', 'number', '7500'],
          ['Utilization Rate', 'utilizationRate', 'number', '75'],
        ].map(([label, name, type, placeholder]) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              name={name}
              type={type}
              placeholder={placeholder}
              required
              value={formData[name]}
              onChange={handleInput}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Factory Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInput}
            required
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Contact Info */}
        {[
          ['Email', 'email', 'email', 'factory@example.com'],
          ['Phone', 'phone', 'text', '0123456789'],
          ['Address', 'address', 'text', '123 Factory Street'],
        ].map(([label, name, type, placeholder]) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              name={name}
              type={type}
              placeholder={placeholder}
              required
              value={formData.contactInfo[name]}
              onChange={(e) => handleInput(e, 'contactInfo')}
              className="mt-1 block w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Pharmaceuticals */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Pharmaceuticals (IDs)
          </label>
          <input
            type="text"
            placeholder="You can get it from Pharmaceuticals page"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                pharmaceuticals: e.target.value
                  .split(',')
                  .map((id) => id.trim()),
              }))
            }
            className="mt-1 block w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Certifications */}
        <div className="md:col-span-2">
          <h3 className="mb-2 text-lg font-semibold text-blue-700">
            Certifications
          </h3>
        </div>
        {formData.certifications.map((cert, idx) => (
          <React.Fragment key={idx}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                name="name"
                type="text"
                value={cert.name}
                onChange={(e) => handleCertificationChange(idx, e)}
                placeholder="e.g., ISO 9001"
                className="mt-1 block w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issued Date
              </label>
              <input
                name="issuedDate"
                type="date"
                value={cert.issuedDate}
                onChange={(e) => handleCertificationChange(idx, e)}
                className="mt-1 block w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                name="expiryDate"
                type="date"
                value={cert.expiryDate}
                onChange={(e) => handleCertificationChange(idx, e)}
                className="mt-1 block w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={cert.status}
                onChange={(e) => handleCertificationChange(idx, e)}
                className="mt-1 block w-full rounded-xl border border-gray-300 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CERTIFICATION_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </React.Fragment>
        ))}

        <div className="text-right md:col-span-2">
          <button
            type="button"
            onClick={addCertification}
            className="font-medium text-blue-600 hover:underline"
          >
            + Add another certification
          </button>
        </div>

        <div className="mt-6 text-center md:col-span-2">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-8 py-3 text-white shadow-lg transition hover:bg-blue-700"
          >
            Add Factory
          </button>
          <div>{submitMessage}</div>
        </div>
      </form>
    </div>
  );
}
