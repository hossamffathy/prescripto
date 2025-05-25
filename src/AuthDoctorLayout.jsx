// AuthLoaderLayout.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { login } from './features/user/userSlice';
import { doctorLogin } from './features/doctorsPage/doctorSlice';

export default function AuthDoctorLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem('doctor') || '{}');
    if (doctor?.id) {
      dispatch(doctorLogin(doctor));
    } else {
      // navigate('/login'); // Optional
    }
  }, [dispatch, navigate]);

  return <Outlet />;
}
