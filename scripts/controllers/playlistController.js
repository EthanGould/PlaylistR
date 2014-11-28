angular.module('Playlistr')

.controller('PlaylistContentController', ['PlaylistData', '$firebase', '$scope', function(PlaylistData, $firebase, $scope) {
  var ref = new Firebase('https://playlistrapp.firebaseio.com/');
  var clientId = '22aa56e479e5b0a4968c22120c32bde8';
  var plData = PlaylistData;

  SC.initialize({
    client_id: clientId,
  });

  $scope.getSong = function(track_url, playlist) {
    SC.get('/resolve', { url: track_url }, function(t) {
      var artwork = t.artwork_url;
      var defaultArtwork = 'http://findnewjams.com/frontend/img/default-album-art.png';
      if (t.artwork_url === null) {
        artwork = defaultArtwork;
      }
      var currentPl = plData.getCurrent();
      var songDuration = (t.duration/1000)/60;
      var songDuration = parseFloat(parseFloat(songDuration).toFixed(1));
      var newSong = {track_id: t.id,
        artist: t.label_name,
        title: t.title,
        duration: songDuration,
        artwork: artwork,
        track_uri: t.uri,
        download_count: t.download_count,
        comment_count: t.comment_count,
        favorite_count: t.favoritings_count
      };
      // playlist.songs.push(newSong);
      // playlist.songCount += 1;
      // playlist.duration += songDuration;
      // $scope.$apply();
      // sendSongToFirebase(newSong);
      sendSongToFirebase(newSong,currentPl);
    });
    $('.song-input').val('');
  };

  var sendSongToFirebase = function(song, playlist) {
    console.log(playlist.$id)
    var singlePl = $firebase(ref.child('playlists/'+playlist.$id+'/songs')).$asArray();
    singlePl.$add(song);
    updatePlStats(playlist);
  }

  var updatePlStats = function(playlist) {
    var singlePl = $firebase(ref.child('playlists/'+playlist.$id)).$asArray();
    // for (var song in singlePl.songs)
    var stats = ['duration', 'download_count', 'comment_count', 'favorite_count'];
    for (var songObj in playlist.songs) {
      for (var i = 0; i < stats.length; i++) {
        console.log(playlist.songs[songObj]);
      }
    }
    debugger;
  }

  $scope.removeSong = function(song, playlist) {
    console.log(song, playlist);
    playlist.songs.splice(playlist.songs.indexOf(song), 1);
    playlist.duration -= song.duration;
    playlist.songCount -= 1;
  }
}]);

var showDetails = function(song) {
  song.parents('.sent-message').siblings('.song-extras').slideToggle();
};

$(document).ready(function(){
  $(document).on('click', '.song-actions', function(){
    showDetails($(this));
  });
});
