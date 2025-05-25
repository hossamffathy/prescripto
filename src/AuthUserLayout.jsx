import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { login } from './features/user/userSlice';
import { doctorLogin } from './features/doctorsPage/doctorSlice';
import { adminLogin } from './features/admin/adminSlice';

export default function AuthUserLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let userData = null;

    // حاول تقرأ كل القيم من localStorage بشكل آمن
    try {
      const rawUser = localStorage.getItem('user');
      const rawDoctor = localStorage.getItem('doctor');
      const rawAdmin = localStorage.getItem('admin');

      if (rawUser) userData = JSON.parse(rawUser);
      else if (rawDoctor) userData = JSON.parse(rawDoctor);
      else if (rawAdmin) userData = JSON.parse(rawAdmin);
    } catch (err) {
      console.error("Failed to parse user data from localStorage", err);
    }

    // وزّع البيانات حسب الدور
    if (userData?.role === 'user') {
      dispatch(login(userData));
    } else if (userData?.role === 'Doctor') {
      dispatch(doctorLogin(userData));
    } else if (userData?.role === 'Coordinator') {
      dispatch(adminLogin(userData));
    } else {
      // navigate('/login'); // Redirect to login if role unknown
    }
  }, [dispatch, navigate]);

  return <Outlet />;
}
