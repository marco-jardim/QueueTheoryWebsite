function Fila(classes) {
    this.filas = [];
    for (classe of classes) {
        this.filas.push([]);
    }
}

Fila.prototype.getFilas = function() {
    return this.filas;
}

Fila.prototype.adicionar = function(cliente, preemptivo){
    if(preemptivo){
        this.getFilas()[cliente.getClasse().getPrioridade()].unshift(cliente);
    } else{
        this.getFilas()[cliente.getClasse().getPrioridade()].push(cliente);
    }
}

Fila.prototype.remover = function(){
    for(lista of this.getFilas()){
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