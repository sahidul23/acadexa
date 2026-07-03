import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  getAssignmentQuestions,
  createAssignmentQuestion,
  deleteAssignmentQuestion,
} from "../services/assignmentService";

function AssignmentQuestions() {
  const { practiceId } = useParams();

  const [questions, setQuestions] = useState([]);

  const [questionText, setQuestionText] = useState("");
  const [marks, setMarks] = useState(5);
  const [order, setOrder] = useState(1);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await getAssignmentQuestions(
        practiceId
      );

      setQuestions(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load questions");
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();

    try {
      await createAssignmentQuestion({
        practice: practiceId,
        question_text: questionText,
        marks,
        order,
      });

      setQuestionText("");
      setMarks(5);
      setOrder(questions.length + 2);

      loadQuestions();

    } catch (error) {
      console.log(error);
      alert("Failed to add question");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?"))
      return;

    try {
      await deleteAssignmentQuestion(id);

      loadQuestions();

    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Assignment Questions
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <form
            onSubmit={handleAddQuestion}
            className="space-y-5"
          >

            <textarea
              rows="4"
              placeholder="Enter Question"
              className="w-full border rounded-lg p-3"
              value={questionText}
              onChange={(e) =>
                setQuestionText(e.target.value)
              }
              required
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                type="number"
                placeholder="Marks"
                className="border rounded-lg p-3"
                value={marks}
                onChange={(e) =>
                  setMarks(e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Order"
                className="border rounded-lg p-3"
                value={order}
                onChange={(e) =>
                  setOrder(e.target.value)
                }
              />

            </div>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Add Question
            </button>

          </form>

        </div>

        <div className="space-y-5">

          {questions.map((question) => (

            <div
              key={question.id}
              className="bg-white rounded-xl shadow p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="font-bold text-lg">
                    Question {question.order}
                  </h2>

                  <p className="mt-3">
                    {question.question_text}
                  </p>

                  <p className="mt-4 text-blue-600 font-semibold">
                    Marks : {question.marks}
                  </p>

                </div>

                <div className="space-x-2">

                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(question.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default AssignmentQuestions;