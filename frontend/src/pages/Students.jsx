import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/api";
import StudentModal from "../components/students/StudentModal";
import StudentForm from "../components/students/StudentForm";

function Students() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("students/");
      setStudents(response.data);
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }
    }
  };

  // Called after a student is successfully added
  const handleStudentAdded = () => {
    setIsModalOpen(false);
    fetchStudents();
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Student Management
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Student
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

  <div className="overflow-x-auto">

    <table className="min-w-[900px] w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Admission No</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Section</th>
              <th>Guardian</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="py-4">
                    {student.admission_number}
                  </td>

                  <td>{student.roll_number}</td>

                  <td>{student.class_name}</td>

                  <td>{student.section_name}</td>

                  <td>{student.guardian_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <StudentForm onSuccess={handleStudentAdded} />
      </StudentModal>
    </DashboardLayout>
  );
}

export default Students;