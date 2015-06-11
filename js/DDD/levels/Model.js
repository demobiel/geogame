define(["crud/Database"],function(Database){
    function Level(options){
		/* DEFINE ATTRIBUTES */
        options = options || {};
		
		this.location = options.location || [];
		this.riddle = options.riddle || undefined;
			
			
		/* METHODS */
		this.save = function(){save()};
    }
	
	Level.verify = function(data) {
		console.log("save level");
	}
	
	Level.createFromArray = function (levels){
		var result = [];
		$.each(levels,function(i,data){
			var level = new Level(data);
			result.push(level);
		})
		return result;
	}
	
	function save(){
		console.log("object save")
	}
	

    return Level;
});