define(["crud/Database"],function(Database){
    function Level(options){
		/* DEFINE ATTRIBUTES */
        options = options || {};
		
		this.data = options.data || [];
		this.type = options.type || undefined;
		this.question = options.question || undefined;

			
		/* METHODS */
		this.save = save;
		this.unlock = unlock;
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
	 function unlock (data) {
	 	if (this.type === "riddle"){
			return this.data === data;
		} else if ( this.type === "location" ){$
			var d = distance ( data.latitude, data.longitude, this.data.latitude, this.data.longitude, "K" ) 
			console.log(this.data.distance);
			return  d < this.data.distance;
		}
	}
	
	//random helpers
	function distance(lat1, lon1, lat2, lon2, unit) {
		var radlat1 = Math.PI * lat1/180
		var radlat2 = Math.PI * lat2/180
		var radlon1 = Math.PI * lon1/180
		var radlon2 = Math.PI * lon2/180
		var theta = lon1-lon2
		var radtheta = Math.PI * theta/180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist
	}
    return Level;
});