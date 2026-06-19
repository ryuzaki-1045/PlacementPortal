const express = require("express");

const router = express.Router();

const {
  applyForJob,
  getMyApplications,
  getJobApplicants,
} = require(
  "../controllers/applicationController"
);

/*
=====================================
ROUTES
=====================================
*/

router.post(
  "/apply",
  applyForJob
);

router.get(
  "/my-applications/:clerkId",
  getMyApplications
);

router.get(
  "/job/:jobId",
  getJobApplicants
);

module.exports = router;