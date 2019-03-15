const express = require('express'),
    app = express(),
    port = process.env.PORT || 8000;
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), //created model loading here
    bodyParser = require('body-parser');

mdp = require('./api/config/config');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;

const dbURI =
  "mongodb+srv://lucas:"+mdp.mdp+"@cluster0-np5ub.mongodb.net/test?retryWrites=true";

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);