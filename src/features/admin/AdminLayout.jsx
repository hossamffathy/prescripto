import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

export default function AdminLayout() {
  const admin =useSelector(state=>state.admin)
  console.log(admin)
  if (admin.role !== "Coordinator") {
        return (
          <div className="flex min-h-screen items-center justify-center bg-red-50">
            <div className="rounded-lg border border-red-300 bg-white p-6 shadow-md">
              <h1 className="text-xl font-semibold text-red-600">Access Denied</h1>
              <p className="mt-2 text-gray-600">
                You do not have permission to access this page.
              </p>
            </div>
          </div>
        );
      }
  return  <>
    <Header />
    <main className='flex'>


    <Sidebar />
    <Outlet/>
    </main>
  </>
}
