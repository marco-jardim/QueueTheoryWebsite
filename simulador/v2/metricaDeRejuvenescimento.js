//require utils.js

function MetricaRejuvenecimento () {
    this.iteracoes = 0;
    this.nFalhas = 0;
    this.nRejuvenecimentoAteFalhar = [];
    this.tempoEntreFalhas = [];

    MetricaRejuvenecimento.prototype.incrementaIteracoes  = function() {
        this.iteracoes++;
    }

    MetricaRejuvenecimento.prototype.incrementaNFalhas  = function() {
        this.nFalhas++;
    }

    MetricaRejuvenecimento.prototype.getProbabilidadeDeFalhar  = function() {
        return 1.0 * this.nFalhas/ this.iteracoes;
    }

    MetricaRejuvenecimento.prototype.adicionaTempoEntreFalhas  = function(tempoEntreFalhas) {
        this.tempoEntreFalhas.push(tempoEntreFalhas);
    }

    MetricaRejuvenecimento.prototype.adicionaNRejuvenecimentosAteFalhar  = function(nRejuvenecimentosAteFalhar){
        this.nRejuvenecimentoAteFalhar.push(nRejuvenecimentosAteFalhar);
    }

    MetricaRejuvenecimento.prototype.getnRejuvenecimentoAteFalhar  = function() {
        return 1.0 * this.nRejuvenecimentoAteFalhar.average();
    }

    MetricaRejuvenecimento.prototype.getTempoEntreFalhas  = function() {
        return this.tempoEntreFalhas.average();
    }