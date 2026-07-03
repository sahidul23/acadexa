function StatCard({ title, value, icon, color }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        p-6
        border-l-4
      "
      style={{ borderColor: color }}
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-slate-800">
            {value}
          </h2>
        </div>

        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;