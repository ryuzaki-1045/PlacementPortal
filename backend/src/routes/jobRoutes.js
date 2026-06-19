const express = require("express");

const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs,
} = require("../controllers/jobController");

/*
=====================================
ROUTES
=====================================
*/

router.post(
  "/create",
  createJob
);

router.get(
  "/all",
  getAllJobs
);

router.get(
  "/:id",
  getJobById
);

router.get(
  "/recruiter/:clerkId",
  getRecruiterJobs
);

module.exports = router;