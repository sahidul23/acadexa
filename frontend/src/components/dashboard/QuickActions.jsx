import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <button
          onClick={() => navigate("/students")}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-5 transition-all duration-300"
        >
          <div className="text-3xl mb-2">👨‍🎓</div>
          <h3 className="font-bold text-lg">Students</h3>
          <p className="text-sm text-blue-100 mt-1">
            Manage students
          </p>
        </button>

        <button
          onClick={() => navigate("/tests")}
          className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-5 transition-all duration-300"
        >
          <div className="text-3xl mb-2">📝</div>
          <h3 className="font-bold text-lg">Mock Tests</h3>
          <p className="text-sm text-green-100 mt-1">
            Create and manage tests
          </p>
        </button>

        <button
          onClick={() => navigate("/questions")}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-5 transition-all duration-300"
        >
          <div className="text-3xl mb-2">❓</div>
          <h3 className="font-bold text-lg">Question Bank</h3>
          <p className="text-sm text-purple-100 mt-1">
            Add and edit questions
          </p>
        </button>

      </div>

    </div>
  );
}

export default QuickActions;