angular.module('starter.controllers', ['angularSoundManager'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('BrowseCtrl', function($scope) {
  console.log('browse');

  })

.controller('PlaylistsCtrl', function($scope) {
  // $scope.playlists = [
  //   { title: 'Reggae', id: 1 },
  //   { title: 'Chill', id: 2 },
  //   { title: 'Dubstep', id: 3 },
  //   { title: 'Indie', id: 4 },
  //   { title: 'Rap', id: 5 },
  //   { title: 'Cowbell', id: 6 }
  // ];
  // 
  // import 'soundcloud-cordova-sdk';

  $scope.songs = [];

  SC.initialize({
    client_id: 'b80d3102f512d040b46a881dacbb2526'
  });

  // SC.get("https://api.soundcloud.com/tracks/224375276", {
  SC.get("https://api.soundcloud.com/users/56585724/playlists", {   
      limit: 5
  }, function(tracks) {
      console.log(tracks[0].tracks);
      var tracks = tracks[0].tracks;
      for (var i = 0; i < tracks.length; i ++) {
          SC.stream( '/tracks/' + tracks[i].id, function( sm_object ){
              var track = {
                  id: tracks[i].id,
                  title: tracks[i].title,
                  artist: tracks[i].genre,
                  url: sm_object.url
                  // url: 'http://api.soundcloud.com/tracks/193270658/stream?client_id=b80d3102f512d040b46a881dacbb2526'
              };
              console.log(track);
              $scope.$apply(function () {
                  $scope.songs.push(track);
              });
          });
      }         
  });


  // $(document).ready(function() {
  //   SC.get('https://api.soundcloud.com/tracks/224375276', function(track) {
  //       console.log(track);
  //       // $('#player').html(track.title);
  //       SC.oEmbed(track.permalink_url,
  //       document.getElementById('player'));
  //   });
  // });

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
