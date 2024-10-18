const Course = require("../models/course");
const User = require("../models/user")

async function getAllusers(req, res) {
    try {
        const response = await User.find();
        res.status(200).send(response);
    } catch (error) {
        res.status(200).send(response);

    }

}

async function signUpUser(req, res) {
    const { username, password } = req.body;

    try {
        //# Check user exist or not

        const response = await User.findOne({ username });

        if (response)
            return res.status(400).json({ status: "error", message: "User alreay exist" })

        //# Create user

        const newUser = await User.create({ username, password })
        return res.status(200).json({ status: "success", message: "User created successfully", user: newUser })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Unexcepted error" })
    }
}

async function signInUser() {
    const { username, password } = req.body;

    try {
        //# Find the admin

        const user = await User.findOne({ username, password })
        if (!user)
            return res.status(400).json({ status: "error", message: "Invalid Credentials" })

        //# Generate token

        const token = jwt.sign({ username }, SECRET_TOKEN);
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(200).json({ status: "success", token });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error });
    }
}

async function purchaseCourse(req, res) {
    const { id } = req.params;
    const { username } = req.headers;
    console.log(id);

    try {
        const response = await User.updateOne({ username }, {
            "$push": {
                purchasedCourses: id,
            }
        })
        return res.status(200).json({ status: "success", message: "purchased successfull", "course id": id })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "purchased unsuccessfull" })
    }
}

async function purchasedCourses(req, res) {
    const { username } = req.headers;

    try {
        const user = await User.findOne({ username })
        const courses = await Course.find({ _id: user.purchasedCourses });
        res.status(200).send(courses);
    } catch (error) {
        res.status(500).json({ status: "error", message: "Unexcepted error" });
    }
}

function signOutUser(req, res) {

    //# Remove token from header

    res.removeHeader('Authorization');
    res.status(301).redirect("/login")
}

module.exports = {
    getAllusers,
    signUpUser,
    purchaseCourse,
    signInUser,
    purchasedCourses,
    signOutUser
}