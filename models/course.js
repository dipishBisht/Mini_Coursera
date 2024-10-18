const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageLink: { type: String, required: true },
    price: { type: Number, required: true }
})

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;