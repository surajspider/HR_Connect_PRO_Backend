const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

const auth = (req, res, next) => {
    const BearerToken = req.headers["authorization"];
    console.log("this is bearer", BearerToken);
    if (BearerToken) {
        const token = BearerToken.split(" ")[1];
        try {
            const validate = jwt.verify(token, JWT_SECRET_KEY);
            if (validate) {
                req.user = validate;
                console.log("User Authorized!");
                next();
            }
            else {
                console.log("User not authorized!");
            }
        }
        catch (err) {
            console.log("Error verifying token:", err);
            console.log("User not authorized!");
            res.status(400).json({ msg: "User not authorized" });
        }
    }
}

module.exports = { auth };