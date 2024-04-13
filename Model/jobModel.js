const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    job: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    type: {
        type: String,
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
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    userDetails: {
        type: Object,
    }
},
    { timestamps: true }
);

const jobposts = mongoose.model("jobposts", jobSchema);

module.exports = { jobposts };