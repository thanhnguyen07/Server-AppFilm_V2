const User = require('../models/User')
const Film = require('../models/Film')

class UsersController {
    // [GET] /users
    Users(req, res) {
        User.find({})
        .then(user => {
            user = user.map(user => user.toObject())
            res.render('Users', {
                user
            }) 
        })
        .catch(err => console.log(err))
    }
    // [GET] /users/data
    dataUsers(req, res) {
        User.find({})
            .then(user => res.json(user))
            .catch(err => console.log(err))
    }
    // [GET] /users/create
    create(req, res) {
        res.render('user/create', {})
    }
    // [GET] /users/:id
    details(req, res) {
        User.find({_id: req.params._id}, (err, user) => {
            user = user.map(user => user.toObject())
            res.render('user/details', {
                user
            }) 
        })
    }
    // [POST] /users/store2
    store2(req, res) {
        const user = req.body;
        User.find({email: user.email}, (err, user) => {
            if(user.length == 0) {
                const user = new User(req.body);
                user.save()
                .then(() => {
                        res.json(true)
                    })
                    .catch(() => {})
            } else {
                res.json(false)
            }
        })
    }
    // [POST] /users/store
    store(req, res) {
        const user = new User(req.body);
          user.save()
            .then(() => {
                res.redirect('/users')
            })
            .catch(() => {})
    }
    // [POST] /users/login
    login(req, res) {
       const data = req.body;
       const email = data.email;
       const pass = data.pass;
       User.findOne({email: email}, (err, user) => {
        if(user!=null) {
            if(pass==user.pass){
                const checkPass = true;
                res.json({checkPass, user})
            }else{
                const checkPass = false;
                res.json({checkPass})
            }
            
            
        }else {
            const checkEmail = false
            res.json({checkEmail})
        }
       })
    }

    // [DELETE] /users/:_id
    delete(req, res) {
        User.deleteOne({_id: req.params._id})
            .then(() => {
                res.redirect('/users')
            })
            .catch((err) => {})
    }

    //[POST] /users/listLike
    listLike(req, res) {
        const idFilm = req.body.idFilm;
        const idUser = req.body.idUser;
        const point = req.body.point
        User.findOne( {_id: idUser}, (err, user) => {
            const listLike = user.listLike;
            const checkList = listLike.indexOf(idFilm)
            if(checkList != -1) {
                //- point
                listLike.splice(checkList, 1)
                User.updateOne({_id: idUser}, {listLike: listLike})
                    .then(() => {
                        const newPoint = point - 1
                        Film.updateOne({_id: idFilm}, {point: newPoint})
                            .then(() => {
                                Film.find({}, function (err, film) {
                                    console.log(`Delete ${idFilm} from List Like`)
                                    console.log(`Down point ${idFilm}: ${point} => ${newPoint}`)
                                    res.send({
                                        dataFilms: film,
                                        listLike: listLike,
                                    })
                                })
                            })
                    })
            }else {
                //+ point
                listLike.push(idFilm)
                User.updateOne({_id: idUser}, {listLike: listLike})
                    .then(() => {
                        const newPoint = point + 1
                        Film.updateOne({_id: idFilm}, {point: newPoint})
                            .then(() => {
                                Film.find({}, function (err, film) {
                                    console.log(`Add ${idFilm} to List Like`)
                                    console.log(`Up point ${idFilm}: ${point} => ${newPoint}`)
                                    res.send({
                                        dataFilms: film,
                                        listLike: listLike,
                                    })
                                })
                            })
                    })
            }

        })
    }
    //[POST] /users/listLike
    listPlay(req, res) {
        // console.log(req.body)
        const idFilm = req.body.idFilm;
        const idUser = req.body.idUser;
        User.findOne({_id: idUser},(err, user)=> {
            const listPlay = user.listPlay;
            const checkList = listPlay.indexOf(idFilm)
            if(checkList != -1) {
                listPlay.splice(checkList, 1);
                User.updateOne({_id: idUser}, {listPlay: listPlay})
                    .then(() => {
                        console.log(`Delete ${idFilm} from List Play`)
                        res.send({
                            listPlay: listPlay,
                        })
                    });
            } else{
                listPlay.push(idFilm);
                User.updateOne({_id: idUser}, {listPlay: listPlay})
                    .then(() => {
                        console.log(`Add ${idFilm} to List Play`)
                        res.send({
                            listPlay: listPlay,
                        })
                    });
            }
        })
    }
    //[POST] /users/listHistory
    listHistory(req,res) {
        const idFilm = req.body.idFilm;
        const idUser = req.body.idUser;
        User.findOne({_id: idUser}, (err, user)=> {
            const listHistory = user.listHistory;
            const checkHistory = listHistory.indexOf(idFilm);
            if(checkHistory != -1){
                console.log('Watched')
                listHistory.splice(checkHistory, 1)
                listHistory.unshift(idFilm);
                User.updateOne({_id: idUser}, {listHistory: listHistory})
                    .then(() => {
                        console.log(`Add ${idFilm} to List History`)
                        res.send({listHistory: listHistory})
                    })
            } else {
                console.log('Not seen')
                listHistory.unshift(idFilm);
                console.log(listHistory);
                User.updateOne({_id: idUser}, {listHistory: listHistory})
                    .then(() => {
                        console.log(`Add ${idFilm} to List History`)
                        res.send({listHistory: listHistory})
                    })
            }
        })
    }
}
module.exports = new UsersController