const pool = require("../config/db");

/*
=====================================
GET RECRUITER PROFILE
=====================================
*/

const getRecruiterProfile = async (req, res) => {
  try {
    const { clerkId } = req.params;

    const recruiter = await pool.query(
      `
      SELECT
        r.*,
        u.email,
        u.full_name
      FROM recruiters r
      JOIN users u
        ON r.user_id = u.id
      WHERE u.clerk_id = $1
      `,
      [clerkId]
    );

    if (recruiter.rows.length === 0) {
      return res.status(404).json({
        message: "Recruiter profile not found",
      });
    }

    res.status(200).json(recruiter.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch recruiter profile",
    });
  }
};

/*
=====================================
CREATE RECRUITER PROFILE
=====================================
*/

const createRecruiterProfile = async (req, res) => {
  try {
    const {
      clerkId,
      company_name,
      website,
      company_description,
      hr_name,
      hr_email,
      hr_phone,
      logo_url,
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

    const existingRecruiter = await pool.query(
      `
      SELECT *
      FROM recruiters
      WHERE user_id = $1
      `,
      [userId]
    );

    if (existingRecruiter.rows.length > 0) {
      return res.status(400).json({
        message: "Recruiter profile already exists",
      });
    }

    const recruiter = await pool.query(
      `
      INSERT INTO recruiters
      (
        user_id,
        company_name,
        website,
        company_description,
        hr_name,
        hr_email,
        hr_phone,
        logo_url,
        approved,
        approval_status
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,false,'pending'
      )
      RETURNING *
      `,
      [
        userId,
        company_name,
        website,
        company_description,
        hr_name,
        hr_email,
        hr_phone,
        logo_url,
      ]
    );

    res.status(201).json(recruiter.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create recruiter profile",
    });
  }
};

/*
=====================================
GET ALL PENDING RECRUITERS
=====================================
*/

const getPendingRecruiters = async (req, res) => {
  try {

    const recruiters = await pool.query(
      `
      SELECT *
      FROM recruiters
      WHERE approval_status = 'pending'
      ORDER BY created_at DESC
      `
    );

    res.status(200).json(recruiters.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch recruiters",
    });
  }
};

module.exports = {
  getRecruiterProfile,
  createRecruiterProfile,
  getPendingRecruiters,
};