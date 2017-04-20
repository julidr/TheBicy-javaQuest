function myMap() {
		//console.log('myMap: Run');
		var latitude;
		var longitude;
		if (typeof navigator.geolocation == 'object'){
			navigator.geolocation.getCurrentPosition(function (p) {
				//console.log("posición: " + p.coords.latitude);
				latitude=p.coords.latitude;
				longitude=p.coords.longitude;
				var mapCanvas = document.getElementById("map");
				var myCenter= new google.maps.LatLng(latitude, longitude);
				
				var mapOptions = {
				    center: myCenter,
				    zoom: 18,
				};
				
			    var map = new google.maps.Map(mapCanvas, mapOptions);
				
				google.maps.event.addListener(map, "bounds_changed", function(){
				   //console.log(map.getBounds());
				});
				
				var marker= new google.maps.Marker({
				  	position: myCenter,
				   	draggable:false,
				});
				
				var marker2= new google.maps.Marker({
				   	position: myCenter,
				   	draggable: true,
				});
				
				marker.setMap(map);
				marker2.setMap(map);
				var marker2Position;
				
				google.maps.event.addListener(map,"click", function(event){
				   	marker2.setPosition(event.latLng);
				   	marker2Position=marker2.getPosition()+"";
				   	marker2PositionFinal=marker2Position.substring(1,marker2Position.length-1); 
				   	var positionArr=marker2PositionFinal.split(",");
				   	document.getElementById("latitudes").innerHTML = 'Latitud: '+positionArr[0]+', Longitud: '+positionArr[1];
					var origin = new google.maps.LatLng(latitude,longitude);       
				    var destination = new google.maps.LatLng(positionArr[0],positionArr[1]);
				    var service = new google.maps.DistanceMatrixService();
				    
				    service.getDistanceMatrix({
							origins: [origin],
						    destinations: [destination],
							travelMode: google.maps.TravelMode.DRIVING,            
							unitSystem: google.maps.UnitSystem.METRIC,
							durationInTraffic: true,
							avoidHighways: false,
							avoidTolls: false
						}, 
						response_data
					);

					function response_data(responseDis, status) {
					    if (status !== google.maps.DistanceMatrixStatus.OK || status != "OK"){
					        console.log('Error:', status);
					        //alert(status);
					    }else{
					    	Materialize.toast('Distancia: '+responseDis.rows[0].elements[0].distance.text, 2000);
					        //console.log(responseDis.rows[0].elements[0].distance.text);
					        var datos = responseDis.rows[0].elements[0].distance.text.split(" ");
					   		guardarDistancia(datos[0].replace(",","."), datos[1]);
					   		encontrarMejorBicycleta();
					    }
					}
				});
				document.getElementById("ht2").innerHTML = ('Latitud: '+p.coords.latitude+', '+'Longitud: '+p.coords.longitude+"<br>");
			});
		};
	}