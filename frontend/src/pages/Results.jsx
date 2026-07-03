import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getAllResults } from "../services/resultService";
import { useNavigate } from "react-router-dom";

function Results() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const data = await getAllResults();
      setResults(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load results");
    }
  };

  const filteredResults = results.filter((result) =>
    result.student_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Results Management
        </h1>

        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

  <div className="overflow-x-auto">

    <table className="min-w-[900px] w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4 text-left">
                Student
              </th>

              <th className="p-4 text-left">
                Test
              </th>

              <th className="p-4">
                Score
              </th>

              <th className="p-4">
                %
              </th>

              <th className="p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredResults.map((result) => (

              <tr
                key={result.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {result.student_name}
                </td>

                <td className="p-4">
                  {result.test_title}
                </td>

                <td className="text-center">
                  {result.score}
                </td>

                <td className="text-center">
                  {result.percentage}%
                </td>

                <td className="text-center">

                  <button
                    onClick={() =>
                      navigate(`/result/${result.id}`)
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      </div>

    </DashboardLayout>
  );
}

export default Results;