const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    job: {
        type: String,
        required: true
    },
    skill: {
        type: Array,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    noticeperiod: {
        type: String,
        required: true
    },
});

const jobposts = mongoose.model("jobposts", jobSchema);

module.exports = { jobposts };