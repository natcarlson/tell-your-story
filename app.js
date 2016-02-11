//******************************//
//     MODULES & MIDDLEWARE     //
//******************************//

var express = require('express');
var app = express();

var morgan = require('morgan');
app.use( morgan('dev') );

app.use(express.static(__dirname + '/client_public'));
app.set('views', (__dirname + '/server_private/views'));


app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var mongoPath = 'mongodb://localhost/tellyourstory';
var mongoose = require('mongoose');
mongoose.connect(mongoPath);




//*****************//
//     ROUTING     //
//*****************//

//------Views------//
var index = require('./server_private/routers/index');
app.use('/', index);

var stories = require('./server_private/routers/stories');
app.use('/stories', stories);

var profile = require('./server_private/routers/profile');
app.use('/profile', profile);

var about = require('./server_private/routers/about');
app.use('/about', about);

// app.get('/', function(req, res) {
//   res.sendFile('index.html')
// });


//-------API-------//
var users = require('./server_private/routers/api/users');
app.use('/api/users', users);

// var stories = require('./routers/api/stories');
// app.use('/api/users/stories', stories);

// var storiesRouter = require('./routers/storiesRouter');
// app.use('/api/stories', storiesRouter);




//*******************//
//     LISTENING     //
//*******************//

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('this ship has sailed on port ' + port);
});
