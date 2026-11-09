
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-slate-50">
      <Sidebar />
      <div className="fixed inset-x-0 top-0 z-20 flex h-14 items-center border-b border-slate-200 bg-white px-3 lg:hidden">
        <span className="pl-12 text-sm font-semibold text-slate-800">Admin Panel</span>
      </div>
      <main className="min-h-screen min-w-0 lg:ml-64">
        <div className="mx-auto w-full max-w-[1600px] px-3 pb-6 pt-16 sm:px-5 sm:pb-8 lg:px-7 lg:pt-7 xl:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
