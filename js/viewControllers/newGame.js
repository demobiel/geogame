define(["Config","DDD/game/Controller","views/newGame","WindowController","GameController"],function(Config,GameController,newGameView,WindowController,GameLogic){
	
	function start(data){
		newGameView.render();
		bindEvents();
	}

	function bindEvents(){
		$("#startgame").unbind();
		$("#startgame").bind("click",function(){newGame()});
	}

	function newGame(){
		
		$.get("data/levels.json",function(data){
			var levels = data;
			var game = GameController.new({name:"doeterniettoe",levels:levels,startDate:new Date()});
			GameController.save(game);
			GameLogic.playNextLevel();
		})
	}

	return {
		start:start
	}

})