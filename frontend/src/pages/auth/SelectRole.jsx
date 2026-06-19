import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import { assignRole } from "../../services/authService";

function SelectRole() {
  const { user } = useUser();

  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    try {
      await assignRole(user.id, role);

      if (role === "student") {
        navigate("/student/dashboard");
      }

      if (role === "recruiter") {
        navigate("/pending-approval");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>Select Your Role</h1>

      <button onClick={() => handleRoleSelection("student")}>
        Continue As Student
      </button>

      <button onClick={() => handleRoleSelection("recruiter")}>
        Continue As Recruiter
      </button>
    </div>
  );
}

export default SelectRole;
