import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import MockTests from "./pages/MockTests";
import ProtectedRoute from "./components/ProtectedRoute";
import Questions from "./pages/Questions";
import StudentDashboard from "./pages/StudentDashboard";
import ExamInstructions from "./pages/ExamInstructions";
import ExamPage from "./pages/ExamPage";
import ResultPage from "./pages/ResultPage";
import MyResults from "./pages/MyResults";
import Results from "./pages/Results";
import ResultDetails from "./pages/ResultDetails";
import Notes from "./pages/Notes";
import MyNotes from "./pages/MyNotes";
import ResultReview from "./pages/ResultReview";
import Assignments from "./pages/Assignments";
import AssignmentQuestions from "./pages/AssignmentQuestions";
import MyAssignments from "./pages/MyAssignments";
import AssignmentDetails from "./pages/AssignmentDetails";
import AssignmentSubmissions from "./pages/AssignmentSubmissions";
import SubmissionReview from "./pages/SubmissionReview";
import AssignmentResults from "./pages/AssignmentResults";
import MotivationVideos from "./pages/MotivationVideos";
import StudentMotivation from "./pages/StudentMotivation";


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
  path="/student-dashboard"
  element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <StudentDashboard />
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

<Route
  path="/exam/:testId/instructions"
  element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <ExamInstructions />
    </ProtectedRoute>
  }
/>

<Route
  path="/exam/:testId"
  element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <ExamPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/result"
  element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <ResultPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-results"
  element={
    <ProtectedRoute
      allowedRoles={["STUDENT"]}
    >
      <MyResults />
    </ProtectedRoute>
  }
/>

<Route
  path="/results"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Results />
    </ProtectedRoute>
  }
/>

<Route
  path="/result/:attemptId"
  element={
    <ProtectedRoute allowedRoles={["ADMIN", "STUDENT"]}>
      <ResultDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/notes"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Notes />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-notes"
  element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <MyNotes />
    </ProtectedRoute>
  }
/>

<Route
  path="/result/:attemptId/review"
  element={
    <ProtectedRoute allowedRoles={["ADMIN", "STUDENT"]}>
      <ResultReview />
    </ProtectedRoute>
  }
/>

<Route
  path="/assignments"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Assignments />
    </ProtectedRoute>
  }
/>

<Route
  path="/assignments/:practiceId/questions"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AssignmentQuestions />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-assignments"
  element={
    <ProtectedRoute
      allowedRoles={["STUDENT"]}
    >
      <MyAssignments />
    </ProtectedRoute>
  }
/>

<Route
  path="/assignment/:assignmentId"
  element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <AssignmentDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/assignment-submissions"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AssignmentSubmissions />
    </ProtectedRoute>
  }
/>

<Route
  path="/submission/:submissionId"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <SubmissionReview />
    </ProtectedRoute>
  }
/>

<Route
  path="/assignment-results"
  element={
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <AssignmentResults />
    </ProtectedRoute>
  }
/>

<Route
  path="/motivation"
  element={
    <ProtectedRoute
      allowedRoles={["ADMIN"]}
    >
      <MotivationVideos />
    </ProtectedRoute>
  }
/>

<Route
  path="/evening-study"
  element={
    <ProtectedRoute
      allowedRoles={["STUDENT"]}
    >
      <StudentMotivation />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;