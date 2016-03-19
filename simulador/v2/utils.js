Array.prototype.average = function() {
    var sum = 0;
    for (var value of this) {
    	sum += value;
    }
    return sum / this.length;
};

Array.prototype.last = function() {
    return this[this.length-1];
}

function Random() {}

Random.prototype.Exponencial = function( lambda) {
	return Math.log(1-Math.random())/(-lambda);
}

Random.prototype.Deterministico = function( lambda) {
	return 1/lambda;
}

Random.prototype.Uniforme = function( a,  b) {
	return Math.random() * (b - a) + a;
}

var Random = new Random();

function Intervalo() {}

Intervalo.prototype.delta = function(){
    return this.saida - this.entrada;
}