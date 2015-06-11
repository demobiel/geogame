define([
	"Config",
	"DDD/game/Controller",
	"views/startGame",
	"WindowController",
	"GameController",
	"async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCSLxYlIVrorTM_2xFbgeoKCEYW-GxnmO4&sensor=false",
	"lib/jquery-render_map"],function(Config,GameController,homeGameView,WindowController,GameLogic){
	
	function start(data){
		var game = GameController.currentGame;
		homeGameView.render(game);
		updateInterface(game);
		bindEvents(game);
	}

	function updateInterface(game){
		$("#map").html("");
		var level = game.currentLevel
		$("#map").renderMap({
			watchUserLocation:true,
			showUserLocation:true,
			currentPosition:GameController.currentLocation,
			markers:[{
				latitude:level.data.latitude,
				longitude:level.data.longitude
			}],
			closeToMarker:function(coords){
					GameController.setLocation(coords);
					GameLogic.verifyLevel({answer:{
								latitude:coords.latitude,
								longitude:coords.longitude
							}});
					}
		})
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
		GameLogic.verifyLevel(data);
	
	}

	function stopGame(){
		GameController.clearDisk();
		WindowController.renderView("home");
	}

	return {
		start:start
	}

})