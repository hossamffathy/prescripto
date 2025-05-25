import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Home from './features/home/Home';
import Doctors, { allDoctors } from './features/doctors/Doctors';
import About from './features/about/About';

import Login, { loginAction } from './features/user/Login';
import SignUp, { signupAction } from './features/user/SignUp';
import Chatbot from './features/chatbot/Chatbot';
import DoctorItems, { fetchDoctors } from './features/home/DoctorItems';
import DoctorProfilePage, {
  getSpecificDoctor,
} from './features/doctors/DoctorProfilePage';
import ContactUs from './features/contact/ContactUs';
import MyAppointments from './features/user/MyAppointments';
import Admin from './features/admin/AdminLayout';
import Dashboard, { dashboardLoader } from './features/admin/Dashboard';
import Appointments from './features/admin/Appointments';
import DoctorsList, { doctorsList } from './features/admin/DoctorsList';
import AddDoctor from './features/admin/AddDoctor';
import ProfilePage, { profileLoader } from './features/user/ProfilePage';
import Career, { careerAction } from './features/doctorsPage/Career';
import AuthUserLayout from './AuthUserLayout';
import DoctorManagment from './features/doctorsPage/DoctorManagment';
import Pharmaceuticals from './features/pharmaceuticals/Pharmaceuticals';
import AuthDoctorLayout from './AuthDoctorLayout';
import AuthAdminLayout from './AuthAdminLayout';
import Patients from './features/admin/Patients';
import Reviews from './features/admin/Reviews';
import MyReviews, { patientReviewsLoader } from './features/user/MyReviews';
import TestPage from './features/doctorsPage/TestPage';
import FactoryList from './features/user/FactoryList';
import Factroies from './features/admin/Factroies';
import DoctorProfile ,{doctorProfileLoader} from './features/doctorsPage/DoctorProfile';
import PharmaceuticalList from './features/admin/PharmaceuticalList';

export default function App() {
  const router = createBrowserRouter([
    {
      element: <AuthUserLayout />, // ✅ fixed typo here
      children: [
        {
          element: <AppLayout />,
          path: '/',
          children: [
            {
              element: <Home />,
              path: '/home',
              loader: fetchDoctors,
            },
            {
              element: <Doctors />,
              path: '/doctors',
              loader: allDoctors,
            },
            {
              element: <About />,
              path: '/about',
            },
            {
              element: <ContactUs />,
              path: '/contact',
            },
            {
              element: <SignUp />,
              path: '/signup',
              action: signupAction,
            },
            {
              element: <Login />,
              path: '/login',
              action: loginAction,
            },
            {
              element: <MyReviews />,
              path: '/myReviews',
              loader: patientReviewsLoader,
            },
            {
              element: <Chatbot />,
              path: '/chatbot',
            },
            {
              element: <Career />,
              path: '/career',
              action: careerAction,
            },
            {
              element: <Pharmaceuticals />,
              path: '/pharmaceuticals',
            },
            {
              element: <FactoryList />,
              path: '/factories',
            },
            {
              element: <DoctorProfilePage />,
              path: '/profile/:id',
              loader: getSpecificDoctor,
            },
            {
              element: <MyAppointments />,
              path: '/myAppointments',
            },
            {
              element: <ProfilePage />,
              path: '/profile',
              loader: profileLoader,
            },{
              element:<DoctorProfile/>,
              path:"/doctorProfile",
              loader:doctorProfileLoader
            }
          ],
        },

        // 🔒 Admin Panel Routes

        {
          element: <AuthAdminLayout />,
          children: [
            {
              element: <Admin />,
              path: '/admin',
              children: [
                {
                  element: <Dashboard />,
                  path: 'dashboard',
                  loader: dashboardLoader,
                },
                {
                  element: <Dashboard />,
                  index: true,
                  element: <Navigate to="dashboard" replace />,
                },
                {
                  element: <Factroies />,
                  path: 'factories',
                },
                {
                  // element: <DoctorsList />,
                  element:<DoctorItems/>,
                  path: 'doctorsList',
                  // loader: doctorsList,
                  loader: fetchDoctors,
                },
                {
                  element: <AddDoctor />,
                  path: 'addDoctor',
                },
                {
                  element: <Patients />,
                  path: 'patients',
                  // loader: patientsLoader,
                },
                {
                  element: <Reviews />,
                  path: 'reviews',
                },{
                  element:<PharmaceuticalList/>,
                  path:"Pharmaceuticals"
                }
              ],
            },
          ],
        },

        {
          element: <AuthDoctorLayout />,
          children: [
            {
              element: <DoctorManagment />,
              path: '/doctorManagement',
            },
          ],
        },

        // 👨‍⚕️ Doctor Management Route (standalone route)
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
