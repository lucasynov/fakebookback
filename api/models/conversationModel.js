'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let ConversationSchema = new Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true}],
    messages : [{
        author: { 
            type: Schema.Types.ObjectId, 
            ref: 'Users',
            required : 'User is empty',
        },
        content : String,
    }],
}, {timestamps: {createdAt: 'created_at'}});

module.exports = mongoose.model('Conversation', ConversationSchema);