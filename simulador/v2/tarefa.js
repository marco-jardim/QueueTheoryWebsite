var TAREFAID = 0;

function Tarefa (horario, funcao) {
    this.id = TAREFAID++;
    this.horario = horario;
    this.funcao = funcao;
}

Tarefa.prototype.executar = function(hora){
    this.funcao(hora);
}

function TarefaComparator (t1, t2) {
    this.diff = t1.horario - t2.horario;
    if(t1.id == t2.id) return 0;
    else if(diff > 0) return 1;
    else if(diff < 0) return -1;
    else return 1;
}

function AgendaTarefas  () {
    this.tarefas = [];
}

AgendaTarefas.prototype.removerTarefa = function(tarefa){
    for(var i = 0; i < this.tarefas.length; i++) {
        if(this.tarefas[i].id == tarefa.id){
            this.tarefas.splice(i, 1);
        }
    }
}

AgendaTarefas.prototype.adicionarTarefa = function(tarefa){
    this.tarefas.push(tarefa);
}

AgendaTarefas.prototype.proximaTarefa = function(){
    if(this.tarefas.length > 0){
        this.tarefas.sort(TarefaComparator);
        var tarefa = this.tarefas[0];
        this.tarefas.shift();
        return tarefa;
    } else {
        return null;
    }
}