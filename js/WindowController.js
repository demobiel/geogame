define(["Config"],function(Config){

	function renderView (view,data) {
		//hide everything
		$(".view").hide();
		$("#" + view ).show();
		loadController(view,data);
	}

	function loadController(controllerName,data){
		require(['viewControllers/'+ controllerName], function(controller){
			controller.start(data);
		});
	}
	
	return {
		renderView:renderView
	}
})