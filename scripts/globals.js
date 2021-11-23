	var httpReq;					// wynik działania XMLHttpRequest
	var map;						// obiekt mapy
	var ratio = 0.67;				// współczynnik pomniejszenia markerów
    var ip_adrs = "127.0.0.1:81";	// adres ip serwera
 	var markers = [];				// tablica przechowująca markery umieszczone na mapie  

    var blocades = [0,0,0,0,0];		// tablica zawierająca stan blokad telefonów (1 = blokada aktywna)
    var phones   = [0,0,0,0,0];		// tablica zawierajaca numery telefonów
    var writing  = 0;				// flaga informująca o wysyłaniu informacji do serwera
    var sms_pnl_visible = 0;		

	
/***************************************************************************************************************************************************************
	DEKLARACJE OBIEKTÓW REPREZENTUJĄCYCH POSZCZEGÓLNE POMPOWNIE.
	każdy obiekt zawiera poniższe właściwości:
	1. lbl: nazawa pompowni widoczna na etykiecie,
	2. lat: szerokość geograficzna,
	3. lng: długość geograficzna,
	4. tmpl: identyfikacja szablonu markera: 0 - kólko na północnym zachodzie,
											 1 - kółko na północnym wschodzie,
											 2 - kółko na południowym wschodzie,
											 3 - kółko na południowym zachodzie,
	5. st: aktualny stan pompowni:  0 - obie pompy odstawione, żadna pompa nie pracuje, brak awarii,
									1 - przynajmniej jedna pompa w trybie automatycznym, żadna pompa nie pracuje, brak awarii,
									2 - przynajmniej jedna pompa w trybie automatycznym, przynajmniej jedna pompa pracuje, brak awarii,
									3 - awaria,
	6. new_st: nowy stan pompowni. niejednakowe wartości st i new_st powinny wygenerować zmianę wyglądu etykiety.
	7. anim: stan animacji. flaga wykorzystywana w procesie animowania pracującej pompowni lub awarii pompowni,
	8. href: nazwa panela przedstawiającego dane obiektu.*/
	
	var pg1  = {lbl:"PG1 / GOLCZEWO /",  	lat:53.306123, lng:14.973805, tmpl:0, st:0, new_st:0, anim:0, href:"pg1view"};		// właściwości pompowni PG1 / Golczewo /
	var ps1  = {lbl:"PS1 / SKALIN /",       lat:53.317029, lng:14.936757, tmpl:3, st:0, new_st:0, anim:0, href:"ps1view"};		// właściwości pompowni PS1 / Skalin /
	var pw1  = {lbl:"PW1 / WIERZCHLĄD /",	lat:53.310598, lng:14.917902, tmpl:2, st:0, new_st:0, anim:0, href:"pw1view"};		// właściwości pompowni PW1 / Wierzchląd /
	var pko1 = {lbl:"PKO1 / KOSZEWO /",     lat:53.272056, lng:14.908426, tmpl:3, st:0, new_st:0, anim:0, href:"pko1view"};		// właściwości pompowni PKO / Koszewo /
	var pg   = {lbl:"PG / GRZĘDZICE /",     lat:53.370019, lng:14.971777, tmpl:2, st:0, new_st:0, anim:0, href:"pgview"};		// właściwości pompowni PG / Grzędzice /
	var pz1  = {lbl:"P1 / ZIELENIEWO /",    lat:53.348146, lng:14.937476, tmpl:2, st:0, new_st:0, anim:0, href:"pz1view"};		// właściwości pompowni P1 / Zieleniewo /
	var pb1  = {lbl:"P1 / BIELKOWO /",   	lat:53.321607, lng:14.857320, tmpl:3, st:0, new_st:0, anim:0, href:"pb1view"};		// właściwości pompowni P1 / Bielkowo /
	var pb2  = {lbl:"P2 / BIELKOWO /", 		lat:53.324106, lng:14.853645, tmpl:2, st:0, new_st:0, anim:0, href:"pb2view"};		// właściwości pompowni P2 / Bielkowo /
	var psk  = {lbl:"PS / KLĘPINO /",     	lat:53.364537, lng:15.037891, tmpl:3, st:0, new_st:0, anim:0, href:"pskview"};		// właściwości pompowni PS / Klępino /
	var psw  = {lbl:"PS / WITKOWO /",      	lat:53.299065, lng:15.049996, tmpl:3, st:0, new_st:0, anim:0, href:"pswview"};		// właściwości pompowni PS / Witkowo /
	var pm2  = {lbl:"PM2 / MORZYCZYN /",    lat:53.360519, lng:14.902305, tmpl:2, st:0, new_st:0, anim:0, href:"pm2view"};		// właściwości pompowni PM2 / Morzyczyn /
	var ps2  = {lbl:"PS2 / SKALIN /",       lat:53.313200, lng:14.940842, tmpl:0, st:0, new_st:0, anim:0, href:"ps2view"};		// właściwości pompowni PS2 / Skalin /
	var pw2  = {lbl:"PW2 / WIERZCHLĄD /",   lat:53.309512, lng:14.918948, tmpl:1, st:0, new_st:0, anim:0, href:"pw2view"};		// właściwości pompowni PW2 / Wierzchląd /
	var pkw1 = {lbl:"PKW1 / KOSZEWKO /",    lat:53.288389, lng:14.901951, tmpl:3, st:0, new_st:0, anim:0, href:"pkw1view"};		// właściwości pompowni PKW1 / Koszewko /
	var ps   = {lbl:"PS / GRZĘDZICE /",  	lat:53.359141, lng:14.970060, tmpl:3, st:0, new_st:0, anim:0, href:"psview"};		// właściwości pompowni PS / Grzędzice /
	var p2   = {lbl:"P2 / KUNOWO /",     	lat:53.333132, lng:14.942405, tmpl:3, st:0, new_st:0, anim:0, href:"p2view"};		// właściwości pompowni P2 / Kunowo /
	var p3   = {lbl:"P3 / KUNOWO /",        lat:53.324195, lng:14.931671, tmpl:3, st:0, new_st:0, anim:0, href:"p3view"};		// właściwości pompowni P3 / Kunowo /
	var pss  = {lbl:"PS / STRACHOCIN /",   	lat:53.326230, lng:15.072281, tmpl:3, st:0, new_st:0, anim:0, href:"pssview"};		// właściwości pompowni PS / Strachocin /
        var pp1  = {lbl:"PS1 / PĘZINO /",   	lat:53.336482, lng:15.193569, tmpl:2, st:0, new_st:0, anim:0, href:"pp1view"};		// właściwości pompowni P1 / Pęzino /
	var pp2  = {lbl:"PS2 / PĘZINO /",   	lat:53.342222, lng:15.193933, tmpl:2, st:0, new_st:0, anim:0, href:"pp2view"};		// właściwości pompowni P2 / Pęzino /	

	var objects = [pg1,ps1,pw1,pko1,pg,pz1,pb1,pb2,psk,psw,pm2,ps2,pw2,pkw1,ps,p2,p3,pss,pp1,pp2];
/***************************************************************************************************************************************************************/

/***************************************************************************************************************************************************************
	DEKLARACJE SZABLONÓW MARKERÓW.
	każdy szablon reprezentuje inny kształt markera. w podwójnych nawiasach klamrowych znajdują się ciągi znaków, których wymiana na odpowiednie wartości
	spowoduje zmianę własciwości szablonu.
	opis poszczególnych ciągów znaków:
	1. {{stroke_color}}: zmienna reprezentuje kolor lini,
	2. {{font_color}}: zmienne reprezentuje kolor czcionki,
	3. {{r2_fill_color}}: zmienna reprezentuje kolor wypełnienia wewnętrznego prostokąta,
	4. {{c2_fill_color}}: zmienna reprezentuje kolor wypełnienia wewnetrznego koła.	*/

	// szablon markerów. kółko na pólnocnym zachodzie.
	var szablon_nw = ['<?xml version="1.0"?>',
					  '<svg width="200px" height="39px" viewBox="0 0 298 58" version="1.1"',
					  'xmlns="http://www.w3.org/2000/svg">',
						'<rect x="17" y="17" width="276" height="36" fill="white" stroke="{{stroke_color}}" rx="7" ry="7" />',
						'<rect x="20" y="20" width="270" height="30" fill="{{r2_fill_color}}" stroke="{{r2_fill_color}}" rx="4" ry="4" />',
						'<text x="33" y="41" fill="{{font_color}}" font-size="18" font-weight="bold" font-family="verdana">',
						'	{{name}}',
						'</text>',
						'<circle cx="11" cy="11" r="10" fill="white" stroke="{{stroke_color}}" />',
						'<circle cx="11" cy="11" r="7" fill="{{c2_fill_color}}" stroke="{{c2_fill_color}}" />',
					  '</svg>'
					 ].join('\n');
	// szablon markerów. kółko na pólnocnym wschodzie.
	var szablon_ne = ['<?xml version="1.0"?>',
					  '<svg width="200px" height="39px" viewBox="0 0 298 58" version="1.1"',
					  'xmlns="http://www.w3.org/2000/svg">',
						'<rect x="1" y="17" width="276" height="36" fill="white" stroke="{{stroke_color}}" rx="7" ry="7" />',
						'<rect x="4" y="20" width="270" height="30" fill="{{r2_fill_color}}" stroke="{{r2_fill_color}}" rx="4" ry="4" />',
						'<text x="17" y="41" fill="{{font_color}}" font-size="18" font-weight="bold" font-family="verdana">',
						'	{{name}}',
						'</text>',
						'<circle cx="283" cy="11" r="10" fill="white" stroke="{{stroke_color}}" />',
						'<circle cx="283" cy="11" r="7" fill="{{c2_fill_color}}" stroke="{{c2_fill_color}}" />',
					  '</svg>'
					 ].join('\n');
	// szablon markerów. kółko na południowym wschodzie.
	var szablon_se = ['<?xml version="1.0"?>',
					  '<svg width="200px" height="39px" viewBox="0 0 298 58" version="1.1"',
					  'xmlns="http://www.w3.org/2000/svg">',
						'<rect x="1" y="1" width="276" height="36" fill="white" stroke="{{stroke_color}}" rx="7" ry="7" />',
						'<rect x="4" y="4" width="270" height="30" fill="{{r2_fill_color}}" stroke="{{r2_fill_color}}" rx="4" ry="4" />',
						'<text x="17" y="25" fill="{{font_color}}" font-size="18" font-weight="bold" font-family="verdana">',
						'	{{name}}',
						'</text>',
						'<circle cx="283" cy="43" r="10" fill="white" stroke="{{stroke_color}}" />',
						'<circle cx="283" cy="43" r="7" fill="{{c2_fill_color}}" stroke="{{c2_fill_color}}" />',
					  '</svg>'
					 ].join('\n');
	// szablon markerów. kółko na południowym zachodzie.
	var szablon_sw = ['<?xml version="1.0"?>',
					  '<svg width="200px" height="39px" viewBox="0 0 298 58" version="1.1"',
					  'xmlns="http://www.w3.org/2000/svg">',
						'<rect x="17" y="1" width="276" height="36" fill="white" stroke="{{stroke_color}}" rx="7" ry="7" />',
						'<rect x="20" y="4" width="270" height="30" fill="{{r2_fill_color}}" stroke="{{r2_fill_color}}" rx="4" ry="4" />',
						'<text x="33" y="25" fill="{{font_color}}" font-size="18" font-weight="bold" font-family="verdana">',
						'	{{name}}',
						'</text>',
						'<circle cx="11" cy="43" r="10" fill="white" stroke="{{stroke_color}}" />',
						'<circle cx="11" cy="43" r="7" fill="{{c2_fill_color}}" stroke="{{c2_fill_color}}" />',
					  '</svg>'
					 ].join('\n');
	var szablony = [szablon_nw, szablon_ne, szablon_se, szablon_sw];
/***************************************************************************************************************************************************************/

/***************************************************************************************************************************************************************
	DEKLARACJE LINI HTML BUBUJĄCYCH "innerHTML" W ELEMENCIE <DIV> O IDENTYFILATORZE "phone_numbers".
	każda z zastosowanych lini jest uniwersalna, czyli może reprezentować dowolny z pięciu numerów telefonów.
	zaprojektowano dwa rodzaje lini html:	
	1. linia prezentująca stan danego numeru telefonu. w zależności od stanu linia ta jest przekreślona lub nie,
	2. linia edycyjna umożliwiająca zmianę stanu danego numeru telefonu.*/

	var line_state_act = ['<input type="checkbox" value={{cb_value}} checked="true" onClick="fncCheckBoxClicked(this)"}> {{phone_id}}&nbsp&nbsp&nbsp<span style="color:#000000">{{phone_number}}</span>',
	                      '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspAktywny&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<br/>'].join('\n');
	var line_state_unact = ['<input type="checkbox" value={{cb_value}} onClick="fncCheckBoxClicked(this)"}><s style="color:grey"> {{phone_id}}&nbsp&nbsp&nbsp{{phone_number}}',
	                        '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspZablokowany&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</s><br/>'].join('\n');
	var line_states = [line_state_unact, line_state_act];
	var edit_line;



/***************************************************************************************************************************************************************/