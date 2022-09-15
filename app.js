const express = require('express')
const session = require('express-session')
const Controller = require('./controllers')
const routes = require('./routes')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
   }
}))

app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})