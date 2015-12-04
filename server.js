// Install Express
// Install bodyParser
// Install ejs
// Install socket.io
// Use path

var express = require('express');
// var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// Able to use files in static folder
app.use(express.static(path.join(__dirname, "./static")));

// Only use body parser for JSON data being received into the server
// app.use(bodyParser.urlencoded());

// Able to use files in view folder
app.set('views', path.join(__dirname, "./views"));
// Able to use the view engine and ejs files
app.set('view engine', 'ejs');

// Index route
app.get('/', function(req, res){
    console.log('LOADING INDEX');
    res.render('index');
})

var server = app.listen(5000, function(){
    console.log("==================");
    console.log("======      ======");
    console.log("====== 5000 ======");
    console.log("======      ======");
    console.log("==================");
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    console.log("USER HAS CONNECTED");

    if(!button_count) { var button_count = 0; }

    socket.on('button_click', function() {
        button_count++;
        // console.log('button has been clicked', button_count);
        io.emit('update_count', button_count);
    })

    socket.on('reset', function() {
        button_count = 0;
        io.emit('update_count', button_count);
    })
})