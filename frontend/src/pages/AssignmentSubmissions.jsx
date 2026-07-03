import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getSubmissions,
} from "../services/assignmentService";

function AssignmentSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data = await getSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load submissions");
    }
  };

  const filtered = submissions.filter((submission) =>
    submission.student_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          📤 Assignment Submissions
        </h1>

        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

<div className="grid grid-cols-4 gap-5 mb-8">

  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-gray-500">
      Total
    </h3>

    <p className="text-3xl font-bold">
      {submissions.length}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-gray-500">
      Pending
    </h3>

    <p className="text-3xl font-bold text-yellow-600">
      {
        submissions.filter(
          s => s.status === "Pending"
        ).length
      }
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-gray-500">
      Checked
    </h3>

    <p className="text-3xl font-bold text-green-600">
      {
        submissions.filter(
          s => s.status === "Checked"
        ).length
      }
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-gray-500">
      Average %
    </h3>

    <p className="text-3xl font-bold text-blue-600">

      {submissions.length
        ? (
            submissions.reduce(
              (sum, s) => sum + s.percentage,
              0
            ) / submissions.length
          ).toFixed(1)
        : 0}%

    </p>
  </div>

</div>

        <table className="w-full">

          <thead className="bg-blue-600 text-white">
  <tr>
    <th className="p-4 text-left">
      Student
    </th>

    <th className="text-left">
      Assignment
    </th>

    <th>Status</th>

    <th>Marks</th>

    <th>Percentage</th>

    <th>Submitted</th>

    <th>Action</th>
  </tr>
</thead>

          <tbody>

            {filtered.map((submission) => (

              <tr
                key={submission.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {submission.student_name}
                </td>

                <td>
                  {submission.practice_title}
                </td>

                <td className="text-center">

                  {submission.status === "Pending" ? (

                    <span className="text-yellow-600 font-bold">
                      Pending
                    </span>

                  ) : (

                    <span className="text-green-600 font-bold">
                      Checked
                    </span>

                  )}

                </td>


                <td className="text-center">
  {submission.status === "Checked"
    ? `${submission.total_marks} / ${submission.total_assignment_marks}`
    : "--"}
</td>

<td className="text-center">
  {submission.status === "Checked"
    ? `${submission.percentage}%`
    : "--"}
</td>

                <td className="text-center">
                  {new Date(
                    submission.submitted_at
                  ).toLocaleString()}
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
  Review
</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default AssignmentSubmissions;