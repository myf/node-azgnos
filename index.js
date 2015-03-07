var Songza = require('songza');
var settings = require('./settings');
var songza = new Songza(settings);
var promise = songza.station.nextSong(1411908);
promise.then(function(res) {
    console.log("here I got the result!", res);
    debugger;
});
