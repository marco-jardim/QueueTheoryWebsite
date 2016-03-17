//require mathjs
//require utils.js

function Metricas () {
}

Metricas.prototype.Little  = function( lambda,  mediaTempo) {
	return lambda * mediaTempo;
}

Metricas.prototype.Media  = function( lista) {
	return lista.average();
}

Metricas.prototype.DesvioPadrao  = function( lista) {
	var desvioPadrao = 0;
 	var media = this.Media(lista);
 	for (var item of lista) {
		desvioPadrao += (item - media)*(item - media) / (lista.length - 1);
	}
	return desvioPadrao;
}

Metricas.prototype.IntervaloConfiancaInferior  = function( lista) {
	return this.Media(lista) - 1.96 * Math.sqrt(this.DesvioPadrao(lista)) / Math.sqrt(lista.length);
}

Metricas.prototype.IntervaloConfiancaSuperior  = function( lista) {
	return this.Media(lista) + 1.96 * Math.sqrt(this.DesvioPadrao(lista))/Math.sqrt(lista.length);
}

var Metricas = new Metricas();