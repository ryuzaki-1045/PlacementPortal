import { useEffect, useState } from "react";

import { useUser } from "@clerk/clerk-react";

import { getAllJobs } from "../../services/jobService";

import { applyForJob } from "../../services/applicationService";

function AvailableJobs() {
  const { user } = useUser();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getAllJobs();

      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await applyForJob({
        clerkId: user.id,
        jobId,
        resume_snapshot_url: "resume.pdf",
      });

      alert("Application submitted successfully");
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{job.title}</h3>

            <p>
              <strong>Company:</strong> {job.company_name}
            </p>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>CTC:</strong> {job.ctc} LPA
            </p>

            <button onClick={() => handleApply(job.id)}>Apply</button>
          </div>
        ))
      )}
    </div>
  );
}

export default AvailableJobs;
