import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    tests: 0,
    notes: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Acadexa 🚀
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Students */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">👨‍🎓 Students</h3>
          <h1 className="text-4xl font-bold mt-3">
            {loading ? "..." : stats.students}
          </h1>
        </div>

        {/* Teachers */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">👨‍🏫 Teachers</h3>
          <h1 className="text-4xl font-bold mt-3">
            {loading ? "..." : stats.teachers}
          </h1>
        </div>

        {/* Tests */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">📝 Mock Tests</h3>
          <h1 className="text-4xl font-bold mt-3">
            {loading ? "..." : stats.tests}
          </h1>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">📚 Notes</h3>
          <h1 className="text-4xl font-bold mt-3">
            {loading ? "..." : stats.notes}
          </h1>
        </div>

      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">
          📈 Recent Activity
        </h2>

        <ul className="space-y-3">
          <li>✅ Dashboard connected successfully</li>
          <li>✅ Student Management module completed</li>
          <li>🚀 Teacher Module coming next...</li>
        </ul>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;