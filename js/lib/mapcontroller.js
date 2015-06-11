(function($){

	var pluginName = 'renderMap',
  	document = window.document
	var options;
	var settings = $.extend({
        mapOptions : {
    		zoom: 8    			
  		},
  		messages: {
  			locating: "We are locating you",
  			geo_notsupported: "Your devices does not support geo-location",
  			geo_denied: "We need your location to activate the gifthunter",
  			geo_timeout: "We are not able to locate you"
  		},
  		geolocation:{
  			enableHighAccuracy: true,
  			maximumAge:0,
  			timeout:1
  		}
    }, options );

	$.fn[ pluginName ] = function ( options ) {
    	return this.each(function () {
      		if (!$.data( this, 'plugin_' + pluginName ) ) {
        		$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
      		}
    	});
  	};

	var id;
	var map;

	//map render functions
	function initMap(id){
		console.log("map initator");

		if(map === undefined){
			map = L.map(id).setView([51.505, -0.09], 13);
			L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 18,
			center:[51.505, -0.09],
			id: 'examples.map-i875mjb7',
		}).addTo(map);
		}		
	}

	//functions for geolocation
	function onLocationFound(e) {
		var radius = e.accuracy / 2;

		L.marker(e.latlng).addTo(map)
				.bindPopup("You are within " + radius + " meters from this point").openPopup();
		L.circle(e.latlng, radius).addTo(map);
	}

	function onLocationError(e) {
		alert(e.message);
	}

	$.fn.renderMap = function (options){
		initMap(id);
		console.log(this.attr("id"));
	}
	
	$.fn.showUserLocation = function (options){$
		id = this.attr("id");
		initMap(id);
		map.on('locationfound', onLocationFound);	
		map.on('locationerror', onLocationError);		
		map.locate({setView: true, maxZoom: 16, watch:true,enableHighAccuracy:true});
	}
	

}(jQuery))


/*
	var map = L.map('map').setView([51.505, -0.09], 13);


		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 18,
			center:[51.505, -0.09],
			id: 'examples.map-i875mjb7',
		}).addTo(map);

		function onLocationFound(e) {

			var radius = e.accuracy / 2;



			L.marker(e.latlng).addTo(map)

				.bindPopup("You are within " + radius + " meters from this point").openPopup();



			L.circle(e.latlng, radius).addTo(map);


		}



		function onLocationError(e) {

			alert(e.message);

		}


		map.on('locationfound', onLocationFound);	
		map.on('locationerror', onLocationError);

		map.on('load',function(e){
			alert("loaded");
			$("#map").removeClass("nodisplay");

		})

		map.locate({setView: true, maxZoom: 16, watch:true,enableHighAccuracy:true});
*/