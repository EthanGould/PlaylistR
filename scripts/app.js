var app = angular.module('Playlistr', []);

app.controller('PlaylistsController', function(){

  this.songs = [
    {artist: 'Wiz Khalifa', title: 'Black and Yellow'},
    {artist: 'Mac Miller', title: 'Frozen Pizza and Koolaid'},
    {artist: 'Michael Jackson', title: 'Thriller'},
    {artist: 'Outkast', title: 'Mrs. Jackson'}
  ];

});
