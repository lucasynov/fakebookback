const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const mongoose = require('mongoose');
const ObjectId =  mongoose.Types.ObjectId


   
function getUserConvs(req, res) {
    if (!req.body.user_id || !req.body.user_id_conv) {
        res.status(400).json({
            text: "Utilisateur inconnu"
        })
    } else {
        Conversation.find(
                { 
                    "users" : {
                        $all : [
                             ObjectId(req.body.user_id), 
                             ObjectId(req.body.user_id_conv)
                        ] 
                    }
                } 
            ).exec( function (err, convs) {
            if(convs.length > 0){
                res.send(convs);
            }else{
                users = [req.body.user_id, req.body.user_id_conv];
                var new_conv = new Conversation({users : users});
                new_conv.save(function(err, conv) {
                  if (err){
                    res.send(err);
                  }else{
                    res.json(conv);
                  }
                });
            }
        
        })
    }
}


function addMessage(req, res) {
    if (!req.body.convId || !req.body.message  || !req.body.author) {
        res.status(400).json({
            text: "Requête invalide"
        });
    } else {
        Conversation.findOneAndUpdate(
                {_id: req.body.convId}, 
                {$push: 
                    {
                        messages: [
                            {
                                author : req.body.author, 
                                content : req.body.message 
                            }
                        ]
                    }
                }, 
        ).exec(function (err, conv){
            if (err){
                res.send(err);
            }else{
                res.json(conv);
            }
        });
    }
}

exports.addMessage = addMessage;
exports.getUserConvs = getUserConvs;