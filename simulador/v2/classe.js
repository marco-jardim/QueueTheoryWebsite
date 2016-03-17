function Classe( lambda,  mi,  prioridade,  funcao) {

    this.lambda = lambda;
    this.mi = mi;
    this.prioridade = prioridade;
    this.funcao = funcao;
}

Classe.prototype.getPrioridade  = function() {
    return this.prioridade;
}

Classe.prototype.getLambda  = function() {
    return this.lambda;
}

Classe.prototype.getRandom  = function() {
    return this.funcao;
}

Classe.prototype.setLambda  = function( lambda) {
    this.lambda = lambda;
}

Classe.prototype.getMi  = function() {
    return this.mi;
}
