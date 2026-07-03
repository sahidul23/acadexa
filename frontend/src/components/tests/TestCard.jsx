import { useNavigate } from "react-router-dom";

function TestCard({
  test,
  onEdit,
  onDelete,
  onTogglePublish,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            📘 {test.title}
          </h2>

          <p className="text-gray-500 mt-1">
            {test.subject}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            test.is_published
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {test.is_published ? "🟢 Published" : "🟡 Draft"}
        </span>

      </div>

      <div className="mt-5 space-y-2 text-gray-700">

        <p>📖 <b>Chapter:</b> {test.chapter}</p>

        <p>⏱ <b>Duration:</b> {test.duration} mins</p>

        <p>📝 <b>Total Marks:</b> {test.total_marks}</p>

      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">

        <button
          onClick={() => navigate(`/questions/${test.id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2"
        >
          Questions
        </button>

        <button
          onClick={() => onEdit(test)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg py-2"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(test)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-2"
        >
          Delete
        </button>

        <button
          onClick={() => onTogglePublish(test)}
          className={`rounded-lg py-2 text-white ${
            test.is_published
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {test.is_published ? "Unpublish" : "Publish"}
        </button>

      </div>

    </div>
  );
}

export default TestCard;