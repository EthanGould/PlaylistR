var app = angular.module('Playlistr', []);

app.controller('PlaylistsController', function(){

  this.playlists = [
    {name: 'Pump Up Tunz', songs: [
        {artist: 'Wiz Khalifa', title: 'Black and Yellow'},
        {artist: 'Mac Miller', title: 'Frozen Pizza and Koolaid'}
      ]
    },
    {name: 'Sunday Night Slow Jamz', songs: [
        {artist: 'Michael Jackson', title: 'Thriller'},
        {artist: 'Outkast', title: 'Mrs. Jackson'}
      ]
    },
    {name: 'Workout Music', songs: [
        {artist: 'Emeniem', title: 'Collapse'},
        {artist: '50 Cent', title: 'Heat'}
      ]
    }
  ];
});
