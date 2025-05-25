import React from "react";
import { Form, useActionData, redirect } from "react-router-dom";
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SPECIALIZATIONS = [
  "Allergist", "Andrologist", "Anesthesiologist", "Audiologist", "Cardiologist",
  "Cardiothoracic Surgeon", "Dentist", "Dermatologist", "Endocrinologist",
  "ENT Doctor (Otolaryngologist)", "Family Doctor (General Practitioner)", "Gastroenterologist",
  "General Surgeon", "Gynecologist", "Hematologist", "Hepatologist", "Infertility Specialist",
  "Internist", "Laboratory", "Nephrologist", "Neurologist", "Neurosurgeon", "Nutritionist",
  "Obesity Surgeon", "Oncologist", "Ophthalmologist", "Orthopedist", "Pediatric Surgeon",
  "Pediatrician", "Phoniatrician", "Physiotherapist", "Plastic Surgeon", "Psychiatrist",
  "Pulmonologist", "Radiologist", "Rheumatologist", "Urologist", "Vascular Surgeon"
];

const GENDERS = ["male", "female", "other"];

const Career = () => {
  const actionData = useActionData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-12 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2">Join Prescripto</h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Become part of our mission to deliver cutting-edge healthcare experiences. If you're a doctor looking to grow your practice and reach more patients, we'd love to hear from you.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        {/* ✅ Error message display */}
        {actionData?.error && (
          <div className="mb-6 text-red-600 text-center font-semibold">
            {actionData.error}
          </div>
        )}

        <Form method="post" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input name="fullName"
              type="text"
              placeholder="Dr. John Doe"
              required
              className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="email"
              type="email"
              placeholder="doctor@example.com"
              required
              className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input name="password"
              type="password"
              placeholder="Enter password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Specialization</label>
            <select name="specialization"
              required
              className="mt-1 block w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>Select specialization</option>
              {SPECIALIZATIONS.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <input name="experience"
              type="number"
              min="0"
              required
              placeholder="e.g., 5"
              className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select name="gender"
              required
              className="mt-1 block w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>Select gender</option>
              {GENDERS.map((gender) => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Consultation Price ($)</label>
            <input name="price"
              type="number"
              min="0"
              required
              placeholder="e.g., 100"
              className="mt-1 block w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2 text-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Career;

// Action Function
export async function careerAction({ request }) {
  const formData = await request.formData();

  const data = {
    name: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("confirmPassword"),
    specialization: formData.get("specialization"),
    experience: formData.get("experience"),
    gender: formData.get("gender"),
    fees: formData.get("price"),
  };

  // Validation
  if (data.password !== data.passwordConfirm) {
    return { error: "Passwords do not match." };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/doctors/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok || result.status !== "success") {
      return { error: result.message || "Signup failed. Please try again." };
    }

    return redirect("/login");
  } catch (err) {
    return { error: "Something went wrong. Please try again later." };
  }
}
