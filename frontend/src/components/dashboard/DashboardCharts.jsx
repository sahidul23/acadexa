import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function DashboardCharts({ stats }) {
  const data = [
    {
      name: "Students",
      value: stats.students,
    },
    {
      name: "Teachers",
      value: stats.teachers,
    },
    {
      name: "Tests",
      value: stats.tests,
    },
    {
      name: "Notes",
      value: stats.notes,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        📊 System Overview
      </h2>

      <div style={{ width: "100%", height: 350 }}>

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardCharts;