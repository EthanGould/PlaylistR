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
    });
});

var playlistsFromREST = [

  {name: 'Pump Up Tunz', link: 'pump-up-tunz', songs: [
      {artist: 'Wiz Khalifa', title: 'Black and Yellow', artwork: 'http://findnewjams.com/frontend/img/default-album-art.png'},
      {artist: 'Mac Miller', title: 'Frozen Pizza and Koolaid', artwork: 'http://findnewjams.com/frontend/img/default-album-art.png'}
    ]
  },
  {name: 'Sunday Night Slow Jamz', link: 'sunday-night-slow-jamz', songs: [
      {artist: 'Michael Jackson', title: 'Thriller', artwork: 'http://findnewjams.com/frontend/img/default-album-art.png'},
      {artist: 'Outkast', title: 'Mrs. Jackson', artwork: 'http://findnewjams.com/frontend/img/default-album-art.png'}
    ]
  },
  {name: 'Workout Music', link: 'workout-music', songs: [
      {artist: 'Emeniem', title: 'Collapse', artwork: 'http://findnewjams.com/frontend/img/default-album-art.png'},
      {artist: '50 Cent', title: 'Heat', artwork: 'http://findnewjams.com/frontend/img/default-album-art.png'}
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
        if (!current) {
          return playlistsFromREST[0];
        }
        return current;
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

  for (var i = 0; i < playlistsFromREST.length; i++) {
    $scope.playlists.addPlaylist(playlistsFromREST[i]);
  }

  $scope.selectPlaylist = function() {
    console.log("PLAYLIST: ", this);
  };

  $scope.createPlaylist = function() {
    alert('created playlist');
  };
}]);
