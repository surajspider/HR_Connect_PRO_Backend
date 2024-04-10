const express = require("express");
const app = express();
const cors = require("cors");
const userrouter = require("./Router/UserRouter");
const connection = require("./Config/db");
const jobRouter = require("./Router/jobRouter");

app.use(cors({
    origin: "*"
}))

app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is Home Page!");
    console.log("Home!");
})

app.use("/api", userrouter);
app.use("/api", jobRouter);

const port = 4500

app.listen(port, async () => {
    try {
        await connection();
        console.log("Application is running on PORT ", port);
    }
    catch (err) {
        console.log("Error occurred during listening port");
    }
});

