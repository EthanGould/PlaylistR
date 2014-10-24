var app = angular.module('Playlistr', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/playlists/:name', {
      //controller: 'PlaylistsController',
      templateUrl: function(params){ return 'scripts/templates/' + params.name + '.html'}
    })
    .when('/playlist/new', {
      templateUrl: 'scripts/templates/new-playlist.html',
      //controller: 'PlaylistsController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

app.directive('conversation', function(){
  return {
    restrict: 'E',
    templateUrl: 'scripts/templates/convo.html',
    controller: 'PlaylistsController'

  };
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


var playlistControllerFactory = {

  create: function() {

    var current = null;
    var playlists = [];

    return {
      activate: function(playlist) {
        for (var i = 0; i < playlists.length; i++) {

          if (playlists[i] === playlist) {
            current = playlist;
            console.log(current);
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

app.controller('PlaylistsController', ['$scope', function($scope) {

}]);
