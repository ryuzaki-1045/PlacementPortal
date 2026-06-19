import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import { syncUser, getUser } from "../../services/authService";

import { getRecruiterProfile } from "../../services/recruiterService";

function AuthCallback() {
  const { user, isLoaded } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    const handleUser = async () => {
      if (!isLoaded || !user) return;

      try {
        await syncUser({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          fullName: user.fullName,
          role: null,
        });

        const dbUser = await getUser(user.id);

        if (!dbUser.role_assigned) {
          navigate("/select-role");
          return;
        }

        /*
        =====================================
        STUDENT
        =====================================
        */

        if (dbUser.role === "student") {
          navigate("/student/dashboard");
          return;
        }

        /*
        =====================================
        RECRUITER
        =====================================
        */

        if (dbUser.role === "recruiter") {
          const recruiter = await getRecruiterProfile(user.id);

          if (recruiter.approval_status === "approved") {
            navigate("/recruiter/dashboard");
          } else {
            navigate("/pending-approval");
          }

          return;
        }

        /*
        =====================================
        ADMIN
        =====================================
        */

        if (dbUser.role === "admin") {
          navigate("/admin/dashboard");
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleUser();
  }, [user, isLoaded, navigate]);

  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
}

export default AuthCallback;
