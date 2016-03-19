function MetricaDeInteresse() {
    this.clientesProcessados;
    this.mediaCalculada = null;
    this.fracaoDeTempoServidorVazio = 0.0;
    this.fracaoDeChegadasServidorVazio = 0.0;
    this.clientesProcessados = [];
}

MetricaDeInteresse.prototype.getMediaTempoDeEspera = function() {
    if(this.mediaCalculada == null){
        var listaDeltaTempo = [];
        for (cliente of this.clientesProcessados)
            listaDeltaTempo.push(cliente.getDeltaTempo());
        this.mediaCalculada = Metricas.Media(listaDeltaTempo);
    }
    return this.mediaCalculada;
}

MetricaDeInteresse.prototype.adicionaClienteProcessado = function(cliente){
    if(cliente != null){
        this.clientesProcessados.push(cliente);
    }
}

MetricaDeInteresse.prototype.getTempoEntreSaidas = function() {
    var tempoDeSaidas = [];
    var tempoEntreSaidas = [];
    for (cliente of this.clientesProcessados)
        tempoDeSaidas.push(cliente.tempoSaida);

    tempoDeSaidas.sort(function(a, b){return a-b});
    for (var i = 0; i < tempoDeSaidas.length - 1; i++) {
        tempoEntreSaidas.push(tempoDeSaidas[(i + 1)] - tempoDeSaidas[i]);
    }
    return tempoEntreSaidas;
}

MetricaDeInteresse.prototype.getTempoEntreChegadas = function() {
    var tempoDeChegadas = [];
    var tempoEntreChegadas = [];
    for (cliente of this.clientesProcessados) 
        tempoDeChegadas.push(cliente.tempoEntrada);

    tempoDeChegadas.sort(function(a, b){return a-b});
    for (var i = 0; i < tempoDeChegadas.length - 1; i++) {
        tempoEntreChegadas.push(tempoDeChegadas[(i + 1)] - tempoDeChegadas[i]);
    }
    return tempoEntreChegadas;
}

MetricaDeInteresse.prototype.getTrabalhoPendente = function() {
    var listaTrabalhoPendente = [];
    for (cliente of this.clientesProcessados)
        listaTrabalhoPendente.push(cliente.trabalhoPendente);

    return Metricas.Media(listaTrabalhoPendente);
}

MetricaDeInteresse.prototype.getPessoasFila = function() {
    var pessoasNaFila = [];
    var classe1 = this.clientesProcessados[0].classe;
    var classe2 = null;
    var listaDeltaTempo1 = [];
    var listaDeltaTempo2 = [];
    for (cliente of this.clientesProcessados) {
        if (cliente.classe == classe1)
            listaDeltaTempo1.push(cliente.getDeltaTempo());
        else {
            if (classe2 == null)
                classe2 = cliente.classe;
            listaDeltaTempo2.push(cliente.getDeltaTempo());
        }
    }

    pessoasNaFila[0] = Metricas.Little(classe1.lambda, Metricas.Media(listaDeltaTempo1));
    if (classe2)
        pessoasNaFila[1] = Metricas.Little(classe2.lambda, Metricas.Media(listaDeltaTempo2));

    return pessoasNaFila;
}
