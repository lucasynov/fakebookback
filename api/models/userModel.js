'use strict';
var mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../config/config');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  name: {
    firstname: {
        type: String,
        required: 'firstname is empty'
    },
    lastname: {
        type: String,
        required: 'lastname is empty'
    },
    displayname: {
        type: String,
        required: 'displayname is empty'
    },
  },
  token24 : {
    type :String,
    required : true,
  },
  email: {
    type: String, 
    lowercase: true, 
    required: [true, "can't be blank"], 
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    unique: true, 
    index: true
  },
  password:{
    type :String,
    required : true,
  }, 
  photo : String,
  birthday : Date,
  created_date: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods = {
    authenticate: function (password) {
        return passwordHash.verify(password, this.password);
    },
    getToken: function () {
        return jwt.encode(this, config.secret);
    }
}

module.exports = mongoose.model('Users', userSchema);