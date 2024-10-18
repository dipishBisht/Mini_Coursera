require("dotenv").config();
const express = require("express");
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
const connect = require("./database/connection")

const app = express();
const { PORT, MONGO_URI } = process.env;

//# connecting to mongodb
connect(MONGO_URI)

//# Other middlewares
app.use(express.json())

//# routes 
app.use("/admin", adminRouter)
app.use("/user", userRouter)


//# Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
})

app.listen(PORT, () => console.log("Server started at port", PORT))