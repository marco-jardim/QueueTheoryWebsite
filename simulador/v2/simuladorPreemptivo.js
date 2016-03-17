
function SimuladorPreemptivo(tempoFinal, classeObrigatoria, classes) {
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

SimuladorPreemptivo.prototype.setServidorOcupado = function( servidorOcupado) {
    this.servidorOcupado = servidorOcupado;
}

SimuladorPreemptivo.prototype.getServidorOcupado = function() {
    return this.servidorOcupado;
}

SimuladorPreemptivo.prototype.getTemporizador = function() {
    return this.temporizador;
}

SimuladorPreemptivo.prototype.getFila = function() {
    return this.fila;
}

SimuladorPreemptivo.prototype.getMetricaDeInteresse = function() {
    return this.metricaDeInteresse;
}

SimuladorPreemptivo.prototype.prepararSimulacao = function( classes){
    for( c of classes){
        this.temporizador.registrarTarefaPorAtraso(this.getClasseRandomLambda(c), function(tempo) { this.InsereClienteNaFila(tempo,c); }); ////////////////////// 
    }
}

SimuladorPreemptivo.prototype.LiberaServidorEBuscaNovoCliente = function(horarioDeEntradaNoServidor, cliente){
    metricaDeInteresse.adicionaClienteProcessado(cliente);
    //tira o cliente do servidor
    clienteNoServidor = null;
    //se tiver gnt na fila
    if(fila.tamanho() > 0) {
        //tira da fila
        var novoCliente = fila.remover();
        //Marca a saida do cliente
        novoCliente.marcaSaida(horarioDeEntradaNoServidor);
        //Processa o cliente
        ProcessarCliente(novoCliente, horarioDeEntradaNoServidor);
    }
}

SimuladorPreemptivo.prototype.ProcessarCliente = function(cliente, horarioAtual){
    //guarda o cliente no servidor
    clienteNoServidor = cliente;
    //marca o tempo de saida da fila
    clienteNoServidor.marcaSaida(horarioAtual);
    //cria o evento para terminar o processamento do cliente, baseado do tempo pendente para terminado
    //guarda o evento
    //dispara o evento
    tarefaDeProcessamento =
    temporizador.registrarTarefaPorAtraso(
        clienteNoServidor.getTempoPendente() , function(tempo) { this.LiberaServidorEBuscaNovoCliente(tempo, cliente); });
}

SimuladorPreemptivo.prototype.InsereClienteNaFila = function(horarioDeEntrada, classe){
    //marca o horario de entrada
    var novoCliente = new ClientePreemptivo(classe, horarioDeEntrada);
    //Se tem cliente no Servidor
    if(clienteNoServidor != null) {
        //Se a prioridade for menor do cliente que esta no servidor
        if(novoCliente.getClasse().getPrioridade() < clienteNoServidor.getClasse().getPrioridade()){
            novoCliente.setTrabalhoPendente(getTrabalhoPendenteAtual(0));
            //Cancela o evento de processamento desse cliente
            temporizador.cancelarTarefa(tarefaDeProcessamento);
            //Marca o tempo restante que falta para terminar o processamento
            clienteNoServidor.atualizaTempoPendente(horarioDeEntrada); // i.e horarioDeEntrada corresponde ao horario atual
            //Marca a nova entrada do cliente
            clienteNoServidor.marcaEntrada(horarioDeEntrada);
            //Colocar como proximo na fila
            fila.adicionar(clienteNoServidor, true);
            //Processa o Cliente que chegou
            ProcessarCliente(novoCliente,horarioDeEntrada);
        }else{
            novoCliente.setTrabalhoPendente(getTrabalhoPendenteAtual(novoCliente.getTempoPendente()));
            fila.adicionar(novoCliente,false);
        }
    }else{
        //Processa o cliente que chegou
        novoCliente.setTrabalhoPendente(getTrabalhoPendenteAtual(0));
        ProcessarCliente(novoCliente,horarioDeEntrada);
    }

    // Usa-se Random.Exponecial Sempre pois a entrada eh sempre Memoryless
    temporizador.registrarTarefaPorAtraso(Random.Exponencial(classe.getLambda()), function(tempo) { this.InsereClienteNaFila(tempo, classe); });
}

SimuladorPreemptivo.prototype.getTrabalhoPendenteAtual = function( xResidual) {
    //Nq1*E[X1] + Nq2*E[X2] + Xr
    var total = 0.0;
    for( f of this.fila.getFilas()) {
        for( cliente of f)
            total += 1/cliente.getClasse().getMi();
    }

    return total + xResidual;
}

SimuladorPreemptivo.prototype.iniciarSimulacao = function(){
    this.temporizador.play();
    this.getMetricaDeInteresse().setFracaoDeTempoServidorVazio(this.tempoVazioTzxotal / this.temporizador.getTempoFinal());
    return this.getMetricaDeInteresse();
}

SimuladorPreemptivo.prototype.continuarSimulacao = function( tempoFinal){
    this.getMetricaDeInteresse().setMediaCalculada(null);
    this.temporizador.setTempoFinal(tempoFinal);
    return this.iniciarSimulacao();
}

SimuladorPreemptivo.prototype.setTempoVazioTotal = function( tempoVazioTotal) {
    this.tempoVazioTotal = tempoVazioTotal;
}

SimuladorPreemptivo.prototype.setTempoVazio = function( tempoVazio) {
    this.tempoVazio = tempoVazio;
}

SimuladorPreemptivo.prototype.getClasseRandomLambda = function( classe) {
    return Random.Exponencial(classe.getLambda());
}



