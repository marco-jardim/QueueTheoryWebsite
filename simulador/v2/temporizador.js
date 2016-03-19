function Temporizador  ( tempoFinal) {
    this.tempoAtual = 0.0;
    this.tempoFinal = tempoFinal;
    this.agenda = new AgendaTarefas();
}

Temporizador.prototype.cancelarTarefa = function(tarefa){
    this.agenda.removerTarefa(tarefa);
}

Temporizador.prototype.setTempoFinal = function(tempoFinal){
    this.tempoFinal += tempoFinal;
}

Temporizador.prototype.registrarTarefaPorAtraso = function(atraso, funcao){
    var tarefa = new Tarefa(atraso + this.tempoAtual, funcao);
    this.agenda.adicionarTarefa(tarefa);
    return tarefa;
}

Temporizador.prototype.play = function(){
    while(this.tempoAtual < this.tempoFinal){
        var proximaTarefa = this.agenda.proximaTarefa();
        if (!proximaTarefa) break;

        this.tempoAtual = proximaTarefa.horario;
        proximaTarefa.executar(this.tempoAtual);
    }
}