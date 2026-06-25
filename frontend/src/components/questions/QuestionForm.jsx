import { useEffect, useState } from "react";
import { createQuestion } from "../../services/questionService";
import { getTests } from "../../services/testService";

function QuestionForm({ onSuccess }) {
  const [tests, setTests] = useState([]);

  const [formData, setFormData] = useState({
    test: "",
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "A",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    explanation: "",
  });

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
  try {
    const data = await getTests();

    console.log("Tests API Response:", data);

    setTests(Array.isArray(data) ? data : []);
  } catch (error) {
    console.log("Test Fetch Error:", error);
    setTests([]);
  }
};
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createQuestion(formData);

      alert("Question added successfully!");

      setFormData({
        test: "",
        question_text: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "A",
        marks: 4,
        negative_marks: 1,
        difficulty: "Medium",
        explanation: "",
      });

      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Failed to add question");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
    >

      <select
        name="test"
        value={formData.test}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      >
        <option value="">
          Select Test
        </option>

        {Array.isArray(tests) &&
  tests.map((test) => (
    <option
      key={test.id}
      value={test.id}
    >
      {test.title}
    </option>
  ))}
      </select>

      <textarea
        name="question_text"
        placeholder="Question"
        value={formData.question_text}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        rows="4"
        required
      />

      <input
        name="option_a"
        placeholder="Option A"
        value={formData.option_a}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        name="option_b"
        placeholder="Option B"
        value={formData.option_b}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        name="option_c"
        placeholder="Option C"
        value={formData.option_c}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        name="option_d"
        placeholder="Option D"
        value={formData.option_d}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <select
        name="correct_answer"
        value={formData.correct_answer}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="A">Option A</option>
        <option value="B">Option B</option>
        <option value="C">Option C</option>
        <option value="D">Option D</option>
      </select>

      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <input
        name="marks"
        type="number"
        placeholder="Marks"
        value={formData.marks}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="negative_marks"
        type="number"
        placeholder="Negative Marks"
        value={formData.negative_marks}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="explanation"
        placeholder="Explanation"
        value={formData.explanation}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        rows="4"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
      >
        Save Question
      </button>

    </form>
  );
}

export default QuestionForm;