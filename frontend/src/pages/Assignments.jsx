import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getAssignments,
  deleteAssignment,
} from "../services/assignmentService";

import { useNavigate } from "react-router-dom";
import CreateAssignmentModal from "../components/assignments/CreateAssignmentModal";

function Assignments() {
  const [assignments, setAssignments] =
    useState([]);
const navigate = useNavigate();

const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      const data = await getAssignments();
      setAssignments(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load assignments");
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this assignment?"
      )
    )
      return;

    try {
      await deleteAssignment(id);

      loadAssignments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <div className="flex justify-between mb-8">

        <h1 className="text-3xl font-bold">
          📚 Assignments
        </h1>

        <button
  onClick={() => setOpenModal(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
>
  + Create Assignment
</button>

      </div>

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4">
                Title
              </th>

              <th>
                Subject
              </th>

              <th>
                Chapter
              </th>

              <th>
                Published
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {assignments.map((assignment) => (

              <tr
                key={assignment.id}
                className="border-b"
              >

                <td className="p-4">
                  {assignment.title}
                </td>

                <td>
                  {assignment.subject}
                </td>

                <td>
                  {assignment.chapter}
                </td>

                <td>

                  {assignment.is_published
                    ? "✅"
                    : "❌"}

                </td>

                <td>

                  <button
  onClick={() =>
    navigate(
      `/assignments/${assignment.id}/questions`
    )
  }
  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg mr-2"
>
  Manage Questions
</button>

                  <button className="bg-blue-600 text-white px-3 py-2 rounded-lg mr-2">
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        assignment.id
                      )
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

<CreateAssignmentModal
  open={openModal}
  onClose={() => setOpenModal(false)}
  refreshAssignments={loadAssignments}
/>

    </DashboardLayout>
  );
}

export default Assignments;