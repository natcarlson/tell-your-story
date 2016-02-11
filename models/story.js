var mongoose = require('mongoose');


var StorySchema = mongoose.Schema( {
  title: {type: String},
  story: {type: String},
  date: {type: String},
  tags: {type: String},
  public: {type: String}
});


module.exports = StorySchema;
