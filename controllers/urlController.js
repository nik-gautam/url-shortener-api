const validUrl = require("valid-url");
const shortid = require("shortid");
require("dotenv").config();

const Url = require("../models/url");

const BASE_URI = "http://www.octavemusic.tk";

exports.getAddShortUrl = (req, res, next) => {
    let longUrl = req.query;

    Url.findOne({ longUrl: longUrl.longurl }, (err, result) => {
        if (!err) {
            console.log(result);

            if (!result) {
                if (!validUrl.isUri(BASE_URI)) {
                    return res.status(401).json({
                        msg: "Invalid Base Url"
                    });
                }

                if (!validUrl.isUri(longUrl.longurl)) {
                    return res.status(401).json({
                        msg: "Invalid Long Url"
                    });
                }

                let code = longUrl.code ? longUrl.code : shortid.generate();

                // console.log(code);

                let url = new Url({
                    urlCode: code,
                    shortUrl: BASE_URI + "/" + code,
                    longUrl: longUrl.longurl
                });

                url.save()
                    .then(result => {
                        res.json({
                            msg: "Short Url successfully generated",
                            shortUrl: result.shortUrl
                        });
                    })
                    .catch(err => {
                        res.json({
                            msg: "Aapse naa hone vala",
                            err
                        });
                    });
            } else {
                return res.json({
                    msg: "Short url already exists!!",
                    shortUrl: result.shortUrl
                });
            }
        } else {
            return res.status(404).json({
                msg: "Something went wrong!!",
                err
            });
        }
    });
};

exports.getAllUrls = (req, res, next) => {
    Url.find({}, (err, result) => {
        if (!err) {
            return res.json({
                result
            });
        } else {
            return res.status(404).json({
                msg: "Something went wrong!! Error in return all Urls",
                err
            });
        }
    });
};

exports.getChangeCode = (req, res, next) => {
    let codes = req.query;
    // console.log(codes.old);

    Url.findOne({ urlCode: codes.old }, (err, result) => {
        // console.log(result);

        if (!err) {
            if (result) {
                result.urlCode = codes.new;
                result.shortUrl = BASE_URI + "/" + codes.new;

                result
                    .save()
                    .then(result => {
                        res.json({
                            msg: "Short Url successfully generated",
                            shortUrl: result.shortUrl
                        });
                    })
                    .catch(err => {
                        res.json({
                            msg: "Aapse naa hone vala",
                            err
                        });
                    });
            } else {
                res.status(401).json({
                    msg:
                        "This is a mistake, or maybe you are... URL doesn't exist"
                });
            }
        } else {
            return res.status(404).json({
                msg: "Something went wrong!! Error in changing Code",
                err
            });
        }
    });
};

exports.getDeleteUrl = (req, res, next) => {
    let code = req.query.code;

    Url.findOneAndDelete({ urlCode: code }, (err, result) => {
        if (!err) {
            res.json({
                msg: "Successfully, Deleted"
            });
        } else {
            res.status(401).json({
                msg: "Something went wrong!! Error in deleting url",
                err
            });
        }
    });
};
