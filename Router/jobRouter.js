const { jobcreate, getalljobs, searchjob } = require("../Controller/jobController");

const jobRouter = require("express").Router();


jobRouter.post("/postjob", jobcreate);
jobRouter.get("/alljobs", getalljobs);
jobRouter.get("/search", searchjob);

module.exports = jobRouter;