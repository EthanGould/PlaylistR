var app = angular.module('Playlistr', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/playlists/pump-up-tunz', {
      templateUrl: 'scripts/templates/pump-up-tunz.html',
      controller: 'PlaylistsController'
    })
    .when('/playlists/sunday-night-slow-jamz', {
      templateUrl: 'scripts/templates/sunday-night-slow-jamz.html',
      controller: 'PlaylistsController'
    })
    .when('/playlists/workout-music', {
      templateUrl: 'scripts/templates/workout-music.html',
      controller: 'PlaylistsController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

app.controller('PlaylistsController', function(){

  this.playlists = [
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
});
