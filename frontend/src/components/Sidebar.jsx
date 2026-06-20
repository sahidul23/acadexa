function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        Acadexa
      </h1>

      <ul className="space-y-5">

        <li className="hover:text-blue-400 cursor-pointer">
          🏠 Dashboard
        </li>

        <li className="hover:text-blue-400 cursor-pointer">
          👨‍🎓 Students
        </li>

        <li className="hover:text-blue-400 cursor-pointer">
          👨‍🏫 Teachers
        </li>

        <li className="hover:text-blue-400 cursor-pointer">
          📝 Mock Tests
        </li>

        <li className="hover:text-blue-400 cursor-pointer">
          📚 Notes
        </li>

        <li className="hover:text-blue-400 cursor-pointer">
          📊 Results
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;