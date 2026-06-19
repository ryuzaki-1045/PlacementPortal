const express = require("express");

const router = express.Router();

const {
  getPendingRecruiters,
  approveRecruiter,
  rejectRecruiter,
} = require("../controllers/adminController");

router.get(
  "/pending-recruiters",
  getPendingRecruiters
);

router.put(
  "/approve-recruiter/:id",
  approveRecruiter
);

router.put(
  "/reject-recruiter/:id",
  rejectRecruiter
);

module.exports = router;