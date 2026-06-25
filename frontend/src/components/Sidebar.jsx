
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));

const handleLogout = () => {
    localStorage.clear();
    navigate("/");
};
  return (
    
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-10">
        Acadexa
      </h1>

      <ul className="space-y-5">

  <Link to="/dashboard">
    <li className="hover:text-blue-400 cursor-pointer">
      🏠 Dashboard
    </li>
  </Link>

  {user?.role === "ADMIN" && (
    <>
      <Link to="/students">
        <li className="hover:text-blue-400 cursor-pointer">
          👨‍🎓 Students
        </li>
      </Link>

      <Link to="/tests">
        <li className="hover:text-blue-400 cursor-pointer">
          📝 Mock Tests
        </li>
      </Link>

      <Link to="/questions">
  <li className="hover:text-blue-400 cursor-pointer">
    ❓ Questions
  </li>
</Link>

      <li className="hover:text-blue-400 cursor-pointer">
        📚 Notes
      </li>

      <li className="hover:text-blue-400 cursor-pointer">
        📊 Results
      </li>
    </>
  )}

  {user?.role === "STUDENT" && (
    <>
      <li className="hover:text-blue-400 cursor-pointer">
        📝 My Tests
      </li>

      <li className="hover:text-blue-400 cursor-pointer">
        📊 My Results
      </li>

      <li className="hover:text-blue-400 cursor-pointer">
        📚 My Notes
      </li>

      <li className="hover:text-blue-400 cursor-pointer">
        👤 My Profile
      </li>
    </>
  )}

  <li
    onClick={handleLogout}
    className="hover:text-red-400 cursor-pointer mt-8"
  >
    🚪 Logout
  </li>

</ul>
    </aside>
  );
}

export default Sidebar;