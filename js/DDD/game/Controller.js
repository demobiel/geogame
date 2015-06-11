define(['DDD/game/Model','DDD/level/Model'], function(GameModel,LevelModel){
 	Game.currentGame;
	function Game(options){
		options = options || {}
		if(options.levels) var levels = LevelModel.createFromArray(options.levels);
		
		this.name = options.name;
		this.levels = levels;
		this.startDate = new Date(options.startDate) || new Date();
	}
		
	Game.new = function Start(options){
		var game = new Game(options);
		game.currentLevel = game.levels[0];
		game.currentLevelNumber = 0;
		Game.currentGame = game;
		
		return game;
	}

	Game.unlockLevel = function (data,callback){
		var game = Game.currentGame;
		var level = game.currentLevel;
		if(level.riddle === data.answer){
			game.currentLevelNumber++;
			game.currentLevel = game.levels[game.currentLevelNumber];
			console.log("success");
		} else {
			console.log("bummer");
		}
		if(game.currentLevelNumber > game.levels.length)
			game.endGame();
	}

	Game.save = function Save(game){
		localStorage.setItem("game",JSON.stringify(game));
		return game;	
	}

	Game.load = function Load(game){
		game = localStorage.getItem("game");
		if (game != "" && game != undefined)
			game = new Game(JSON.parse(game));
		else
			game = undefined;
			
		if(game.currentLevel === undefined ){
			game.currentLevel = game.levels[0];
			game.currentLevelNumber = 0;
			console.log("what is this");
		}			
		return game;
	}
	
	Game.clearDisk = function Clear(){
		localStorage.setItem("game","");
		return null;
	}
	


	return Game;

});