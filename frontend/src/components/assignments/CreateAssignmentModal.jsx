import { useState } from "react";
import { createAssignment } from "../../services/assignmentService";

function CreateAssignmentModal({
  open,
  onClose,
  refreshAssignments,
}) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Physics");
  const [chapter, setChapter] = useState("");
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [published, setPublished] = useState(true);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAssignment({
        title,
        subject,
        chapter,
        description,
        publish_date: publishDate,
        submission_deadline: deadline,
        is_published: published,
      });

      alert("Assignment created successfully");

      refreshAssignments();
      onClose();

    } catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  alert(JSON.stringify(error.response?.data));
}
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-2xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          📚 Create Assignment
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Assignment Title"
            className="w-full border rounded-lg p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <select
            className="w-full border rounded-lg p-3"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Biology</option>
            <option>Mathematics</option>
          </select>

          <input
            type="text"
            placeholder="Chapter"
            className="w-full border rounded-lg p-3"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />

          <textarea
            rows="4"
            placeholder="Description"
            className="w-full border rounded-lg p-3"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="font-semibold">
                Publish Date
              </label>

              <input
                type="date"
                className="w-full border rounded-lg p-3 mt-2"
                value={publishDate}
                onChange={(e) =>
                  setPublishDate(e.target.value)
                }
              />
            </div>

            <div>
              <label className="font-semibold">
                Submission Deadline
              </label>

              <input
                type="datetime-local"
                className="w-full border rounded-lg p-3 mt-2"
                value={deadline}
                onChange={(e) =>
                  setDeadline(e.target.value)
                }
              />
            </div>

          </div>

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={published}
              onChange={(e) =>
                setPublished(e.target.checked)
              }
            />

            <span>Publish Assignment</span>

          </div>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Create
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateAssignmentModal;