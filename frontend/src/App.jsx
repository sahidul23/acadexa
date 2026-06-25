import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import MockTests from "./pages/MockTests";
import ProtectedRoute from "./components/ProtectedRoute";
import Questions from "./pages/Questions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route
  path="/students"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Students />
    </ProtectedRoute>
  }
/>
        <Route
  path="/tests"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <MockTests />
    </ProtectedRoute>
  }
/>
        <Route
  path="/questions"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Questions />
    </ProtectedRoute>
  }
/> 

<Route
  path="/questions/:testId"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Questions />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;