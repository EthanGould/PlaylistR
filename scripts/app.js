var app = angular.module('Playlistr', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/playlists/:name', {
      controller: 'PlaylistsController',
      templateUrl: function(params){ return 'scripts/templates/' + params.name + '.html'}
    })
    .when('/playlist/new', {
      templateUrl: 'scripts/templates/new-playlist.html',
      controller: 'PlaylistsController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

// app.directive('conversation', function(){
//   return {
//     restrict: 'E',
//     templateUrl: 'scripts/templates/convo.html'
//   };
// });

app.controller('PlaylistsController', ['$scope', function($scope) {

  $scope.playlists = [
    {id: 0, name: 'Pump Up Tunz', link: 'pump-up-tunz',songs: [
        {artist: 'Wiz Khalifa', title: 'Black and Yellow'},
        {artist: 'Mac Miller', title: 'Frozen Pizza and Koolaid'}
      ]
    },
    {id: 1, name: 'Sunday Night Slow Jamz', link: 'sunday-night-slow-jamz',songs: [
        {artist: 'Michael Jackson', title: 'Thriller'},
        {artist: 'Outkast', title: 'Mrs. Jackson'}
      ]
    },
    {id: 3, name: 'Workout Music', link: 'workout-music',songs: [
        {artist: 'Emeniem', title: 'Collapse'},
        {artist: '50 Cent', title: 'Heat'}
      ]
    }
  ];

  this.setPlaylist = function() {
    alert("happy day");
  };

}]);
