var express = require('express');
var router = express.Router();


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

module.exports = router;
