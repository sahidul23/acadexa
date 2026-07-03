import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  

    const handleLogin = async () => {
  try {
    const response = await api.post("login/", {
      username,
      password,
    });

    console.log("SUCCESS:", response.data);

    localStorage.setItem("access", response.data.access);
localStorage.setItem("refresh", response.data.refresh);
localStorage.setItem("user", JSON.stringify(response.data.user));

const role = response.data.user.role;

if (role === "ADMIN") {
  navigate("/dashboard");
} else if (role === "STUDENT") {
  navigate("/student-dashboard");
} else {
  alert("Unknown user role");
}

  } catch (error) {
    console.log("FULL ERROR:", error);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);

      alert(JSON.stringify(error.response.data));
    } else {
      alert(error.message);
    }
  }
};

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 flex items-center justify-center p-6">

    <div className="absolute top-10 left-10">
      <h1 className="text-5xl font-extrabold text-white">
        🎓 ACAD<span className="text-yellow-300">exa</span>
      </h1>

      <p className="text-blue-100 mt-3 text-lg">
        Learn • Practice • Achieve
      </p>
    </div>

    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

      <div className="text-center mb-8">

        <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-4xl shadow-lg">
          🎓
        </div>

        <h2 className="text-3xl font-bold mt-5 text-gray-800">
          Welcome Back
        </h2>

        <p className="text-gray-500 mt-2">
          Sign in to continue to Acadexa
        </p>

      </div>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl"
        >
          Sign In
        </button>

      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Academic Intelligence Platform
      </div>

    </div>

  </div>
);
}

export default Login;