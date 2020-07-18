const User = require('../models/user');

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
}