const express = require("express");

const authRoutes = require("../components/auth");
const adminRoutes = require("../components/admin");
const blogRoutes = require("../components/blog");
const searchRoutes = require("../components/search")

const router = express.Router();

router.use(blogRoutes);
router.use(searchRoutes);
router.use(authRoutes);
router.use("/admin", adminRoutes);

module.exports = router;