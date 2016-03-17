/* require:

random
temporizador
cliente
fila
metricadeinteresse
classe

*/

function SimuladorDeterministico( tempoFinal,  classeObrigatoria, classes) {
    this.temporizador = new Temporizador(tempoFinal);
    this.metricaDeInteresse = new MetricaDeInteresse();
    this.servidorOcupado = false;
    this.tempoVazio = 0.0;
    this.tempoVazioTotal = 0.0;
    this.nClientesChegadas = 0;
    this.nClientesComServidorVazio = 0;
    this.clienteAtual;

    this.listaClasse = [classeObrigatoria];
    this.listaClasse = this.listaClasse.concat([].concat(classes));

    this.fila = new Fila(this.listaClasse);
    this.prepararSimulacao(this.listaClasse);
}

SimuladorDeterministico.prototype.setServidorOcupado = function( servidorOcupado) {
    this.servidorOcupado = servidorOcupado;
}

SimuladorDeterministico.prototype.getServidorOcupado = function() {
    return this.servidorOcupado;
}

SimuladorDeterministico.prototype.getTemporizador = function() {
    return this.temporizador;
}

SimuladorDeterministico.prototype.getFila = function() {
    return this.fila;
}

SimuladorDeterministico.prototype.getMetricaDeInteresse = function() {
    return this.metricaDeInteresse;
}

SimuladorDeterministico.prototype.prepararSimulacao = function( classes){
    for( c of classes){
        this.temporizador.registrarTarefaPorAtraso(getClasseRandomLambda(c), function(tempo) { this.InsereClienteNaFila(tempo,c); }); //////////////////////
    }
}

SimuladorDeterministico.prototype.LiberaServidorEBuscaNovoCliente = function( horarioDeEntradaNoServidor,  cliente){
    this.setServidorOcupado(false);
    this.setTempoVazio(temporizador.getTempoAtual());
    metricaDeInteresse.adicionaClienteProcessado(cliente);
    if(this.fila.tamanho() > 0){
        var novoCliente = this.fila.remover();
        novoCliente.setTempoSaida(horarioDeEntradaNoServidor);
        this.ProcessarCliente(novoCliente);
    }
}

SimuladorDeterministico.prototype.ProcessarCliente = function( cliente){
    // com preempçao: tira o cliente, salva o tempo que ainda resta e coloca o novo no servidor
    this.setServidorOcupado(true);
    this.clienteAtual = cliente;
    this.setTempoVazioTotal(this.tempoVazioTotal + this.temporizador.getTempoAtual() - this.tempoVazio);
    this.temporizador.registrarTarefaPorAtraso(cliente.getTempoDeServico(), function(tempo) { this.LiberaServidorEBuscaNovoCliente(tempo, cliente); }); ////////////////
}

SimuladorDeterministico.prototype.InsereClienteNaFila = function( horarioDeEntrada,  classe){
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
    this.temporizador.registrarTarefaPorAtraso(getClasseRandomLambda(classe), function(tempo) { this.InsereClienteNaFila(tempo, classe); }); 
}

SimuladorDeterministico.prototype.getTrabalhoPendenteAtual = function( xResidual) {
    //Nq1*E[X1] + Nq2*E[X2] + Xr
    var total = 0.0;
    for( f of this.fila.getFilas()) {
        for( cliente of f)
            total += 1/cliente.getClasse().getMi();
    }

    return total + xResidual;
}

SimuladorDeterministico.prototype.iniciarSimulacao = function(){
    this.temporizador.play();
    this.getMetricaDeInteresse().setFracaoDeTempoServidorVazio(this.tempoVazioTotal / this.temporizador.getTempoFinal());
    return this.getMetricaDeInteresse();
}

SimuladorDeterministico.prototype.continuarSimulacao = function( tempoFinal){
    this.getMetricaDeInteresse().setMediaCalculada(null);
    this.temporizador.setTempoFinal(tempoFinal);
    return this.iniciarSimulacao();
}

SimuladorDeterministico.prototype.setTempoVazioTotal = function( tempoVazioTotal) {
    this.tempoVazioTotal = tempoVazioTotal;
}

SimuladorDeterministico.prototype.setTempoVazio = function( tempoVazio) {
    this.tempoVazio = tempoVazio;
}

SimuladorDeterministico.prototype.getClasseRandomLambda = function(classe) {
	return Random.Deterministico(classe.getLambda());
}