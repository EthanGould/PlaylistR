var app = angular.module('Playlistr', ['ngRoute', 'ui.router', 'firebase']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('playlist-nav', {
      url: "/playlists",
      templateUrl: "scripts/templates/playlist-nav.html"
    })
    .state('playlist-nav.playlist', {
      url: '/:playlist',
      templateUrl: 'scripts/templates/playlist.html'
    })
    .state('playlist-nav.new', {
      url: 'playlists.new',
      templateUrl: 'scripts/templates/new-playlist.html'
    });
  $urlRouterProvider.otherwise("/playlists");
});

app.directive('conversation', function(){
  return {
    restrict: 'E',
    templateUrl: 'scripts/templates/conversation.html'
  };
});

var playlistControllerFactory = {

  create: function() {

    var current = null;
    this.playlists = [];

    return {

      remove: function(playlist) {
        for (var i = 0; i < this.playlists.length; i++) {

          if (this.playlists[i] === playlist) {
            this.playlists.splice(this.playlists.indexOf(playlist), 1);
          }
        }
      },

      setCurrent: function(playlist) {
        console.log("SET CURRENT ", playlist);
        current = playlist;
      },

      getCurrent: function() {
        return current;
      },

      getPlaylists: function() {
        return this.playlists;
      }
    };
  }
};


app.controller('MainController', ['$firebase', '$scope', function($firebase, $scope) {

  $scope.plFactory = playlistControllerFactory.create();

  var baseRef = new Firebase('https://playlistrapp.firebaseio.com/');
  var playlistsArray = $firebase(baseRef.child('playlists/')).$asArray();

  $scope.playlists = playlistsArray;
  console.log($scope.playlists);

  $scope.sendPlToFirebase = function(playlist) {
    playlistsArray.$add({name: playlist})
  }
  
  $scope.selectPlaylist = function() {
    console.log("PLAYLIST: ", this);
  };
}]);

