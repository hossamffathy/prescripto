
import { Form, useActionData, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './userSlice';
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { doctorLogin } from '../doctorsPage/doctorSlice';
import { adminLogin } from '../admin/adminSlice';
import ForgetPassword from './ForgetPassword'; // import the component
import Confirm from './Confirm';
export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const res = await fetch(`${BASE_URL}/api/v1/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Login failed');

    return { user: result.user, token: result.token };
  } catch (err) {
    return { error: err.message };
  }
}

export default function Login() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const actionData = useActionData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[showConfirm,setShowConfirm]=useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ||localStorage.getItem("doctor") ||localStorage.getItem("admin") );

    if (user?.role === "Patient") {
      dispatch(login(user));
      navigate("/home");
    } else if (user?.role === "Doctor") {
      dispatch(doctorLogin(user));
      navigate("/doctorManagement");
    } else if (user?.role === "Coordinator") {
      dispatch(doctorLogin(user));
      navigate("/admin");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (actionData?.user) {
      const { name, _id: id, __t: role, status } = actionData.user;
      const token = actionData.token;
      const userData = { name, id, role, status };

      if (role === "Patient") {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        dispatch(login(userData));
        navigate("/home");
      } else if (role === "Doctor") {
        localStorage.setItem("doctor", JSON.stringify(userData));
        localStorage.setItem("token", token);
        dispatch(doctorLogin(userData));
        navigate("/doctorManagement");
      } else if (role === "Coordinator") {
        localStorage.setItem("admin", JSON.stringify(userData));
        localStorage.setItem("token", token);
        dispatch(adminLogin(userData));
        navigate("/admin");
      }
    }
  }, [actionData, dispatch, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/api/v1/auth/google`;
  };

  // Show ForgetPassword form if toggled
  if (showForgotPassword) {
  return <ForgetPassword setShowConfirm={() => {
    setShowConfirm(true);
    setShowForgotPassword(false);
  }} />;
}

  if (showConfirm) {
    return <Confirm onBack={() => setShowConfirm(false)} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg border border-blue-300 bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-blue-700">Login</h2>
        <p className="mb-6 mt-2 text-center text-sm text-gray-500">
          Please enter your credentials
        </p>

        {actionData?.error && (
          <div className="mb-4 rounded bg-red-100 px-4 py-2 text-sm text-red-700">
            {actionData.error}
          </div>
        )}

        <Form method="post" className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 text-white transition hover:bg-indigo-700"
          >
            Login
          </button>
        </Form>

        <button
          onClick={handleGoogleLogin}
          className="mt-3 w-full rounded-md border border-gray-300 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Continue with Google
        </button>

        <div className="mt-3 text-center text-sm">
          <button
            onClick={() => setShowForgotPassword(true)}
            className="text-indigo-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
