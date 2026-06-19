const pool = require("../config/db");

/*
=====================================
GET STUDENT PROFILE
=====================================
*/

const getStudentProfile = async (req, res) => {
  try {
    const { clerkId } = req.params;

    const student = await pool.query(
      `
      SELECT
        s.*,
        u.email,
        u.full_name
      FROM students s
      JOIN users u
        ON s.user_id = u.id
      WHERE u.clerk_id = $1
      `,
      [clerkId]
    );

    if (student.rows.length === 0) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    res.status(200).json(student.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

/*
=====================================
CREATE STUDENT PROFILE
=====================================
*/

const createStudentProfile = async (req, res) => {
  try {
    const {
      clerkId,
      name,
      rollNumber,
      department,
      year,
      cgpa,
      backlogs,
    } = req.body;

    const userResult = await pool.query(
      `
      SELECT id
      FROM users
      WHERE clerk_id = $1
      `,
      [clerkId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userId = userResult.rows[0].id;

    const existingProfile = await pool.query(
      `
      SELECT *
      FROM students
      WHERE user_id = $1
      `,
      [userId]
    );

    if (existingProfile.rows.length > 0) {
      return res.status(400).json({
        message: "Profile already exists",
      });
    }

    const student = await pool.query(
      `
      INSERT INTO students
      (
        user_id,
        name,
        roll_number,
        department,
        year,
        cgpa,
        backlogs
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        userId,
        name,
        rollNumber,
        department,
        year,
        cgpa,
        backlogs,
      ]
    );

    res.status(201).json(student.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create profile",
    });
  }
};

/*
=====================================
UPDATE STUDENT PROFILE
=====================================
*/

const updateStudentProfile = async (req, res) => {
  try {
    const {
      clerkId,
      phone,
      linkedin_url,
      github_url,
      skills,
      bio,
      resume_url,
      profile_picture,
    } = req.body;

    const userResult = await pool.query(
      `
      SELECT id
      FROM users
      WHERE clerk_id = $1
      `,
      [clerkId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userId = userResult.rows[0].id;

    const updatedStudent = await pool.query(
      `
      UPDATE students
      SET
        phone = $1,
        linkedin_url = $2,
        github_url = $3,
        skills = $4,
        bio = $5,
        resume_url = $6,
        profile_picture = $7,
        profile_completed = true
      WHERE user_id = $8
      RETURNING *
      `,
      [
        phone,
        linkedin_url,
        github_url,
        skills,
        bio,
        resume_url,
        profile_picture,
        userId,
      ]
    );

    res.status(200).json(updatedStudent.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

module.exports = {
  getStudentProfile,
  createStudentProfile,
  updateStudentProfile,
};