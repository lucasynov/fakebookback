'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var postSchema = new Schema({
  message: {
    type: String,
    required: 'message is empty'
  },
  title : {
    type :String,
    required : 'title is empty',
  },
  photo : {
    type : String,
    required : 'photo is empty',
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'Users',
    required : 'User is empty',
  },
},{timestamps: {createdAt: 'created_at'}});


module.exports = mongoose.model('Posts', postSchema);


