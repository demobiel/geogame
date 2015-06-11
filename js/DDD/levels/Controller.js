define(['DDD/level/Model'], function(LevelModel){
 
   function Level(options){
        this.name = options.name || 'Default name';
		//Database.newUser(this);		
    }

	Level.createNew = function(options){
		var user = new User(options);
		return user;
	}

	Level.prototype = {
		contructor: Level
	}
    return Level;

});