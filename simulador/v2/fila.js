// require classe.js


function Fila( classes) {
        this.filas = []; //List<List<Cliente>>
        for (classe of classes) {
            this.filas.push(new Array(10));
        }
    }

Fila.prototype.getFilas = function() {
        return this.filas;
    }

Fila.prototype.adicionar = function( cliente,  preemptivo){
        if(preemptivo){
            this.getFilas()[this.cliente.getClasse().getPrioridade()].unshift(cliente);
        }else{
            this.getFilas()[this.cliente.getClasse().getPrioridade()].unshift(cliente);
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
        for (var i = 0; i < filas.length; i++) {
            for (var j = 0; j < filas[i].length; j++) {
                contagem++;
            }
        }

        return contagem;
    }