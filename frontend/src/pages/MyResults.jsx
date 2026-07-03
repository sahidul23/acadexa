import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getMyResults } from "../services/resultService";

function MyResults() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const data = await getMyResults();
      setResults(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load results");
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        My Results
      </h1>

      <div className="space-y-5">

        {results.map((result) => (

          <div
            key={result.id}
            className="bg-white rounded-xl shadow p-6"
          >

            <h2 className="text-2xl font-bold">
              {result.test_title}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">

              <div>
                <p className="text-gray-500">Score</p>
                <h2 className="text-2xl font-bold">
                  {result.score}
                </h2>
              </div>

              <div>
                <p className="text-gray-500">Correct</p>
                <h2 className="text-green-600 text-2xl font-bold">
                  {result.correct_answers}
                </h2>
              </div>

              <div>
                <p className="text-gray-500">Wrong</p>
                <h2 className="text-red-600 text-2xl font-bold">
                  {result.wrong_answers}
                </h2>
              </div>

              <div>
                <p className="text-gray-500">Percentage</p>
                <h2 className="text-blue-600 text-2xl font-bold">
                  {result.percentage}%
                </h2>
              </div>

            </div>

            <button
              onClick={() => navigate(`/result/${result.id}`)}
              className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              View Details
            </button>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default MyResults;