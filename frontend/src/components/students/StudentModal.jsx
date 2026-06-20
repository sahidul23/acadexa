function StudentModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-[600px] p-6">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">
            Add Student
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500"
          >
            ×
          </button>
        </div>

        {children}

      </div>
    </div>
  );
}

export default StudentModal;