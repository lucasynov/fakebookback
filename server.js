const express = require('express'),
app = express(),
port = process.env.PORT || 8000;
mongoose = require('mongoose'),
Task = require('./api/models/todoListModel'), //created model loading here
User = require('./api/models/userModel'), //created model loading here
bodyParser = require('body-parser');
const cors = require('cors');
mdp = require('./api/config/configDb');
app.set("trust proxy", true);
app.use(cors());


let urlencodedParser = bodyParser.urlencoded({
  extended: true,
  limit:"10mb"
});
app.use(urlencodedParser);
app.use(bodyParser.json({ limit: '10mb' }));

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

const dbURI =
  "mongodb+srv://lucas:"+mdp.mdp+"@cluster0-np5ub.mongodb.net/fakebook?retryWrites=true";

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


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


var routes = require('./api/routes/appRoutes'); //importing route

routes(app); //register the route


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);