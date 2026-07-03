function DashboardHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl mb-8">

      <h1 className="text-4xl font-bold">
        👋 Welcome back, Admin
      </h1>

      <p className="mt-3 text-blue-100 text-lg">
        Manage students, mock tests, questions and results from one place.
      </p>

      <div className="flex flex-wrap gap-4 mt-8">

        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3">
          👨‍🎓 Student Management
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3">
          📝 Mock Tests
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3">
          ❓ Question Bank
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3">
          📊 Results
        </div>

      </div>

    </div>
  );
}

export default DashboardHeader;