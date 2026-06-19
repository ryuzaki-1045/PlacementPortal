import axios from "axios";

const API_URL = "http://localhost:5000/api/recruiter";

/*
=====================================
GET RECRUITER PROFILE
=====================================
*/

export const getRecruiterProfile = async (
  clerkId
) => {

  const response = await axios.get(
    `${API_URL}/profile/${clerkId}`
  );

  return response.data;
};