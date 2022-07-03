const Cmts = require('../models/Cmts')

class CmtsController {
    // [GET] /cmts
    data(req, res) {
        Cmts.find({}, function (err, cmts) {
            res.send(cmts)
        })
    }
    create(req, res) {
        const dataReq = req.body;
        const idFilm = dataReq.idFilm;
        const idUser = dataReq.idUser;
        const cmt = new Cmts(dataReq);
        cmt.save()
            .then(() => {
                Cmts.find({}, function (err, cmts) {
                    res.send({dataCmtsFilms: cmts})
                })
               console.log(`User(${idUser}) Create New Cmt Film(${idFilm})`)
            })
            .catch(() => {
                console.log('Cmt Failed!!!')
            })
    }
}

module.exports = new CmtsController