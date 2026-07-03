import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ closeSidebar }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleMenuClick = () => {
    if (window.innerWidth < 1024 && closeSidebar) {
      closeSidebar();
    }
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-72 h-screen bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-2xl">
              🎓
            </div>

            <div>
              <h1 className="text-3xl font-extrabold">
                ACAD<span className="text-blue-400">exa</span>
              </h1>

              <p className="text-xs text-gray-400">
                Learn • Practice • Achieve
              </p>
            </div>

          </div>

          {/* Mobile Close */}
          <button
            onClick={closeSidebar}
            className="lg:hidden text-3xl"
          >
            ✕
          </button>

        </div>

      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">

        <NavLink
          to={user?.role === "ADMIN" ? "/dashboard" : "/student-dashboard"}
          className={menuClass}
          onClick={handleMenuClick}
        >
          🏠 Dashboard
        </NavLink>

        {user?.role === "ADMIN" && (
          <>
            <NavLink to="/students" className={menuClass} onClick={handleMenuClick}>👨‍🎓 Students</NavLink>

            <NavLink to="/tests" className={menuClass} onClick={handleMenuClick}>📝 Mock Tests</NavLink>

            <NavLink to="/assignments" className={menuClass} onClick={handleMenuClick}>📖 Assignments</NavLink>

            <NavLink to="/questions" className={menuClass} onClick={handleMenuClick}>❓ Question Bank</NavLink>

            <NavLink to="/results" className={menuClass} onClick={handleMenuClick}>📊 Results</NavLink>

            <NavLink to="/assignment-submissions" className={menuClass} onClick={handleMenuClick}>📤 Submissions</NavLink>

            <NavLink to="/notes" className={menuClass} onClick={handleMenuClick}>📚 Notes</NavLink>

            <NavLink to="/motivation" className={menuClass} onClick={handleMenuClick}>🌙 Evening Study</NavLink>
          </>
        )}

        {user?.role === "STUDENT" && (
          <>
            <NavLink to="/student-dashboard" className={menuClass} onClick={handleMenuClick}>📝 Available Tests</NavLink>

            <NavLink to="/my-assignments" className={menuClass} onClick={handleMenuClick}>📖 Assignments</NavLink>

            <NavLink to="/assignment-results" className={menuClass} onClick={handleMenuClick}>📊 Assignment Results</NavLink>

            <NavLink to="/my-results" className={menuClass} onClick={handleMenuClick}>🏆 My Results</NavLink>

            <NavLink to="/my-notes" className={menuClass} onClick={handleMenuClick}>📚 My Notes</NavLink>

            <NavLink to="/evening-study" className={menuClass} onClick={handleMenuClick}>🌙 Evening Study</NavLink>
          </>
        )}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <div className="bg-slate-800 rounded-xl p-4 mb-4">

          <p className="font-semibold">
            👋 {user?.username}
          </p>

          <p className="text-sm text-blue-400">
            {user?.role}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
        >
          🚪 Logout
        </button>

        <p className="text-center text-xs text-gray-500 mt-5">
          ACADexa v1.0
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;