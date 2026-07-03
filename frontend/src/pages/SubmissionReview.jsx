import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getSubmissionReview,
  evaluateSubmission,
} from "../services/assignmentService";

function SubmissionReview() {
  const { submissionId } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin = user?.role === "ADMIN";

  const [submission, setSubmission] = useState(null);

  const [marks, setMarks] = useState("");

  const [feedback, setFeedback] = useState("");

  

  useEffect(() => {
    loadSubmission();
  }, []);

  const loadSubmission = async () => {
    try {
      const data = await getSubmissionReview(
        submissionId
      );

      setSubmission(data);
      setMarks(data.total_marks);
      setFeedback(data.feedback);

    } catch (error) {
      console.log(error);
      alert("Failed to load submission");
    }
  };

  const handleSave = async () => {
    try {
      await evaluateSubmission(
        submissionId,
        {
          total_marks: marks,
          feedback: feedback,
        }
      );

      alert("Evaluation saved successfully!");

      navigate("/assignment-submissions");

    } catch (error) {
      console.log(error);
      alert("Failed to save evaluation");
    }
  };

  if (!submission) {
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

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-xl shadow p-8">

          <h1 className="text-3xl font-bold">
            Assignment Review
          </h1>

          <div className="grid grid-cols-2 gap-6 mt-6">

            <div>

              <p>
                <strong>Student:</strong>{" "}
                {submission.student_name}
              </p>

              <p className="mt-2">
                <strong>Assignment:</strong>{" "}
                {submission.practice_title}
              </p>

              <p className="mt-2">
                <strong>Status:</strong>{" "}
                {submission.status}
              </p>

            </div>

            <div>

              <p>
                <strong>Submitted:</strong>
              </p>

              <p>
                {new Date(
                  submission.submitted_at
                ).toLocaleString()}
              </p>

            </div>

          </div>

        </div>

        <div className="mt-8 bg-white rounded-xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            Notebook Images
          </h2>

          <div className="grid grid-cols-2 gap-6">

            {submission.images.map((img) => (

              <div
                key={img.id}
                className="border rounded-xl p-4"
              >

                <img
                  src={img.image}
                  alt="Notebook"
                  className="rounded-lg w-full"
                />

              </div>

            ))}

          </div>

        </div>

        <div className="mt-8 bg-white rounded-xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            Evaluation
          </h2>

          <div className="mb-6">

            <label className="block mb-2 font-semibold">
              Marks
            </label>

            <input
  type="number"
  value={marks}
  readOnly={!isAdmin}
  onChange={(e) =>
    setMarks(e.target.value)
  }
  className="border rounded-lg w-full p-3"
/>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Feedback
            </label>

            <textarea
  rows="5"
  value={feedback}
  readOnly={!isAdmin}
  onChange={(e) =>
    setFeedback(e.target.value)
  }
  className="border rounded-lg w-full p-3"
/>

          </div>

          {isAdmin && (
  <button
    onClick={handleSave}
    className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
  >
    Save Evaluation
  </button>
)}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default SubmissionReview;