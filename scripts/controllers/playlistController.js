angular.module('Playlistr')

.controller('PlaylistContentController', ['$scope', function($scope) {
  var clientId = '22aa56e479e5b0a4968c22120c32bde8';
  SC.initialize({
    client_id: clientId
  });

  $scope.addSong = function(track_url, playlist) {
    SC.get('/resolve', { url: track_url }, function(t) {
      var artwork = t.artwork_url;
      var defaultArtwork = 'http://findnewjams.com/frontend/img/default-album-art.png';
      if (t.artwork_url === null) {
        artwork = defaultArtwork;
      }
      setTimeout( function(){
        playlist.songs.push({track_id: t.id, artist: t.label_name, title: t.title, artwork: artwork, track_uri: t.uri});
        $scope.$apply();
      }, 10);
      console.log(t);
      console.log(playlist.songs[playlist.songs.length-1]);
    });
    $('.song-input').val('');
  };
}]);
