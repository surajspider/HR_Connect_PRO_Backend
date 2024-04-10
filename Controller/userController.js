const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { useracc } = require("../Model/UserModel");
const { tokencollection } = require("../Model/tokenModel");
require('dotenv').config();

const { JWT_SECRET_KEY, CLIENT_URL } = process.env;

const regfun = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const findemail = await useracc.findOne({ email: data.email });
        if (findemail) {
            console.log(findemail);
            return res.status(400).json({ msg: "User already registered!" });
        }
        else {
            const saltround = bcrypt.genSaltSync(10);
            const hashpassword = bcrypt.hashSync(data.password, saltround);
            console.log(hashpassword);
            const tempobj = { ...data, password: hashpassword }
            const newuser = await useracc.create(tempobj);
            console.log(newuser);
            return res.status(200).json({ msg: "User registered Successfully!" });
        }
    }
    catch (err) {
        console.log("Error in registering user", err);
    }
}

const logfun = async (req, res) => {
    const logindata = req.body;
    const finduser = await useracc.findOne({ email: logindata.email });
    if (finduser) {
        console.log(finduser);
        const validate = bcrypt.compareSync(logindata.password, finduser.password);
        if (validate) {
            const token = jwt.sign({ email: logindata.email }, JWT_SECRET_KEY, { expiresIn: "360000" });
            console.log("token:", token);
            return res.status(200).json({ msg: "User Logged in Successfully!", token: token, userdetail: finduser });
        }
        else {
            return res.status(400).json({ msg: "User password is wrong!!" });
        }
    }
    else {
        console.log("Email not registered! Please provide a valid email!");
        return res.status(400).json({ msg: "Email not registered!" });
    }
}

const updateuserfun = async (req, res) => {
    const { email, password, ...info } = req.body;
    try {
        const result = await useracc.updateOne({ email }, { $set: info });
        if (result.nModified === 0) {
            return res.status(404).json({ msg: "User not found" });
        }
        else {
            res.status(200).json({ msg: "Updated Successfully!" });
        }
    }
    catch (err) {
        console.log("Error updating user info", err);
        res.status(404).json({ msg: "update error!" })
    }
}

const userauth = async (req, res) => {
    const user = req.user;
    console.log(user);
    if (user && user.email) {
        try {
            const userinfo = await useracc.findOne({ email: user.email });
            if (userinfo) {
                res.status(200).json({ msg: "User Authorized", userdata: userinfo })
            }
            else {
                res.status(404).json({ msg: "User not found" });
            }
        }
        catch (err) {
            console.log("Error fetching user detail from db", err);
        }
    }
    console.log("User Authorized!");
}

const forgetpassfun = async (req, res) => {
    const user = req.body;
    console.log(user);
    const userinfo = await useracc.findOne({ email: user.email });
    if (!userinfo) {
        res.status(400).json({ msg: "User not found!" });
    }
    else {
        const token = await tokencollection.findOne({ email: userinfo.email });
        if (token) {
            await token.deleteOne();
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, Number(10));
        await new tokencollection({
            email: userinfo.email,
            token: hash,
            createdAt: Date.now(),
        }).save();

        const link = `${CLIENT_URL}/resetPassword?token=${resetToken}&email=${user.email}`;
        res.status(200).json({ msg: "Reset link created!", link: link });
    }
}

const resetpassfun = async (req, res) => {
    const tokeninfo = req.body;
    // const pass = req.body;
    // const tokeninfo = req.query.token;
    // const email = req.query.email;
    console.log(tokeninfo);
    const passwordResetToken = await tokencollection.findOne({ email: tokeninfo.email });
    if (!passwordResetToken) {
        res.status(400).json({ msg: "Invalid token!" });
    }
    else {
        const isValid = bcrypt.compare(tokeninfo.token, passwordResetToken.token);
        console.log(tokeninfo.token);
        console.log(passwordResetToken.token)
        console.log(isValid);
        if (!isValid) {
            res.status(400).json({ msg: "Invalid token or Token Expired!!" });
        }
        else {
            const hash = await bcrypt.hashSync(tokeninfo.pass, Number(10));
            await useracc.updateOne({
                email: tokeninfo.email
            },
                { $set: { password: hash } },
                { new: true }
            );

            await passwordResetToken.deleteOne();
            res.status(200).json({ msg: "Password changed successfully!" });
        }
    }
}

// const forgotpass = async (req, res) => {
//     try {
//         const { email } = req.body;

//         const user = await useracc.findOne({ email });
//         if (!user) {
//             return res.status(404)
//         }
//     }
// }

module.exports = { regfun, logfun, userauth, updateuserfun, forgetpassfun, resetpassfun };