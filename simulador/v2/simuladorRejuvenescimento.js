// require tarefa, temporizador, random

function SimuladorRejuvenescimento(tempoFinal, rho, lambda){
    this.rho = rho;
    this.lambda = lambda;
    this.temporizador = new Temporizador(tempoFinal);
    this.nRejuvenescimentosAteFalhar = 0;
    this.horarioUltimaFalha = 0.0;
    this.horarioUltimoRejuvenescimento = 0.0;
    this.metricas = new MetricaRejuvenescimento();
    this.rejuvenescimentoTarefa;
    this.falhaTarefa;
}

SimuladorRejuvenescimento.prototype.preparaSimulador = function(){
    this.criaTarefas();
}

SimuladorRejuvenescimento.prototype.criaTarefas = function(){
    var self = this;
    var callback = function() {
        return function(tempo) { self.Rejuvenesceu(tempo); }
    }
    this.rejuvenescimentoTarefa = this.temporizador.registrarTarefaPorAtraso(Random.Exponencial(rho), callback());

    var callback2 = function() {
        return function(tempo) {    
            self.Falhou(tempo); 
        }
    }
    this.falhaTarefa = this.temporizador.registrarTarefaPorAtraso(Random.Exponencial(lambda), callback2());
}

SimuladorRejuvenescimento.prototype.Falhou = function(horario){
    this.temporizador.cancelarTarefa(this.rejuvenescimentoTarefa);
    this.metricas.incrementaNFalhas();
    this.metricas.incrementaIteracoes();
    this.metricas.adicionaNRejuvenescimentosAteFalhar(this.nRejuvenescimentosAteFalhar+1); // +1 é a vez que falha!
    this.metricas.adicionaTempoDesdeUltimoRejuvenescimento(horario - this.horarioUltimoRejuvenescimento);
    this.horarioUltimaFalha = horario;
    this.nRejuvenescimentosAteFalhar = 0;
    this.criaTarefas();
}

SimuladorRejuvenescimento.prototype.Rejuvenesceu = function(horario){
    this.temporizador.cancelarTarefa(this.falhaTarefa);
    this.metricas.incrementaIteracoes();
    this.nRejuvenescimentosAteFalhar++;
    this.horarioUltimoRejuvenescimento = horario;
    this.criaTarefas();
}

SimuladorRejuvenescimento.prototype.executar = function(){
    this.preparaSimulador();
    this.temporizador.play();
    return this.metricas;
}
