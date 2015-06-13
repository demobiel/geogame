define(["Config","views/waitScreen","WindowController","GameController","js/lib/jquery.countdown.min.js"],function(Config,homeGameView,WindowController,GameLogic){
	
	function start(data){
		updateInterface();

	}

	function updateInterface(game){
		var finalDate = new Date ( 2015 , 5 , 13 , 17, 0 , 0);
		 $('#clock').countdown(finalDate)
			.on('update.countdown', function(event) {
				var str =  event.offset.days === 0 ? '%H:%M:%S' : '%D %!d:dag,dagen; %H:%M:%S';
				$(this).html(event.strftime(str));
				})
			.on('finish.countdown', function(event) {
					WindowController.renderView("home");
				});
	}

	function bindEvents(){

	}

	return {
		start:start
	}

})