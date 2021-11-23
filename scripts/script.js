	var mapa; // obiekt globalny
		
	function dodajMarker(opcjeMarkera){
				
		opcjeMarkera.map = mapa; // obiekt mapa jest obiektem globalnym!
		opcjeMarkera.optimized = true;
		opcjeMarkera.draggable = true;
		var marker = new google.maps.Marker(opcjeMarkera);
	}
		
	function mapaStart(){   
		var wspolrzedne = new google.maps.LatLng(53.41935400090768,14.58160400390625);
		var opcjeMapy = {
				zoom: 10,
				center: wspolrzedne,
				mapTypeId: google.maps.MapTypeId.TERRAIN
		};
		mapa = new google.maps.Map(document.getElementById("mapka"), opcjeMapy); 
			
		// wspólne cechy ikon
		var rozmiar = new google.maps.Size(320,265);
		var rozmiar_cien = new google.maps.Size(320,265);
		var punkt_startowy = new google.maps.Point(0,0);
		var punkt_zaczepienia = new google.maps.Point(16,16);

		// ikony
		var ikona1 = new google.maps.MarkerImage("../dino.gif", rozmiar, punkt_startowy, punkt_zaczepienia)
		var cien1 = new google.maps.MarkerImage("../dino.gif", rozmiar_cien, punkt_startowy, punkt_zaczepienia);
			
		// ten marker będzie przesuwalny			
		dodajMarker({position: new google.maps.LatLng(53.4203,14.7011), title: 'Restauracja #1', icon: ikona1, shadow: cien1});
		
	}