var Songza = require('songza');
var cp = require('child_process');
var util = require('util');
var settings = require('./settings');
var songza = new Songza(settings);
var promise = songza.station.nextSong(1411908);
promise.then(function(res) {
    //console.log("here I got the result!", res);
    console.log("the title is", res.song.title);
    cp.spawn("mplayer", [res.listen_url]);
});
