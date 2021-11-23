/******************************************************************************************************
	utworzenie obiektu komunikacyjnego.
	zadaniem procedury jest utworzenie obiektu komunikacyjnego w zależności od tego jaka
	przeglądarka jest używana.
******************************************************************************************************/
	function getXMLHttpRequest(){
		var request;
    
		try{
			request = new XMLHttpRequest();
		}
		catch(err1){
			try{
				request = new ActiveXObject('Msxml2.XMLHTTP');
			}
			catch(err2){
				try{
					request = new ActiveXObject('Microsoft.XMLHTTP');
				}
				catch(err3){
					request = false;
				}
			}
		}
		
		return request;
	}  

/******************************************************************************************************
	procedura obsługi zdarzenia "onreadystatechange" obiektu komunikacyjego.
	w procedurze tej następuje odczytanie zmiennych z pliku XML i na ich podstawie zakualizowanie
	wyglądu markerów na mapie.
******************************************************************************************************/
	function processResponse(){
		var comm_pnl = document.getElementById("comm-panel");
		var msg = "Status komunikacji: ";
				
		if (httpReq.readyState == 4){
			if (httpReq.status == 200){
				var txt_0;
				var txt_1;

				msg = httpReq.responseText;

				try{
					txt_0 = httpReq.responseXML.getElementsByTagName("value")[0].childNodes[0].nodeValue;
					txt_1 = httpReq.responseXML.getElementsByTagName("value")[1].childNodes[0].nodeValue;
					if(objectNewStates(parseInt(txt_0), parseInt(txt_1))) updateMarkers();	// uaktualnienie wyglądu markerów
					if(!sms_pnl_visible) fncSMS(httpReq);	//	zarządzanie alarmowymi numerami telefonów
				}
				catch(e){
					txt_0 = e.Error;
					msg = msg + e.Error + '\n';
				}
				//tresc.innerHTML = "Komunikat: txt_0 = " + txt_0 + "\n" + ", Komunikat: txt_1 = " + txt_1;
				//comm_up.innerHTML = '<img src="images/comm_green.png" width="56" height="10"/>';
				//comm_down.innerHTML = '<img src="images/comm_green.png" width="56" height="10"/>';
			}
		}else{
			msg = msg + "Error.";
		}

		//comm_pnl.innerHTML = msg;
}	

/******************************************************************************************************
	stany pompowni.
	zadaniem procedury jest wydobycie stanów poszczególnych pompowni zaszytych w zmiennych
	z pliku XML.
******************************************************************************************************/	
	function objectNewStates(fstGrp, secGrp){
		var msg = "";
		var test = 0;
		var maska = 7;
		var divider = 1;
		var result = false;
		var panel = document.getElementById("panel");
		
		// wyodrębnienie pierwszej grupy
		for(var i=0; i<10; i++){
			try{
				test = (fstGrp & maska)/divider;
				objects[i].new_st = test;
				if(objects[i].st != objects[i].new_st){result = true;}
				
				maska = 8*maska;
				divider = 8*divider;
				
				msg = "objects[0].new_st = " + objects[i].new_st;
			}catch(e){
				msg = "error = " + e.Error;
			}
		}
		
		// wyodrębnienie drugiej grupy
		test = 0;
		maska = 7;
		divider = 1;
		for(var i=0; i<10; i++){
			try{
				test = (secGrp & maska)/divider;
				objects[10+i].new_st = test;
				if(objects[10+i].st != objects[10+i].new_st){result = true;}
				
				maska = 8*maska;
				divider = 8*divider;
				
				msg = "objects[0].new_st = " + objects[10+i].new_st;
			}catch(e){
				msg = "error = " + e.Error;
			}
		}
		
		//panel.innerHTML = msg;
		
		return result;
	}

/******************************************************************************************************
	procedura odczytująca numery telefonów alarmowych i ich blokad.
	zadaniem procedury jest wprowadzenie numerów telefonów do tablicy "phones" oraz blokad
	telefonów do tablicy "blocades".
******************************************************************************************************/
	function fncSMS(req){

		phones[0] = req.responseXML.getElementsByTagName("value")[2].childNodes[0].nodeValue;
		phones[1] = req.responseXML.getElementsByTagName("value")[3].childNodes[0].nodeValue;
		phones[2] = req.responseXML.getElementsByTagName("value")[4].childNodes[0].nodeValue;
		phones[3] = req.responseXML.getElementsByTagName("value")[5].childNodes[0].nodeValue;
		phones[4] = req.responseXML.getElementsByTagName("value")[6].childNodes[0].nodeValue;
		
		var tBlk = req.responseXML.getElementsByTagName("value")[7].childNodes[0].nodeValue;

		if((tBlk&1)>0) blocades[0] = 1;
		else blocades[0] = 0;

		if((tBlk&2)>0) blocades[1] = 1;
		else blocades[1] = 0;

		if((tBlk&4)>0) blocades[2] = 1;
		else blocades[2] = 0;

		if((tBlk&8)>0) blocades[3] = 1;
		else blocades[3] = 0;

		if((tBlk&16)>0) blocades[4] = 1;
		else blocades[4] = 0;
	}

/******************************************************************************************************
	procedura główna.
	zadaniem procedury jest jednorazowe sprowadzenie danych XML z serwera.
******************************************************************************************************/				
	function fncAjax(){
		//var comm_pnl = document.getElementById("comm-panel");

		httpReq = getXMLHttpRequest();
		httpReq.onreadystatechange = processResponse;
			
		if(!writing){	
			httpReq.open("GET", "http://" + ip_adrs + "/gmaps_data/data.xml?fmt=full", true);
			httpReq.send(null);
		}else{
			writing = 0;

			httpReq.open("POST", 'http://' + ip_adrs + '/gmaps_data/data.xml?fmt="full"', true);
			httpReq.setRequestHeader("Content-Type", "text/xml");

			/*var xml_text = ['<?xml version="1.0" encoding="UTF-8"?>',
						'<pm>',
						'<data fmt="full">',
						'<item><name>fstGrp</name><value>0</value></item>',
						'<item><name>secGrp</name><value>0</value></item>',
						'<item><name>t01</name><value>127127127</value></item>',
						'<item><name>t02</name><value>127127127</value></item>',
						'<item><name>t03</name><value>127127127</value></item>',
						'<item><name>t04</name><value>127127127</value></item>',
						'<item><name>t05</name><value>127127127</value></item>',
						'<item><name>tBlk</name><value>127</value></item></data></pm>'].join('\n');*/

			var xml_text = ['<?xml version="1.0" encoding="UTF-8"?>',
							'<pm>',
							'<data fmt="full">',
							'<item><name>tBlk</name><value>' + fncSmsNews() + '</value></item></data></pm>'].join('\n');

			httpReq.send(xml_text);
		}

		setTimeout(fncAjax, 2500);

	}
	
/******************************************************************************************************
	rozpoczęcie komuniacji.
	zadaniem procedury jest uruchomienie komunikacji z serwerem. okres komunikacji: 2.5s.
******************************************************************************************************/		
	//fncAjax();
	//setInterval(animateMarkers, 500);
	//setInterval(fncAjax, 2500);
			