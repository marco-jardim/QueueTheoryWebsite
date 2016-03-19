function Fila(classes) {
    this.filas = [];
    for (classe of classes) {
        this.filas.push([]);
    }
}

Fila.prototype.adicionar = function(cliente, preemptivo){
    if(preemptivo){
        this.filas[cliente.classe.prioridade].unshift(cliente);
    } else{
        this.filas[cliente.classe.prioridade].push(cliente);
    }
}

Fila.prototype.remover = function(){
    for(lista of this.filas){
        if(lista.length > 0){
            var cliente = lista[0];
            lista.shift();
            return cliente;
        }
    }
    return null;
}

Fila.prototype.tamanho = function(){
    var contagem = 0;
    for (var i = 0; i < this.filas.length; i++) {
        contagem += this.filas[i].length;
    }
    return contagem;
}