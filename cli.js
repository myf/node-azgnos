var Menu = require('terminal-menu');
var prompt = require('prompt');
var azgnos = require('./api');
var menu = Menu({ width: 80, x: 4, y: 2 });
var menu_init = function(menu) {
    menu.reset();
    menu.write('AZGNOS TERMINAL\n');
    menu.write('-------------------------\n');
};
menu_init(menu);
menu.add('SEARCH MUSIC GENRE');
menu.add('EXIT')
 
var label_action = function(label, menu) {
    if (label === 'SEARCH MUSIC GENRE') {
        prompt.get(["genre"], function(err, data) {
            azgnos.search_station(data['genre'], function(res) {
                if (res.length) {
                    var name_list = res.map(function(item){return item.name});
                    menu_init(menu);
                    name_list.map(function(item){
                        menu.add(item);
                    });
                }
            })
        })
    };
};

menu.on('select', function (label) {
    if (label === 'EXIT') {
        console.log('See ya!');
        menu.close();
    } else {
        label_action(label, menu);
    }
});
process.stdin.pipe(menu.createStream()).pipe(process.stdout);

 
process.stdin.setRawMode(true);
menu.on('close', function () {
    process.stdin.setRawMode(false);
    process.stdin.end();
});
