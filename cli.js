var Menu = require('terminal-menu'); 
//var prompt = require('prompt');
var azgnos = require('./api');
var readline = require('readline');
var menu_init = function(list, cb) {
    var menu = new Menu({ width: 80, x: 4, y: 2 });
    var menu_stream = menu.createStream();
    process.stdin.setRawMode(true);
    process.stdin
        .pipe(menu_stream)
        .pipe(process.stdout);
    menu.reset();
    menu.write('AZGNOS TERMINAL\n');
    menu.write('-------------------------\n');
    list.map(function(item){
        menu.add(item);
    });
    menu.write('-------------------------\n');
    menu.add('EXIT');
    menu.on('select', function(label) {
        menu.on('close', function () {
            process.stdin.setRawMode(false);
            menu_stream.unpipe(process.stdout);
            process.stdin.unpipe(menu_stream);
            if (label === 'EXIT') {
                console.log('See ya!');
            } else {
                cb(label);
            }
        });
        menu.close();
    });
};

menu_init(['SEARCH MUSIC GENRE'], function(label) {
        label_action(label);
});

var label_action = function(label) {
    if (label === 'SEARCH MUSIC GENRE') {
        get_genre();
    }
};

var get_genre = function() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('what is the genre then?\n', function(genre) {
        azgnos.search_station(genre, function(res) {
            if (res.length) {
                var name_list = res.map(function(item){return item.name;});
                menu_init(name_list, function(label) {
                    listen_station(label);
                });
            }
        });
    });
};
