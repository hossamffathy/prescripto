import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../user/userSlice';
import { doctorlogout } from './doctorSlice';
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function DoctorMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Logout from server
      const res = await fetch('/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include', // لو السيرفر بيستخدم cookies
      });

      if (!res.ok) throw new Error('Logout failed');

      // 2. Clear local storage and redux
      dispatch(doctorlogout());
      localStorage.removeItem('doctor');
      localStorage.removeItem('token');

      // 3. Redirect to home
      navigate('/home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/users/myData`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error('Failed to fetch user data');

        const data = await res.json();
        setUserData(data?.data);
      } catch (err) {
        console.error(err);
        // ممكن تضيف توجيه لتسجيل الدخول إذا التوكن غير صالح
      }
    };

    getData();
  }, []);

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      {/* صورة المستخدم والسهم */}
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={userData.profilePicture}
          alt="User Avatar"
          className="h-8 w-8 rounded-full"
        />

        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* القائمة المنسدلة */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
          <Link
            to="/doctorProfile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            My Profile
          </Link>
          <Link
            to="/home"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            to="/doctormanagement"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Doctor's Managing page
          </Link>

          <button
            onClick={() => {
              handleLogout();
            }}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
