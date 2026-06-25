function TestModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Create Mock Test
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        {children}

      </div>
    </div>
  );
}

export default TestModal;