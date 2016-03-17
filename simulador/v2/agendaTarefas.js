// require tarefaComparator.js

function AgendaTarefas  () {
        this.tarefas = [];
    }

AgendaTarefas.prototype.removerTarefa  = function(tarefa){

    for(var i = 0; i < this.tarefas.length; i++) {
        if(this.tarefas[i].hashCode() == tarefa.hashCode()){
            this.tarefas.splice(i, 1);
        }
    }

}

AgendaTarefas.prototype.adicionarTarefa  = function(tarefa){
    this.tarefas.push(tarefa);
}

AgendaTarefas.prototype.proximaTarefa  = function(){
    if(this.tarefas.length > 0){
        this.tarefas.sort(new TarefaComparator());
        var tarefa = this.tarefas[0];
        this.tarefas.shift();
        return tarefa;
    }else{
        return null;
    }
}

