const pool = require("../config/db");

/*
=====================================
CREATE JOB
=====================================
*/

const createJob = async (req, res) => {
  try {
    const {
      clerkId,
      title,
      job_type,
      location,
      ctc,
      min_cgpa,
      max_backlogs,
      application_deadline,
      job_description,
      eligible_departments,
      openings,
      company_name,
      selection_process,
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
    FIND RECRUITER
    =====================================
    */

    const recruiterResult = await pool.query(
      `
      SELECT *
      FROM recruiters
      WHERE user_id = $1
      `,
      [userId]
    );

    if (recruiterResult.rows.length === 0) {
      return res.status(404).json({
        message: "Recruiter profile not found",
      });
    }

    const recruiter = recruiterResult.rows[0];

    /*
    =====================================
    CHECK APPROVAL
    =====================================
    */

    if (!recruiter.approved) {
      return res.status(403).json({
        message: "Recruiter account not approved",
      });
    }

    /*
    =====================================
    CREATE JOB
    =====================================
    */

    const job = await pool.query(
      `
      INSERT INTO jobs
      (
        recruiter_id,
        title,
        job_type,
        location,
        ctc,
        min_cgpa,
        max_backlogs,
        application_deadline,
        job_description,
        eligible_departments,
        openings,
        company_name,
        selection_process
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
      )
      RETURNING *
      `,
      [
        recruiter.id,
        title,
        job_type,
        location,
        ctc,
        min_cgpa,
        max_backlogs,
        application_deadline,
        job_description,
        eligible_departments,
        openings,
        company_name,
        selection_process,
      ]
    );

    res.status(201).json(job.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create job",
    });
  }
};

/*
=====================================
GET ALL JOBS
=====================================
*/

const getAllJobs = async (req, res) => {
  try {
    const jobs = await pool.query(
      `
      SELECT *
      FROM jobs
      ORDER BY created_at DESC
      `
    );

    res.status(200).json(jobs.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
};

/*
=====================================
GET JOB BY ID
=====================================
*/

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await pool.query(
      `
      SELECT *
      FROM jobs
      WHERE id = $1
      `,
      [id]
    );

    if (job.rows.length === 0) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch job",
    });
  }
};

/*
=====================================
GET RECRUITER JOBS
=====================================
*/

const getRecruiterJobs = async (req, res) => {
  try {
    const { clerkId } = req.params;

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
    FIND RECRUITER
    =====================================
    */

    const recruiterResult = await pool.query(
      `
      SELECT id
      FROM recruiters
      WHERE user_id = $1
      `,
      [userId]
    );

    if (recruiterResult.rows.length === 0) {
      return res.status(404).json({
        message: "Recruiter profile not found",
      });
    }

    const recruiterId = recruiterResult.rows[0].id;

    /*
    =====================================
    GET JOBS
    =====================================
    */

    const jobs = await pool.query(
      `
      SELECT *
      FROM jobs
      WHERE recruiter_id = $1
      ORDER BY created_at DESC
      `,
      [recruiterId]
    );

    res.status(200).json(jobs.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch recruiter jobs",
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs,
};