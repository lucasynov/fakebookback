const Post = require('../models/postModel.js');
const Users = require('../models/userModel.js');



function findPost(req, res) {
    Post.find({}).populate('author', 'name').exec( function (err, post) {
        if (err) {
            res.status(500).json({
                "text": err
            })
        } else if (!post) {
            res.status(401).json({
                "text": "Une erreur est survenue."
            })
        } else {
            res.status(200).json({
                "post": post
            })
        }
    })
}

function createPost(req, res) {
    var new_post = new Post(req.body);
    new_post.save(function(err, post) {
      if (err){
        res.send(err);
      }else{
        res.json(post);
      }
    });
};


function delete_a_post(req, res) {
    Post.remove({
      _id: req.params.postId
    }, function(err, post) {
      if (err){
        res.send(err);
      }else{
        res.json({ message: 'Post successfully deleted' });
      }
    });
};


function get_one_post(req, res) {
    Post.findById(req.params.postId).populate('author', 'name').exec( function(err, post) {
        if (err){
            res.send(err);
        }else{
            res.json(post);
        }
    });
}

exports.get_one_post = get_one_post;
exports.findPost = findPost;
exports.createPost = createPost;
exports.delete_a_post = delete_a_post;
