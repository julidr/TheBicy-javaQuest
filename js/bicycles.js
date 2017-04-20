$(document).ready(function() {
	cargar();
	$('.modal-trigger').leanModal();
})

var bicycles = [
		{
			"id":"1",
			"nombre":"bicicleta 1",
			"numero":"1",
			"ubicacion":"espacio 10",
			"volts":"36",
			"amph":"10",
			"bateria":"80",
			"estado":"En buen estado",
			"color":"azul"
		},
		{
			"id":"2",
			"nombre":"bicicleta 2",
			"numero":"2",
			"ubicacion":"espacio 21",
			"volts":"36",
			"amph":"10",
			"bateria":"50",
			"estado":"Oxidada en el manubrio",
			"color":"azul"
		},
		{
			"id":"3",
			"nombre":"bicicleta 3",
			"numero":"3",
			"ubicacion":"espacio 38",
			"volts":"36",
			"amph":"10",
			"bateria":"60",
			"estado":"Con rayones",
			"color":"azul"
		},
		{
			"id":"4",
			"nombre":"bicicleta 4",
			"numero":"4",
			"ubicacion":"espacio 15",
			"volts":"36",
			"amph":"10",
			"bateria":"10",
			"estado":"Sin lavar",
			"color":"azul"
		},
		{
			"id":"5",
			"nombre":"bicicleta 5",
			"numero":"5",
			"ubicacion":"espacio 23",
			"volts":"36",
			"amph":"10",
			"bateria":"20",
			"estado":"En buen estado",
			"color":"azul"
		}
	];

function cargar() {
	var logo = "turned_in_not";
	var datos = "";
	for (var i = 0; i < bicycles.length; i++) {
		var carga = "";	
		carga+='<div class="progress" style="width:50%;">';
      	carga+='<div class="determinate" style="width: '+bicycles[i].bateria+'%"></div></div>';
		datos+="<li>";
        datos+='<div class="collapsible-header"><i class="material-icons">'+logo+'</i>'+bicycles[i].nombre+": "+bicycles[i].bateria+"%"+carga+'</div>';
        datos+='<div class="collapsible-body"><p>';
        datos+='id: '+bicycles[i].id+'<br>';
        datos+='Nombre: '+bicycles[i].nombre+'<br>';	
        datos+='Numero: '+bicycles[i].numero+'<br>';
        datos+='Ubicacion: '+bicycles[i].ubicacion+'<br>';
        datos+='Voltaje: '+bicycles[i].volts+' volts<br>';
         datos+='Amperios por hora: '+bicycles[i].amph+' Amp-Hours<br>';
        datos+='Bateria: '+bicycles[i].bateria+'%<br>';
      	datos+='Estado: '+bicycles[i].estado+'<br>';
        datos+='Color: '+bicycles[i].color+'<br><br>';
        datos+='<a onClick="editarBicy('+bicycles[i].id+');" class="waves-effect waves-light btn light-blue accent-2 white-text">Editar</a>';
        datos+='</p></div>';
        datos+='</li>';		
	};
	$("#datosBicy").html(datos);
}

function addBicy() {
	bicycles.push({
		"id":Object.keys(bicycles).length+1,
	    "nombre": $('#nombreForm').val(),
	    "numero": $('#numeroForm').val(),
	    "ubicacion": $('#ubicacionForm').val(),
	    "volts": $('#voltsForm').val(),
	    "amph": $('#amphForm').val(),
	    "bateria": $('#bateriaForm').val(),
	    "estado": $('#estadoForm').val(),
	    "color": $('#colorForm').val()
	});
	cargar();
	Materialize.toast('Se agrego la bicicleta', 4000)
	cancelAddBicy();
}

function cancelAddBicy(){
	$('#nombreForm').val("");
	$('#numeroForm').val("");
	$('#ubicacionForm').val("");
	$('#voltsForm').val("");
	$('#amphForm').val("");
	$('#bateriaForm').val("");
	$('#estadoForm').val("");
	$('#colorForm').val("");
	window.location.assign('#pagetwo');
}

function editarBicy(id){
	var puntero=-1;
	for (var i = 0; i < bicycles.length; i++) {
		if(id==bicycles[i].id){
			puntero = i;
		}	
	};
	if(puntero != -1){
		$('#idForme').val(bicycles[puntero].id);
		$('#nombreForme').val(bicycles[puntero].nombre);
		$('#numeroForme').val(bicycles[puntero].numero);
		$('#ubicacionForme').val(bicycles[puntero].ubicacion);
		$('#voltsForme').val(bicycles[puntero].volts);
		$('#amphForme').val(bicycles[puntero].amph);
		$('#bateriaForme').val(bicycles[puntero].bateria);
		$('#estadoForme').val(bicycles[puntero].estado);
		$('#colorForme').val(bicycles[puntero].color);
		window.location.assign('#pagefour');
	}else{
		Materialize.toast('editBicy Error', 4000)
	}
}

function aceptEditBicy(){
	var id = $('#idForme').val();
	var puntero=-1;
	for (var i = 0; i < bicycles.length; i++) {
		if(id==bicycles[i].id){
			puntero = i;
		}	
	};
	if(puntero != -1){
		bicycles[puntero].nombre = $('#nombreForme').val();
		bicycles[puntero].numero = $('#numeroForme').val();
		bicycles[puntero].ubicacion = $('#ubicacionForme').val();
		bicycles[puntero].volts = $('#voltsForme').val();
		bicycles[puntero].amph = $('#amphForme').val();
		bicycles[puntero].bateria = $('#bateriaForme').val();
		bicycles[puntero].estado = $('#estadoForme').val();
		bicycles[puntero].color = $('#colorForme').val();
		cargar();
		Materialize.toast('Se edito la bicicleta', 4000)
		cancelEditBicy();
	}else{
		Materialize.toast('aceptEditBicy Error', 4000)
		cancelEditBicy();
	}
}

function cancelEditBicy(){
	$('#nombreForme').val("");
	$('#numeroForme').val("");
	$('#ubicacionForme').val("");
	$('#voltsForme').val("");
	$('#amphForme').val("");
	$('#bateriaForme').val("");
	$('#estadoForme').val("");
	$('#colorForme').val("");
	window.location.assign('#pagetwo');
}

function redirect () {
	var tmpURL = window.location.href+'#pageone';
	location.href = tmpURL; 
}

var distancia = 0;
function guardarDistancia(dis, unidad) {
	if(unidad=="km"){
		dis = dis*1000;
	}
	distancia = dis;
	//console.log(dis);
}

function encontrarMejorBicycleta() {
	//console.log("distancia guardada: "+distancia+" metros");
	var idCiclaValida = -1;
	var kWh = 9999999;
	var bateria = 100;
	for (var i = 0; i < bicycles.length; i++) {
		var porcentajeRequerido = (100/(((bicycles[i].volts*bicycles[i].amph)/1000)*(32186.9/0.36)))*distancia;	
		console.log("Porcentaje requerido: "+porcentajeRequerido);
		console.log("Kwh guardado: "+kWh+", Kwh nuevo: "+((bicycles[i].volts*bicycles[i].amph)/1000));
		
		if((bicycles[i].bateria>=porcentajeRequerido) && ((bicycles[i].volts*bicycles[i].amph))<=kWh){
			if(((bicycles[i].volts*bicycles[i].amph))==kWh){
				if(bicycles[i].bateria<bateria){
					console.log("cambio");
					idCiclaValida = i;
					kWh = ((bicycles[i].volts*bicycles[i].amph));
					bateria = bicycles[i].bateria;	
				}
			}else{
				console.log("cambio");
				idCiclaValida = i;
				kWh = ((bicycles[i].volts*bicycles[i].amph));
				bateria = bicycles[i].bateria;
			}
		}
		console.log("id: "+idCiclaValida);
	};
	//console.log(idCiclaValida);
	
	var datos = "";
	var titulo = "";
	if(idCiclaValida != -1){
		titulo = '<i class="material-icons">subject</i>Mejor Bicicleta:';
		var carga = "";	
		var logo = "turned_in_not";
		carga+='<div class="progress" style="width:50%;">';
      	carga+='<div class="determinate" style="width: '+bicycles[idCiclaValida].bateria+'%"></div></div>';
		
		datos+="<li>";
        	datos+='<div class="collapsible-header"><i class="material-icons">'+logo+'</i>'+bicycles[idCiclaValida].nombre+": "+bicycles[idCiclaValida].bateria+"%"+carga+'</div>';
        	datos+='<div class="collapsible-body"><p>';
        		datos+='id: '+bicycles[idCiclaValida].id+'<br>';
        		datos+='Nombre: '+bicycles[idCiclaValida].nombre+'<br>';	
		        datos+='Numero: '+bicycles[idCiclaValida].numero+'<br>';
		        datos+='Ubicacion: '+bicycles[idCiclaValida].ubicacion+'<br>';
		        datos+='Voltaje: '+bicycles[idCiclaValida].volts+' volts<br>';
		        datos+='Amperios por hora: '+bicycles[idCiclaValida].amph+' Amp-Hours<br>';
		        datos+='Bateria: '+bicycles[idCiclaValida].bateria+'%<br>';
		      	datos+='Estado: '+bicycles[idCiclaValida].estado+'<br>';
		        datos+='Color: '+bicycles[idCiclaValida].color+'<br><br>';
        	datos+='</p></div>';
        datos+='</li>';	
	}else{
		titulo = '<i class="material-icons">subject</i>Lo sentimos';
		datos = "No se encontro bicicleta que cumpla para este recorrido, se necesita una bateria cargada al "+porcentajeRequerido;
	}
	$('#tituloMejor').html(titulo);
	$('#mejorbicy').html(datos);
}