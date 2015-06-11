define(['DDD/user/Model'], function(UserModel){
 
   function User(options){
        this.name = options.name || 'Default name';
		//Database.newUser(this);
		
		
    }

	User.createNew = function(options){
		var user = new User(options);
		return user;
	}

	User.prototype = {
		contructor: User
	}
    return User;

});