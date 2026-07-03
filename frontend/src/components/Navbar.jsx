function Navbar({ openSidebar }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">

      <div className="flex items-center justify-between px-4 md:px-6 py-4">

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            onClick={openSidebar}
            className="lg:hidden text-3xl"
          >
            ☰
          </button>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Dashboard
            </h2>

            <p className="text-sm text-gray-500 hidden md:block">
              Welcome back 👋
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <div className="hidden md:block text-right">

            <p className="font-semibold text-slate-800">
              {user?.username}
            </p>

            <p className="text-sm text-gray-500">
              {user?.role}
            </p>

          </div>

          <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;