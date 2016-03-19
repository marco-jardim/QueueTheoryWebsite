function MetricaRejuvenescimento () {
    this.iteracoes = 0;
    this.nFalhas = 0;
    this.nRejuvenescimentoAteFalhar = [];
    this.tempoUltimoRejuvenescimento = [];
}

MetricaRejuvenescimento.prototype.incrementaIteracoes  = function() {
    this.iteracoes++;
}

MetricaRejuvenescimento.prototype.incrementaNFalhas  = function() {
    this.nFalhas++;
}

MetricaRejuvenescimento.prototype.getProbabilidadeDeFalhar  = function() {
    return 1.0 * this.nFalhas/ this.iteracoes;
}

MetricaRejuvenescimento.prototype.adicionaTempoDesdeUltimoRejuvenescimento  = function(tempoUltimoRejuvenescimento) {
    this.tempoUltimoRejuvenescimento.push(tempoUltimoRejuvenescimento);
}

MetricaRejuvenescimento.prototype.adicionaNRejuvenescimentosAteFalhar  = function(nRejuvenescimentosAteFalhar){
    this.nRejuvenescimentoAteFalhar.push(nRejuvenescimentosAteFalhar);
}

MetricaRejuvenescimento.prototype.getnRejuvenescimentoAteFalhar  = function() {
    return 1.0 * this.nRejuvenescimentoAteFalhar.average();
}

MetricaRejuvenescimento.prototype.getTempoUltimoRejuvenescimento  = function() {
    return this.tempoUltimoRejuvenescimento.average();
}
