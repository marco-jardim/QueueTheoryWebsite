
function Intervalo() {
    this.entrada;
    this.saida;

}

Intervalo.prototype.delta = function(){
    return this.saida - this.entrada;
}