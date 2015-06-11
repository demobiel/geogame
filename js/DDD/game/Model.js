define(["crud/Database"],function(Database){
    function User(options){
        this.name = options.name || 'Default name';
		//Database.newUser(this);
		
		
		this.newUser = function(){console.log("model will now create new user")} 
    }

	function saveUser(user){
		Database.saveUser(user);
	}

    return User;
});