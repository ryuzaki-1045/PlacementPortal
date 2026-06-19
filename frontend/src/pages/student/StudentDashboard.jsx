import { Link } from "react-router-dom";

function StudentDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Dashboard</h1>

      <br />

      <Link to="/student/profile">Complete Profile</Link>
    </div>
  );
}

export default StudentDashboard;
