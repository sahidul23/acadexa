import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div className="relative w-72 h-full">
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">

        <Navbar openSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">

          <div className="max-w-7xl mx-auto">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;