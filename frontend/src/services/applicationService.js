import axios from "axios";

const API_URL =
  "http://localhost:5000/api/applications";

/*
=====================================
APPLY FOR JOB
=====================================
*/

export const applyForJob = async (
  applicationData
) => {
  const response = await axios.post(
    `${API_URL}/apply`,
    applicationData
  );

  return response.data;
};

/*
=====================================
GET MY APPLICATIONS
=====================================
*/

export const getMyApplications =
  async (clerkId) => {

    const response = await axios.get(
      `${API_URL}/my-applications/${clerkId}`
    );

    return response.data;
  };