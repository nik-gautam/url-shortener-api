const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const urlRouter = require("./routes/url");
const indexRouter = require("./routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/api/url/", urlRouter);

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        console.log("DB Connected!!");
        app.listen(process.env.PORT || 6900);
    })
    .catch(err => {
        console.log(err);
    });
