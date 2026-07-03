import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getResultDetails } from "../services/resultService";

function ResultDetails() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {
    try {
      const data = await getResultDetails(attemptId);
      setResult(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load result");
    }
  };

  if (!result) {
    return (
      <DashboardLayout>
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold">
            Loading Result...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
            📊 Result Details
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

            <div className="bg-blue-50 rounded-xl p-5">
              <p className="text-gray-500">Test</p>
              <h2 className="text-xl font-bold">
                {result.test_title}
              </h2>
            </div>

            {result.student_name && (
              <div className="bg-purple-50 rounded-xl p-5">
                <p className="text-gray-500">Student</p>
                <h2 className="text-xl font-bold">
                  {result.student_name}
                </h2>
              </div>
            )}

            <div className="bg-green-50 rounded-xl p-5">
              <p className="text-gray-500">Score</p>
              <h2 className="text-3xl font-bold text-green-600">
                {result.score}
              </h2>
            </div>

            <div className="bg-green-100 rounded-xl p-5">
              <p className="text-gray-500">Correct</p>
              <h2 className="text-3xl font-bold">
                {result.correct_answers}
              </h2>
            </div>

            <div className="bg-red-100 rounded-xl p-5">
              <p className="text-gray-500">Wrong</p>
              <h2 className="text-3xl font-bold">
                {result.wrong_answers}
              </h2>
            </div>

            <div className="bg-yellow-100 rounded-xl p-5">
              <p className="text-gray-500">Skipped</p>
              <h2 className="text-3xl font-bold">
                {result.unanswered}
              </h2>
            </div>

            <div className="bg-indigo-100 rounded-xl p-5">
              <p className="text-gray-500">Percentage</p>
              <h2 className="text-3xl font-bold">
                {result.percentage}%
              </h2>
            </div>

          </div>

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-4">
              Performance
            </h2>

            <div className="w-full bg-gray-200 rounded-full h-5">

              <div
                className="bg-blue-600 h-5 rounded-full"
                style={{
                  width: `${result.percentage}%`,
                }}
              ></div>

            </div>

            <p className="mt-3 text-gray-600">
              You scored <b>{result.percentage}%</b> in this test.
            </p>

          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            ← Back
          </button>

<button
  onClick={() => navigate(`/result/${attemptId}/review`)}
  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
>
  📖 Review Answers
</button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default ResultDetails;