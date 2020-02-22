const Url = require("../models/url");

exports.getIndex = (req, res, next) => {
    let code = req.params.urlCode;

    Url.findOne({ urlCode: code }, (err, result) => {
        if (!err) {
            if (result) {
                result.count++;

                result.save();

                return res.redirect(result.longUrl);
            }
        } else {
            res.status(404).json({
                msg: "Aap yahan aai kis liye?",
                err
            });
        }
    });
};

exports.getInit = (req, res, next) => {
    return res.send(
        "<h1> Welcome to Octave Music Society... Website Under Construction</h1>"
    );
};
