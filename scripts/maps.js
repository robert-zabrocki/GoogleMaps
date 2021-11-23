/******************************************************************************************************
	ikkona markera.
	zadaniem procedury jest wytworzenie ikony markera obiektu na podstawie jego właściwości.
******************************************************************************************************/
	function markerIcon(in_object, in_ratio){
		
		var anchor_nw = new google.maps.Point(parseInt(11*in_ratio),parseInt(11*in_ratio));
		var anchor_ne = new google.maps.Point(parseInt(283*in_ratio),parseInt(11*in_ratio));
		var anchor_se = new google.maps.Point(parseInt(283*in_ratio),parseInt(43*in_ratio));
		var anchor_sw = new google.maps.Point(parseInt(11*in_ratio),parseInt(43*in_ratio));
		var anchors = [anchor_nw, anchor_ne, anchor_se, anchor_sw];
		
		var st_colors_0 = ["grey", "grey", "black", "white"];					// kolejność: r2_fillcolor, c2_fill_color, stroke_color, font_color
		var st_colors_1 = ["orange", "orange", "orange", "white"];				// kolejność: r2_fillcolor, c2_fill_color, stroke_color, font_color
		var st_colors_2 = ["white", "orange", "orange", "orange"];				// kolejność: r2_fillcolor, c2_fill_color, stroke_color, font_color
		var st_colors_3 = ["darkgreen", "darkgreen", "darkgreen", "white"];		// kolejność: r2_fillcolor, c2_fill_color, stroke_color, font_color
		var st_colors_4 = ["darkgreen", "darkgreen", "darkgreen", "white"];		// kolejność: r2_fillcolor, c2_fill_color, stroke_color, font_color
		var st_colors_5 = ["white", "darkgreen", "darkgreen", "darkgreen"];		// kolejność: r2_fillcolor, c2_fill_color, stroke_color, font_color
		var st_colors_6 = ["red", "red", "red", "white"];						// kolejność: r2_fillcolor, c2_fill_color, stroke_color, font_color
		var st_colors_7 = ["white", "red", "red", "red"];						// kolejność: r2_fillcolor, c2_fill_color, stroke_color, font_color
		var st_colors = [st_colors_0, st_colors_1, st_colors_2, st_colors_3,
						 st_colors_4, st_colors_5, st_colors_6, st_colors_7];
		
		var st_color = 0;
		switch (in_object.st){
			case 0:
			case 3:
				st_color = in_object.st;
				break;
			case 1:
			case 4:
			case 6:
				st_color = in_object.st //+ in_object.anim;
				break;
		}
		
		var svg = szablony[in_object.tmpl].replace(/{{name}}/g, in_object.lbl);
			svg = svg.replace(/{{r2_fill_color}}/g, st_colors[st_color][0]);
			svg = svg.replace(/{{c2_fill_color}}/g, st_colors[st_color][1]);
			svg = svg.replace(/{{stroke_color}}/g, st_colors[st_color][2]);
			svg = svg.replace(/{{font_color}}/g, st_colors[st_color][3]);
		
		var result = {   url:'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
					  anchor:anchors[in_object.tmpl]};
		return result;
	}

/******************************************************************************************************
	wprowadzenie markerów na mapę.
	zadaniem procedury jest umieszczenie na mapie symboli reprezentujących poszczególne pompownie.
	informacje o pompowiach umieszczone są w strukturze "markers".
******************************************************************************************************/	
	function addMarkersToMap(mapToAddTo){
		
		for(var i=0; i<objects.length; i++){
			var icon = markerIcon(objects[i], ratio);
			var markerOptions = {position: {lat: objects[i].lat, lng: objects[i].lng},
									  map: mapToAddTo,
                                    title: objects[i].lbl,
									  url: FindUrl(i),
                                     icon: icon,
				                optimized: false};
			var marker = new google.maps.Marker(markerOptions);
			marker.addListener('click', function(){window.location.href = this.url;})
			markers.push(marker);
		}
	}
	
/******************************************************************************************************
	reakcja na kliknięcie lewym przyciskiem myszy na markerze.
	zadaniem procedury jest przeniesienie użytkownika do podstrony przedstawiającej obiektu
	reprezentowany przez marker.
******************************************************************************************************/
	function FindUrl(id){
		return "http://" + ip_adrs + "/" + objects[id].href + "/panel.htm";
	}

/******************************************************************************************************
	wprowadzenie markerów na mapę.
	zadaniem procedury jest umieszczenie na mapie symboli reprezentujących poszczególne pompownie.
	informacje o pompowiach umieszczone są w strukturze "markers".
******************************************************************************************************/
	function updateMarkers(){
		
		var msg = "robak";
		//var panel = document.getElementById("panel");
		
		for(var i=0; i<objects.length; i++){
			if(objects[i].st != objects[i].new_st){
				try{
					objects[i].st = objects[i].new_st;
					var new_icon = markerIcon(objects[i], ratio);
					markers[i].setIcon(new_icon);
					
					msg = "objects[0].new_st = " + objects[0].new_st;
				}catch(e){
					msg = "Error = " + e.Error;
				}
			}
		}
		
		//panel.innerHTML = msg;
	}
	
/******************************************************************************************************
	animacja markerów.
	zadaniem procedury jest animowanie markerów podczas pracy pompowni lub podczas jej awarii.
******************************************************************************************************/
	function animateMarkers(){
		
		for(var i=0; i<objects.length; i++){
			
			switch (objects[i].st){
				case 1:
				case 4:
				case 6:
					var new_icon = markerIcon(objects[i], ratio);
					markers[i].setIcon(new_icon);
		
					if(objects[i].anim == 0){objects[i].anim = 1;}
					else{objects[i].anim = 0;}
					
					break;
			}
			
		}

		setTimeout(animateMarkers, 500);
	}

/******************************************************************************************************
	procedura główna.
	zadaniem procedury jest wygenerowanie mapy.
******************************************************************************************************/						
	function initMap(){

		var mapOptions = {           center: {lat:53.320004, lng:14.962713},
					                   zoom: 12,
					              mapTypeId: google.maps.MapTypeId.TERRAIN,
					         mapTypeControl: false,
					      streetViewControl: false};
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		
		// wprowadzenie markerów na mape.
		//addMarkersToMap(map);
	}

/******************************************************************************************************
	procedura obsługi zdarzenia.
	procedura wywoływana po wystąpieniu zdarzenia "onClick" przycisku "ALARMY". W wyniku wywołania
	na ekranie przeglądarki powinna pojawić się strona generująca raporty alarmów.
******************************************************************************************************/	
	function fncRaportAlarmy(){
		window.location.href = "http://" + ip_adrs + "/pg1view_rpt/panel.htm";
	}
	
/******************************************************************************************************
	procedura obsługi zdarzenia.
	procedura wywoływana po wystąpieniu zdarzenia "onClick" przycisku "RAPORTY". W wyniku wywołania
	na ekranie przeglądarki powinna pojawić się strona generująca trendy.
******************************************************************************************************/	
	function fncRaportTrendy(){
		window.location.href = "http://" + ip_adrs + "/raport_trendy/panel.htm";
	}

/******************************************************************************************************
	procedura obsługi zdarzenia.
	procedura wywoływana po wystąpieniu zdarzenia "onClick" przycisku "SMS". W wyniku wywołania
	na ekranie przeglądarki powinien pojawić się panel umożliwiający modyfikację ustawień związanych
	z numerami telefonów, na które wysyłane sa SMS'y alarmowe.
******************************************************************************************************/	
	function fncHideSmsPanel(){
		var sms_panel    = document.getElementById("phones-container");
		var phones_panel = document.getElementById("phone-numbers");

		if(sms_panel.style.visibility == "visible"){
			sms_pnl_visible            = 0;
			sms_panel.style.visibility = "hidden";}
		else{
			phones_panel.innerHTML     = createDiv();
			sms_pnl_visible            = 1;	
			sms_panel.style.visibility = "visible";
		}
	}

/******************************************************************************************************
	procedura obsługi zdarzenia.
	procedura wywoływana po wystąpieniu zdarzenia "onClick" przycisków "OK" i "Anuluj". W wyniku
	wywołania panel powinien zniknąć z ekranu. dodatkowo (po naciśnięciu "OK") powinna zostać
	zeinicjowana transmisja do serwera.
******************************************************************************************************/
	function fnbBtnPressed(action){
		var sms_panel    = document.getElementById("phones-container");
		
		switch(action){
			case 0:
				sms_pnl_visible = 0;
				sms_panel.style.visibility = "hidden";
				break;
			case 1:
				writing = 1;
				fncAjax();
				sms_pnl_visible = 0;
				sms_panel.style.visibility = "hidden";
				break;
		}

	}

/******************************************************************************************************
	funkcja buduje zawartość elementu <div> o nazwie "phone-numbers".
******************************************************************************************************/	
	function createDiv(){
		var result = "";
		var single_line = "";

		for(var i=0; i<5; i++){
			single_line = line_states[blocades[i]];
			single_line = single_line.replace(/{{cb_value}}/g, i+"");
			single_line = single_line.replace(/{{phone_id}}/g, (i+1)+".");
			single_line = single_line.replace(/{{phone_number}}/g, fncStylizePhone(""+phones[i]));
			result = result + single_line;
		}

		return result;
	}

/******************************************************************************************************
	obsługa zdarzenia "onClick" elementów CheckBox.
******************************************************************************************************/	
	function fncCheckBoxClicked(cb){
		var phones_panel = document.getElementById("phone-numbers");
		var cb_value     = cb.value;

		if(cb.checked) blocades[cb_value] = 1;
		else blocades[cb_value] = 0;

		phones_panel.innerHTML = createDiv();

	}

/******************************************************************************************************
	odczytanie nowych parametrów telefonów alarmowych po naciśnięciu przycisku "OK".
******************************************************************************************************/
	function fncSmsNews(){
		var result = 0;

		if(blocades[0] == 1) result = result + 1;
		if(blocades[1] == 1) result = result + 2;
		if(blocades[2] == 1) result = result + 4;
		if(blocades[3] == 1) result = result + 8;
		if(blocades[4] == 1) result = result + 16;

		return result;
	}

/******************************************************************************************************
	zadaniem funkcji jet nadanie numerowi telefonu formy: +49 xxx yyy zzz.
******************************************************************************************************/	
	function fncStylizePhone(phone){
		var result = "";

		if(phone == 0) result = "000 000 000";
		else{
			result = phone.substring(0, 3) + " " +
				 	 phone.substring(3, 6) + " " +
				 	 phone.substring(6);
		}

		return "+48 "+result;
	}