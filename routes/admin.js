const express = require("express");
const router = express.Router();
const { checkAdmin } = require("../middleware/middleware");
const { addNewCourse, getCoursesData, signUpAdmin, signInAdmin, signOutAdmin } = require("../controller/admin")



router.post("/signup", signUpAdmin);

router.post("/signin", signInAdmin)

router.post("/signout", signOutAdmin)

router.route("/courses")
    .get(checkAdmin, getCoursesData)
    .post(checkAdmin, addNewCourse);

module.exports = router