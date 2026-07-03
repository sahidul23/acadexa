import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getAssignmentDetails,
} from "../services/assignmentService";


import { uploadAssignment } from "../services/assignmentService";

function AssignmentDetails() {
  const { assignmentId } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [images, setImages] = useState([]);
const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadAssignment();
  }, []);

  const loadAssignment = async () => {
    try {
      const data = await getAssignmentDetails(
        assignmentId
      );

      setAssignment(data);

    } catch (error) {
      console.log(error);
      alert("Failed to load assignment");
    }
  };

  if (!assignment) {
    return (
      <DashboardLayout>
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </DashboardLayout>
    );
  }


  const handleImageChange = (e) => {
  setImages(Array.from(e.target.files));
};

const handleSubmit = async () => {
  if (images.length === 0) {
    alert("Please select notebook images.");
    return;
  }

  try {
    setUploading(true);

    await uploadAssignment(
      assignment.id,
      images
    );

    alert("Assignment submitted successfully!");

    setImages([]);

  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);

    alert(JSON.stringify(error.response?.data));
}finally {
    setUploading(false);
  }
};

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold">
            {assignment.title}
          </h1>

          <p className="mt-3 text-gray-600">
            Subject : {assignment.subject}
          </p>

          <p className="text-gray-600">
            Chapter : {assignment.chapter}
          </p>

          <p className="mt-5">
            {assignment.description}
          </p>

        </div>

        <div className="mt-8 space-y-6">

          {assignment.questions.map((question) => (

            <div
              key={question.id}
              className="bg-white rounded-xl shadow p-6"
            >

              <div className="flex justify-between">

                <h2 className="text-xl font-bold">
                  Question {question.order}
                </h2>

                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full">
                  {question.marks} Marks
                </span>

              </div>

              <p className="mt-5 text-lg">
                {question.question_text}
              </p>

            </div>

          ))}

        </div>

        <div className="bg-yellow-50 rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-3">
            📷 Submit Notebook
          </h2>

          <p>
            Write all answers in your notebook.
            Upload clear images after completion.
          </p>

          <input
  type="file"
  multiple
  accept="image/*"
  onChange={handleImageChange}
  className="mt-5"
/>

<div className="mt-4 space-y-2">

  {images.map((image, index) => (

    <div
      key={index}
      className="bg-white rounded-lg p-3 shadow"
    >
      📄 {image.name}
    </div>

  ))}

</div>

<button
  onClick={handleSubmit}
  disabled={uploading}
  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
>
  {uploading
    ? "Uploading..."
    : "Submit Assignment"}
</button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default AssignmentDetails;