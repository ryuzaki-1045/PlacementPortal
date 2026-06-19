import axios from "axios";

const API = "http://localhost:5000/api/jobs";

/*
=====================================
CREATE JOB
=====================================
*/

export const createJob = async (jobData) => {
  const response = await axios.post(
    `${API}/create`,
    jobData
  );

  return response.data;
};

/*
=====================================
GET RECRUITER JOBS
=====================================
*/

export const getRecruiterJobs = async (clerkId) => {
  const response = await axios.get(
    `${API}/recruiter/${clerkId}`
  );

  return response.data;
};

/*
=====================================
GET ALL JOBS
=====================================
*/

export const getAllJobs = async () => {
  const response = await axios.get(
    `${API}/all`
  );

  return response.data;
};