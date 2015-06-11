define(["lib/sql"],function(sql){
    var storageName = "myData";
	var db;

	function initDatabase () {
		if ( window.localStorage.getItem(storageName ) === undefined ){
			db = new sql.Database();		
		} else {
			var str = localStorage.getItem(storageName);
			var	l = str.length,
				arr = new Uint8Array(l);
			for ( var i = 0 ; i < l ; i++ ) arr[i] = str.charCodeAt(i);
			db  = newSQL.Database(arr);
		}
	}

	function saveDatabaseToDisk () {
		var arr = db.export();
	    var uarr = new Uint8Array(arr);
    	var strings = [], chunksize = 0xffff;
	    for (var i=0; i*chunksize < uarr.length; i++){
        	strings.push(String.fromCharCode.apply(null, uarr.subarray(i*chunksize, (i+1)*chunksize)));
    	}
    	localStorage.setItem(storageName,strings.join(''));
	}

	function Database (options) {
		this.save = saveToSqlLite();
	
	}
	
	function newUser (user){
	
	
	}
    return Database;
});