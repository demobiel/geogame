define(["Config","DDD/game/Controller","views/newGame","WindowController"],function(Config,GameController,newGameView,WindowController){
	
	function start(data){
		newGameView.render();
		bindEvents();
	}

	function bindEvents(){
		$("#startgame").unbind();
		$("#startgame").bind("click",function(){newGame()});
	}

	function newGame(){
		
		
		var gamename = $("#gamename").val();
		var levels = [
			{location: [123,234], riddle:"test"},
			{location: [123,234],riddle:"test2"}
		]; 
		
		var game = GameController.new({name:gamename,levels:levels});
		GameController.save(game);
		WindowController.renderView("startGame",game);
		
	}

	return {
		start:start
	}

})