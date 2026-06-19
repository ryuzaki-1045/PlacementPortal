import axios from "axios";

const API_URL = "http://localhost:5000/api/student";

/*
=====================================
GET PROFILE
=====================================
*/

export const getStudentProfile = async (
  clerkId
) => {

  const response = await axios.get(
    `${API_URL}/profile/${clerkId}`
  );

  return response.data;
};

/*
=====================================
CREATE PROFILE
=====================================
*/

export const createStudentProfile = async (
  profileData
) => {

  const response = await axios.post(
    `${API_URL}/create-profile`,
    profileData
  );

  return response.data;
};

/*
=====================================
UPDATE PROFILE
=====================================
*/

export const updateStudentProfile = async (
  profileData
) => {

  const response = await axios.put(
    `${API_URL}/update-profile`,
    profileData
  );

  return response.data;
};