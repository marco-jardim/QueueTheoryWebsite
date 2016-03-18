function Classe( lambda,  mi,  prioridade,  funcaoSaida, funcaoChegada) {
    this.lambda = lambda;
    this.mi = mi;
    this.prioridade = prioridade;
    this.funcaoSaida = funcaoSaida;
    this.funcaoChegada = funcaoChegada;
}

Classe.prototype.getPrioridade  = function() {
    return this.prioridade;
}

Classe.prototype.getLambda  = function() {
    return this.lambda;
}

Classe.prototype.getRandom  = function() {
    return this.funcaoSaida();
}

Classe.prototype.getRandomChegada  = function() {
    return this.funcaoChegada();
}

Classe.prototype.setLambda  = function( lambda) {
    this.lambda = lambda;
}

Classe.prototype.getMi  = function() {
    return this.mi;
}
