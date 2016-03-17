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
    return math.std(lista);
}

 Metricas.prototype.IntervaloConfiancaInferior  = function( lista) {
    return this.Media(lista) - 1.96 * Math.sqrt(this.DesvioPadrao(lista)) / Math.sqrt(lista.size());
}

 Metricas.prototype.IntervaloConfiancaSuperior  = function( lista) {
    return this.Media(lista) + 1.96 * Math.sqrt(this.DesvioPadrao(lista))/Math.sqrt(lista.size());
}
