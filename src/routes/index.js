const filmsRouter = require('./films')
const usersRouter = require('./users')
const castRouter = require('./cast')
const cmtsRouter = require('./cmts')

function route(app) {
  app.use('/films', filmsRouter)

  app.use('/users', usersRouter)

  app.use('/cast', castRouter)  

  app.use('/cmts', cmtsRouter)  
}
module.exports = route 
