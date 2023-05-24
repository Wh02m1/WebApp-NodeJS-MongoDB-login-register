
// products.js

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var Products = new Schema({
    id:{
        type: String
       
    },
    name: {
        type: String,
      },
      img: {
        type: String,
      },
      price: {
        type: Number,
      }
    });
    

Products.plugin(passportLocalMongoose);

module.exports = mongoose.model('Products', Products)
