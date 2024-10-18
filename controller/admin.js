const Admin = require("../models/admin")
const Course = require("../models/course");
const jwt = require("jsonwebtoken")
const SECRET_TOKEN = process.env.SECRET_TOKEN;

async function signUpAdmin(req, res) {
    const { username, password } = req.body;
    try {

        //# Check admin exist or not
        
        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin)
            return res.status(400).json({ status: "error", message: "Admin alreay exist" })

        //# Create admin

        const newAdmin = await Admin.create({ username, password })
        return res.status(200).json({ status: "success", message: "Admin created successfully", user: newAdmin })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Unexcepted error" })
    }
}

async function signInAdmin(req, res) {
    const { username, password } = req.body;

    try {

        //# Find the admin

        const admin = await Admin.findOne({ username, password })
        if (!admin)
            return res.status(400).json({ status: "error", message: "Invalid Credentials" })

        //# Generate token

        const token = jwt.sign({ username }, SECRET_TOKEN);
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(200).json({ status: "success", token });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error });
    }
}

function signOutAdmin(req, res) {

    //# Remove token from header

    res.removeHeader('Authorization');
    res.status(301).redirect("/login")
}

async function getCoursesData(req, res) {
    try {
        const coureses = await Course.find();
        res.status(200).send(coureses)
    } catch (error) {
        res.status(500).json({ status: "error", message: "Enexpected error" })
    }
}

async function addNewCourse(req, res) {
    const { title, description, imageLink, price } = req.body;

    try {
        const response = await Course.findOne({ title });
        if (response)
            return res.status(400).json({ status: "error", message: "Course alreay exist" })

        const newCourse = await Course.create({ title, description, imageLink, price })
        return res.status(200).json({ status: "success", message: "Course created successfully", id: newCourse._id })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Unexpected error" })
    }
}

module.exports = {
    signUpAdmin,
    signInAdmin,
    getCoursesData,
    addNewCourse,
    signOutAdmin
}