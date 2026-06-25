import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  getQuestions,
  deleteQuestion,
} from "../services/questionService";

import QuestionModal from "../components/questions/QuestionModal";
import QuestionForm from "../components/questions/QuestionForm";

function Questions() {
  const { testId } = useParams();  
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  

console.log("Selected Test:", testId);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch questions");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Question Builder
        </h1>

        <button
  onClick={() => setIsModalOpen(true)}
  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
>
  + Add Question
</button>



      </div>

      <div className="space-y-5">

        {questions
  .filter(
    (question) =>
      !testId || Number(question.test) === Number(testId)
  )
  .map((question) => (

          <div
            key={question.id}
            className="bg-white rounded-xl shadow p-6"
          >

            <h2 className="font-semibold text-lg mb-4">
              {question.question_text}
            </h2>

            <div className="grid grid-cols-2 gap-3">

              <div>🅰 {question.option_a}</div>
              <div>🅱 {question.option_b}</div>
              <div>🅲 {question.option_c}</div>
              <div>🅳 {question.option_d}</div>

            </div>

            <div className="flex flex-wrap gap-3 mt-5">

  <span className="bg-green-100 px-3 py-1 rounded-full">
    ✔ {question.correct_answer}
  </span>

  <span className="bg-blue-100 px-3 py-1 rounded-full">
    {question.difficulty}
  </span>

  <span className="bg-purple-100 px-3 py-1 rounded-full">
    +{question.marks}
  </span>

  <span className="bg-red-100 px-3 py-1 rounded-full">
    -{question.negative_marks}
  </span>

  <button
    onClick={() => {
      setSelectedQuestion(question);
      setIsModalOpen(true);
    }}
    className="bg-green-600 text-white px-3 py-1 rounded-lg"
  >
    Edit
  </button>

  <button
  onClick={async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmDelete) return;

    try {
      await deleteQuestion(question.id);

      alert("Question deleted successfully!");

      fetchQuestions();
    } catch (error) {
      console.log(error);
      alert("Failed to delete question");
    }
  }}
  className="bg-red-600 text-white px-3 py-1 rounded-lg"
>
  Delete
</button>

</div>

          </div>

        ))}

      </div>
    <QuestionModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
>
  <QuestionForm
  question={selectedQuestion}
  onSuccess={() => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
    fetchQuestions();
  }}
/>

</QuestionModal>
    </DashboardLayout>
  );
}

export default Questions;