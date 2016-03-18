// require classe.js

function Cliente (classe, tempoEntrada) {
    this.classe = classe;
    this.tempoEntrada = tempoEntrada;
    this.tempoDeServico = this.classe.getRandom();
}

Cliente.prototype.getClasse  = function() {
    return this.classe;
}

Cliente.prototype.getTempoEntrada  = function() {
    return this.tempoEntrada;
}

Cliente.prototype.getTempoSaida  = function() {
    return this.tempoSaida;
}

Cliente.prototype.setTempoSaida  = function( tempoSaida) {
    this.tempoSaida = tempoSaida;
}

Cliente.prototype.getDeltaTempo  = function(){
    return this.tempoSaida - this.tempoEntrada;
}

Cliente.prototype.setTrabalhoPendente  = function( trabalhoPendente) {
    this.trabalhoPendente = trabalhoPendente;
}

Cliente.prototype.getTrabalhoPendente  = function() {
    return this.trabalhoPendente;
}

Cliente.prototype.getTempoDeServico = function() {
    return this.tempoDeServico();
}
