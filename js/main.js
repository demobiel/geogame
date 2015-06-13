requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-1.11.3.min',
        async: 'requireplugins/async'
    }
});



require([
	'jquery',
	'config',
	'GameController',
	'WindowController'
], function($,Config,Game,WindowController){
	WindowController.renderView("header");
	WindowController.renderView("footer");
	Game.start();
});
