function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome to Acadexa Dashboard 🎉</h1>

      <h2>Username: {user?.username}</h2>

      <h3>Role: {user?.role}</h3>
    </div>
  );
}

export default Dashboard;