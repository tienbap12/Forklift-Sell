// AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../components/Admin/NavbarAdmin';
import SidebarAdmin from '../components/Admin/SidebarAdmin';

const AdminLayout = () => {
  return (
    <div className="min-h-screen">
      <NavbarAdmin />
      <div className="flex">
        <SidebarAdmin />
        <main className="flex-1 p-4 md:p-8 ml-64 mt-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
