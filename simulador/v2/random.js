function Random() {
}

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