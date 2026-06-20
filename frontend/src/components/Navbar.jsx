function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="font-semibold">
        👤 {user?.username}
      </div>

    </nav>
  );
}

export default Navbar;