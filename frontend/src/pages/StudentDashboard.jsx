import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getTests } from "../services/testService";

function StudentDashboard() {
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const data = await getTests();

      // Show only published tests
      setTests(data.filter((test) => test.is_published));
    } catch (error) {
      console.log(error);
      alert("Failed to load tests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-4xl font-bold">👋 Welcome Student</h1>

        <p className="mt-3 text-green-100">
          Choose a published mock test and start practicing.
        </p>
      </div>

      <h2 className="text-3xl font-bold mb-6">
        📘 Available Mock Tests
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : tests.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-2xl font-bold">
            No Published Tests
          </h2>

          <p className="text-gray-500 mt-2">
            Your teacher has not published any tests yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-bold">
                📘 {test.title}
              </h2>

              <div className="mt-5 space-y-2">
                <p>
                  📚 <b>Subject:</b> {test.subject}
                </p>

                <p>
                  📖 <b>Chapter:</b> {test.chapter}
                </p>

                <p>
                  ⏱ <b>Duration:</b> {test.duration} Minutes
                </p>

                <p>
                  📝 <b>Total Marks:</b> {test.total_marks}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/exam/${test.id}/instructions`)
                }
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                ▶ Start Test
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default StudentDashboard;