var serv = angular.module('firechat.services', []);

serv.factory('Auth', function($firebaseArray, $state){
  var fbUserAuth = new Firebase("https://amber-fire-8240.firebaseio.com");
  function authDataCallback(authData) {
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      $state.go('tab.chats');
    } else {
      console.log("User is logged out");
    }
  }
  return {
    // Registster User
    user: $firebaseArray(fbUserAuth), 
    createUser: function(email, password, modal){
      fbUserAuth.createUser({
        email    : email,
        password : password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          modal.hide();
        }
      });
    },
    // Login User with email and password
    login: function(email, password, state){
      fbUserAuth.authWithPassword({
        email    : email,
        password : password,
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          state.go('tab.chats');
        }
      });
    },
    // logout User
    logout: function(){
      fbUserAuth.unauth();
    },
    checkAuth: function(){
      fbUserAuth.onAuth(authDataCallback);
    }
  };
});

serv.factory('Messages', function($firebaseArray){
   var fbMsg = new Firebase("https://amber-fire-8240.firebaseio.com/msg");
   return $firebaseArray(fbMsg);
});




















serv.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

// User Authentication settings


