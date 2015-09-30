var createMenu = require('simple-terminal-menu'); 
var azgnos = require('./api');
var readline = require('readline');
var main_menu = function() {
    var menu = createMenu({
        x: 4,
        y: 2
    });
    menu.writeLine('AZGNOS TERMINAL');
    menu.writeSeparator();
    menu.add('SEARCH MUSIC GENRE', get_genre);
    menu.writeSeparator();
    menu.add('EXIT', function() {
        console.log('See ya');
        menu.close();
    });
         
};

var menu_template = function(list, cb) {
    var menu = createMenu({
        x: 4,
        y: 2
    });
    menu.writeLine('AZGNOS TERMINAL');
    menu.writeSeparator();
    list.map(function(item) {
        menu.add(item, cb);
    });
    menu.writeSeparator();
    menu.add('EXIT', function() {
        console.log('See ya');
        menu.close();
    });
         
};

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
                menu_template(name_list, function(label) {
                    console.log(label);
                    listen_station(label);
                });
            }
        });
    });
};

main_menu();
