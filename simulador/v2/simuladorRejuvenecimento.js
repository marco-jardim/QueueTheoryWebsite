// require tarefa, temporizador, random

function SimuladorRejuvenecimento(tempoFinal, rho, lambda){
    this.rho = rho;
    this.lambda = lambda;
    this.temporizador = new Temporizador(tempoFinal);
    this.nRejuvenecimentosAteFalhar = 0;
    this.horarioUltimaFalha = 0.0;
    this.metricas = new MetricaRejuvenecimento();
}

SimuladorRejuvenecimento.prototype.preparaSimulador = function(){
    this.criaTarefas();
}

SimuladorRejuvenecimento.prototype.criaTarefas = function(){
    rejuvenecimentoTarefa = temporizador.registrarTarefaPorAtraso(Random.Exponencial(rho), function(tempo) { this.Rejuveneceu(tempo); });
    falhaTarefa = temporizador.registrarTarefaPorAtraso(Random.Exponencial(lambda), function(tempo) { this.Falhou(tempo); });
}

SimuladorRejuvenecimento.prototype.Falhou = function(horario){
    temporizador.cancelarTarefa(rejuvenecimentoTarefa);
    metricas.incrementaNFalhas();
    metricas.incrementaIteracoes();
    metricas.adicionaNRejuvenecimentosAteFalhar(nRejuvenecimentosAteFalhar+1); // +1 é a vez que falha!
    metricas.adicionaTempoEntreFalhas(horario - horarioUltimaFalha);
    horarioUltimaFalha = horario;
    nRejuvenecimentosAteFalhar = 0;
    this.criaTarefas();
}

SimuladorRejuvenecimento.prototype.Rejuveneceu = function(horario){
    temporizador.cancelarTarefa(falhaTarefa);
    metricas.incrementaIteracoes();
    nRejuvenecimentosAteFalhar++;
    this.criaTarefas();
}

SimuladorRejuvenecimento.prototype.executar(){
    this.preparaSimulador();
    temporizador.play();
    return metricas;
}
