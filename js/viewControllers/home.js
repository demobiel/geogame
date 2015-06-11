define(["Config","views/home","WindowController"],function(Config,homeView,WindowController){
	
	function start(data){
		homeView.render();
		bindEvents();
	}

	function bindEvents(){
		$("#newgame").unbind();
		$("#newgame").bind("click",function(){startGame()});
	}

	function startGame(){
		WindowController.renderView("newGame");
	}

	return {
		start:start
	}

})