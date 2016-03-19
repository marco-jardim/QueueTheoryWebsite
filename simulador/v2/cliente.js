function Cliente (classe, tempoEntrada) {
    this.classe = classe;
    this.tempoEntrada = tempoEntrada;
    this.tempoDeServico = this.classe.getRandom();
}

Cliente.prototype.getDeltaTempo = function(){
    return this.tempoSaida - this.tempoEntrada;
}