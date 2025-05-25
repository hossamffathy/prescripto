import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineEventNote,
  MdOutlinePersonAddAlt,
  MdOutlineLocalHospital,
  MdOutlinePeopleAlt,
  MdRateReview, //
} from 'react-icons/md';

const navItems = [
  { label: 'Dashboard', icon: MdOutlineDashboard, path: 'dashboard' },
  { label: 'Factories', icon: MdOutlineEventNote, path: 'factories' },
  { label: 'Pharmaceuticals ', icon: MdOutlineEventNote, path: 'Pharmaceuticals' },

  { label: 'Add Doctor', icon: MdOutlinePersonAddAlt, path: 'addDoctor' },
  { label: 'Doctors List', icon: MdOutlineLocalHospital, path: 'doctorsList' },
  { label: 'Patients', icon: MdOutlinePeopleAlt, path: 'patients' },
  { label: 'Reviews', icon: MdRateReview, path: 'reviews' },
];

const Sidebar = () => {
  return (
    <div className="relative top-[2px] min-h-[100vh] w-64 border-r border-gray-200 bg-white shadow-sm">
      <nav className="mt-4">
        <ul className="space-y-1 text-sm">
          {navItems.map(({ label, icon: Icon, path }) => (
            <li key={label}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `group relative flex items-center px-4 py-2 transition-colors duration-200 ${
                    isActive
                      ? 'border-r-[4px] border-[#5F6FFF] bg-[#F2F3FF] font-semibold text-blue-600'
                      : 'text-gray-700'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Side indicator */}
                    {isActive && (
                      <span className="absolute right-0 top-0 h-full w-1 rounded-l-lg bg-blue-500"></span>
                    )}

                    <Icon
                      className={`mr-2 text-lg ${
                        isActive ? 'text-blue-600' : 'text-black'
                      }`}
                    />
                    {label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
