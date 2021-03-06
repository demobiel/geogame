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
		$("#stopgame").unbind();
		$("#stopgame").bind("click",function(){stopGame()});
	}

	function stopGame(){
		if(confirm("Bent u zeker dat u wil herbeginnen?")===true){	
			GameController.clearDisk();
			WindowController.renderView("home");
		}


	}

	return {
		start:start
	}

})