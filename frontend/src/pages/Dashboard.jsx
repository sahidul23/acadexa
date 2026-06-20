import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Welcome to Acadexa 🚀
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Students
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            120
          </h1>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Teachers
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            18
          </h1>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Mock Tests
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            12
          </h1>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="text-gray-500">
            Notes
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            45
          </h1>

        </div>

      </div>

    </DashboardLayout>

  );
}

export default Dashboard;