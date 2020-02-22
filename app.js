const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const urlRouter = require("./routes/url");
const indexRouter = require("./routes");

const MONGO_URI =
    "mongodb+srv://nik:nik@cluster0-lngmy.mongodb.net/test?retryWrites=true&w=majority";

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

var port = process.env.PORT || 6900;

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        console.log("DB Connected!!");
        app.listen(port);
    })
    .catch(err => {
        console.log(err);
    });
