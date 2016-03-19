function TarefaComparator (t1, t2) {
    this.diff = t1.horario - t2.horario;
    if(t1.hashCode() == t2.hashCode()) return 0;
    else if(diff > 0) return 1;
    else if(diff < 0) return -1;
    else return 1;
}
