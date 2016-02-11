console.log('..... loaded .....');


//----------  CREATE NEW USER FUNCTIONS  ----------//

function createUser(userData, callback) {
  $.ajax( {
    method: 'post',
    url: '/api/users',
    data: userData,
    success: function(data) {
      callback(data);
    }
  });
}

function setCreateUserFormHandler() {
    $('form#user-signup-form').on('submit', function(e) {
        e.preventDefault();

        var formObj = $(this).serializeObject();
        console.log(formObj);

        $('#user-signup-modal').closeModal();
        createUser(formObj, function(user) {
          console.log("form response:", user);
          // $("#user-signup-form").val();
        });
    });
}




//----------  LOG IN USER FUNCTIONS  ----------//

function logInUser(usernameAttempt, passwordAttempt, callback) {
  debugger
    $.ajax( {
        method: 'post',
        url: '/api/users/authenticate/'+usernameAttempt +'/' + passwordAttempt,
        // data: {username: usernameAttempt, password: passwordAttempt},
        success: function(data) {
          callback(data);
        }
    });
}

function setLogInUserFormHandler() {
  debugger
    $('#login-button').on('click', function(e) {
        e.preventDefault();

        var $formDiv = $('.login-body')

        var usernameField = $formDiv.find('input[name="username"]');
        var usernameText = usernameField.val();
        usernameField.val('');

        var passwordField = $formDiv.find('input[name="password"]');
        var passwordText = passwordField.val();
        passwordField.val('');

        var userData = {username: usernameText, password: passwordText};
        debugger
        logInUser(usernameText, passwordText, function(data) {

            $.cookie('token', data.token);
            console.log('Token:', $.cookie('token'));
            window.location="/stories"

        })
    })
}




//----------  LOG OUT USER FUNCTION  ----------//

function setLogOutHandler(){
  $('#log-out').on('click', function(e){
    e.preventDefault();
    $.removeCookie('token');
    window.location="/";

    // updateStoriesAndViews();
  });
}




//----------  CREATE NEW STORY FUNCTIONS  ----------//

function saveNewStory(storyData, callback) {
    // callback = callback || function(){};
    $.ajax( {
        method: 'post',
        url: '/api/users/stories',
        data: storyData,
        success: function(data) {
          var story = data.story;
          callback(story);
          console.log(story);

        }
    });
}

function setNewStoryFormHandler() {
    $('form#new-story-form').on('submit', function(e) {
        e.preventDefault();

          var formObj = $(this).serializeObject();
          // var formTitle = $(this).find('input[name="title"]').val();
          // var formDate = $(this).find('input[name="date"]').val();
          // var formStory = $(this).find('input[name="story"]').val();
          // var formPublic = $(this).find('input[name="public"]').val();
          //
          // var storyData = {formTitle, formDate, formStory, formPublic};

          // saveNewStory(storyData, function(story) {
          //   updateStoriesAndViews();
          // })
          console.log(formObj);

        $('#new-story-modal').closeModal();
        saveNewStory(formObj, function(story) {
            console.log(story, "is saved");
        });

        // var formTitle = $(this).find('input[name="title"]').val();
        // var formDate = $(this).find('input[name="date"]').val();
        // var formStory = $(this).find('input[name="story"]').val();
        // var formPublic = $(this).find('input[name="public"]').val();
        // var storyData = {title.formTitle, date.formDate, story.formStory, public.formPublic};
        // createStory(storyData, function(story) {
        //   updateStoriesAndView();
        // })
    });
}




//----------  GET & RENDER A USER'S STORIES FUNCTIONS  ----------//







//----------  GET & RENDER ALL STORIES FUNCTIONS  ----------//







$(function() {
  setCreateUserFormHandler();
  setLogInUserFormHandler();
  setNewStoryFormHandler();
  setLogOutHandler();
  $('.modal-trigger').leanModal();
})
;
