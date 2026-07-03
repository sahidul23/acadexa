import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getSubmissions,
} from "../services/assignmentService";

function AssignmentResults() {
  const [submissions, setSubmissions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const data = await getSubmissions();

      setSubmissions(data);

    } catch (error) {
      console.log(error);
      alert("Failed to load results");
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        📊 Assignment Results
      </h1>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

  <div className="overflow-x-auto">

    <table className="min-w-[900px] w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4 text-left">
                Assignment
              </th>

              <th>
                Status
              </th>

              <th>
                Marks
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {submissions.map((submission) => (

              <tr
                key={submission.id}
                className="border-b"
              >

                <td className="p-4">
                  {submission.practice_title}
                </td>

                <td className="text-center">

                  {submission.status === "Checked"

                    ? "✅ Checked"

                    : "⏳ Pending"}

                </td>

                <td className="text-center">

                  {submission.status === "Checked"

                    ? submission.total_marks

                    : "--"}

                </td>

                <td className="text-center">

                  <button
                    onClick={() =>
                      navigate(
                        `/submission/${submission.id}`
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
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

export default AssignmentResults;