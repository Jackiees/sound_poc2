angular.module('myApp', ['angularSoundManager']).controller('MainCtrl', ['$scope',
    function($scope) {
        $scope.songs = [];
        
        SC.initialize({
            client_id: "b80d3102f512d040b46a881dacbb2526"
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
                        // url: sm_object.url
                        url: 'http://api.soundcloud.com/tracks/193270658/stream?client_id=b80d3102f512d040b46a881dacbb2526'
                    };
                    console.log(track);
                    $scope.$apply(function () {
                        $scope.songs.push(track);
                    });
                });
            }         
        });
    }
]);
