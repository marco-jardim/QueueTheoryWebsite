// require classe.js
// require utils.js

var AUTOINC = 0;

function ClientePreemptivo(classe, tempoEntrada) {
    this.id = AUTOINC++;
    this.tempoNaFila = [];
    this.marcaEntrada(tempoEntrada);
    this.tempoPendente = classe.getRandom();
    this.classe = classe;
    this.tempoEntrada = tempoEntrada;
    this.tempoDeServico = classe.getRandom();
}

ClientePreemptivo.prototype.getClasse  = function() {
    return this.classe;
}

ClientePreemptivo.prototype.getTempoEntrada  = function() {
    return this.tempoEntrada;
}

ClientePreemptivo.prototype.getTempoSaida  = function() {
    return this.tempoSaida;
}

ClientePreemptivo.prototype.setTempoSaida  = function( tempoSaida) {
    this.tempoSaida = tempoSaida;
}



ClientePreemptivo.prototype.setTrabalhoPendente  = function( trabalhoPendente) {
    this.trabalhoPendente = trabalhoPendente;
}

ClientePreemptivo.prototype.getTrabalhoPendente  = function() {
    return this.trabalhoPendente;
}

ClientePreemptivo.prototype.getTempoDeServico  = function() {
    return this.tempoDeServico;
}






    ClientePreemptivo.prototype.getTempoPendente  = function() {
        return this.tempoPendente;
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
        //Ultima saida, foi quando começou o processamento
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

    ClientePreemptivo.prototype.hashCode  = function(){
        return this.id;
    }