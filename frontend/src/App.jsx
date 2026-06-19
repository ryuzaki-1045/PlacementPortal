import { Routes, Route } from "react-router-dom";

import Login from "./pages/public/Login";

import SelectRole from "./pages/auth/SelectRole";
import PendingApproval from "./pages/auth/PendingApproval";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateJob from "./pages/recruiter/CreateJob";
import AvailableJobs from "./pages/student/AvailableJobs";
import MyApplications from "./pages/student/MyApplications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/select-role" element={<SelectRole />} />

      <Route path="/pending-approval" element={<PendingApproval />} />

      <Route path="/student/dashboard" element={<StudentDashboard />} />

      <Route path="/student/profile" element={<StudentProfile />} />

      <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />

      <Route path="/recruiter/create-job" element={<CreateJob />} />

      <Route path="/student/jobs" element={<AvailableJobs />} />

      <Route path="/student/applications" element={<MyApplications />} />
    </Routes>
  );
}

export default App;
