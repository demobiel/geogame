requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-1.11.3.min',
        async: 'requireplugins/async'
    }
});



require([
	'jquery',
	'Config',
	'GameController',
	'WindowController'
], function($,Config,Game,WindowController){
	WindowController.renderView("header");
	WindowController.renderView("footer");
	var finalDate = new Date ( 2015 , 5 , 13 , 17, 0 , 0);
	if(new Date() < finalDate){
		$(".footer").hide();
		$(".header").hide();
		WindowController.renderView("waitScreen")
	}else 
		Game.start();
});
