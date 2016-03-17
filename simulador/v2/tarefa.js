var SEQUENCE_ID = 0;

function Tarefa ( horario,  funcao) {
    this.id = SEQUENCE_ID++;
    this.horario = horario;
    this.funcao = funcao;
}

Tarefa.prototype.getHorario  = function() {
    return this.horario;
}

Tarefa.prototype.setHorario  = function( horario) {
    this.horario = horario;
}

Tarefa.prototype.executar  = function( hora){
    this.funcao(hora);
}

Tarefa.prototype.hashCode  = function() {
    return this.id;
}

/* talvez nao precise
Tarefa.prototype.equals  = function(obj) {
        if (obj == null)
            return false;
        if (this == obj)
            return false;
        if (!(obj instanceof Tarefa))
            return false;
        final Tarefa other = (Tarefa) obj;
        return id == null ? other.id == null
                : id.equals(other.id);
    }
    */

