const express = require("express");
const { checkUser } = require("../middleware/middleware");
const { getCoursesData } = require("../controller/admin");
const { signUpUser, purchaseCourse, getAllusers, purchasedCourses, signInUser, signOutUser } = require("../controller/user")


const router = express.Router();

router.get("/courses", checkUser, getCoursesData)

router.get("/", getAllusers)

router.post("/signin", checkUser, signInUser)

router.post("/signup", signUpUser);

router.post("/signout", signOutUser)

router.post("/purchasedCourses", checkUser, purchasedCourses)

router.post("/courses/:id", checkUser, purchaseCourse)


module.exports = router