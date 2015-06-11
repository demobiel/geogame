define(["DDD/game/Controller","windowController"],function(GameController,WindowController){
		
	start = function Start(){
		//try to load game from disk
		var game;
		game = GameController.load();
		
		if(game === undefined)
			WindowController.renderView("home");
		else
			WindowController.renderView("startGame",game);
	}

	return {
		start: start
	};
})