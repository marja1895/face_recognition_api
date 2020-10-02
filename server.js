const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
	client: 'pg',
	connection: {
		connectionString: 'process.env.DATABASE_URL',
		ssl: true,
	},
})

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('https://face-detectormv.herokuapp.com/', (req, res) => {
	res.send(db.users)
})
app.post('https://face-detectormv.herokuapp.com/signin', signin.handleSignin(db, bcrypt))
app.post('https://face-detectormv.herokuapp.com/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt)
})
app.get('https://face-detectormv.herokuapp.com/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, db)
})
app.put('https://face-detectormv.herokuapp.com/image', (req, res) => {
	image.handleImage(req, res, db)
})
app.post('https://face-detectormv.herokuapp.com/imageurl', (req, res) => {
	image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})
