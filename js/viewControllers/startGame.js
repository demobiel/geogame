define(["Config","DDD/game/Controller","views/startGame","WindowController"],function(Config,GameController,homeGameView,WindowController){
	
	function start(data){
		homeGameView.render();
		updateInterface(data);
		bindEvents(data);
	}

	function updateInterface(data){
		$("#label").html(data.name);
	
	}

	function bindEvents(){
		$("#stopgame").unbind();
		$("#stopgame").bind("click",function(){stopGame()});
		$("#verify").unbind();
		$("#verify").bind("click",function(){verifyNextStep()});
	}

	function verifyNextStep(){
		var data = {
			answer: $("#answer").val()
		};
		GameController.unlockLevel(data);
	
	}

	function stopGame(){
		GameController.clearDisk();
		WindowController.renderView("home");
	}

	return {
		start:start
	}

})