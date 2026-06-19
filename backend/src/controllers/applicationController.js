const pool = require("../config/db");

/*
=====================================
APPLY FOR JOB
=====================================
*/

const applyForJob = async (req, res) => {
  try {
    const {
      clerkId,
      jobId,
      resume_snapshot_url,
    } = req.body;

    /*
    =====================================
    FIND USER
    =====================================
    */

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

    /*
    =====================================
    FIND STUDENT
    =====================================
    */

    const studentResult = await pool.query(
      `
      SELECT *
      FROM students
      WHERE user_id = $1
      `,
      [userId]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    const studentId = studentResult.rows[0].id;

    /*
    =====================================
    CHECK DUPLICATE APPLICATION
    =====================================
    */

    const existingApplication = await pool.query(
      `
      SELECT *
      FROM applications
      WHERE student_id = $1
      AND job_id = $2
      `,
      [studentId, jobId]
    );

    if (existingApplication.rows.length > 0) {
      return res.status(400).json({
        message: "Already applied for this job",
      });
    }

    /*
    =====================================
    CREATE APPLICATION
    =====================================
    */

    const application = await pool.query(
      `
      INSERT INTO applications
      (
        student_id,
        job_id,
        resume_snapshot_url
      )
      VALUES
      (
        $1,$2,$3
      )
      RETURNING *
      `,
      [
        studentId,
        jobId,
        resume_snapshot_url,
      ]
    );

    res.status(201).json(application.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to apply",
    });
  }
};

/*
=====================================
GET MY APPLICATIONS
=====================================
*/

const getMyApplications = async (req, res) => {
  try {
    const { clerkId } = req.params;

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

    const studentResult = await pool.query(
      `
      SELECT id
      FROM students
      WHERE user_id = $1
      `,
      [userResult.rows[0].id]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const applications = await pool.query(
      `
      SELECT
        a.*,
        j.title,
        j.company_name,
        j.location,
        j.ctc
      FROM applications a
      JOIN jobs j
      ON a.job_id = j.id
      WHERE a.student_id = $1
      ORDER BY a.applied_at DESC
      `,
      [studentResult.rows[0].id]
    );

    res.status(200).json(
      applications.rows
    );

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch applications",
    });
  }
};

/*
=====================================
GET JOB APPLICANTS
=====================================
*/

const getJobApplicants = async (
  req,
  res
) => {
  try {

    const { jobId } = req.params;

    const applicants = await pool.query(
      `
      SELECT
        a.*,
        s.name,
        s.department,
        s.cgpa
      FROM applications a
      JOIN students s
      ON a.student_id = s.id
      WHERE a.job_id = $1
      ORDER BY a.applied_at DESC
      `,
      [jobId]
    );

    res.status(200).json(
      applicants.rows
    );

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch applicants",
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getJobApplicants,
};