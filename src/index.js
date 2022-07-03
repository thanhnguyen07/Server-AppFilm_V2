const path = require('path')
const express = require('express')
const app = express()
const port = 3000
const route = require('./routes')
const methodOverride = require('method-override')

// Connect DB
const db = require('./config/db')
db.connect();

// Handlebars
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({
  extname: ".hbs",
  helpers: {
    sum: (a, b) => a + b
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))

// BodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files - Images
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'))

route(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
