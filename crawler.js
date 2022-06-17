const fs = require('fs')
const path = require('path')

const City = require('./models/city')
const Domain = require('./models/domain')
const Category = require('./models/category')
const Business = require('./models/business')

const mongoose = require('mongoose')

const mongo_uri = 'mongodb://localhost:27017/cheapify'


mongoose.connect(mongo_uri)
const connection = mongoose.connection
connection.once('open', () => { })


async function run() {

    const file = await fs.readFileSync('./data/businesses.json', { encoding: 'utf8', flag: 'r' })
    const json = JSON.parse(file)


    json.forEach(async (biz) => {
        const business = new Business({
            name: biz.name,
            email: biz.email,
            url: biz.website,
            phone: biz.phone,
            address: biz.address,
            city: biz.city,
            state: biz.state,
        })

        const res = await business.save()
        console.log(res)
    })
}

run().catch(console.dir)

