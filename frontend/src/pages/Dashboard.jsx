import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboardStats } from "../services/dashboardService";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import DashboardCharts from "../components/dashboard/DashboardCharts";

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

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl shadow-2xl p-8 text-white">

        <h1 className="text-4xl font-bold">
          👋 Welcome Back, Administrator
        </h1>

        <p className="mt-3 text-blue-100 text-lg">
          Manage students, conduct examinations, publish notes,
          and evaluate descriptive assignments from one platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5">
            <h3 className="font-bold text-lg">
              🎓 Student Management
            </h3>

            <p className="text-sm mt-2 text-blue-100">
              Add, manage and organize student records.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5">
            <h3 className="font-bold text-lg">
              📝 Online Examinations
            </h3>

            <p className="text-sm mt-2 text-blue-100">
              Conduct MCQ examinations with instant evaluation.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5">
            <h3 className="font-bold text-lg">
              📚 Notes & Assignments
            </h3>

            <p className="text-sm mt-2 text-blue-100">
              Share notes and review handwritten assignments.
            </p>
          </div>

        </div>

      </div>

      {/* Statistics Heading */}

      <div className="flex justify-between items-center mt-10 mb-6">

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Dashboard Overview
          </h2>

          <p className="text-gray-500 mt-1">
            Monitor academic activities from one place.
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Students"
          value={loading ? "..." : stats.students}
          icon="👨‍🎓"
          color="#2563eb"
        />

        <StatCard
          title="Teachers"
          value={loading ? "..." : stats.teachers}
          icon="👨‍🏫"
          color="#16a34a"
        />

        <StatCard
          title="Mock Tests"
          value={loading ? "..." : stats.tests}
          icon="📝"
          color="#f59e0b"
        />

        <StatCard
          title="Notes"
          value={loading ? "..." : stats.notes}
          icon="📚"
          color="#7c3aed"
        />

      </div>

      {/* Quick Actions */}

      <div className="mt-10">
        <QuickActions />
      </div>

      {/* Charts */}

      <div className="mt-10">
        <DashboardCharts stats={stats} />
      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          🚀 Platform Highlights
        </h2>

        <div className="space-y-5">

          <div className="flex items-center gap-4 border-b pb-5">

            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
              👨‍🎓
            </div>

            <div>

              <h3 className="font-semibold">
                Student Management
              </h3>

              <p className="text-gray-500">
                Register, update and manage student information.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 border-b pb-5">

            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              📝
            </div>

            <div>

              <h3 className="font-semibold">
                Smart Examination System
              </h3>

              <p className="text-gray-500">
                Create mock tests with automatic evaluation and instant results.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 border-b pb-5">

            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
              📚
            </div>

            <div>

              <h3 className="font-semibold">
                Digital Notes
              </h3>

              <p className="text-gray-500">
                Upload and distribute study materials to students.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
              📷
            </div>

            <div>

              <h3 className="font-semibold">
                Assignment Evaluation
              </h3>

              <p className="text-gray-500">
                Students upload notebook images and teachers review, score and provide feedback online.
              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;