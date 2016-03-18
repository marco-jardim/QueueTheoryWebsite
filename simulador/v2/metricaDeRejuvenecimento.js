//require utils.js

function MetricaRejuvenecimento () {
    this.iteracoes = 0;
    this.nFalhas = 0;
    this.nRejuvenecimentoAteFalhar = [];
    this.tempoUltimoRejuvenescimento = [];
}

MetricaRejuvenecimento.prototype.incrementaIteracoes  = function() {
    this.iteracoes++;
}

MetricaRejuvenecimento.prototype.incrementaNFalhas  = function() {
    this.nFalhas++;
}

MetricaRejuvenecimento.prototype.getProbabilidadeDeFalhar  = function() {
    return 1.0 * this.nFalhas/ this.iteracoes;
}

MetricaRejuvenecimento.prototype.adicionaTempoDesdeUltimoRejuvenescimento  = function(tempoUltimoRejuvenescimento) {
    this.tempoUltimoRejuvenescimento.push(tempoUltimoRejuvenescimento);
}

MetricaRejuvenecimento.prototype.adicionaNRejuvenecimentosAteFalhar  = function(nRejuvenecimentosAteFalhar){
    this.nRejuvenecimentoAteFalhar.push(nRejuvenecimentosAteFalhar);
}

MetricaRejuvenecimento.prototype.getnRejuvenecimentoAteFalhar  = function() {
    return 1.0 * this.nRejuvenecimentoAteFalhar.average();
}

MetricaRejuvenecimento.prototype.getTempoUltimoRejuvenescimento  = function() {
    return this.tempoUltimoRejuvenescimento.average();
}
