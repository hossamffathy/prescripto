import { Outlet } from 'react-router-dom';
import Header from './Header';

function AppLayout() {
  return (
    <div className=''>
      <Header /> {/* Header هو المكون اللي بيحتوي على الروابط */}
      <main>
        <Outlet /> {/* هنا هتظهر الصفحات المتفرعة (Home, Doctors, About, Contact) */}
      </main>
      
    </div>
  );
}

export default AppLayout;
