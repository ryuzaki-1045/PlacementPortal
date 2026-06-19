const pool = require("../config/db");

/*
=====================================
SYNC USER
=====================================
*/

const syncUser = async (req, res) => {
  try {
    const { clerkId, email, fullName, role } = req.body;

    const existingUser = await pool.query(
      `
      SELECT *
      FROM users
      WHERE clerk_id = $1
      `,
      [clerkId]
    );

    if (existingUser.rows.length > 0) {
      return res.status(200).json(existingUser.rows[0]);
    }

    const newUser = await pool.query(
      `
      INSERT INTO users
      (
        clerk_id,
        email,
        full_name,
        role
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [clerkId, email, fullName, role]
    );

    res.status(201).json(newUser.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Sync Failed"
    });
  }
};

/*
=====================================
ASSIGN ROLE
=====================================
*/

const assignRole = async (req, res) => {
  try {

    const { clerkId, role } = req.body;

    const updatedUser = await pool.query(
      `
      UPDATE users
      SET
        role = $1,
        role_assigned = true
      WHERE clerk_id = $2
      RETURNING *
      `,
      [role, clerkId]
    );

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    res.status(200).json(updatedUser.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Role Assignment Failed"
    });
  }
};

/*
=====================================
GET USER BY CLERK ID
=====================================
*/

const getUserByClerkId = async (req, res) => {
  try {

    const { clerkId } = req.params;

    const user = await pool.query(
      `
      SELECT *
      FROM users
      WHERE clerk_id = $1
      `,
      [clerkId]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "User Not Found"
      });
    }

    res.status(200).json(user.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed To Fetch User"
    });
  }
};

module.exports = {
  syncUser,
  assignRole,
  getUserByClerkId
};