const mongoose = require('mongoose')

const Schema = mongoose.Schema

let business = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        url: {
            type: String
        },
        phone: {
            type: String
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        ignore: {
            type: Boolean
        },
        adCreated: {
            type: Boolean
        }
    },
    { collection: 'businesses' }
)

module.exports = mongoose.model('Business', business)