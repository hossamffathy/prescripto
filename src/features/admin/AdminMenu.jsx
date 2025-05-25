import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { adminlogout } from './adminSlice';

export default function AdminMenu() {
    const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef();
  const [userData, setUserData] = useState({});
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const res = await fetch('/api/v1/users/myData', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (!res.ok) throw new Error('Failed to fetch user data');

  //       const data = await res.json();
  //       setUserData(data.user);
  //     } catch (err) {
  //       console.error(err);
  //       // ممكن تضيف توجيه لتسجيل الدخول إذا التوكن غير صالح
  //     }
  //   };

  //   getData();
  // }, []);

 




const handleLogout = async () => {
  try {
    // 1. Logout from server
    const res = await fetch('/api/v1/users/logout', {
      method: 'POST',
      credentials: 'include', // لو السيرفر بيستخدم cookies
    });

    if (!res.ok) throw new Error('Logout failed');

    // 2. Clear local storage and redux
    dispatch(adminlogout());
    localStorage.removeItem('admin');
    localStorage.removeItem('token');

    // 3. Redirect to home
    navigate('/home');
  } catch (error) {
    console.error('Logout error:', error);
  }
};








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
          src={'manAvatar.jpg'}
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
          {/* <Link
            to="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            My Profile
          </Link> */}
          <Link
            to="/home"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
           Home
          </Link>
          <Link
            to="/admin"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Admin Page
          </Link>
          <button
            onClick={() => {
              handleLogout() // Optional: clear token too
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
