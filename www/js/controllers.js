var ctrl = angular.module('firechat.controllers', []);

ctrl.controller('loginCtrl', function($state, $scope, $ionicModal,  Auth) {
  $scope.user = {};
  $scope.login = function(){
    Auth.login($scope.user.email, $scope.user.password, $state);
  };
  $scope.register = function(){
   Auth.createUser($scope.user.email, $scope.user.password, $scope.modal);
  };

  // Register Modal
  $ionicModal.fromTemplateUrl('register.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Checking if user is logged In 
 Auth.checkAuth();

});



ctrl.controller('MsgCtrl', function($scope, Messages) {
  $scope.msgs = Messages;

  $scope.chat = "";

  $scope.sendMsg = function(){

   $scope.msgs.$add({
      user: "Guest",
      message: $scope.chat
    });
    chat.message = "";
  };


});

ctrl.controller('ChatsCtrl', function($scope, Chats, Messages) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
});

ctrl.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

ctrl.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
