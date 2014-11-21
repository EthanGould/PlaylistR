var app = angular.module('Playlistr', ['ngRoute', 'ui.router', 'firebase']);

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

  // {name: 'Pump Up Tunz', songs: [
  //     {artist: 'Wiz Khalifa', title: 'Black and Yellow', artwork: 'http://findnewjams.com/frontend/img/default-album-art.png'},
  //     {artist: 'Mac Miller', title: 'Frozen Pizza and Koolaid', artwork: 'http://findnewjams.com/frontend/img/default-album-art.png'}
  //   ]
  // },
  // {name: 'Sunday Night Slow Jamz', songs: [
  //     {artist: 'Michael Jackson', title: 'Thriller', artwork: 'http://findnewjams.com/frontend/img/default-album-art.png'},
  //     {artist: 'Outkast', title: 'Mrs. Jackson', artwork: 'http://findnewjams.com/frontend/img/default-album-art.png'}
  //   ]
  // },
  // {name: 'Workout Music', songs: [
  //     {artist: 'Emeniem', title: 'Collapse', artwork: 'http://findnewjams.com/frontend/img/default-album-art.png'},
  //     {artist: '50 Cent', title: 'Heat', artwork: 'http://findnewjams.com/frontend/img/default-album-art.png'}
  //   ]
  // }
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
    this.playlists = [];

    return {
      activate: function(playlist) {
        for (var i = 0; i < this.playlists.length; i++) {

          if (this.playlists[i] === playlist) {
            current = playlist;
            console.log('MainCtrl current pl', current);
          }
        }
      },

      remove: function(playlist) {
        for (var i = 0; i < this.playlists.length; i++) {

          if (this.playlists[i] === playlist) {
            this.playlists.splice(this.playlists.indexOf(playlist), 1);
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
        var newPlaylist = {name: playlist, songs: [], duration: 0, songCount: 0};
        playlist._activate = function() {
          this.activate(playlist);
        };
        playlist._remove = function(playlist) {
          this.remove(playlist);
        };
        this.playlists.unshift(newPlaylist);
      },

      getPlaylists: function() {
        return this.playlists;
      }
    };
  }
};


app.controller('MainController', ['$firebase', '$scope', function($firebase, $scope) {

  $scope.playlists = playlistControllerFactory.create();

  baseRef = new Firebase('https://playlistrapp.firebaseio.com/');
  var playlistsRef = baseRef.child('playlists');

  playlistsRef.on("value", function(snapshot){
    console.log('Firebase data change')
    console.log(snapshot.val());
    var playlistsObj = snapshot.val();
    $scope.playlists.playlists = [];
    for (plHash in playlistsObj) {
      $scope.playlists.addPlaylist(playlistsObj[plHash].name);
    }
    $scope.$apply();
  }, function(error){
    console.log("There has been an error: " + error.code);
  });

  $scope.sendPlToFirebase = function(playlist) {
    playlistsRef.push({name: playlist, songs: []});
  }

  // $scope.getPLFromFirebase = function() {
  //   playlistsRef.$
  // }

  $scope.selectPlaylist = function() {
    console.log("PLAYLIST: ", this);
  };

  $scope.createPlaylist = function(name) {
    $scope.playlists.addPlaylist(name);
    $('.new-pl-name').val('');
  };
}]);

