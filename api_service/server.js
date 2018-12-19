var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');

app.listen(port);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/timeServerRoutes');
routes(app); 

console.log('Time server is up: http://localhost:' + port);