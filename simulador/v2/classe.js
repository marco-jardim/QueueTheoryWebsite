function Classe(lambda, mi, prioridade, funcaoSaida, funcaoChegada) {
    this.lambda = lambda;
    this.mi = mi;
    this.prioridade = prioridade;
    this.funcaoSaida = funcaoSaida;
    this.funcaoChegada = funcaoChegada;
}

Classe.prototype.getRandom  = function() {
    return this.funcaoSaida();
}

Classe.prototype.getRandomChegada  = function() {
    return this.funcaoChegada();
}