import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getTests } from "../services/testService";
import TestModal from "../components/tests/TestModal";
import TestForm from "../components/tests/TestForm";

function MockTests() {
  const [tests, setTests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const data = await getTests();
      setTests(data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch tests");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Mock Tests
        </h1>

        <button
  onClick={() => setIsModalOpen(true)}
  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
>
  + Create Test
</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold mb-3">
              {test.title}
            </h2>

            <p>
              📘 <b>Subject:</b> {test.subject}
            </p>

            <p>
              📖 <b>Chapter:</b> {test.chapter}
            </p>

            <p>
              ⏱ <b>Duration:</b> {test.duration} mins
            </p>

            <p>
              📝 <b>Total Marks:</b> {test.total_marks}
            </p>

            <div className="mt-4">
              {test.is_published ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Published
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  Draft
                </span>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              <button
  onClick={() => navigate(`/questions/${test.id}`)}
  className="bg-blue-600 text-white px-3 py-2 rounded-lg"
>
  Questions
</button>

              <button className="bg-green-600 text-white px-3 py-2 rounded-lg">
                Edit
              </button>

              <button className="bg-red-600 text-white px-3 py-2 rounded-lg">
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>
<TestModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
>
  <TestForm
    onSuccess={fetchTests}
    onClose={() => setIsModalOpen(false)}
  />
</TestModal>
    </DashboardLayout>
  );
}

export default MockTests;