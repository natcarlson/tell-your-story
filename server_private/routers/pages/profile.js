// ----------------------
// ****** Modules! ******
// ----------------------
var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
  if(!req.user){
    console.log('No User');
    res.json({status: 302})
  } else {
    console.log('User');
    next();
  }
});

// --------------------
// ****** Route! ******
// --------------------
router.get('/', function(req, res) {
  res.render('profile');
});


router.post('/', function(req, res) {
  var storyData = req.body.story;
  console.log('Story Data', storyData);
  var newStory = new Story(storyData);
  newStory.save(function(err, databaseStory) {
    res.json( databaseStory );
  });
});




// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;
