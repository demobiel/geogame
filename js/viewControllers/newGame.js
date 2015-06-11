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
		
		
		var gamename = $("#gamename").val();
		var levels = [
			{data:"test",type:"riddle",question:"hoe laat is het?"},
			{data:"test2",type:"riddle",question:"hoe gaath et met je."},
			{data:{latitude:50.854975,longitude:4.3753899,distance:10},type:"location",question:"Ga naar de locatie."},
			{data:{latitude:51.034855,longitude:4.459515,distance:10},type:"location",question:"Ga naar de locatie."}
		]; 
		
		var game = GameController.new({name:gamename,levels:levels});
		GameController.save(game);
		GameLogic.playNextLevel();
		
	}

	return {
		start:start
	}

})