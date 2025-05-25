import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function DoctorProfile() {
  const userData = useLoaderData();
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState(userData.name);
  const [profilePicture, setProfilePicture] = useState(userData.profilePicture);
  const [imageFile, setImageFile] = useState(null);

  const [username, setUsername] = useState(userData.username || "");
  const [email] = useState(userData.email);
  const [address, setAddress] = useState(userData.address || "");
  const [gender, setGender] = useState(userData.gender || "");
  const [height, setHeight] = useState(userData.height || "");
  const [weight, setWeight] = useState(userData.weight || "");
  const [sugarLevel, setSugarLevel] = useState(userData.sugarLevel || "");
  const [waterLevel, setWaterLevel] = useState(userData.waterLevel || "");
  const [bloodType, setBloodType] = useState(userData.bloodType || "");
  const [fees, setFees] = useState(userData.fees || "");
  const [socialMedia, setSocialMedia] = useState(userData.socialMedia?.facebook || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("address", address);
    formData.append("gender", gender); 
    formData.append("fees", fees);
   

    if (imageFile) formData.append("photo", imageFile);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/users/updateInfo`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updatedUser = await res.json();
      console.log("Updated:", updatedUser);
      setEdit(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-4xl p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-200"
          />
          <div className="flex flex-col gap-2 w-full md:w-auto">
            {edit && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
              />
            )}
            {edit ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-64"
                placeholder="Full Name"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">{name}</h2>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
          <InfoField label="Email ID" value={email} />
          <EditableField label="Phone" value={username} edit={edit} onChange={setUsername} />
          <EditableField label="Address" value={address} edit={edit} onChange={setAddress} full />
          <EditableSelect label="Gender" value={gender} edit={edit} onChange={setGender} options={["male", "female"]} />
          <EditableField label="Fees" value={fees} edit={edit} onChange={setFees} />
        
          <EditableField label="Facebook" value={socialMedia} edit={edit} onChange={setSocialMedia} />
         
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          {edit ? (
            <>
              <button onClick={() => setEdit(false)} disabled={saving} className="px-4 py-2 border rounded-xl text-red-600 border-red-600 hover:bg-red-50 transition">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition">{saving ? "Saving..." : "Save Changes"}</button>
            </>
          ) : (
            <button onClick={() => setEdit(true)} className="px-4 py-2 border rounded-xl text-blue-600 border-blue-600 hover:bg-blue-50 transition">Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable UI components
const InfoField = ({ label, value }) => (
  <div>
    <p className="font-semibold text-gray-600">{label}:</p>
    <p className="text-blue-700">{value}</p>
  </div>
);

const EditableField = ({ label, value, edit, onChange, full = false }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <p className="font-semibold text-gray-600">{label}:</p>
    {edit ? (
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full border px-3 py-2 rounded-lg mt-1" placeholder={label} />
    ) : (
      <p>{value}</p>
    )}
  </div>
);

const EditableSelect = ({ label, value, edit, onChange, options }) => (
  <div>
    <p className="font-semibold text-gray-600">{label}:</p>
    {edit ? (
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full border px-3 py-2 rounded-lg mt-1">
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    ) : (
      <p>{value}</p>
    )}
  </div>
);

// Loader
export async function doctorProfileLoader() {
  const res = await fetch(`${BASE_URL}/api/v1/users/myData`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });

  if (!res.ok) throw new Error("Failed to load profile data");

  const data = await res.json();
  return data?.data;
}
