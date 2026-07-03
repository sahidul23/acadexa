import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getReview } from "../services/reviewService";

function ResultReview() {
  const { attemptId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    loadReview();
  }, []);

  const loadReview = async () => {
    try {
      const data = await getReview(attemptId);
      setQuestions(data);
    } catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  alert(JSON.stringify(error.response?.data));
}
  };

  if (questions.length === 0) {
    return (
      <DashboardLayout>
        <h1 className="text-2xl font-bold">
          Loading Review...
        </h1>
      </DashboardLayout>
    );
  }

  const q = questions[current];

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-8">
            Question {current + 1} / {questions.length}
          </h1>

          <h2 className="text-xl font-semibold mb-6">
            {q.question_text}
          </h2>

          <div className="space-y-3">

            {["A", "B", "C", "D"].map((option) => {

              const text = q[`option_${option.toLowerCase()}`];

              let style =
                "border rounded-lg p-4";

              if (option === q.correct_answer) {
                style +=
                  " bg-green-100 border-green-600";
              }

              if (
                option === q.selected_answer &&
                option !== q.correct_answer
              ) {
                style +=
                  " bg-red-100 border-red-600";
              }

              return (
                <div
                  key={option}
                  className={style}
                >
                  <strong>{option}.</strong> {text}
                </div>
              );

            })}

          </div>

          <div className="mt-8">

            <h3 className="font-bold">
              Your Answer:
            </h3>

            <p>{q.selected_answer || "Not Answered"}</p>

            <h3 className="font-bold mt-4">
              Correct Answer:
            </h3>

            <p>{q.correct_answer}</p>

            <h3 className="font-bold mt-4">
              Explanation:
            </h3>

            <p>{q.explanation || "No explanation available."}</p>

            <h3 className="font-bold mt-4">
              Difficulty:
            </h3>

            <p>{q.difficulty}</p>

          </div>

          <div className="flex justify-between mt-10">

            <button
              disabled={current === 0}
              onClick={() => setCurrent(current - 1)}
              className="bg-gray-600 text-white px-6 py-3 rounded-xl disabled:opacity-40"
            >
              Previous
            </button>

            <button
              disabled={current === questions.length - 1}
              onClick={() => setCurrent(current + 1)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ResultReview;