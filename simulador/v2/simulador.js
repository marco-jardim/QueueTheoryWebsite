/* require:

random
temporizador
cliente
fila
metricadeinteresse
classe

*/

function Simulador( tempoFinal,  classeObrigatoria, classes) {
    this.temporizador = new Temporizador(tempoFinal);
    this.metricaDeInteresse = new MetricaDeInteresse();
    this.servidorOcupado = false;
    this.tempoVazio = 0.0;
    this.tempoVazioTotal = 0.0;
    this.nClientesChegadas = 0;
    this.nClientesComServidorVazio = 0;
    this.clienteAtual;

    this.listaClasse = [];
    this.listaClasse.push(classeObrigatoria);
    this.listaClasse.concat(classes);

    this.fila = new Fila(this.listaClasse);
    this.prepararSimulacao(this.listaClasse);
}

Simulador.prototype.setServidorOcupado= function( servidorOcupado) {
    this.servidorOcupado = servidorOcupado;
}

Simulador.prototype.getServidorOcupado= function() {
    return this.servidorOcupado;
}

Simulador.prototype.getTemporizador= function() {
    return this.temporizador;
}

Simulador.prototype.getFila= function() {
    return this.fila;
}

Simulador.prototype.getMetricaDeInteresse= function() {
    return this.metricaDeInteresse;
}

Simulador.prototype.prepararSimulacao= function( classes){
    var self = this;
    for( c of classes){
        this.temporizador.registrarTarefaPorAtraso(this.getClasseRandomLambda(c), function(tempo) { self.InsereClienteNaFila(tempo,c); }); ////////////////////// 
    }
}

Simulador.prototype.LiberaServidorEBuscaNovoCliente= function( horarioDeEntradaNoServidor,  cliente){
    this.setServidorOcupado(false);
    this.setTempoVazio(this.temporizador.getTempoAtual());
    this.metricaDeInteresse.adicionaClienteProcessado(cliente);
    if(this.fila.tamanho() > 0){
        var novoCliente = this.fila.remover();
        novoCliente.setTempoSaida(horarioDeEntradaNoServidor);
        this.ProcessarCliente(novoCliente);
    }
}

Simulador.prototype.ProcessarCliente= function( cliente){
    var self = this;
    // com preempçao: tira o cliente, salva o tempo que ainda resta e coloca o novo no servidor
    this.setServidorOcupado(true);
    this.clienteAtual = cliente;
    this.setTempoVazioTotal(this.tempoVazioTotal + this.temporizador.getTempoAtual() - this.tempoVazio);
    this.temporizador.registrarTarefaPorAtraso(cliente.getTempoDeServico(), function(tempo) { self.LiberaServidorEBuscaNovoCliente(tempo, cliente); }); ////////////////
}

Simulador.prototype.InsereClienteNaFila= function( horarioDeEntrada,  classe){
    var self = this;
    var cliente = new Cliente(classe, horarioDeEntrada);
    // Com preempção: coloca direto no servidor
    if(!this.servidorOcupado){
        cliente.setTempoSaida(horarioDeEntrada);
        cliente.setTrabalhoPendente(this.getTrabalhoPendenteAtual(0));
        this.metricaDeInteresse.setFracaoDeChegadasServidorVazio(++this.nClientesComServidorVazio/++this.nClientesChegadas);
        this.ProcessarCliente(cliente);
    }else{
        cliente.setTrabalhoPendente(getTrabalhoPendenteAtual(this.clienteAtual.getTempoDeServico())); //TODO: XResidual do cliente que está ocupando o servidor
        this.metricaDeInteresse.setFracaoDeChegadasServidorVazio(this.nClientesComServidorVazio/++this.nClientesChegadas);
        this.fila.adicionar(cliente,false);
    }
    // Usa-se Random.Exponecial Sempre pois a entrada eh sempre Memoryless
    this.temporizador.registrarTarefaPorAtraso(this.getClasseRandomLambda(classe), function(tempo) { self.InsereClienteNaFila(tempo, classe); }); ///////////////
}

Simulador.prototype.getTrabalhoPendenteAtual= function( xResidual) {
    //Nq1*E[X1] + Nq2*E[X2] + Xr
    var total = 0.0;
    for( f of this.fila.getFilas()) {
        for( cliente of f)
            total += 1/cliente.getClasse().getMi();
    }

    return total + xResidual;
}

Simulador.prototype.iniciarSimulacao= function(){
    this.temporizador.play();
    this.getMetricaDeInteresse().setFracaoDeTempoServidorVazio(this.tempoVazioTotal / this.temporizador.getTempoFinal());
    return this.getMetricaDeInteresse();
}

Simulador.prototype.continuarSimulacao= function( tempoFinal){
    this.getMetricaDeInteresse().setMediaCalculada(null);
    this.temporizador.setTempoFinal(tempoFinal);
    return this.iniciarSimulacao();
}

Simulador.prototype.setTempoVazioTotal= function( tempoVazioTotal) {
    this.tempoVazioTotal = tempoVazioTotal;
}

Simulador.prototype.setTempoVazio= function( tempoVazio) {
    this.tempoVazio = tempoVazio;
}

Simulador.prototype.getClasseRandomLambda= function( classe) {
    return Random.Exponencial(classe.getLambda());
}

