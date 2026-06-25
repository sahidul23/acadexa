function QuestionModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">

        <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Add Question
          </h2>

          <button
            onClick={onClose}
            className="text-3xl font-bold hover:text-red-500"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

export default QuestionModal;