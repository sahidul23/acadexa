import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getStudentAssignments,
} from "../services/assignmentService";

function MyAssignments() {
  const [assignments, setAssignments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      const data = await getStudentAssignments();
      setAssignments(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load assignments");
    }
  };

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          📚 My Assignments
        </h1>

      </div>

      <div className="grid gap-6">

        {assignments.map((assignment) => (

          <div
            key={assignment.id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >

            <div className="flex justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  {assignment.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {assignment.subject}
                </p>

                <p className="text-gray-500">
                  {assignment.chapter}
                </p>

                <p className="mt-4">
                  📅 Publish :
                  {" "}
                  {assignment.publish_date}
                </p>

                <p>
                  ⏰ Deadline :
                  {" "}
                  {new Date(
                    assignment.submission_deadline
                  ).toLocaleString()}
                </p>

              </div>

              <div>

                <button
                  onClick={() =>
                    navigate(
                      `/assignment/${assignment.id}`
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                >
                  Open Assignment
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default MyAssignments;