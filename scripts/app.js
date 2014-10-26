var app = angular.module('Playlistr', ['ngRoute', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/playlists");
  //
  // Now set up the states
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
    })
});

var playlistsFromREST = [

  {name: 'Pump Up Tunz', link: 'pump-up-tunz', songs: [
      {artist: 'Wiz Khalifa', title: 'Black and Yellow'},
      {artist: 'Mac Miller', title: 'Frozen Pizza and Koolaid'}
    ]
  },
  {name: 'Sunday Night Slow Jamz', link: 'sunday-night-slow-jamz', songs: [
      {artist: 'Michael Jackson', title: 'Thriller'},
      {artist: 'Outkast', title: 'Mrs. Jackson'}
    ]
  },
  {name: 'Workout Music', link: 'workout-music', songs: [
      {artist: 'Emeniem', title: 'Collapse'},
      {artist: '50 Cent', title: 'Heat'}
    ]
  }
];

app.directive('conversation', function(){
  return {
    restrict: 'E',
    templateUrl: 'scripts/templates/conversation.html'
  };
});


var playlistControllerFactory = {

  create: function() {

    var current = null;
    var playlists = [];

    return {
      activate: function(playlist) {
        for (var i = 0; i < playlists.length; i++) {

          if (playlists[i] === playlist) {
            current = playlist;
            console.log('MainCtrl current pl', current);
          }
        }
      },

      remove: function(playlist) {
        for (var i = 0; i < playlists.length; i++) {

          if (playlists[i] === playlist) {
            playlists.splice(playlists.indexOf(playlist), 1);
          }
        }
      },

      setCurrent: function(value) {
        console.log("SET CURRENT ", value);
        current = value;
      },

      getCurrent: function() {
        return current;
        console.log(current);
      },

      addPlaylist: function(playlist) {
        playlist._activate = function() {
          this.activate(playlist);
        };
        playlist._remove = function(playlist) {
          this.remove(playlist);
        };
        playlists.push(playlist);
      },

      getPlaylists: function() {
        return playlists;
      }
    };
  }
};


app.controller('MainController', ['$scope', function($scope) {

  $scope.playlists = playlistControllerFactory.create();

  // playlist : playlistsFromREST
  for (var i = 0; i < playlistsFromREST.length; i++) {
    $scope.playlists.addPlaylist(playlistsFromREST[i]);
  }
  console.log($scope.playlists.getPlaylists())

  $scope.selectPlaylist = function() {
    console.log("PLAYLIST: ", this);
  };
}]);
