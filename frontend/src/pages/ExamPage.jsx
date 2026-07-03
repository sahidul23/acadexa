import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ExamLayout from "../layouts/ExamLayout";
import Timer from "../components/exam/Timer";
import CameraMonitor from "../components/exam/CameraMonitor";

import {
  getExamQuestions,
  submitExam,
} from "../services/examService";

function ExamPage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const cameraRef = useRef(null);

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await getExamQuestions(testId);
      setQuestions(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load questions");
    }
  };

  const selectAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleTimeUp = async () => {
    cameraRef.current?.stopCamera();

    try {
      const result = await submitExam(testId, answers);

      navigate("/result", {
        state: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit the test?"
    );

    if (!confirmSubmit) return;

    cameraRef.current?.stopCamera();

    try {
      const result = await submitExam(testId, answers);

      navigate(`/result/${result.attempt_id}`);
    } catch (error) {
      console.log(error);
      alert("Failed to submit exam");
    }
  };

  if (questions.length === 0) {
    return (
      <ExamLayout>
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">
            Loading Questions...
          </h2>
        </div>
      </ExamLayout>
    );
  }

  const question = questions[currentQuestion];

  return (
    <ExamLayout>

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT PANEL */}

          <div className="lg:col-span-3">

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-2xl font-bold">
                  Question {currentQuestion + 1} / {questions.length}
                </h2>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                  {question.marks} Marks
                </span>

              </div>

              <h3 className="text-xl font-semibold mb-8">
                {question.question_text}
              </h3>

              <div className="space-y-4">

                            <button
                  onClick={() => selectAnswer(question.id, "A")}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    answers[question.id] === "A"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <span className="font-bold">A.</span>{" "}
                  {question.option_a}
                </button>

                <button
                  onClick={() => selectAnswer(question.id, "B")}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    answers[question.id] === "B"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <span className="font-bold">B.</span>{" "}
                  {question.option_b}
                </button>

                <button
                  onClick={() => selectAnswer(question.id, "C")}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    answers[question.id] === "C"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <span className="font-bold">C.</span>{" "}
                  {question.option_c}
                </button>

                <button
                  onClick={() => selectAnswer(question.id, "D")}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    answers[question.id] === "D"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <span className="font-bold">D.</span>{" "}
                  {question.option_d}
                </button>

              </div>

              <div className="flex justify-between mt-10">

                <button
                  disabled={currentQuestion === 0}
                  onClick={() =>
                    setCurrentQuestion(currentQuestion - 1)
                  }
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl disabled:opacity-40"
                >
                  ⬅ Previous
                </button>

                {currentQuestion === questions.length - 1 ? (

                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
                  >
                    Submit Test
                  </button>

                ) : (

                  <button
                    onClick={() =>
                      setCurrentQuestion(currentQuestion + 1)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                  >
                    Next ➜
                  </button>

                )}

              </div>

            </div>

          </div>


          {/* RIGHT SIDEBAR */}

          <div className="space-y-6 sticky top-6">

            {/* Timer */}

            <div className="bg-white rounded-2xl shadow-lg p-5">

              <h2 className="text-lg font-bold mb-4">
                ⏱ Timer
              </h2>

              <Timer
                duration={180}
                onTimeUp={handleTimeUp}
              />

            </div>

            {/* Camera */}

            <div className="bg-white rounded-2xl shadow-lg p-5">

              <h2 className="text-lg font-bold mb-4">
                📷 Camera
              </h2>

              <div className="w-full max-w-[220px] mx-auto">
                <CameraMonitor ref={cameraRef} />
              </div>

            </div>

            {/* Question Palette */}

            <div className="bg-white rounded-2xl shadow-lg p-5">

              <h2 className="text-lg font-bold mb-4">
                Question Palette
              </h2>

              <div className="grid grid-cols-5 gap-2">

                {questions.map((q, index) => (

                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg font-bold transition ${
                      currentQuestion === index
                        ? "bg-blue-600 text-white"
                        : answers[q.id]
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>

                ))}

              </div>

              <div className="mt-6 space-y-2 text-sm">

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-600"></div>
                  <span>Current Question</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-600"></div>
                  <span>Answered</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-300"></div>
                  <span>Not Answered</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </ExamLayout>
  );
}

export default ExamPage;