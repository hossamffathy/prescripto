import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';

export default function AddDoctorForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialty: 'General physician',
    education: '',
    address1: '',
    address2: '',
    experience: '',
    fees: '',
    about: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit formData to your API
    console.log(formData);
  };

  return (
    <main className="flex min-h-screen w-full items-start justify-center bg-[#F8F9FC] px-4 py-10">
      <div className="font-sans w-full max-w-[1028px] rounded-xl border border-gray-100 bg-white p-8 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-[#1C1C1C]">
          Add Doctor
        </h2>

        <div className="mb-8 flex items-center space-x-4">
  <svg
    width="98"
    height="98"
    viewBox="0 0 98 98"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="49" cy="49" r="49" fill="#F5F5F5" />
    <path
      d="M49.1001 46.1001C52.4415 46.1001 55.1502 43.3914 55.1502 40.0501C55.1502 36.7087 52.4415 34 49.1001 34C45.7587 34 43.05 36.7087 43.05 40.0501C43.05 43.3914 45.7587 46.1001 49.1001 46.1001Z"
      fill="#AAAAAA"
    />
    <path
      opacity="0.5"
      d="M61.2002 57.444C61.2002 61.2031 61.2002 64.2503 49.1001 64.2503C37 64.2503 37 61.2031 37 57.444C37 53.685 42.4174 50.6377 49.1001 50.6377C55.7828 50.6377 61.2002 53.685 61.2002 57.444Z"
      fill="#AAAAAA"
    />
  </svg>

  <div>
    <label
      htmlFor="profilePicture"
      className="text-sm font-medium text-[#A2A2A2] cursor-pointer hover:text-[#5D60D7] transition"
    >
      Upload doctor picture
    </label>
    <input
      type="file"
      id="profilePicture"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          // لو عايز تخزن الصورة في الفورم:
          setFormData((prev) => ({ ...prev, profilePicture: file }));
        }
      }}
    />
  </div>
</div>


        <form
          onSubmit={handleSubmit}
          className="mb-6 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2"
        >
          {/* Doctor Name */}
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-[#1C1C1C]">
              Doctor name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm text-[#1C1C1C] placeholder-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#5D60D7]"
            />
          </div>

          {/* Specialty */}
          <div>
            <label
              htmlFor="specialty"
              className="mb-1 block text-sm text-[#1C1C1C]"
            >
              Specialty
            </label>
            <select
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#5D60D7]"
            >
              <option>General physician</option>
              <option>Cardiologist</option>
              <option>Dermatologist</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm text-[#1C1C1C]"
            >
              Doctor Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Doctor Email"
              value={formData.email}
              onChange={handleChange}
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm text-[#1C1C1C] placeholder-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#5D60D7]"
            />
          </div>

          {/* Education */}
          <div>
            <label
              htmlFor="education"
              className="mb-1 block text-sm text-[#1C1C1C]"
            >
              Education
            </label>
            <input
              type="text"
              id="education"
              name="education"
              placeholder="Education"
              value={formData.education}
              onChange={handleChange}
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm text-[#1C1C1C] placeholder-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#5D60D7]"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm text-[#1C1C1C]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Doctor Password"
              value={formData.password}
              onChange={handleChange}
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm text-[#1C1C1C] placeholder-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#5D60D7]"
            />
          </div>

          {/* Address 1 */}
          <div>
            <label
              htmlFor="address1"
              className="mb-1 block text-sm text-[#1C1C1C]"
            >
              Address 1
            </label>
            <input
              type="text"
              id="address1"
              name="address1"
              placeholder="Address 1"
              value={formData.address1}
              onChange={handleChange}
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm text-[#1C1C1C] placeholder-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#5D60D7]"
            />
          </div>

          {/* Experience */}
          <div>
            <label
              htmlFor="experience"
              className="mb-1 block text-sm text-[#1C1C1C]"
            >
              Experience
            </label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#5D60D7]"
            >
              <option value="">Experience</option>
              <option>1-3 years</option>
              <option>3-5 years</option>
              <option>5+ years</option>
            </select>
          </div>

          {/* Address 2 */}
          <div>
            <label
              htmlFor="address2"
              className="mb-1 block text-sm text-[#1C1C1C]"
            >
              Address 2
            </label>
            <input
              type="text"
              id="address2"
              name="address2"
              placeholder="Address 2"
              value={formData.address2}
              onChange={handleChange}
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm text-[#1C1C1C] placeholder-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#5D60D7]"
            />
          </div>

          {/* Fees */}
          <div>
            <label htmlFor="fees" className="mb-1 block text-sm text-[#1C1C1C]">
              Fees
            </label>
            <input
              type="number"
              id="fees"
              name="fees"
              placeholder="Fees"
              value={formData.fees}
              onChange={handleChange}
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm text-[#1C1C1C] placeholder-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#5D60D7]"
            />
          </div>

          {/* About */}
          <div className="col-span-full">
            <label
              htmlFor="about"
              className="mb-1 block text-sm text-[#1C1C1C]"
            >
              About me
            </label>
            <textarea
              id="about"
              name="about"
              rows={4}
              placeholder="Write about yourself"
              value={formData.about}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2 text-sm text-[#1C1C1C] placeholder-[#AAAAAA] focus:outline-none focus:ring-2 focus:ring-[#5D60D7]"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="h-[46px] w-[160px] rounded-lg bg-[#5D60D7] text-sm font-semibold text-white transition hover:bg-[#4b4fbe]"
            >
              Add doctor
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
