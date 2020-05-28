const express = require('express')
const expressHbs = require('express-handlebars')
const path = require('path')
const routes = require('./routes/index')
const port = 3000

const app = express()
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', routes)

app.listen(port, () => console.log(`Listening on port: ${port}!`))

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
