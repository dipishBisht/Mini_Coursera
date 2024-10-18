const mongoose = require("mongoose");

function connect(url) {
    return mongoose.connect(url).then(() => console.log("Connected to DB")).catch((err) => console.log(err))
}

module.exports = connect;