import { useEffect, useState } from "react";

import { useUser } from "@clerk/clerk-react";

import { getMyApplications } from "../../services/applicationService";

function MyApplications() {
  const { user } = useUser();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getMyApplications(user.id);

      setApplications(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Applications</h1>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((application) => (
          <div
            key={application.id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{application.title}</h3>

            <p>
              <strong>Company:</strong> {application.company_name}
            </p>

            <p>
              <strong>Status:</strong> {application.status}
            </p>

            <p>
              <strong>Location:</strong> {application.location}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplications;
