import { useEffect, useState } from "react";

import { useUser } from "@clerk/clerk-react";

import { getRecruiterJobs } from "../../services/jobService";

import { Link } from "react-router-dom";

function RecruiterDashboard() {
  const { user } = useUser();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getRecruiterJobs(user.id);

      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Recruiter Dashboard</h1>

      <Link to="/recruiter/create-job">
        <button>Create Job</button>
      </Link>

      <hr />

      <h2>Jobs Posted</h2>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid gray",
              marginBottom: "15px",
              padding: "15px",
            }}
          >
            <h3>{job.title}</h3>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>CTC:</strong> {job.ctc} LPA
            </p>

            <p>
              <strong>Type:</strong> {job.job_type}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecruiterDashboard;
