define(["Config","DDD/game/Controller","views/startGame","WindowController","GameController"],function(Config,GameController,homeGameView,WindowController,GameLogic){
	
	function start(data){
		var game = GameController.currentGame;
		homeGameView.render(game);
		updateInterface(game);
		bindEvents(game);
	}

	function updateInterface(game){
		$("#answer").val("");
		$("#label").html(game.name);
		$("#question").html(game.currentLevel.question);
	}

	function bindEvents(){
		$("#stopgame").unbind();
		$("#stopgame").bind("click",function(){stopGame()});
		$("#verify").unbind();
		$("#verify").bind("click",function(){verifyNextStep()});
	}

	function verifyNextStep(){
		var data = {
			answer: $("#answer").val()
		};
		GameLogic.verifyLevel(data);
	
	}

	function stopGame(){
		GameController.clearDisk();
		WindowController.renderView("home");
	}

	return {
		start:start
	}

})