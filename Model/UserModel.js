const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,

    },
    dob: {
        type: String,

    },
    state: {
        type: String,
    },
    country: {
        type: String,

    },
    address: {
        type: String,

    },
    resume: {
        type: String,

    },
    education: {
        type: String,

    },
    experience: {
        type: String,

    },
    isactive: {
        type: Boolean,

    },
},
    {
        timestamps: true,
    }
);

const useracc = mongoose.model("useracc", userSchema);

module.exports = { useracc };