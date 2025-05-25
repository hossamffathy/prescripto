import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';

import Logo from './Logo';
import UserMenu from '../../src/features/user/UserMenu';
import DoctorMenu from '../features/doctorsPage/DoctorMenu';
import AdminMenu from '../features/admin/AdminMenu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const userRole = useSelector((state) => state.user.role);
  const doctorRole = useSelector((state) => state.doctor.role);
  const adminRole = useSelector((state) => state.admin.role);

  const role = useMemo(() => {
    if (userRole === 'Patient') return 'Patient';
    if (doctorRole === 'Doctor') return 'Doctor';
    if (adminRole === 'Coordinator') return 'Coordinator';
    return null;
  }, [userRole, doctorRole, adminRole]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="relative z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-[1525px] items-center justify-between px-6 py-4 lg:py-6">
        <Logo />

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="z-50 text-gray-800 lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-10 text-[16px] font-medium text-gray-800 lg:flex">
          <NavLink to="/home" label="Home" />
          <NavLink to="/doctors" label="All Doctors" />
          <NavLink to="/about" label="About" />
          <NavLink to="/contact" label="Contact" />
          <NavLink to="/chatbot" label="Chatbot" />
          <NavLink to="/pharmaceuticals" label="Pharmaceuticals" uppercase />
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:block">
          {role === 'Patient' ? (
            <UserMenu />
          ) : role === 'Doctor' ? (
            <DoctorMenu />
          ) : role === 'Coordinator' ? (
            <AdminMenu />
          ) : (
            <Link
              to="/signup"
              className="rounded-full bg-[#5F6FFF] px-6 py-2.5 text-[16px] font-semibold text-white transition hover:bg-[#4c58d3]"
            >
              Create Account
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 top-full w-full bg-white shadow-lg transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 py-6 text-[15px] font-medium text-gray-800">
          <NavLink to="/home" label="Home" />
          <NavLink to="/doctors" label="All Doctors" />
          <NavLink to="/about" label="About" />
          <NavLink to="/contact" label="Contact" />
          <NavLink to="/chatbot" label="Chatbot" />
          <NavLink to="/pharmaceuticals" label="Pharmaceuticals" uppercase />
        </nav>

        <div className="px-6 pb-6 flex justify-center absolute top-[-55px] right-[40px]">
          {role === 'Patient' ? (
            <UserMenu />
          ) : role === 'Doctor' ? (
            <DoctorMenu />
          ) : role === 'Coordinator' ? (
            <AdminMenu />
          ) : (
            <Link
              to="/signup"
              className="block w-full rounded-full bg-[#5F6FFF] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#4c58d3]"
            >
              Create Account
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

// Reusable NavLink Component
function NavLink({ to, label, uppercase }) {
  return (
    <Link
      to={to}
      className={`transition duration-200 hover:text-[#5F6FFF] ${
        uppercase ? 'uppercase' : ''
      }`}
    >
      {label}
    </Link>
  );
}
