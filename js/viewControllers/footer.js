define(["Config","DDD/game/Controller","views/startGame","WindowController","GameController"],function(Config,GameController,homeGameView,WindowController,GameLogic){
	
	function start(data){
		var game = GameController.currentGame;
		homeGameView.render();
		updateInterface();
		bindEvents();
	}

	function updateInterface(){	
	}

	function bindEvents(){
		$("#skipLevel").unbind();
		$("#skipLevel").bind("click",function(){skipGame()});
	}

	function skipGame(){
		GameLogic.playNextLevel();
	}

	return {
		start:start
	}

})