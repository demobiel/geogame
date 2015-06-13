(function($){

	var pluginName = 'renderMap',
  	document = window.document,
  	defaults = {
    	propertyName: "value"
  	};
  	
  	$.fn[ pluginName ] = function ( options ) {
    	return this.each(function () {
      		if (!$.data( this, 'plugin_' + pluginName ) ) {
        		$.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
      		}
    	});
  	};
  	
	$.fn.renderMap = function (options){
		var wrapper = $( "<div />" );
		var errorHolder = $( "<div />");
		var mapHolder = $( "<div />").height(this.height());
		var map;
		var positionMarker;
        var bounds = new google.maps.LatLngBounds();

        var settings = $.extend({
        	mapOptions : {
    			zoom: 8,
    			disableDefaultUI: true    			
  			},
  			messages: {
  				locating: "We are locating you",
  				geo_notsupported: "Your devices does not support geo-location",
  				geo_denied: "We need your location to activate the gifthunter",
  				geo_timeout: "We are not able to locate you"
  			},
  			geolocation:{
  				enableHighAccuracy: false,
  				maximumAge:0,
  				timeout:10000
  			}
        }, options );
		
		//prepare DOM		
		this.append(wrapper).append(mapHolder).append(errorHolder);
 
 		var closeToMarkerCallback;
 		//callback when close to marker
 		if(settings.closeToMarker){
 			closeToMarkerCallback = true;
 		}
		
		//render user location if requested
		if(settings.showUserLocation){
	    	if (isNavigatorSupported) {
    	    	showMessage(settings.messages.locating);
        		navigator.geolocation.getCurrentPosition(
        			function(position){
        				renderUserLocation(position.coords);
        				destroyMessage();
        			},
        			function(errorCode){
        				
        			
        			},
        			settings.geolocation
        			);
        	}
    	}
    	console.log(settings);
 		if(settings.currentPosition){
 			console.log("render from cache");
 			renderUserLocation(settings.currentPosition);
 		
 		}
 		//watch user position if requested
 		if(settings.watchUserLocation){
	    	if (isNavigatorSupported) {
    	    	showMessage(settings.messages.locating);
        		navigator.geolocation.watchPosition(
        		    function(position){
        				renderUserLocation(position.coords);
        				destroyMessage();
        			},
        			function(errorCode){
        				
        			
        			},
        			settings.geolocation
        			);
        	}
 		
 		}
 		//render markers if specified
 		if(settings.markers != undefined && settings.markers.length > 0){
 			renderMap();
 			settings.markers.forEach(function(marker,index){
 				var icon = "img/locpin.png";
				var pos = new google.maps.LatLng(marker.latitude, marker.longitude);
				g_marker = new google.maps.Marker({
    				position:  pos,
    				icon: icon,
    				draggable: false,
    				map: map
  				});
  				bounds.extend(pos);
 			})
 			map.fitBounds(bounds);
 		}   	
    	
		//***********************
		//	MESSAGE HELPERS		
		//***********************
		function showErrorMessage(message){
			var css = {
				"color": "#ffOOOO",
				"text-align":"center"
			}
			errorHolder.css(css).html(message);
		}

		function showMessage(message){
			var css = {
				"color": "#c3c3c3",
				"text-align":"center"
			}
			errorHolder.css(css).html(message);
		}
		
		function destroyMessage(){
			errorHolder.html("");
		
		}



		//***********************
		//  GEOLOCATION HELPERS
		//***********************
    	function calcScale(accuracy,zoomLevel){
			var scale;
			var pixelSizeAtZoom0 = 0.00000034375 * accuracy;//the size of the icon at zoom level 0
    		var maxPixelSize = 350; //restricts the maximum size of the icon, otherwise the browser will choke at higher zoom levels trying to scale an image to millions of pixels
			var minPixelSize = 10;
	
    		var zoom = map.getZoom();
    		var relativePixelSize = Math.round(pixelSizeAtZoom0*Math.pow(2,zoom)); // use 2 to the power of current zoom to calculate relative pixel size.  Base of exponent is 2 because relative size should double every time you zoom in

    		if(relativePixelSize > maxPixelSize) //restrict the maximum size of the icon
        		relativePixelSize = maxPixelSize;
        
			if(relativePixelSize < minPixelSize)
				relativePixelSize = minPixelSize;
			return relativePixelSize;
		}
		
		function isNavigatorSupported(){
			var supported = navigator.geolocation
			if(!navigator.geolocation)
				showErrorMessage(settings.messages.geo_notsupported);
			
			return navigator.geolocation;
		}
	
		function renderUserLocation(coords){
			renderMap();
			var pos = new google.maps.LatLng(coords.latitude, coords.longitude);
			bounds.extend(pos);
			map.fitBounds(bounds);			
			var scale = calcScale(coords.accuracy,map.getZoom());
			var icon = {
      			path: google.maps.SymbolPath.CIRCLE,
      			scale: scale,
      			fillColor: "#0066FF",
    			fillOpacity: 0.4,
    			strokeColor:"#0066FF",
    			strokeWeight: 2
    		};
    		if(positionMarker === undefined){
				positionMarker = new google.maps.Marker({
    				position:  pos,
    				icon: icon,
    				draggable: false,
    				map: map
  				});
			} else {
  				positionMarker.setPosition(pos);
  				positionMarker.setIcon(icon);
			};
			if ( closeToMarkerCallback && settings.markers ){
				$.each(settings.markers,function(i,v){
					console.log("callback");
					settings.closeToMarker(coords);
				})
			}

		}

		//map render functions
		function renderMap(){
			if(map === undefined){
				map = new google.maps.Map(mapHolder[0],settings.mapOptions);
			}		
		}
		
		//error handler
		function errorGeocoding(error){
			alert("error");	
		}		
		function centerMap(location){
			renderMap();
			map.setCenter(new google.maps.LatLng(34.397, 150.644))
		}
		return this;


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
		
	}

}(jQuery))