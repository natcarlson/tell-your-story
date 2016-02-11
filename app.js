//******************************//
//     MODULES & MIDDLEWARE     //
//******************************//

var express = require('express');
var app = express();

var morgan = require('morgan');
app.use( morgan('dev') );

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

var mongoPath = 'mongodb://localhost/tellyourstory';
var mongoose = require('mongoose');
mongoose.connect(mongoPath);



//*****************//
//     ROUTING     //
//*****************//

//------Views------//
var index = require('./routers/index');
app.use('/', index);

var stories = require('./routers/stories');
app.use('/stories', stories);

var profile = require('./routers/profile');
app.use('/profile', profile);

var about = require('./routers/about');
app.use('/about', about);

// app.get('/', function(req, res) {
//   res.sendFile('index.html')
// });


//-------API-------//
var users = require('./routers/api/users');
app.use('/api/users', users);

// var storiesRouter = require('./routers/storiesRouter');
// app.use('/api/stories', storiesRouter);



//*******************//
//     LISTENING     //
//*******************//

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('this ship has sailed on port ' + port);
});