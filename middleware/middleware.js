const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;

async function checkAdmin(req, res, next) {
    const bearer = req.headers.authorization;
    if (bearer) {
        const token = bearer.split(" ");
        const jwtToken = token[1];
        const decodedValue = jwt.verify(jwtToken, SECRET_TOKEN);
        if (decodedValue.username)
            next()
        else
            res.status(403).json({ status: "error", message: "You are not authenticated" })
    }
}

async function checkUser(req, res, next) {
    const bearer = req.headers.authorization;
    console.log(req.headers);

    const token = bearer.split(" ");
    const jwtToken = token[1];
    const decodedValue = jwt.verify(jwtToken, SECRET_TOKEN);
    if (decodedValue.username)
        next()
    else
        res.status(403).json({ status: "error", message: "You are not authenticated" })
}

module.exports = {
    checkAdmin,
    checkUser,
}