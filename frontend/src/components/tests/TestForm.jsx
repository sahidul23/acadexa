import { useState } from "react";
import { createTest } from "../../services/testService";

function TestForm({ onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "Physics",
    chapter: "",
    duration: 60,
    total_marks: 180,
    is_published: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTest(formData);

      alert("Test created successfully!");

      if (onSuccess) onSuccess();
      if (onClose) onClose();

    } catch (error) {
      console.log(error);
      alert("Failed to create test");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">
        Create Mock Test
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Test Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <select
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Mathematics">Mathematics</option>
        <option value="Biology">Biology</option>
      </select>

      <input
        type="text"
        name="chapter"
        placeholder="Chapter"
        value={formData.chapter}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="number"
        name="duration"
        placeholder="Duration (minutes)"
        value={formData.duration}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        name="total_marks"
        placeholder="Total Marks"
        value={formData.total_marks}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_published"
          checked={formData.is_published}
          onChange={handleChange}
        />
        Publish immediately
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Save Test
        </button>

        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TestForm;