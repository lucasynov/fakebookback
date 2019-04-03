const User = require('../models/userModel.js');
const passwordHash = require("password-hash");
let jwt = require('jsonwebtoken');

function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password),
            name : {
                    firstname: req.body.name.firstname,
                    lastname: req.body.name.lastname,
                    displayname: req.body.name.firstname + ' ' + req.body.name.lastname,
            },
            photo : req.body.name.photo,
            token24 : "",
        }
        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        })

        findUser.then(function () {
            let token = jwt.sign({ id: user._id }, 'secret', {
                expiresIn: 86400 
            });
            var _u = new User(user);
            _u.token24  = token;
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne" + err,
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": user.getToken(),
                        "user" : user,
                        "token24" : user.token24
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
}

function login(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else if (!user) {
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            } else {
                if (user.authenticate(req.body.password)) {
                    let token = jwt.sign({ id: user._id }, 'secret', {
                        expiresIn: 86400 
                    });

                    user.token24 = token;

                    user.save(function (err, user) {
                        if (err) {
                            res.status(500).json({
                                "text": "Erreur interne" + err,
                            })
                        } else {
                            res.status(200).json({
                                "token": user.getToken(),
                                "text": "Authentification réussi",
                                "token24" : token,
                                user : user,
                            })
                        }
                    })
                } else {
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
}


function findUser(req, res) {
    User.findOne({
        token24: req.body.token24
    }, function (err, user) {
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })
        } else if (!user) {
            res.status(401).json({
                "text": "Le token est invalide"
            })
        } else {
            res.status(200).json({
                "token": user.getToken(),
                "token24" : user.token24,
                "user" : user,
            })
        }
    })
}

//On exporte nos deux fonctions
exports.findUser = findUser;
exports.login = login;
exports.signup = signup;