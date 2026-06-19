const express = require("express");

const router = express.Router();

const {
  getRecruiterProfile,
  createRecruiterProfile,
  getPendingRecruiters,
} = require("../controllers/recruiterController");

/*
=====================================
ROUTES
=====================================
*/

router.get(
  "/profile/:clerkId",
  getRecruiterProfile
);

router.post(
  "/create-profile",
  createRecruiterProfile
);

router.get(
  "/pending",
  getPendingRecruiters
);

module.exports = router;