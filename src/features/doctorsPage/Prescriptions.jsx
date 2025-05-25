import React, { useState } from "react";
import { useSelector } from "react-redux";
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Prescription = () => {
    const id =useSelector(state=>state.doctor.id)
  const [formData, setFormData] = useState({
    patient: "",
    doctor: id,
    medications: [
      {
        pharmaceutical: "",
        dosage: "",
        frequency: "",
        duration: "",
        quantity: 1,
        notes: "",
      },
    ],
    diagnosis: "",
    status: "active",
    notes: "",
    validUntil: "",
  });

  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...formData.medications];
    newMedications[index][field] = value;
    setFormData({ ...formData, medications: newMedications });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        {
          pharmaceutical: "",
          dosage: "",
          frequency: "",
          duration: "",
          quantity: 1,
          notes: "",
        },
      ],
    });
  };

  const removeMedication = (index) => {
    const newMedications = [...formData.medications];
    newMedications.splice(index, 1);
    setFormData({ ...formData, medications: newMedications });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/v1/prescriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Prescription sent successfully!");
        console.log(data);
      } else {
        alert("Failed to send prescription.");
        console.error(data);
      }
    } catch (error) {
      alert("Error occurred while sending prescription.");
      console.error(error);
    }
  };

 return (
  <form
    onSubmit={handleSubmit}
    className="p-8 bg-white shadow-lg rounded-2xl max-w-4xl mx-auto space-y-6"
  >
    <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
      📝 New Prescription
    </h2>

    {/* Patient & Doctor */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block font-semibold text-gray-700 mb-1">👤 Patient ID</label>
        <input
        placeholder="e.g 6830f115a5af4a21a69a77c2"
          type="text"
          value={formData.patient}
          onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-1">🩺 Doctor ID</label>
        <input
          type="text"
          value={formData.doctor}
          readOnly
          className="border bg-gray-100 p-3 w-full rounded-lg text-gray-500"
        />
      </div>
    </div>

    {/* Diagnosis, Status, ValidUntil */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block font-semibold text-gray-700 mb-1">📋 Diagnosis</label>
        <input
        placeholder="e.g Flu"
          type="text"
          value={formData.diagnosis}
          onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
          className="border border-gray-300 p-3 w-full rounded-lg"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-1">📌 Status</label>
        <select
        placeholder=""
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="border border-gray-300 p-3 w-full rounded-lg"
        >
          <option value="active">Active</option>
          <option value="completed">completed</option>
          <option value="cancelled ">cancelled </option>
        </select>
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-1">📅 Valid Until</label>
        <input
          type="date"
          value={formData.validUntil.slice(0, 10)}
          onChange={(e) =>
            setFormData({ ...formData, validUntil: new Date(e.target.value).toISOString() })
          }
          className="border border-gray-300 p-3 w-full rounded-lg"
        />
      </div>
    </div>

    {/* Notes */}
    <div>
      <label className="block font-semibold text-gray-700 mb-1">🗒️ General Notes</label>
      <textarea
      placeholder="e.g Rest and hydrate well"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        rows={3}
        className="border border-gray-300 p-3 w-full rounded-lg"
      />
    </div>

    {/* Medications */}
    <div>
      <h3 className="text-xl font-bold text-blue-700 mt-4 mb-2">💊 Medications</h3>

      {formData.medications.map((med, index) => (
        <div
          key={index}
          className="border border-blue-200 bg-blue-50 p-4 rounded-xl mb-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="font-medium text-gray-700">Pharmaceutical ID</label>
            <input
              type="text"
              value={med.pharmaceutical}
              onChange={(e) => handleMedicationChange(index, "pharmaceutical", e.target.value)}
              className="border p-2 w-full rounded-lg"
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Dosage</label>
            <input
              type="text"
              value={med.dosage}
              onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
              className="border p-2 w-full rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Frequency</label>
            <input
              type="text"
              value={med.frequency}
              onChange={(e) => handleMedicationChange(index, "frequency", e.target.value)}
              className="border p-2 w-full rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Duration</label>
            <input
              type="text"
              value={med.duration}
              onChange={(e) => handleMedicationChange(index, "duration", e.target.value)}
              className="border p-2 w-full rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              min="1"
              value={med.quantity}
              onChange={(e) => handleMedicationChange(index, "quantity", Number(e.target.value))}
              className="border p-2 w-full rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Notes</label>
            <input
              type="text"
              value={med.notes}
              onChange={(e) => handleMedicationChange(index, "notes", e.target.value)}
              className="border p-2 w-full rounded-lg"
            />
          </div>

          <button
            type="button"
            onClick={() => removeMedication(index)}
            className="col-span-full text-sm text-red-600 mt-2 hover:underline"
          >
            🗑️ Remove Medication
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addMedication}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        ➕ Add Medication
      </button>
    </div>

    <div className="text-center pt-6">
      <button
        type="submit"
        className="bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition"
      >
        ✅ Submit Prescription
      </button>
    </div>
  </form>
);

};

export default Prescription;
