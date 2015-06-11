define(['DDD/game/Model','DDD/level/Model'], function(GameModel,LevelModel){
 	Game.currentGame;
	Game.currentLocation;
	function Game(options){
		options = options || {}
		if(options.levels) var levels = LevelModel.createFromArray(options.levels);
		this.name = options.name;
		this.levels = levels;
		this.startDate = new Date(options.startDate) || new Date();
		this.currentLevelNumber = options.currentLevelNumber || 0;
		this.currentLevel = options.currentLevel ? new LevelModel(options.currentLevel):undefined

		this.getNextLevel = getNextLevel;
	}
		
	Game.new = function Start(options){
		var game = new Game(options);
		game.currentLevel = game.levels[0];
		game.currentLevelNumber = 0;
		Game.currentGame = game;
		
		return game;
	}
	
	Game.save = function Save(game){
		localStorage.setItem("game",JSON.stringify(game));
		return game;	
	}
	Game.setLocation = function(location){
		Game.currentGame.currentLocation = location;
		Game.currentLocation = location;
		Game.save(Game.currentGame);
	}
	
	Game.load = function Load(game){
		var game = localStorage.getItem("game");
		if (game != "" && game != undefined)
			game = new Game(JSON.parse(game));
		else
			return game = undefined;
		
		if(game.currentLevel === undefined ){
			game.currentLevel = game.levels[0];
			game.currentLevelNumber = 0;
		}		
		Game.currentGame = game;
		Game.currentLocation = game.currentLocation;
		console.log(game);
		return game;
	}
	
	Game.clearDisk = function Clear(){
		localStorage.setItem("game","");
		return null;
	}
	
	function getNextLevel(){
		this.currentLevelNumber ++;
		this.currentLevel = this.levels[this.currentLevelNumber - 1];
		return this.currentLevel;
	}

	function getPrevLevel(){
		this.currentLevelNumber --;
		this.currentLevel = this.levels[this.currentLevelNumber - 1];
		return this.currentLevel;
	}

	return Game;

});