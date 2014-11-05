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
        var songDuration = (t.duration/1000)/60;
        var addDuration = parseFloat(parseFloat(songDuration).toFixed(1));
        playlist.songs.push({track_id: t.id, artist: t.label_name, title: t.title, duration: songDuration, artwork: artwork, track_uri: t.uri});
        playlist.songCount += 1;
        playlist.duration += addDuration;
        console.log(playlist.duration);
        $scope.$apply();
      }, 10);
      console.log(t);
    });
    $('.song-input').val('');
  };
}]);

var showDetails = function() {
  $('.song-details').slideToggle();
};

$(document).ready(function(){
  $(document).on('click', '.song-actions', function(){
    showDetails();
  });
});
