import axios from "axios";

const API_URL = "http://localhost:5000/api";

/*
=====================================
SYNC USER
=====================================
*/

export const syncUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/auth/sync-user`,
    userData
  );

  return response.data;
};

/*
=====================================
ASSIGN ROLE
=====================================
*/

export const assignRole = async (
  clerkId,
  role
) => {

  const response = await axios.post(
    `${API_URL}/auth/assign-role`,
    {
      clerkId,
      role
    }
  );

  return response.data;
};

/*
=====================================
GET USER
=====================================
*/

export const getUser = async (
  clerkId
) => {

  const response = await axios.get(
    `${API_URL}/auth/user/${clerkId}`
  );

  return response.data;
};