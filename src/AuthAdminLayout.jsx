// AuthAdminLayout.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { adminLogin } from './features/admin/adminSlice';

export default function AuthAdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin') || '{}');
    

    if (admin?.role === "Coordinator") {
      dispatch(adminLogin(admin));
    } else {
      navigate('/login'); // 🛡️ حماية للمسارات
    }
  }, [dispatch, navigate]);

  return <Outlet />;
}
