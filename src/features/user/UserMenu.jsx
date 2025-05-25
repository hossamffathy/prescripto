import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './userSlice';


export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef();
  const [userData,setUserData]=useState({})
  const navigate=useNavigate()
useEffect(()=>{
  const  getData =async function (){
  const res= await fetch("/api/v1/users/myData")
  const data=await res.json()

 setUserData(data.data)
  }
  getData()
},[])
console.log (userData)
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
  src={ userData.profilePicture 
  }
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
            to="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            My Profile
          </Link>
          <Link
            to="/myAppointments"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            My Appointments
          </Link>
          <Link
            to="/myReviews"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            My Reviews
          </Link>
          <button
            onClick={() => {
              dispatch(logout());
              localStorage.removeItem('user'); // Better than setting to {}
              localStorage.removeItem('token');
              navigate("/home") // Optional: clear token too
              
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


