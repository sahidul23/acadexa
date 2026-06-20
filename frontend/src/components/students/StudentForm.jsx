function StudentForm() {
  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Admission Number"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Roll Number"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Guardian Name"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Guardian Phone"
        className="w-full border rounded-lg p-3"
      />

      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Save Student
      </button>

    </div>
  );
}

export default StudentForm;