var SEQUENCE_ID = 0;

function Tarefa (horario, funcao) {
    this.id = SEQUENCE_ID++;
    this.horario = horario;
    this.funcao = funcao;
}

Tarefa.prototype.executar = function(hora){
    this.funcao(hora);
}

Tarefa.prototype.hashCode = function() {
    return this.id;
}