var ctrl = angular.module('firechat.controllers', []);

ctrl.controller('loginCtrl', function($scope, $ionicModal,  Auth) {
   $scope.user = {};
  $scope.login = function(){
    Auth.login($scope.user.email, $scope.user.password);
  };
  $scope.register = function(){
    if(Auth.createUser($scope.user.email, $scope.user.password) ){
      $scope.closeModal();
    }
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

});

ctrl.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

ctrl.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

ctrl.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
