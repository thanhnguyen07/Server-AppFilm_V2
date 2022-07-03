const Film = require('../models/Film')

class FilmsController {
    // [GET] /films/data
    // Json data for the film
    data (req, res) {
        Film.find({}, function (err, film) {
            res.send(film)
        })
    }
    // [GET] /films
    // View film web
    Films(req, res) {
        Film.find({})
        .then(film => {
            film = film.map(film => film.toObject())
            res.render('Films', {
                film
            }) 
        })
        .catch(err => console.log(err))
    }
    // [GET] /films/create
    // View create film web
    create (req, res) {
        res.render('films/create')
    }
    // [POST] /films/store
    // Create film web
    store(req, res) {
        // console.log(req.body)
        const film = new Film(req.body);
        film.save()
          .then(() => {
              res.redirect('/films')
          })
          .catch(() => {})
    }
    // [GET] /films/:id
    // View details film web
    details(req, res) {
        Film.find({_id: req.params._id}, (err, film) => {
            film = film.map(film => film.toObject())
            res.render('films/details', {
                film
            }) 
        })
    }
    // [DELETE] /films/:_id
    delete(req, res) {
        Film.deleteOne({_id: req.params._id})
            .then(() => {
                res.redirect('/films')
            })
            .catch((err) => {})
    }
}

module.exports = new FilmsController