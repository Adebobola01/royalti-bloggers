const express = require("express");

const authRoutes = require("../components/auth");
const adminRoutes = require("../components/admin");
const homeRoutes = require("../components/home");

const router = express.Router();

router.use(homeRoutes);
router.use(authRoutes);
router.use("/admin", adminRoutes);

module.exports = router;