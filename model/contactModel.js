const mongoose = require('mongoose');

const contact = mongoose.Schema({
    name : String,
    phone : String
})

module.exports = mongoose.model('CONTACT', contact);