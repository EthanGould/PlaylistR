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


app.factory('PlaylistData',['$firebase', function($firebase) {

  var baseRef = new Firebase('https://playlistrapp.firebaseio.com/');
  var playlistsArray = $firebase(baseRef.child('playlists/')).$asArray();

  var playlists = playlistsArray;
  var current;

  return {

    create: function(plName) {
      playlistsArray.$add({name: plName});
      alert('created new Playlist: ', plName);
    },

    setCurrent: function(playlist) {
      current = playlist;
      return playlist;
    },

    getCurrent: function() {
      return current;
    },

    getPlaylists: function() {
      return playlists;
    }
  };
}]);

app.controller('MainController', ['PlaylistData', '$firebase', '$scope', function(PlaylistData, $firebase, $scope) {

  var plData = PlaylistData;
  $scope.playlists = plData.getPlaylists();
  console.log($scope.playlists);

  $scope.currentPlaylist = plData.setCurrent();

  $scope.createNewPl = function(name) {
    plData.create(name);
    $('.new-pl-name').val('');
  };

  $scope.setPlaylist = function($el) {
    console.log("Set current PLAYLIST: ", $el);
    plData.setCurrent($el);
  };
}]);






