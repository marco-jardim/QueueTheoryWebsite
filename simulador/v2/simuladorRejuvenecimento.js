// require tarefa, temporizador, random

function SimuladorRejuvenecimento(tempoFinal, rho, lambda){
    this.rho = rho;
    this.lambda = lambda;
    this.temporizador = new Temporizador(tempoFinal);
    this.nRejuvenecimentosAteFalhar = 0;
    this.horarioUltimaFalha = 0.0;
    this.horarioUltimoRejuvenescimento = 0.0;
    this.metricas = new MetricaRejuvenecimento();
}

SimuladorRejuvenecimento.prototype.preparaSimulador = function(){
    this.criaTarefas();
}

SimuladorRejuvenecimento.prototype.criaTarefas = function(){
    var callback = function() {
        return function(tempo) { this.Rejuveneceu(tempo); }
    }
    rejuvenecimentoTarefa = this.temporizador.registrarTarefaPorAtraso(Random.Exponencial(rho), callback);

    var callback2 = function() {
        return function(tempo) { this.Falhou(tempo); }
    }
    falhaTarefa = this.temporizador.registrarTarefaPorAtraso(Random.Exponencial(lambda), callback2);
}

SimuladorRejuvenecimento.prototype.Falhou = function(horario){
    this.temporizador.cancelarTarefa(rejuvenecimentoTarefa);
    this.metricas.incrementaNFalhas();
    this.metricas.incrementaIteracoes();
    this.metricas.adicionaNRejuvenecimentosAteFalhar(this.nRejuvenecimentosAteFalhar+1); // +1 é a vez que falha!
    this.metricas.adicionaTempoDesdeUltimoRejuvenescimento(horario - this.horarioUltimoRejuvenescimento);
    this.horarioUltimaFalha = horario;
    this.nRejuvenecimentosAteFalhar = 0;
    this.criaTarefas();
}

SimuladorRejuvenecimento.prototype.Rejuveneceu = function(horario){
    this.temporizador.cancelarTarefa(falhaTarefa);
    this.metricas.incrementaIteracoes();
    this.nRejuvenecimentosAteFalhar++;
    this.horarioUltimoRejuvenescimento = horario;
    this.criaTarefas();
}

SimuladorRejuvenecimento.prototype.executar = function(){
    this.preparaSimulador();
    this.temporizador.play();
    return this.metricas;
}
