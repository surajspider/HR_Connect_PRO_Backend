const { jobposts } = require("../Model/jobModel");


const jobcreate = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const job = await jobposts.create(data);
        if (job) {
            res.status(200).json({ msg: "Job Post created successfully!", jobdetail: job })
        }
        else {
            res.status(400).json({ msg: "Error creating job post!" });
        }
    }
    catch (err) {
        console.log("Error:", err);
    }
}

const getalljobs = async (req, res) => {
    try {
        const result = await jobposts.find();
        if (result) {
            res.status(200).json({ msg: "Fetched all job posts Successfully!", jobinfo: result });
        }
        else {
            res.status(400).json({ msg: "no jobs found!" });
        }
    }
    catch (err) {
        console.log("Error while fetching job posts!", err);
    }
}

const searchjob = async (req, res) => {
    const searchJob = req.query.searchJob;
    const searchLocation = req.query.searchLocation;
    try {
        const result = await jobposts.find({
            $and: [
                { job: { $regex: searchJob, $options: "i" } },
                { location: { $regex: searchLocation, $options: "i" } }
            ]
        })
        if (result) {
            res.status(200).json({ msg: "Found searched jobs successfully!", jobdata: result })
        }
        else {
            res.status(400).json({ msg: "Not found!" });
        }
    }
    catch (err) {
        console.log("Error in searching jobs:", err);
    }
}

module.exports = { jobcreate, getalljobs, searchjob };
