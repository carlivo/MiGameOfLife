//Carlos Iván Velasco Ocaranza
var dimension=15;
var celulasVivasConstante = 0.5;
var tabla;
var celulas;

$(document).ready(function(){
	tabla=$("#juego");
	iniciarJuego();
	celulas=tabla.find("td");
	celulasAzar();
	jugar();
});	

function iniciarJuego(){
	var trHtml =[];
	for(var y=0; y<dimension; y++){
		trHtml.push("<tr>");
		for(var x=0; x<dimension; x++){
			trHtml.push("<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>");
		}
		trHtml.push("</tr>");
	}
	trHtml=trHtml.join("");
	tabla.append($(trHtml));
}

function celulasAzar(){
	for(var y=0; y<dimension; y++){
		
		for(var x=0; x<dimension; x++){
			var celula= getcelula(x,y);
			
			if(Math.random()>celulasVivasConstante){
				celula.addClass("viva");
			}else{
				celula.removeClass("viva");
			}
		}
		
	}

}

function getcelula(x,y){
	if(x>=dimension){
		x=0;
	}
	if(y>=dimension){
		y=0;
	}
	if(x<0){
		x=dimension-1;
	}
	if(y<0){
		y=dimension-1;
	}

	return $(celulas[y*dimension+x]);

}

//================
function jugar(){
	iniciarGeneracion();
}

function iniciarGeneracion(){
	prepararSiguienteGeneracion();
	pasarSiguienteGeneracion();
	setTimeout("iniciarGeneracion()",200);
}

function prepararSiguienteGeneracion(){
	for(var y=0; y<dimension; y++){
		
		for(var x=0; x<dimension; x++){
			var celula =getcelula(x,y);
			var vecinos=getCantidadVecinosVivos(x,y);
			celula.attr("estaViva","false");
			if(esCelulaViva(x,y)){
				if(vecinos==2||vecinos==3){
					celula.attr("estaViva","true");
				}
			}else if (vecinos==3){
				celula.attr("estaViva","true");
			}
		}
	}
}

function pasarSiguienteGeneracion(){
	celulas.each(function(){
		var celula = $(this);
		celula.removeClass("viva");
		if(celula.attr("estaViva")=="true"){
			celula.addClass("viva");

		}
		celula.removeAttr("estaViva");
	});
}

function getCantidadVecinosVivos(x,y){
	var count=0;
	if(esCelulaViva(x-1,y-1)){
		count ++;
	}
	if(esCelulaViva(x,y-1)){
		count ++;
	}
	if(esCelulaViva(x+1,y-1)){
		count ++;
	}
	if(esCelulaViva(x-1,y)){
		count ++;
	}
	if(esCelulaViva(x+1,y)){
		count ++;
	}
	if(esCelulaViva(x-1,y+1)){
		count ++;
	}
	if(esCelulaViva(x,y+1)){
		count ++;
	}
	if(esCelulaViva(x+1,y+1)){
		count ++;
	}
	return count;
}

function esCelulaViva(x,y){
	return getcelula(x,y).attr("class")=="viva";
}