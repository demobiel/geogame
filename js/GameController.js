define(["DDD/game/Controller","WindowController"],function(GameController,WindowController){
		
	start = function Start(){
		//try to load game from disk
		var game;
		game = GameController.load();
		if(game === undefined)
			WindowController.renderView("home");
		else 
			loadCurrentLevel();
	}
	
	verifyLevel = function (data){
		var game = GameController.currentGame;
		var level = game.currentLevel;
		if(level.unlock(data.answer)){
			alert("woehoew");
			playNextLevel();
		} else {
			showErrorMessage("failed");
		}
	}
	
	loadCurrentLevel = function(){
		var game = GameController.currentGame;
		console.log(game);
		GameController.save(game);
		if ( game.currentLevel.type === "riddle" )
			WindowController.renderView("riddleLevel");
		else if ( game.currentLevel.type === "location")
			WindowController.renderView("locationLevel");
	}

	playNextLevel = function(){
		var game = GameController.currentGame;
		var nextLevel = game.getNextLevel();
		if(nextLevel === undefined) 
			endGame()
		else
			loadCurrentLevel();
	}

	playPrevLevel = function(){
		var game = GameController.currentGame;
		var nextLevel = game.getPrevLevel();
		if(nextLevel === undefined) 
			startGame()
		else
			loadCurrentLevel();
	}

	
	function endGame(){
		alert("game is ended");
		WindowController.renderView("home");
	}

	function showErrorMessage(message){
		//alert(message);
	}

	return {
		start: start,
		verifyLevel: verifyLevel,
		playNextLevel: playNextLevel
	};
})