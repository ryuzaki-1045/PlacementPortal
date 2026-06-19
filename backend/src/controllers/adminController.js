const pool = require("../config/db");

/*
=====================================
GET PENDING RECRUITERS
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

/*
=====================================
APPROVE RECRUITER
=====================================
*/

const approveRecruiter = async (req, res) => {
  try {

    const { id } = req.params;

    const recruiter = await pool.query(
      `
      UPDATE recruiters
      SET
        approved = true,
        approval_status = 'approved'
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    res.status(200).json(recruiter.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to approve recruiter",
    });
  }
};

/*
=====================================
REJECT RECRUITER
=====================================
*/

const rejectRecruiter = async (req, res) => {
  try {

    const { id } = req.params;

    const recruiter = await pool.query(
      `
      UPDATE recruiters
      SET
        approved = false,
        approval_status = 'rejected'
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    res.status(200).json(recruiter.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to reject recruiter",
    });
  }
};

module.exports = {
  getPendingRecruiters,
  approveRecruiter,
  rejectRecruiter,
};