var CLIENTEID = 0;

function Cliente (classe, tempoEntrada) {
    this.classe = classe;
    this.tempoEntrada = tempoEntrada;
    this.tempoDeServico = this.classe.getRandom();
}

Cliente.prototype.getDeltaTempo = function(){
    return this.tempoSaida - this.tempoEntrada;
}

function ClientePreemptivo(classe, tempoEntrada) {
    this.id = CLIENTEID++;
    this.tempoNaFila = [];
    this.marcaEntrada(tempoEntrada);
    this.tempoPendente = classe.getRandom();
    this.classe = classe;
    this.tempoEntrada = tempoEntrada;
    this.tempoDeServico = classe.getRandom();
}

ClientePreemptivo.prototype.marcaEntrada  = function( tempoEntrada) {
    var intervalo = new Intervalo();
    intervalo.entrada = tempoEntrada;
    this.tempoNaFila.push(intervalo);
}

ClientePreemptivo.prototype.marcaSaida  = function( tempoSaida) {
    this.tempoNaFila.last().saida = tempoSaida;
}

ClientePreemptivo.prototype.atualizaTempoPendente  = function( horario){
    this.tempoPendente -= horario - this.tempoNaFila.last().saida;
}

ClientePreemptivo.prototype.getDeltaTempo  = function(){
    var delta = 0.0;
    for (intervalo of this.tempoNaFila) {
        if(intervalo != null) {
            delta += intervalo.delta();
        }
    }
    return delta;
}