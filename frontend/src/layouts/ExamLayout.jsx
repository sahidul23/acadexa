function ExamLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-blue-700 text-white shadow">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold">
              Acadexa
            </h1>

            <p className="text-blue-100 text-sm">
              NEET • JEE Examination Portal
            </p>
          </div>

          <div className="text-right">
            <h2 className="font-semibold">
              Mock Examination
            </h2>

            <p className="text-sm text-blue-100">
              Good Luck!
            </p>
          </div>

        </div>

      </div>

      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>

    </div>
  );
}

export default ExamLayout;