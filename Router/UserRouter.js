const { regfun, logfun, userauth, updateuserfun, forgetpassfun, resetpassfun } = require("../Controller/userController");
const { auth } = require("../Middleware/auth");

const userrouter = require("express").Router();

userrouter.post("/register", regfun);
userrouter.post("/login", logfun);
userrouter.get("/auth", auth, userauth);
userrouter.post("/updateuserinfo", auth, updateuserfun);
userrouter.post("/forgetpass", forgetpassfun);
userrouter.post("/resetpassword", resetpassfun);

module.exports = userrouter;