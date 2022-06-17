const express = require('express')
const fs = require('fs')

const mongoose = require('mongoose')
const mongo_uri = 'mongodb://127.0.0.1:27017/cheapify'

const { engine } = require('express-handlebars')

const port = process.env.PORT || '3002';
const City = require('./models/city')
const Domain = require('./models/domain')
const User = require('./models/user')
const Category = require('./models/category')
const Business = require('./models/business')

// SERVER
const app = module.exports = express()


app.use(express.json())



app.get('/:start/:end/:filter?',  async (req, res) => {
    let businesses
    if (req.params.filter) {
        businesses = await Business.find({ name: new RegExp(`.*^${req.params.filter}.*$`, 'i') }).lean()
    } else {
        businesses = await Business.find({}).lean()
    }
    const categories  = await Category.find({}).lean()
    const cities  = await City.find({}).lean()
    console.log(cities[0])
    res.render('main', {
        layout: 'viewer',
        helpers: {
            translate: function (obj) { return obj['en']; }
        }, 
        businesses: businesses.slice(req.params.start, req.params.end),
        categories,
        cities
    })
})

app.post('create/:id/:categoryId/:cityId', async (req, res) => {
    const business = await Business.findOne({_id: req.params.id})
    const category  = await Category.findOne({_id: req.params.categoryId})
    const city  = await City.findOne({_id: req.params.cityId})
    const user  = await User.findOne({email: 'fillion.jonathan@gmail.com'})

    const ad = new Ad({})
    // await ad.save()
})

app.post('delete/:id', async (req, res) => {
    const deleteResult = await Business.deleteOne({_id: req.params.id})
    console.log(deleteResult)
})


// DATABASE
mongoose.connect(mongo_uri)
const connection = mongoose.connection
connection.once('open', () => {

})

// UI ENGINE
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'alt',
}))
app.set('view engine', 'hbs')



app.listen(port)
