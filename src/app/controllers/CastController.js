const cast = require('../models/Cast')

class CastsController {
    // [GET] /cast
    Cast(req,res) {
        cast.find({}, (err,cast) => {
            res.send(cast)
        })
    }
    data(req, res) {
        cast.find({}, function (err, film) {
            res.send(film)
        })
    }
}

module.exports = new CastsController