import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <DashboardLayout>
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold">
            No Result Found
          </h1>

          <button
            onClick={() => navigate("/student-dashboard")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const { score, correct, wrong, unanswered, percentage } = state;

  return (
    <DashboardLayout>

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl p-10">

          <h1 className="text-4xl font-bold text-center text-green-600">
            🎉 Test Completed
          </h1>

          <div className="grid grid-cols-2 gap-6 mt-10">

            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="text-gray-500">Score</h3>
              <h1 className="text-4xl font-bold">
                {score}
              </h1>
            </div>

            <div className="bg-purple-50 rounded-xl p-5">
              <h3 className="text-gray-500">Percentage</h3>
              <h1 className="text-4xl font-bold">
                {percentage}%
              </h1>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <h3 className="text-gray-500">Correct</h3>
              <h1 className="text-4xl font-bold text-green-600">
                {correct}
              </h1>
            </div>

            <div className="bg-red-50 rounded-xl p-5">
              <h3 className="text-gray-500">Wrong</h3>
              <h1 className="text-4xl font-bold text-red-600">
                {wrong}
              </h1>
            </div>

          </div>

          <div className="bg-yellow-50 rounded-xl p-5 mt-6">
            <h3 className="text-gray-500">
              Unanswered Questions
            </h3>

            <h1 className="text-4xl font-bold">
              {unanswered}
            </h1>
          </div>

          <button
            onClick={() => navigate("/student-dashboard")}
            className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ResultPage;