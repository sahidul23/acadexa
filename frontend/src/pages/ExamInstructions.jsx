import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getTests } from "../services/testService";

function ExamInstructions() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);

  useEffect(() => {
    fetchTest();
  }, []);

  const fetchTest = async () => {
    try {
      const tests = await getTests();

      const selectedTest = tests.find(
        (t) => t.id === Number(testId)
      );

      setTest(selectedTest);

    } catch (error) {
      console.log(error);
      alert("Failed to load test");
    }
  };

  if (!test) {
    return (
      <DashboardLayout>
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-blue-600">
            📘 {test.title}
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div>
              <p>
                <strong>Subject:</strong> {test.subject}
              </p>

              <p className="mt-3">
                <strong>Chapter:</strong> {test.chapter}
              </p>

              <p className="mt-3">
                <strong>Duration:</strong> {test.duration} Minutes
              </p>

              <p className="mt-3">
                <strong>Total Marks:</strong> {test.total_marks}
              </p>

            </div>

            <div>

              <h2 className="text-2xl font-bold mb-4">
                Instructions
              </h2>

              <ul className="list-disc ml-6 space-y-3">

                <li>Read every question carefully.</li>

                <li>Each question carries its assigned marks.</li>

                <li>Negative marking may apply.</li>

                <li>Do not refresh the page.</li>

                <li>The test will automatically submit when time is over.</li>

              </ul>

            </div>

          </div>

          <button
            onClick={() => navigate(`/exam/${test.id}`)}
            className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"
          >
            ▶ Start Exam
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ExamInstructions;