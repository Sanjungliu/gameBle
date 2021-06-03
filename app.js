const express = require('express')
// const Controller = require('./controllers/controllerAuth')
const app = express()
const port = 4000
const session = require('express-session')
app.use(express.urlencoded({ extended:false }))
app.set('view engine', 'ejs')

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: `rahasia`
}))
const auth = require('./routes/routeAuth')
const player = require('./routes/routerPlayer')

// console.log(true);
app.use('/', auth)
app.use('/', player)

// const routerPlayer = require('./routes/routerPlayer')



// app.use('/', routerPlayer)

app.listen(port, () => console.log(`server running at port:${port}`))


// sequelize command

// sequelize model:generate --name Player --attributes username:string,password:string,email:string,favourite_genre:string,gender:string,isAdmin:boolean
// sequelize model:generate --name Game --attributes title:string,developers:string,released_year:integer,genre:string
// sequelize model:generate --name PlayGame --attributes last_played:date,PlayerId:integer,GameId:integer